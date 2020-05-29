'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Log = use('App/Models/Log')

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
  async index ({ request, response }) {
    try {
      const { models, requesting_id } = request.only(['models', 'requesting_id'])

      const logs = await Log.query()
        .with('entity')
        .with('organization')
        .whereIn('model', models)
        .andWhere('model_id', requesting_id)
        .orderBy('created_at', 'desc')
        .fetch()

      return logs
    } catch (err) {
      return response.status(err.status).send({
        title: 'Falha!',
        message: 'Houve um erro ao consultar os logs.'
      })
    }
  }

  /**
   * Render a form to be used for creating a new log.
   * GET logs/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new log.
   * POST logs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single log.
   * GET logs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing log.
   * GET logs/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update log details.
   * PUT or PATCH logs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a log with id.
   * DELETE logs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = LogController
