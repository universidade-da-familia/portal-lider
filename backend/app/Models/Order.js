'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
  status () {
    return this.belongsTo('App/Models/Status')
  }

  coupon () {
    return this.belongsTo('App/Models/Coupon')
  }

  organization () {
    return this.belongsTo('App/Models/Organization')
  }

  entity () {
    return this.belongsTo('App/Models/Entity')
  }

  products () {
    return this.belongsToMany('App/Models/Product')
      .pivotTable('order_products')
      .withPivot(['quantity'])
      .withTimestamps()
  }

  transaction () {
    return this.hasOne('App/Models/OrderTransaction')
  }
}

module.exports = Order
