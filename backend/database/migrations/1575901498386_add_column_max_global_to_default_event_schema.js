'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnMaxGlobalToDefaultEventSchema extends Schema {
  up () {
    this.table('default_events', table => {
      // alter table
      table.integer('max_global_inscriptions').unsigned()
    })
  }

  down () {
    this.table('default_events', table => {
      // reverse alternations
      table.dropColumn('max_global_inscriptions')
    })
  }
}

module.exports = AddColumnMaxGlobalToDefaultEventSchema
