'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnIsAdminPrintedToEventsSchema extends Schema {
  up () {
    this.table('events', table => {
      // alter table
      table
        .boolean('is_admin_printed')
        .notNullable()
        .defaultTo(false)
    })
  }

  down () {
    this.table('events', table => {
      // reverse alternations
      table.dropColumn('is_admin_printed')
    })
  }
}

module.exports = AddColumnIsAdminPrintedToEventsSchema
