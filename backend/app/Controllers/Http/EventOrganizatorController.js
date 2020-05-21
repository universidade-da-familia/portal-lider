'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Event = use('App/Models/Event')
const Entity = use('App/Models/Entity')
const DefaultEvent = use('App/Models/DefaultEvent')
const Log = use('App/Models/Log')

const ValidateEmail = use('App/Controllers/Http/Validations/ValidateEmail')

/**
 * Resourceful controller for interacting with organizators
 */
class EventOrganizatorController {
  /**
   * Show a list of all organizators.
   * GET organizators
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ params }) {
    const event = await Event.findOrFail(params.event_id)
    const organizators = event.organizators().fetch()

    return organizators
  }

  /**
   * Create/save a new organizator.
   * POST organizators
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const { event_id, entity_id } = request.only(['event_id', 'entity_id'])

    const user_logged_id = parseInt(request.header('user_logged_id'))
    const user_logged_type = request.header('user_logged_type')

    const event = await Event.findOrFail(event_id)
    const entity = await Entity.findOrFail(entity_id)

    await entity.load('participants')

    const event_participant = entity
      .toJSON()
      .participants.find(participant => participant.id === parseInt(event_id))

    if (event_participant === undefined) {
      await event.organizators().attach(entity_id)

      await event.organizators().fetch()
    } else {
      return response.status(401).send({
        title: 'Falha!',
        message: 'O usuário é de um participante inscrito'
      })
    }

    if (user_logged_id && user_logged_type) {
      await Log.create({
        action: 'create',
        model: 'organizator',
        model_id: event_id,
        description: `O organizador id ${entity_id} foi inserido no evento id ${event_id}.`,
        [`${user_logged_type}_id`]: user_logged_id
      })
    }

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
  async show ({ params, request, response, view }) {
    try {
      const defaultEvent = await DefaultEvent.findOrFail(
        params.default_event_id
      )

      const validateEmail = new ValidateEmail()
      const isEmail = await validateEmail.validate(params.cpf_email)

      const ministery_id = defaultEvent.ministery_id
      const organizator_hierarchy_id = defaultEvent.organizator_hierarchy_id
      const assistant_hierarchy_id = defaultEvent.assistant_hierarchy_id
      const sex_type = defaultEvent.sex_type
      const organizator_type = params.organizator_type

      const organizator = isEmail ? await Entity.findByOrFail('email', params.cpf_email) : await Entity.findByOrFail('cpf', params.cpf_email)

      await organizator.loadMany([
        'file',
        'families',
        'organizators.defaultEvent.ministery',
        'participants.defaultEvent.ministery',
        'creditCards',
        'addresses',
        'checkouts',
        'checkoutItems'
      ])

      if (organizator.sex === sex_type || sex_type === 'A') {
        if (ministery_id === 1) {
          if (organizator_type === 'leader') {
            if (organizator.cmn_hierarchy_id >= organizator_hierarchy_id) {
              return organizator
            } else {
              return response.status(200).send({
                error: {
                  title: 'Aviso!',
                  message: 'O usuário informado não é um líder válido'
                }
              })
            }
          } else if (organizator_type === 'training_leader') {
            if (organizator.cmn_hierarchy_id >= assistant_hierarchy_id) {
              return organizator
            } else {
              return response.status(200).send({
                error: {
                  title: 'Aviso!',
                  message: 'O usuário informado não pode ser assistente'
                }
              })
            }
          }
        }
        if (ministery_id === 2) {
          if (organizator_type === 'leader') {
            if (organizator.mu_hierarchy_id >= organizator_hierarchy_id) {
              return organizator
            } else {
              return response.status(200).send({
                error: {
                  title: 'Aviso!',
                  message: 'O usuário informado não é um líder válido'
                }
              })
            }
          } else if (organizator_type === 'training_leader') {
            if (organizator.mu_hierarchy_id >= assistant_hierarchy_id) {
              return organizator
            } else {
              return response.status(200).send({
                error: {
                  title: 'Aviso!',
                  message: 'O usuário informado não pode ser assistente'
                }
              })
            }
          }
        }
        if (ministery_id === 3) {
          if (organizator_type === 'leader') {
            if (organizator.crown_hierarchy_id >= organizator_hierarchy_id) {
              return organizator
            } else {
              return response.status(200).send({
                error: {
                  title: 'Aviso!',
                  message: 'O usuário informado não é um líder válido'
                }
              })
            }
          } else if (organizator_type === 'training_leader') {
            if (organizator.crown_hierarchy_id >= assistant_hierarchy_id) {
              return organizator
            } else {
              return response.status(200).send({
                error: {
                  title: 'Aviso!',
                  message: 'O usuário informado não pode ser assistente'
                }
              })
            }
          }
        }
        if (ministery_id === 4) {
          if (organizator_type === 'leader') {
            if (organizator.mp_hierarchy_id >= organizator_hierarchy_id) {
              return organizator
            } else {
              return response.status(200).send({
                error: {
                  title: 'Aviso!',
                  message: 'O usuário informado não é um líder válido'
                }
              })
            }
          } else if (organizator_type === 'training_leader') {
            if (organizator.mp_hierarchy_id >= assistant_hierarchy_id) {
              return organizator
            } else {
              return response.status(200).send({
                error: {
                  title: 'Aviso!',
                  message: 'O usuário informado não pode ser assistente'
                }
              })
            }
          }
        }
        if (ministery_id === 5) {
          if (organizator_type === 'leader') {
            if (organizator.ffi_hierarchy_id >= organizator_hierarchy_id) {
              return organizator
            } else {
              return response.status(200).send({
                error: {
                  title: 'Aviso!',
                  message: 'O usuário informado não é um líder válido'
                }
              })
            }
          } else if (organizator_type === 'training_leader') {
            if (organizator.ffi_hierarchy_id >= assistant_hierarchy_id) {
              return organizator
            } else {
              return response.status(200).send({
                error: {
                  title: 'Aviso!',
                  message: 'O usuário informado não pode ser assistente'
                }
              })
            }
          }
        }
        if (ministery_id === 6) {
          if (organizator_type === 'leader') {
            if (organizator.gfi_hierarchy_id >= organizator_hierarchy_id) {
              return organizator
            } else {
              return response.status(200).send({
                error: {
                  title: 'Aviso!',
                  message: 'O usuário informado não é um líder válido'
                }
              })
            }
          } else if (organizator_type === 'training_leader') {
            if (organizator.gfi_hierarchy_id >= assistant_hierarchy_id) {
              return organizator
            } else {
              return response.status(200).send({
                error: {
                  title: 'Aviso!',
                  message: 'O usuário informado não pode ser assistente'
                }
              })
            }
          }
        }
        if (ministery_id === 7) {
          if (organizator_type === 'leader') {
            if (organizator.pg_hab_hierarchy_id >= organizator_hierarchy_id) {
              return organizator
            } else {
              return response.status(200).send({
                error: {
                  title: 'Aviso!',
                  message: 'O usuário informado não é um líder válido'
                }
              })
            }
          } else if (organizator_type === 'training_leader') {
            if (organizator.pg_hab_hierarchy_id >= assistant_hierarchy_id) {
              return organizator
            } else {
              return response.status(200).send({
                error: {
                  title: 'Aviso!',
                  message: 'O usuário informado não pode ser assistente'
                }
              })
            }
          }
        }
        if (ministery_id === 8) {
          if (organizator_type === 'leader') {
            if (organizator.pg_yes_hierarchy_id >= organizator_hierarchy_id) {
              return organizator
            } else {
              return response.status(200).send({
                error: {
                  title: 'Aviso!',
                  message: 'O usuário informado não é um líder válido'
                }
              })
            }
          } else if (organizator_type === 'training_leader') {
            if (organizator.pg_yes_hierarchy_id >= assistant_hierarchy_id) {
              return organizator
            } else {
              return response.status(200).send({
                error: {
                  title: 'Aviso!',
                  message: 'O usuário informado não pode ser assistente'
                }
              })
            }
          }
        }
      } else {
        if (sex_type === 'M') {
          return response.status(200).send({
            error: {
              title: 'Aviso!',
              message: 'Evento exclusivo para o sexo masculino.'
            }
          })
        } else {
          return response.status(200).send({
            error: {
              title: 'Aviso!',
              message: 'Evento exclusivo para o sexo feminino.'
            }
          })
        }
      }
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: 'Falha!',
          message: 'Nenhum líder ou líder em treinamento foi encontrado.'
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
      // const { event_id } = request.only(["event_id"]);
      const entity_id = params.entity_id
      const event_id = params.event_id

      const user_logged_id = parseInt(request.header('user_logged_id'))
      const user_logged_type = request.header('user_logged_type')

      const event = await Event.findOrFail(event_id)

      await event.organizators().detach(entity_id)
      await event.organizators().fetch()

      if (user_logged_id && user_logged_type) {
        await Log.create({
          action: 'delete',
          model: 'organizator',
          model_id: event_id,
          description: `O organizador id ${entity_id} foi removido do evento id ${event_id}.`,
          [`${user_logged_type}_id`]: user_logged_id
        })
      }

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

module.exports = EventOrganizatorController
