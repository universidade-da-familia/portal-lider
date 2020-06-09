"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddColumnIsInscriptionsFinishedToEventsSchema extends Schema {
  up() {
    this.table("events", table => {
      // alter table
      table
        .boolean("is_inscription_finished")
        .notNullable()
        .defaultTo(false);
    });
  }

  down() {
    this.table("events", table => {
      // reverse alternations
      table.dropColumn("is_inscriptions_finished");
    });
  }
}

module.exports = AddColumnIsInscriptionsFinishedToEventsSchema;
