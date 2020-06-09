'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnExtraParticipantsToEventsSchema extends Schema {
  up () {
    this.table('events', (table) => {
      // alter table
      table.integer('extra_participants').unsigned().defaultTo(0)
    })
  }

  down () {
    this.table('events', (table) => {
      // reverse alternations
      table.dropColumn('extra_participants')
    })
  }
}

module.exports = AddColumnExtraParticipantsToEventsSchema
