/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Event = use('App/Models/Event');
const User = use('App/Models/User');

/**
 * Resourceful controller for interacting with organizators
 */
class EventOrganizationController {
  /**
   * Create/save a new organizator.
   * POST organizators
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request }) {
    const { event_id, user_id } = request.only(['event_id', 'user_id']);
    const event = await Event.findOrFail(event_id);

    await event.organizators().attach(user_id);

    await event.organizators().fetch();

    return event;
  }

  /**
   * Display a single organizator.
   * GET organizators/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, response }) {
    try {
      const organization = await User.findByOrFail('cpf_cnpj', params.cnpj);

      await organization.loadMany(['file', 'addresses']);

      return organization;
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: 'Falha!',
          message: 'Nenhuma igreja foi encontrada.',
        },
      });
    }
  }

  /**
   * Delete a organizator with id.
   * DELETE organizators/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const { event_id } = request.only(['event_id']);
      const entity_id = params.id;

      const event = await Event.findOrFail(event_id);

      await event.organizators().detach(entity_id);
      await event.organizators().fetch();

      return response.status(200).send({
        title: 'Sucesso!',
        message: 'O organizador foi removido do evento.',
      });
    } catch (error) {
      return response.status(error.status).send({
        error: {
          title: 'Falha!',
          message: 'Erro ao excluir o organizador no evento',
        },
      });
    }
  }
}

module.exports = EventOrganizationController;
