"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProgrammationsSchema extends Schema {
  up() {
    this.create("programmations", table => {
      table.increments();
      table
        .integer("event_id")
        .unsigned()
        .references("id")
        .inTable("events")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("title").notNullable();
      table.string("description");
      table.date("date").notNullable();
      table.time("start_time").notNullable();
      table.time("end_time").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("programmations");
  }
}

module.exports = ProgrammationsSchema;
