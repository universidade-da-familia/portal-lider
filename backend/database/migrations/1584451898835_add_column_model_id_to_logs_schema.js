'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnModelIdToLogsSchema extends Schema {
  up () {
    this.table('logs', (table) => {
      // alter table
      table.integer('model_id').unsigned()
    })
  }

  down () {
    this.table('logs', (table) => {
      // reverse alternations
      table.dropColumn('model_id')
    })
  }
}

module.exports = AddColumnModelIdToLogsSchema
