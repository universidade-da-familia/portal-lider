'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrganizatorsSchema extends Schema {
  up () {
    this.create('organizators', (table) => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("event_id")
        .unsigned()
        .references("id")
        .inTable("events")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.unique(["user_id", "event_id"]);
      table.timestamps();
    })
  }

  down () {
    this.drop('organizators')
  }
}

module.exports = OrganizatorsSchema
