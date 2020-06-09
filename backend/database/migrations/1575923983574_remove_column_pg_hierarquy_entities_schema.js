"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class RemoveColumnPgHierarquyEntitiesSchema extends Schema {
  up() {
    this.table("entities", table => {
      // alter table
      table.dropColumn("pg_hierarchy_id");
      table
        .integer("pg_hab_hierarchy_id")
        .unsigned()
        .defaultTo(0);
      table
        .integer("pg_yes_hierarchy_id")
        .unsigned()
        .defaultTo(0);
    });
  }

  down() {
    this.table("entities", table => {
      // reverse alternations
      table.dropColumn("pg_hab_hierarchy_id");
      table.dropColumn("pg_yes_hierarchy_id");
    });
  }
}

module.exports = RemoveColumnPgHierarquyEntitiesSchema;
