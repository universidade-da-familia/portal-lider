/* eslint-disable func-names */
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use('App/Models/User');

const Kue = use('Kue');
const JobCreate = use('App/Jobs/CreateUser');
const JobUpdate = use('App/Jobs/UpdateUser');

const ConvertUnicode = use('App/Controllers/Http/Validations/ConvertUnicode');

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request }) {
    const { page, filterData } = request.only(['page', 'filterData']);

    const { perPage } = filterData;

    const users = await User.query()
      // .with('addresses')
      // .with('orders')
      // .with('organizators.defaultEvent.ministery')
      // .with('participants.defaultEvent.ministery')
      .where(function () {
        const currentDate = new Date();
        const [start_date] = filterData.start_date.split('T');
        const [end_date] = filterData.end_date.split('T');
        const [ministery_name, ministery_id] = filterData.ministery.split('/');

        if (filterData.id !== '') {
          this.where('id', filterData.id);
        }
        if (filterData.cpf !== '') {
          this.where('cpf', filterData.cpf);
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

        if (filterData.hierarchy !== '0' && filterData.ministery === '') {
          this.where(builder => {
            builder.where('cmn_hierarchy_id', '>=', filterData.hierarchy);
            builder.orWhere('mu_hierarchy_id', '>=', filterData.hierarchy);
            builder.orWhere('crown_hierarchy_id', '>=', filterData.hierarchy);
            builder.orWhere('mp_hierarchy_id', '>=', filterData.hierarchy);
            builder.orWhere('ffi_hierarchy_id', '>=', filterData.hierarchy);
            builder.orWhere('gfi_hierarchy_id', '>=', filterData.hierarchy);
            builder.orWhere('pg_hab_hierarchy_id', '>=', filterData.hierarchy);
            builder.orWhere('pg_yes_hierarchy_id', '>=', filterData.hierarchy);
          });
        }

        if (filterData.hierarchy !== '0' && filterData.ministery !== '') {
          this.where(ministery_name, '>=', filterData.hierarchy);
        }

        if (filterData.only_organizators !== '') {
          this.whereHas(filterData.only_organizators);

          if (filterData.ministery !== '') {
            this.whereHas(
              `${filterData.only_organizators}.defaultEvent`,
              builder => {
                builder.where('ministery_id', ministery_id);
              },
            );
          }
          if (filterData.default_event_id) {
            this.whereHas(filterData.only_organizators, builder => {
              builder.where('default_event_id', filterData.default_event_id);
            });
          }
          if (filterData.status === 'Finalizado') {
            this.whereHas(filterData.only_organizators, builder => {
              builder.where('is_finished', true);
            });
          }
          if (filterData.status === 'Não iniciado') {
            this.whereHas(filterData.only_organizators, builder => {
              builder.where('start_date', '>', currentDate);
              builder.where('is_finished', false);
            });
          }
          if (filterData.status === 'Em andamento') {
            this.whereHas(filterData.only_organizators, builder => {
              builder.where('start_date', '<=', currentDate);
              builder.where('is_finished', false);
            });
          }
          if (start_date) {
            this.whereHas(filterData.only_organizators, builder => {
              builder.where('start_date', '>=', start_date);
            });
          }
          if (end_date) {
            this.whereHas(filterData.only_organizators, builder => {
              builder.where('start_date', '<=', end_date);
            });
          }
        } else {
          if (filterData.status === 'Finalizado') {
            this.where(builder => {
              builder.whereHas('organizators', builder => {
                builder.where('is_finished', true);
              });
              builder.orWhereHas('participants', builder => {
                builder.where('is_finished', true);
              });
            });
          }
          if (filterData.status === 'Não iniciado') {
            this.where(builder => {
              builder.whereHas('organizators', builder => {
                builder.where('start_date', '>', currentDate);
                builder.where('is_finished', false);
              });
              builder.orWhereHas('participants', builder => {
                builder.where('start_date', '>', currentDate);
                builder.where('is_finished', false);
              });
            });
          }
          if (filterData.status === 'Em andamento') {
            this.where(builder => {
              builder.whereHas('organizators', builder => {
                builder.where('start_date', '<=', currentDate);
                builder.where('is_finished', false);
              });
              builder.orWhereHas('participants', builder => {
                builder.where('start_date', '<=', currentDate);
                builder.where('is_finished', false);
              });
            });
          }
          if (start_date) {
            this.where(builder => {
              builder.whereHas('organizators', builder => {
                builder.where('start_date', '>=', start_date);
              });
              builder.orWhereHas('participants', builder => {
                builder.where('start_date', '>=', start_date);
              });
            });
          }
          if (end_date) {
            this.where(builder => {
              builder.whereHas('organizators', builder => {
                builder.where('start_date', '<=', end_date);
              });
              builder.orWhereHas('participants', builder => {
                builder.where('start_date', '<=', end_date);
              });
            });
          }
        }
      })
      .orderBy('id', 'asc')
      .paginate(page, perPage);

    return users;
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const data = request.only(['name', 'email', 'cpf_cnpj', 'password']);

      const convertUnicode = new ConvertUnicode();

      data.name = await convertUnicode.convert(data.name);

      // const user_logged_id = parseInt(request.header('user_logged_id'))
      // const user_logged_type = request.header('user_logged_type')

      const user = await User.create(data);

      Kue.dispatch(JobCreate.key, user, { attempts: 5 });

      // if (user_logged_id && user_logged_type) {
      //   await Log.create({
      //     action: 'create',
      //     model: 'entity',
      //     model_id: entity.id,
      //     description: `A entidade id ${entity.id} foi criada.`,
      //     [`${user_logged_type}_id`]: user_logged_id
      //   })
      // }

      return user;
    } catch (err) {
      return response.status(err.status).send({
        error: {
          message: 'Falha ao criar/atualizar o arquivo.',
        },
      });
    }
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const user = await User.findOrFail(params.id);

    await user.loadMany([
      'file',
      // 'church',
      // 'relationships.relationshipEntity.file',
      // 'addresses',
      // 'organizators.defaultEvent.ministery',
      // 'organizators.organization',
      // 'organizators.noQuitterParticipants',
      // 'participants.noQuitterParticipants',
      // 'participants.defaultEvent.ministery',
      // 'creditCards',
      // 'orders.status',
      // 'orders.transaction'
    ]);

    return user;
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request }) {
    const data = request.all();

    // const user_logged_id = parseInt(request.header('user_logged_id'), 10);
    // const user_logged_type = request.header('user_logged_type');

    const user = await User.findOrFail(params.id);

    // if (user_logged_id && user_logged_type) {
    //   await Log.create({
    //     action: 'update',
    //     model: 'entity',
    //     model_id: user.id,
    //     description: `A entidade ${user.id} foi atualizada.`,
    //     new_data: data,
    //     [`${user_logged_type}_id`]: user_logged_id
    //   })
    // }

    user.merge(data);

    await user.save();

    await user.load('church');

    Kue.dispatch(JobUpdate.key, user, { attempts: 5 });

    return user;
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    const user = await User.findOrFail(params.id);

    // const user_logged_id = parseInt(request.header('user_logged_id'), 10);
    // const user_logged_type = request.header('user_logged_type');

    // if (user_logged_id && user_logged_type) {
    //   await Log.create({
    //     action: 'delete',
    //     model: 'user',
    //     model_id: user.id,
    //     description: `A entidade id ${user.id} foi deletada.`,
    //     [`${user_logged_type}_id`]: user_logged_id,
    //   });
    // }

    await user.delete();

    return response.status(204);
  }
}

module.exports = UserController;
