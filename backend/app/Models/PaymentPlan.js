'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PaymentPlan extends Model {
  events () {
    return this.belongsTo('App/Models/Event')
  }
}

module.exports = PaymentPlan
