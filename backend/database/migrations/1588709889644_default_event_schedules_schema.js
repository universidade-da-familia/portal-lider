'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DefaultEventSchedulesSchema extends Schema {
  up () {
    this.create('default_event_schedules', (table) => {
      table.increments()
      table
        .integer("default_event_id")
        .unsigned()
        .references("id")
        .inTable("default_events")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string('name', 254).notNullable()
      table.integer('duration').unsigned().notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('default_event_schedules')
  }
}

module.exports = DefaultEventSchedulesSchema
