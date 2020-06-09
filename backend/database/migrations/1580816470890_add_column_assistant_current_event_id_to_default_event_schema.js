'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnAssistantCurrentEventIdToDefaultEventSchema extends Schema {
  up () {
    this.table('default_events', (table) => {
      // alter table
      table.integer('assistant_current_event_id').unsigned()
    })
  }

  down () {
    this.table('default_events', (table) => {
      // reverse alternations
      table.dropColumn('assistant_current_event_id')
    })
  }
}

module.exports = AddColumnAssistantCurrentEventIdToDefaultEventSchema
