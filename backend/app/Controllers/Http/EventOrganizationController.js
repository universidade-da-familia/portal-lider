'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Event = use('App/Models/Event')
const Organization = use('App/Models/Organization')

/**
 * Resourceful controller for interacting with organizators
 */
class EventOrganizationController {
  /**
   * Show a list of all organizators.
   * GET organizators
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ params }) {}

  /**
   * Create/save a new organizator.
   * POST organizators
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request }) {
    const { event_id, entity_id } = request.only(['event_id', 'entity_id'])
    const event = await Event.findOrFail(event_id)

    await event.organizators().attach(entity_id)

    await event.organizators().fetch()

    return event
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
  async show ({ params, response }) {
    try {
      const organization = await Organization.findByOrFail('cnpj', params.cnpj)

      await organization.loadMany(['file', 'addresses'])

      return organization
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: 'Falha!',
          message: 'Nenhuma igreja foi encontrada.'
        }
      })
    }
  }

  /**
   * Render a form to update an existing organizator.
   * GET organizators/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {}

  /**
   * Update organizator details.
   * PUT or PATCH organizators/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {}

  /**
   * Delete a organizator with id.
   * DELETE organizators/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const { event_id } = request.only(['event_id'])
      const entity_id = params.id

      const event = await Event.findOrFail(event_id)

      await event.organizators().detach(entity_id)
      await event.organizators().fetch()

      return response.status(200).send({
        title: 'Sucesso!',
        message: 'O organizador foi removido do evento.'
      })
    } catch (error) {
      return response.status(error.status).send({
        error: {
          title: 'Falha!',
          message: 'Erro ao excluir o organizador no evento'
        }
      })
    }
  }
}

module.exports = EventOrganizationController
