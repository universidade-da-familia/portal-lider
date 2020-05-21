/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Organization = use('App/Models/Organization');

const ConvertUnicode = use('App/Controllers/Http/Validations/ConvertUnicode');

/**
 * Resourceful controller for interacting with organizations
 */
class OrganizationController {
  /**
   * Show a list of all organizations.
   * GET organizations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const organization = await Organization.all();

    return organization;
  }

  /**
   * Show a list of all events.
   * GET events
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async indexPaginate({ request }) {
    const { page, filterData } = request.only(['page', 'filterData']);

    const { perPage } = filterData;

    const organizations = await Organization.query()
      .with('addresses')
      .with('events.defaultEvent.ministery')
      .where(function () {
        const currentDate = new Date();
        const [start_date] = filterData.start_date.split('T');
        const [end_date] = filterData.end_date.split('T');
        const [, ministery_id] = filterData.ministery.split('/');

        if (filterData.id !== '') {
          this.where('id', filterData.id);
        }
        if (filterData.cnpj !== '') {
          this.where('cnpj', filterData.cnpj);
        }
        if (filterData.email !== '') {
          this.where('email', filterData.email);
        }

        // busca dados endereço entidade
        if (filterData.cep !== '') {
          this.whereHas('addresses', builder => {
            builder.where('cep', filterData.cep);
          });
        }
        if (filterData.uf !== '') {
          this.whereHas('addresses', builder => {
            builder.whereRaw(
              "LOWER(uf) like '%' || LOWER(?) || '%'",
              filterData.uf,
            );
          });
        }
        if (filterData.city !== '') {
          this.whereHas('addresses', builder => {
            builder.whereRaw(
              "LOWER(city) like '%' || LOWER(?) || '%'",
              filterData.city,
            );
          });
        }

        if (filterData.collapse) {
          this.whereHas('events');

          if (filterData.ministery !== '') {
            this.whereHas('events.defaultEvent', builder => {
              builder.where('ministery_id', ministery_id);
            });
          }
          if (filterData.default_event_id) {
            this.whereHas('events', builder => {
              builder.where('default_event_id', filterData.default_event_id);
            });
          }
          if (filterData.status === 'Finalizado') {
            this.whereHas('events', builder => {
              builder.where('is_finished', true);
            });
          }
          if (filterData.status === 'Não iniciado') {
            this.whereHas('events', builder => {
              builder.where('start_date', '>', currentDate);
              builder.where('is_finished', false);
            });
          }
          if (filterData.status === 'Em andamento') {
            this.whereHas('events', builder => {
              builder.where('start_date', '<=', currentDate);
              builder.where('is_finished', false);
            });
          }
          if (start_date) {
            this.whereHas('events', builder => {
              builder.where('start_date', '>=', start_date);
            });
          }
          if (end_date) {
            this.whereHas('events', builder => {
              builder.where('start_date', '<=', end_date);
            });
          }
        }
      })
      .orderBy('id', 'asc')
      .paginate(page, perPage);

    return organizations;
  }

  /**
   * Show a list of all events.
   * GET events
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async exportExcel({ request }) {
    const { lastPage, filterData } = request.only(['lastPage', 'filterData']);

    const { perPage } = filterData;
    const allData = [];

    for (let index = 1; index <= lastPage; index++) {
      const organization = await Organization.query()
        .with('addresses')
        .with('events.defaultEvent.ministery')
        .where(function () {
          const currentDate = new Date();
          const [start_date] = filterData.start_date.split('T');
          const [end_date] = filterData.end_date.split('T');
          const [, ministery_id] = filterData.ministery.split('/');

          if (filterData.id !== '') {
            this.where('id', filterData.id);
          }
          if (filterData.cnpj !== '') {
            this.where('cnpj', filterData.cnpj);
          }
          if (filterData.email !== '') {
            this.where('email', filterData.email);
          }

          // busca dados endereço entidade
          if (filterData.cep !== '') {
            this.whereHas('addresses', builder => {
              builder.where('cep', filterData.cep);
            });
          }
          if (filterData.uf !== '') {
            this.whereHas('addresses', builder => {
              builder.whereRaw(
                "LOWER(uf) like '%' || LOWER(?) || '%'",
                filterData.uf,
              );
            });
          }
          if (filterData.city !== '') {
            this.whereHas('addresses', builder => {
              builder.whereRaw(
                "LOWER(city) like '%' || LOWER(?) || '%'",
                filterData.city,
              );
            });
          }

          if (filterData.collapse) {
            this.whereHas('events');

            if (filterData.ministery !== '') {
              this.whereHas('events.defaultEvent', builder => {
                builder.where('ministery_id', ministery_id);
              });
            }
            if (filterData.default_event_id) {
              this.whereHas('events', builder => {
                builder.where('default_event_id', filterData.default_event_id);
              });
            }
            if (filterData.status === 'Finalizado') {
              this.whereHas('events', builder => {
                builder.where('is_finished', true);
              });
            }
            if (filterData.status === 'Não iniciado') {
              this.whereHas('events', builder => {
                builder.where('start_date', '>', currentDate);
                builder.where('is_finished', false);
              });
            }
            if (filterData.status === 'Em andamento') {
              this.whereHas('events', builder => {
                builder.where('start_date', '<=', currentDate);
                builder.where('is_finished', false);
              });
            }
            if (start_date) {
              this.whereHas('events', builder => {
                builder.where('start_date', '>=', start_date);
              });
            }
            if (end_date) {
              this.whereHas('events', builder => {
                builder.where('start_date', '<=', end_date);
              });
            }
          }
        })
        .orderBy('id', 'asc')
        .paginate(index, perPage);

      allData.push(...organization.toJSON().data);
    }

    return allData;
  }

  /**
   * Show a list of all organizations.
   * GET organizations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async indexParams({ request, response }) {
    try {
      const { uf, city, name } = request.only(['uf', 'city', 'name']);

      const organizations = await Organization.query()
        .with('file')
        .with('addresses')
        .with('events.defaultEvent.ministery')
        .where(function () {
          if (name) {
            this.whereRaw(
              "LOWER(corporate_name) like '%' || LOWER(?) || '%'",
              name,
            );
          }

          if (uf) {
            this.whereHas('addresses', builder => {
              builder.whereRaw("LOWER(uf) like '%' || LOWER(?) || '%'", uf);
            });
          }

          if (city) {
            this.whereHas('addresses', builder => {
              builder.whereRaw("LOWER(city) like '%' || LOWER(?) || '%'", city);
            });
          }
        })
        .fetch();

      return organizations;
    } catch (err) {
      return response.status(err.status).send({
        title: 'Falha!',
        message: 'Houve um erro ao buscar as igrejas.',
      });
    }
  }

  /**
   * Create/save a new organization.
   * POST organizations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const data = request.all();

      const convertUnicode = new ConvertUnicode();

      data.corporate_name = await convertUnicode.convert(data.corporate_name);
      data.fantasy_name = await convertUnicode.convert(data.fantasy_name);

      const organization = await Organization.create(data);

      return organization;
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: 'Falha!',
          message: 'Erro ao criar a organização',
        },
      });
    }
  }

  /**
   * Display a single organization.
   * GET organizations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, response }) {
    try {
      const organization = await Organization.findOrFail(params.id);

      await organization.loadMany([
        'file',
        'addresses',
        'events.defaultEvent.ministery',
        'entities',
        'orders',
      ]);

      return organization;
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: 'Falha!',
          message: 'Erro ao mostrar a organização',
        },
      });
    }
  }

  /**
   * Update organization details.
   * PUT or PATCH organizations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const data = request.all();

      const organization = await Organization.findOrFail(params.id);

      organization.merge(data);

      await organization.save();

      return organization;
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: 'Falha!',
          message: 'Erro ao atualizar a organização',
        },
      });
    }
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update_netsuite({ params, request, response }) {
    try {
      const data = request.all();

      const convertUnicode = new ConvertUnicode();

      data.corporate_name = await convertUnicode.convert(data.corporate_name);
      data.fantasy_name = await convertUnicode.convert(data.fantasy_name);

      data.netsuite_id = params.netsuite_id;

      console.log('iniciando atualizacao de organization');

      const organization = await Organization.findOrCreate(
        {
          netsuite_id: params.netsuite_id,
        },
        data,
      );

      organization.merge(data);

      await organization.save();

      console.log('organization criada ou atualizada com sucesso');

      return organization;
    } catch (err) {
      console.log(err);
      return response.status(err.status).send({
        title: 'Falha!',
        message: 'Erro ao criar organization',
      });
    }
  }

  /**
   * Delete a organization with id.
   * DELETE organizations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const organization = await Organization.findOrFail(params.id);

      await organization.delete();

      return response.status(200).send({
        title: 'Sucesso!',
        message: 'A organização foi removida.',
      });
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: 'Falha!',
          message: 'Erro ao deletar a organização',
        },
      });
    }
  }
}

module.exports = OrganizationController;
