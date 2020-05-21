/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Ministery = use('App/Models/Ministery');

/**
 * Resourceful controller for interacting with ministeries
 */
class MinisteryController {
  /**
   * Show a list of all ministeries.
   * GET ministeries
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const ministery = await Ministery.query().orderBy('id').fetch();

    return ministery;
  }

  /**
   * Create/save a new ministery.
   * POST ministeries
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const data = request.only(['name']);

      const ministery = await Ministery.create(data);

      return ministery;
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: 'Falha!',
          message: 'Erro ao criar o ministério',
        },
      });
    }
  }

  /**
   * Display a single ministery.
   * GET ministeries/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const ministery = await Ministery.findOrFail(params.id);

    return ministery;
  }

  /**
   * Update ministery details.
   * PUT or PATCH ministeries/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const data = request.only(['name']);

      const ministery = await Ministery.findOrFail(params.id);

      ministery.merge(data);

      await ministery.save();

      return ministery;
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: 'Falha!',
          message: 'Erro ao atualizar o ministério',
        },
      });
    }
  }

  /**
   * Delete a ministery with id.
   * DELETE ministeries/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    try {
      const ministery = await Ministery.findOrFail(params.id);

      await ministery.delete();

      return response.status(200).send({
        title: 'Sucesso!',
        message: 'O ministério foi removido.',
      });
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: 'Falha!',
          message: 'Erro ao deletar o ministério',
        },
      });
    }
  }
}

module.exports = MinisteryController;
