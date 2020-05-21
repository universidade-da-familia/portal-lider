'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use('Database')
const PaymentPlan = use('App/Models/PaymentPlan')

/**
 * Resourceful controller for interacting with paymentplans
 */
class PaymentPlanController {
  /**
   * Show a list of all paymentplans.
   * GET paymentplans
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Create/save a new paymentplan.
   * POST paymentplans
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      const { payment_plans } = request.only(['payment_plans'])

      const trx = await Database.beginTransaction()

      await PaymentPlan.createMany(payment_plans, trx)

      trx.commit()

      return response.status(200).send({
        title: 'Sucesso!',
        message: 'Seus planos de pagamentos foram criados com sucesso.'
      })
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: 'Falha!',
          message: 'Erro ao criar os planos de pagamento'
        }
      })
    }
  }

  /**
   * Display a single paymentplan.
   * GET paymentplans/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing paymentplan.
   * GET paymentplans/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update paymentplan details.
   * PUT or PATCH paymentplans/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a paymentplan with id.
   * DELETE paymentplans/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = PaymentPlanController
