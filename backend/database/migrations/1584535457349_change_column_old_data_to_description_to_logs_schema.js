'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChangeColumnOldDataToDescriptionToLogsSchema extends Schema {
  up () {
    this.table('logs', (table) => {
      // alter table
      table.dropColumn('old_data')
      table.string('description', 254)
    })
  }

  down () {
    this.table('logs', (table) => {
      // reverse alternations
      table.dropColumn('description')
    })
  }
}

module.exports = ChangeColumnOldDataToDescriptionToLogsSchema
