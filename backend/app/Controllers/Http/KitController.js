'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Kit = use('App/Models/Kit')

class KitController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const kits = await Kit.query()
      .with('products')
      .fetch()

    return kits
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const { name, products } = request.only(['name', 'products'])

    const kit = await Kit.create({ name })

    if (products && products.length > 0) {
      await kit.products().attach(products)

      kit.products = await kit.products().fetch()
    }

    return kit
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const kit = await Kit.findOrFail(params.id)

    await kit.load('products')

    return kit
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {
      const { name, products } = request.only(['name', 'products'])

      const kit = await Kit.findOrFail(params.id)

      kit.name = name || kit.name

      await kit.save()

      if (products && products.length > 0) {
        await kit.products().detach()
        await kit.products().attach(products)

        kit.products = await kit.products().fetch()
      }

      return kit
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: 'Falha!',
          message: 'Tente atualizar novamente'
        }
      })
    }
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    try {
      const kit = await Kit.findOrFail(params.id)

      await kit.delete()

      return response.status(200).send({
        title: 'Sucesso!',
        message: 'O kit foi removido.'
      })
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: 'Falha!',
          message: 'Tente remover novamente'
        }
      })
    }
  }
}

module.exports = KitController
