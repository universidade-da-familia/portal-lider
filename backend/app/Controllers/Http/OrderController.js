'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use('Database')

const Order = use('App/Models/Order')
const Entity = use('App/Models/Entity')
const Log = use('App/Models/Log')

const Kue = use('Kue')
const Job = use('App/Jobs/CreateOrder')

const axios = require('axios')

const api = axios.default.create({
  baseURL: 'https://api.payulatam.com',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

class OrderController {
  /**
   * Show a list of all orders.
   * GET orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const order = Order.query().fetch()

    return order
  }

  /**
   * Create/save a new order.
   * POST orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      let address = null
      const data = request.all()
      const {
        user,
        card,
        products,
        shipping_address,
        shipping_option,
        order_details,
        payu
      } = data

      console.log('Comecei a gerar o pedido no portal')

      const entity = await Entity.findOrFail(user.id)

      if (shipping_address.type === 'other') {
        address = await entity.addresses().create({
          entity_id: entity.id,
          type: shipping_address.address_type,
          other_type_name: shipping_address.address_other_type_name,
          cep: shipping_address.cep,
          city: shipping_address.city,
          uf: shipping_address.uf,
          country: 'Brasil',
          street: shipping_address.street,
          street_number: shipping_address.street_number,
          neighborhood: shipping_address.neighborhood,
          complement: shipping_address.complement,
          receiver: shipping_address.receiver
        })
      }

      await entity.load('addresses')

      const trx = await Database.beginTransaction()

      const order = await Order.create({
        status_id: 1,
        entity_id: user.id,
        type: order_details.order_type,
        payment_name: card === null ? 'Boleto' : 'Cartão de crédito',
        shipping_name: shipping_option.delivery_method_name,
        delivery_estimate_days:
          shipping_option.delivery_estimate_business_days,
        shipping_cost: order_details.shipping_amount,
        total: order_details.amount,
        shipping_cep: shipping_address.cep,
        shipping_uf: shipping_address.uf,
        shipping_city: shipping_address.city,
        shipping_street: shipping_address.street,
        shipping_street_number: shipping_address.street_number,
        shipping_neighborhood: shipping_address.neighborhood,
        shipping_complement: shipping_address.complement,
        shipping_receiver: shipping_address.receiver
      }, trx)

      await order.products().attach(
        products.map(product => product.id),
        row => {
          const product = products.find(
            product => product.id === row.product_id
          )

          row.quantity = product.quantity
          row.total = product.cost_of_goods * product.quantity
        }, trx
      )

      const { data: payuData } = await api.post(
        '/payments-api/4.0/service.cgi',
        payu
      )

      console.log(`--------ENTIDADE: ${entity.id} PAGAMENTO---------`)
      console.log(payuData.transactionResponse)

      if (card !== null) {
        if (payuData.transactionResponse.state !== 'APPROVED' &&
            payuData.transactionResponse.state !== 'PENDING_TRANSACTION_CONFIRMATION' &&
            payuData.transactionResponse.state !== 'PENDING') {
          console.log('--------PAGAMENTO COM ERRO 400---------')
          console.log(payuData.transactionResponse.state)
          console.log(typeof payuData.transactionResponse.state)

          return response.status(400).send({
            title: 'Falha!',
            message: 'Houve um problema com o pagamento na Payu.',
            payu: payuData.transactionResponse.state
          })
        }

        if (payuData.transactionResponse.state === 'APPROVED') {
          order.status_id = 2 || order.status_id

          await order.save()
        }
      }

      const transaction = await order.transaction().create({
        order_id: order.id,
        transaction_id: payuData.transactionResponse.transactionId,
        api_order_id: payuData.transactionResponse.orderId,
        status: payuData.transactionResponse.state,
        boleto_url:
              card === null
                ? payuData.transactionResponse.extraParameters
                  .URL_PAYMENT_RECEIPT_HTML
                : null
      }, trx)

      trx.commit()

      order.products = await order.products().fetch()
      order.transaction = transaction || order.transaction

      const gifts = []

      products.map(product => {
        if (product.cost_of_goods === 0) {
          gifts.push(`${product.quantity} ${product.name}\n`)
        }
      })

      const orderNetsuite = {
        entity: user,
        order_type: order_details.order_type,
        products: products.filter(product => {
          if (product.cost_of_goods > 0) {
            const product_subtotal = parseInt(product.quantity) * product.cost_of_goods
            const product_subtotal_percent = product_subtotal / order_details.subtotal

            product.freight_per_item = product_subtotal_percent * order_details.shipping_amount

            return product
          }
        }),
        gifts: gifts.join(''),
        card,
        installments:
            card !== null
              ? payu.transaction.extraParameters.INSTALLMENTS_NUMBER
              : 1,
        payu_json: JSON.stringify([payuData]),
        payu_order_id: payuData.transactionResponse.orderId,
        payu_order_status: payuData.transactionResponse.state,
        payu_link_payment: payuData.transactionResponse.extraParameters
          .URL_PAYMENT_RECEIPT_HTML,
        shipping_cost: order_details.shipping_amount,
        netsuiteAddresses: entity.toJSON().addresses,
        is_new_address: shipping_address.type === 'other',
        address_id: address ? address.id : shipping_address.type,
        shipping_type: shipping_address.address_type,
        shipping_other_type_name: shipping_address.address_other_type_name,
        shipping_cep: shipping_address.cep,
        shipping_uf: shipping_address.uf,
        shipping_city: shipping_address.city,
        shipping_street: shipping_address.street,
        shipping_street_number: shipping_address.street_number,
        shipping_neighborhood: shipping_address.neighborhood,
        shipping_complement: shipping_address.complement,
        shipping_receiver: shipping_address.receiver,
        shipping_option
      }

      if (
        card !== null &&
        (payuData.transactionResponse.state === 'PENDING_TRANSACTION_CONFIRMATION' ||
          payuData.transactionResponse.state === 'PENDING')
      ) {
        console.log('Pedido com cartão: pagamento pendente na payu.')

        orderNetsuite.orderstatus = 'A'
        orderNetsuite.origstatus = 'A'
        orderNetsuite.statusRef = 'pendingApproval'
        orderNetsuite.payu_json = 'Pagamento pendente: cartão de crédito.'
      }

      console.log('Terminei de gerar o pedido e enviei para a fila.')

      Kue.dispatch(Job.key, { orderNetsuite, order_id: order.id }, {
        attempts: 5,
        priority: 'high'
      })

      return order
    } catch (err) {
      console.log('Falha ao gerar um pedido')
      console.log(err)
      return response.status(err.status).send({
        title: 'Falha!',
        message: 'Erro ao criar o pedido.'
      })
    }
  }

  /**
   * Display a single order.
   * GET orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, response }) {
    try {
      const order = await Order.findOrFail(params.id)

      await order.loadMany([
        'status',
        'transaction',
        'organization',
        'entity',
        'products'
      ])

      return order
    } catch (err) {
      return response.status(err.order).send({
        error: {
          title: 'Falha!',
          message: 'Nenhum pedido encontrado.'
        }
      })
    }
  }

  /**
   * Update order details.
   * PUT or PATCH orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {
      const data = request.all()

      const user_logged_id = parseInt(request.header('user_logged_id'))
      const user_logged_type = request.header('user_logged_type')

      const order = await Order.findOrFail(params.id)

      await Log.create({
        action: 'update',
        model: 'order',
        model_id: order.id,
        description: `O pedido id ${order.id} foi atualizado.`,
        new_data: data,
        [`${user_logged_type}_id`]: user_logged_id
      })

      order.merge(data)

      await order.save()

      return order
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: 'Falha!',
          message: 'Erro ao atualizar o pedido'
        }
      })
    }
  }

  /**
   * Delete a order with id.
   * DELETE orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const user_logged_id = parseInt(request.header('user_logged_id'))
      const user_logged_type = request.header('user_logged_type')

      const order = await Order.findOrFail(params.id)

      await Log.create({
        action: 'delete',
        model: 'order',
        model_id: order.id,
        description: `O pedido id ${order.id} foi deletado.`,
        [`${user_logged_type}_id`]: user_logged_id
      })

      await order.delete()

      return response.status(200).send({
        title: 'Sucesso!',
        message: 'O pedido foi removido.'
      })
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: 'Falha!',
          message: 'Erro ao excluir o pedido'
        }
      })
    }
  }

  /**
   * Delete a order with id.
   * DELETE orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy_netsuite ({ params, request, response }) {
    try {
      const netsuite_id = params.netsuite_id
      const username = params.username.replace(/%20/g, ' ')

      const order = await Order.findByOrFail('netsuite_id', netsuite_id)

      await Log.create({
        action: 'update',
        model: 'order',
        model_id: order.id,
        description: `O pedido id ${order.id} foi cancelado pelo usuário ${username}.`
      })

      order.status_id = 10

      await order.save()

      console.log(`O pedido id: ${order.id} FOI CANCELADO`)

      return response.status(200).send({
        title: 'Sucesso!',
        message: 'O pedido foi cancelado.'
      })
    } catch (err) {
      console.log('Falha ao cancelar o pedido')
      return response.status(err.status).send({
        error: {
          title: 'Falha!',
          message: 'Erro ao excluir o pedido'
        }
      })
    }
  }
}

module.exports = OrderController
