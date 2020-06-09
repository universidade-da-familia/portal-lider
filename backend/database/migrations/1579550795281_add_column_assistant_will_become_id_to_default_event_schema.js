'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnAssistantWillBecomeIdToDefaultEventSchema extends Schema {
  up () {
    this.table('default_events', (table) => {
      // alter table
      table.integer('assistant_will_become_id').unsigned()
    })
  }

  down () {
    this.table('default_events', (table) => {
      // reverse alternations
      table.dropColumn('assistant_will_become_id')
    })
  }
}

module.exports = AddColumnAssistantWillBecomeIdToDefaultEventSchema
