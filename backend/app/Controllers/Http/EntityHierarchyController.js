'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Entity = use('App/Models/Entity')
const LessonReport = use('App/Models/LessonReport')
const Attendance = use('App/Models/Attendance')
const Event = use('App/Models/Event')

/**
 * Resourceful controller for interacting with entityhierarchies
 */
class EntityHierarchyController {
  /**
   * Show a list of all entityhierarchies.
   * GET entityhierarchies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response }) {}

  /**
   * Render a form to be used for creating a new entityhierarchy.
   * GET entityhierarchies/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response }) {}

  /**
   * Create/save a new entityhierarchy.
   * POST entityhierarchies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {}

  /**
   * Display a single entityhierarchy.
   * GET entityhierarchies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response }) {}

  /**
   * Render a form to update an existing entityhierarchy.
   * GET entityhierarchies/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response }) {}

  /**
   * Update entityhierarchy details.
   * PUT or PATCH entityhierarchies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const { participantsId, assistantsId, hierarchyName, participantWillBecome, assistantWillBecome } = request.only([
      'participantsId',
      'assistantsId',
      'hierarchyName',
      'participantWillBecome',
      'assistantWillBecome'
    ])

    const event = await Event.findOrFail(params.event_id)
    await event.load('defaultEvent')

    const lessonReportsId = await LessonReport.query()
      .select('id')
      .where('event_id', params.event_id)
      .pluck('id')

    const attendances = await Attendance.query()
      .whereIn('lesson_report_id', lessonReportsId)
      .with('participant')
      .fetch()

    let countParticipant = 0
    let countAssistant = 0

    const approvedParticipants = participantsId.filter(entity => {
      countParticipant = 0

      attendances.toJSON().map(attendance => {
        if (attendance.participant.entity_id === entity) {
          if (!attendance.is_present) {
            countParticipant += 1
          }
        }
      })

      if (countParticipant <= event.toJSON().defaultEvent.max_faults) {
        return entity
      }
    })

    const approvedAssistants = assistantsId.filter(entity => {
      countAssistant = 0

      attendances.toJSON().map(attendance => {
        if (attendance.participant.entity_id === entity) {
          if (!attendance.is_present) {
            countAssistant += 1
          }
        }
      })

      if (countAssistant <= event.toJSON().defaultEvent.max_faults) {
        return entity
      }
    })

    await Entity.updateHierarchy(approvedParticipants, hierarchyName, participantWillBecome)
    await Entity.updateHierarchy(approvedAssistants, hierarchyName, assistantWillBecome)

    return response.status(200).send({
      title: 'Sucesso!',
      message: 'Hierarquias atualizadas'
    })
  }

  /**
   * Delete a entityhierarchy with id.
   * DELETE entityhierarchies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {}
}

module.exports = EntityHierarchyController
