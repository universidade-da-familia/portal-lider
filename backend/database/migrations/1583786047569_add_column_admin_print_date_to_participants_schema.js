'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnAdminPrintDateToParticipantsSchema extends Schema {
  up () {
    this.table('participants', (table) => {
      // alter table
      table.datetime('print_date')
    })
  }

  down () {
    this.table('participants', (table) => {
      // reverse alternations
      table.dropColumn('print_date')
    })
  }
}

module.exports = AddColumnAdminPrintDateToParticipantsSchema
