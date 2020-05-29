'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Product = use('App/Models/Product')

class ProductController {
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
    const products = await Product.query()
      .with('kits')
      .fetch()

    return products
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
    try {
      const data = request.only([
        'name',
        'group_price',
        'training_price',
        'seminary_price',
        'netsuite_id',
        'weight',
        'width',
        'height',
        'length',
        'sku_id',
        'product_category'
      ])

      const product = await Product.create(data)

      return product
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: 'Falha!',
          message: 'Tente cadastrar novamente'
        }
      })
    }
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
    const product = await Product.findOrFail(params.id)

    await product.load('kits')

    return product
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
      const data = request.only([
        'name',
        'group_price',
        'training_price',
        'seminary_price',
        'netsuite_id',
        'weight',
        'width',
        'height',
        'length',
        'sku_id',
        'product_category'
      ])

      const product = await Product.findOrFail(params.id)

      product.merge(data)

      await product.save()

      return product
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
      const product = await Product.findOrFail(params.id)

      await product.delete()

      return response.status(200).send({
        title: 'Sucesso!',
        message: 'O produto foi removido.'
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

module.exports = ProductController
