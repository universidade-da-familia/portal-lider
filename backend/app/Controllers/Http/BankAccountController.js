'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use('Database')
const BankAccount = use('App/Models/BankAccount')
const Entity = use('App/Models/Entity')
const Organization = use('App/Models/Organization')
// const Log = use('App/Models/Log')

/**
 * Resourceful controller for interacting with bankaccounts
 */
class BankAccountController {
  /**
   * Show a list of all bankaccounts.
   * GET bankaccounts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const bank_account = await BankAccount.query()
      .with('entity')
      .fetch()

    return bank_account
  }

  /**
   * Create/save a new bankaccount.
   * POST bankaccounts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      let user
      const { netsuite_id, user_type, bankAccountsPost, bankAccountsPut } = request.only([
        'netsuite_id',
        'user_type',
        'bankAccountsPost',
        'bankAccountsPut'
      ])

      const trx = await Database.beginTransaction()

      if (bankAccountsPost && bankAccountsPost.length > 0) {
        await BankAccount.createMany(bankAccountsPost, trx)
      }

      if (bankAccountsPut && bankAccountsPut.length > 0) {
        bankAccountsPut.map(async banks => {
          const searchBanks = await BankAccount.findOrFail(banks.id)

          searchBanks.merge(banks, trx)

          await searchBanks.save()
        })
      }

      trx.commit()

      if (user_type === 'entity') {
        user = await Entity.findByOrFail('netsuite_id', netsuite_id)
      } else {
        user = await Organization.findByOrFail('netsuite_id', netsuite_id)
      }

      await user.load('bankAccounts')

      // if (user_logged_id && user_logged_type) {
      //   await Log.create({
      //     action: 'create',
      //     model: 'address',
      //     model_id: user.id,
      //     description: `Os endereços de CEP ${ceps.join(', ')} foram criados/atualizados`,
      //     [`${user_logged_type}_id`]: user_logged_id
      //   })
      // }

      return response.status(200).send({
        title: 'Sucesso!',
        message: 'Suas contas bancárias foram atualizadas.'
      })
    } catch (err) {
      return response.status(err.status).send({
        title: 'Falha!',
        message: 'Erro ao atualizar as contas bancárias'
      })
    }
  }

  /**
   * Display a single bankaccount.
   * GET bankaccounts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, response }) {
    try {
      const bankAccount = await BankAccount.findOrFail(params.id)

      await bankAccount.loadMany(['entity', 'organization'])

      return bankAccount
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: 'Falha!',
          message: 'Erro ao mostrar a conta bancaria'
        }
      })
    }
  }

  /**
   * Update bankaccount details.
   * PUT or PATCH bankaccounts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a bankaccount with id.
   * DELETE bankaccounts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = BankAccountController
