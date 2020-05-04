/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Log = use('App/Models/Log');

/**
 * Resourceful controller for interacting with logs
 */
class LogController {
  /**
   * Show a list of all logs.
   * GET logs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response }) {
    try {
      const { models, requesting_id } = request.only([
        'models',
        'requesting_id',
      ]);

      const logs = await Log.query()
        .with('user')
        .whereIn('model', models)
        .andWhere('model_id', requesting_id)
        .orderBy('created_at', 'desc')
        .fetch();

      return logs;
    } catch (err) {
      return response.status(err.status).send({
        message: 'Houve um erro ao consultar os logs.',
      });
    }
  }
}

module.exports = LogController;
