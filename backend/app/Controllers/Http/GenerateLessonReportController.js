'use strict'

const Event = use('App/Models/Event')
const LessonReport = use('App/Models/LessonReport')

class GenerateLessonReportController {
  /**
   * Create/save a new event.
   * POST events
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ response }) {
    try {
      const events = await Event.query()
        .with('defaultEvent.lessons')
        .where('is_finished', false)
        .andWhere('created_at', '<', '2020-02-04')
        .fetch()

      events.toJSON().map(async event => {
        const lessons = event.defaultEvent.lessons.map(lesson => {
          return {
            event_id: event.id,
            lesson_id: lesson.id,
            offer: 0,
            date: null,
            testimony: null,
            doubts: null,
            is_finished: false
          }
        })

        await LessonReport.createMany(lessons)
      })

      return {
        title: 'Ok',
        message: 'Lesson reports gerada com sucesso'
      }
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: 'Falha!',
          message: 'Erro ao criar lesson reports'
        }
      })
    }
  }
}

module.exports = GenerateLessonReportController
