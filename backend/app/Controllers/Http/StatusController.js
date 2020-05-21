/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Status = use('App/Models/Status');

class StatusController {
  /**
   * Show a list of all status.
   * GET status
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const status = Status.query().fetch();

    return status;
  }

  /**
   * Create/save a new status.
   * POST status
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const data = request.only(['name']);

      const status = await Status.create(data);

      return status;
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: 'Falha!',
          message: 'Tente cadastrar novamente',
        },
      });
    }
  }

  /**
   * Display a single status.
   * GET status/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, response }) {
    try {
      const status = await Status.findOrFail(params.id);

      return status;
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: 'Falha!',
          message: 'Nenhum status encontrado.',
        },
      });
    }
  }

  /**
   * Update status details.
   * PUT or PATCH status/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const status = await Status.findOrFail(params.id);

      const data = request.all();

      status.merge(data);

      await status.save();

      return status;
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: 'Falha!',
          message: 'Tente atualizar novamente',
        },
      });
    }
  }

  /**
   * Delete a status with id.
   * DELETE status/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    try {
      const status = await Status.findOrFail(params.id);

      await status.delete();

      return response.status(200).send({
        title: 'Sucesso!',
        message: 'O status foi removido.',
      });
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: 'Falha!',
          message: 'Erro ao excluir o status',
        },
      });
    }
  }
}

module.exports = StatusController;
