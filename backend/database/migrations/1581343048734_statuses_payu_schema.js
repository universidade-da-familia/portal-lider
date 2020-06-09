'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PayuStatusesSchema extends Schema {
  up () {
    this.create('payu_statuses', (table) => {
      table.increments()
      table.string('name')
      table.string('description')
      table.timestamps()
    })
  }

  down () {
    this.dropColumn('payu_statuses')
  }
}

module.exports = PayuStatusesSchema
