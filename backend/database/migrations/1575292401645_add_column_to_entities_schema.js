"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddColumnToEntitiesSchema extends Schema {
  up() {
    this.table("entities", table => {
      table
        .integer("organization_id")
        .unsigned()
        .references("id")
        .inTable("organizations")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
  }

  down() {
    this.table("entities", table => {
      // reverse alternations
      table.dropColumn("organization_id");
    });
  }
}

module.exports = AddColumnToEntitiesSchema;
