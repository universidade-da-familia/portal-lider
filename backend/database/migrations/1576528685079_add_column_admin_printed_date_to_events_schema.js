'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnAdminPrintedDateToEventsSchema extends Schema {
  up () {
    this.table('events', table => {
      // alter table
      table.datetime('admin_print_date')
      table
        .integer('admin_print_id')
        .references('id')
        .inTable('entities')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
    })
  }

  down () {
    this.table('events', table => {
      // reverse alternations
      table.dropColumn('admin_print_date')
      table.dropColumn('admin_print_id')
    })
  }
}

module.exports = AddColumnAdminPrintedDateToEventsSchema
