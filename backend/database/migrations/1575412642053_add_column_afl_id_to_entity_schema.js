"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddColumnAflIdToEntitySchema extends Schema {
  up() {
    this.table("entities", table => {
      // alter table
      table.integer("afl_id").unsigned();
    });
  }

  down() {
    this.table("entities", table => {
      // reverse alternations
      table.dropColumn("afl_id");
    });
  }
}

module.exports = AddColumnAflIdToEntitySchema;
