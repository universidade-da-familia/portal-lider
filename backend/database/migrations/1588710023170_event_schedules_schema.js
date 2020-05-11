'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventSchedulesSchema extends Schema {
  up () {
    this.create('event_schedules', (table) => {
      table.increments()
      table
        .integer('event_id')
        .unsigned()
        .references('id')
        .inTable('events')
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("default_event_schedule_id")
        .unsigned()
        .references("id")
        .inTable("default_event_schedules")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.datetime("start_date").notNullable();
      table.datetime("end_date").notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('event_schedules')
  }
}

module.exports = EventSchedulesSchema
