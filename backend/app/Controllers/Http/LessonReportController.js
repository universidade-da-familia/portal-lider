'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const LessonReport = use('App/Models/LessonReport')
const Log = use('App/Models/Log')

const Kue = use('Kue')
const Job = use('App/Jobs/SendLessonReport')

/**
 * Resourceful controller for interacting with lessons
 */
class LessonReportController {
  /**
   * Show a list of all lessons.
   * GET lessons
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ params }) {
    const lessonReport = await LessonReport.query()
      .where('event_id', params.event_id)
      .with('lesson')
      .with('event.participants')
      .with('attendances')
      .fetch()

    return lessonReport
  }

  /**
   * Display a single lesson.
   * GET lessons/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const lessonReport = await LessonReport.findOrFail(params.id)

    await lessonReport.loadMany([
      'event.participants',
      'lesson',
      'attendances'
    ])

    return lessonReport
  }

  /**
   * Update lesson details.
   * PUT or PATCH lessons/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {
      const data = request.all()

      const { participants, offer, date, pray_request } = data

      const user_logged_id = parseInt(request.header('user_logged_id'))
      const user_logged_type = request.header('user_logged_type')

      const lessonReport = await LessonReport.findOrFail(params.id)
      await lessonReport.loadMany([
        'event.defaultEvent.ministery',
        'lesson',
        'event.organizators'
      ])

      lessonReport.date = date || lessonReport.date
      lessonReport.offer = offer
      lessonReport.pray_request = pray_request
      lessonReport.is_finished = true

      await lessonReport.save()

      Kue.dispatch(Job.key, lessonReport, { attempts: 5 })

      if (participants && participants.length > 0) {
        participants.map(async participant => {
          await lessonReport.attendances().detach([participant.id])

          await lessonReport.attendances().attach([participant.id], row => {
            row.is_present = participant.is_present
          })
        })
      }

      if (user_logged_id && user_logged_type) {
        await Log.create({
          action: 'update',
          model: 'lesson_report',
          model_id: lessonReport.event_id,
          description: `O relatório id ${lessonReport.lesson_id} foi atualizado no evento id ${lessonReport.event_id}.`,
          new_data: {
            id: lessonReport.id,
            event_id: lessonReport.event_id,
            date,
            offer,
            pray_request,
            participants
          },
          [`${user_logged_type}_id`]: user_logged_id
        })
      }

      return response.status(200).send({
        title: 'Sucesso!',
        message: 'O relatório foi enviado corretamente.'
      })
    } catch (err) {
      return response.status(err.status).send({
        title: 'Falha!',
        message: 'Erro ao atualizar o relatório.'
      })
    }
  }
}

module.exports = LessonReportController
