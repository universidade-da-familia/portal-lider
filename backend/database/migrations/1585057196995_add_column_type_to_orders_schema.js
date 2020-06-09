'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnTypeToOrdersSchema extends Schema {
  up () {
    this.table('orders', (table) => {
      // alter table
      table.string('type', 80)
    })
  }

  down () {
    this.table('orders', (table) => {
      // reverse alternations
      table.dropColumn('type')
    })
  }
}

module.exports = AddColumnTypeToOrdersSchema
