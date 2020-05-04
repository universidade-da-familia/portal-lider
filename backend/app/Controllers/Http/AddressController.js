/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use('Database');
const Address = use('App/Models/Address');
const User = use('App/Models/User');
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
    const address = await Address.query().with('user').fetch();

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
      // LEMBRAR DE TIRAR O USER TYPE NO SAGA E DUCKS
      const { user_netsuite_id, addressesPost, addressesPut } = request.only([
        'user_netsuite_id',
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

      const user = await User.findByOrFail(
        'user_netsuite_id',
        user_netsuite_id,
      );

      await user.load('addresses');

      const netsuiteAddresses = user.toJSON().addresses;

      Kue.dispatch(
        Job.key,
        { user_netsuite_id, netsuiteAddresses },
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
        message: 'Seus endereços foram atualizados.',
      });
    } catch (err) {
      return response.status(err.status).send({
        error: {
          message: 'Erro ao atualizar os endereços',
        },
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

      await address.loadMany('user');

      return address;
    } catch (err) {
      return response.status(err.status).send({
        error: {
          message: 'Erro ao mostrar o endereço',
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
        message: 'O endereço foi removido.',
      });
    } catch (err) {
      return response.status(err.status).send({
        error: {
          message: 'Erro ao deletar o endereço',
        },
      });
    }
  }
}

module.exports = AddressController;
