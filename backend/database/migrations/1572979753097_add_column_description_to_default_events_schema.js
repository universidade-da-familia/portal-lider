"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddColumnDescriptionToDefaultEventsSchema extends Schema {
  up() {
    this.table("default_events", table => {
      table.text("description");
    });
  }

  down() {
    this.table("default_events", table => {
      table.dropColumn("description");
    });
  }
}

module.exports = AddColumnDescriptionToDefaultEventsSchema;
