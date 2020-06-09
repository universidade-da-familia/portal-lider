'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class BankAccount extends Model {
  entity () {
    return this.belongsTo('App/Models/Entity')
  }

  organization () {
    return this.belongsTo('App/Models/Organization')
  }
}

module.exports = BankAccount
