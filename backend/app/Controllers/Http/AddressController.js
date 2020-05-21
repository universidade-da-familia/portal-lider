/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use('Database');
const Address = use('App/Models/Address');
const Entity = use('App/Models/Entity');
const Organization = use('App/Models/Organization');
const Log = use('App/Models/Log');

const Kue = use('Kue');
const Job = use('App/Jobs/Addresses');

const axios = require('axios');

const api = axios.default.create({
  baseURL: 'https://5260046.restlets.api.netsuite.com/app/site/hosting',
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'NLAuth nlauth_account=5260046, nlauth_email=dev@udf.org.br, nlauth_signature=Shalom1234,nlauth_role=1077',
  },
});

/**
 * Resourceful controller for interacting with addresses
 */
class AddressController {
  /**
   * Show a list of all addresses.
   * GET addresses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const address = await Address.query().with('entity').fetch();

    return address;
  }

  /**
   * Create/save a new address.
   * POST addresses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      let user;
      const {
        netsuite_id,
        user_type,
        addressesPost,
        addressesPut,
      } = request.only([
        'netsuite_id',
        'user_type',
        'addressesPost',
        'addressesPut',
      ]);

      const user_logged_id = parseInt(request.header('user_logged_id'), 10);
      const user_logged_type = request.header('user_logged_type');

      const trx = await Database.beginTransaction();

      if (addressesPost && addressesPost.length > 0) {
        await Address.createMany(addressesPost, trx);
      }

      if (addressesPut && addressesPut.length > 0) {
        addressesPut.map(async address => {
          const searchAddress = await Address.findOrFail(address.id);

          searchAddress.merge(address, trx);

          await searchAddress.save();
        });
      }

      trx.commit();

      if (user_type === 'entity') {
        user = await Entity.findByOrFail('netsuite_id', netsuite_id);
      } else {
        user = await Organization.findByOrFail('netsuite_id', netsuite_id);
      }

      await user.load('addresses');

      const netsuiteAddresses = user.toJSON().addresses;

      Kue.dispatch(
        Job.key,
        { netsuite_id, netsuiteAddresses },
        { attempts: 5 },
      );

      const ceps = user.toJSON().addresses.map(address => {
        return address.cep;
      });

      if (user_logged_id && user_logged_type) {
        await Log.create({
          action: 'create',
          model: 'address',
          model_id: user.id,
          description: `Os endereços de CEP ${ceps.join(
            ', ',
          )} foram criados/atualizados`,
          [`${user_logged_type}_id`]: user_logged_id,
        });
      }

      return response.status(200).send({
        title: 'Sucesso!',
        message: 'Seus endereços foram atualizados.',
      });
    } catch (err) {
      return response.status(err.status).send({
        title: 'Falha!',
        message: 'Erro ao atualizar os endereços',
      });
    }
  }

  /**
   * Display a single address.
   * GET addresses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, response }) {
    try {
      const address = await Address.findOrFail(params.id);

      await address.loadMany(['entity', 'organization']);

      return address;
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: 'Falha!',
          message: 'Erro ao mostrar o endereço',
        },
      });
    }
  }

  /**
   * Update address details.
   * PUT or PATCH addresses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const {
        entity_id,
        organization_id,
        type,
        cep,
        city,
        uf,
        country,
        street,
        street_number,
        neighborhood,
        complement,
        receiver,
      } = request.only([
        'entity_id',
        'organization_id',
        'type',
        'cep',
        'city',
        'uf',
        'country',
        'street',
        'street_number',
        'neighborhood',
        'complement',
        'receiver',
      ]);

      const address = await Address.findOrFail(params.id);

      address.entity_id = entity_id || address.entity_id;
      address.organization_id = organization_id || address.organization_id;
      address.type = type || address.type;
      address.cep = cep || address.cep;
      address.city = city || address.city;
      address.uf = uf || address.uf;
      address.country = country || address.country;
      address.street = street || address.street;
      address.street_number = street_number || address.street_number;
      address.neighborhood = neighborhood || address.neighborhood;
      address.complement = complement || address.complement;
      address.receiver = receiver || address.receiver;

      await address.save();

      return address;
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: 'Falha!',
          message: 'Erro ao atualizar o endereço',
        },
      });
    }
  }

  /**
   * Delete a address with id.
   * DELETE addresses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    try {
      const { id, index, netsuite_id } = params;

      const address = await Address.findOrFail(id);

      await address.delete();

      await api.delete(
        `/restlet.nl?script=186&deploy=1&netsuite_id=${netsuite_id}&index=${index}`,
      );

      return response.status(200).send({
        title: 'Sucesso!',
        message: 'O endereço foi removido.',
      });
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: 'Falha!',
          message: 'Erro ao deletar o endereço',
        },
      });
    }
  }
}

module.exports = AddressController;
