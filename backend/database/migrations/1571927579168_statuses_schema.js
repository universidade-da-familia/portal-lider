"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class StatusesSchema extends Schema {
  up() {
    this.create("statuses", table => {
      table.increments();
      table.string("name", 254).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("statuses");
  }
}

module.exports = StatusesSchema;
