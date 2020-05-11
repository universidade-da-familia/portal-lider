'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventRulesSchema extends Schema {
  up () {
    this.create('event_rules', (table) => {
      table.increments()
      table
        .integer('event_id')
        .unsigned()
        .references('id')
        .inTable('events')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('type', 254).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('event_rules')
  }
}

module.exports = EventRulesSchema
