"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ResponsiblesSchema extends Schema {
  up() {
    this.create("entity_organizations", table => {
      table.increments();
      table
        .integer("entity_id")
        .unsigned()
        .references("id")
        .inTable("entities")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("organization_id")
        .unsigned()
        .references("id")
        .inTable("organizations")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("role", 254).notNullable();
      table.boolean("can_checkout").notNullable();
      table.unique(["entity_id", "organization_id"]);
      table.timestamps();
    });
  }

  down() {
    this.drop("entity_organizations");
  }
}

module.exports = ResponsiblesSchema;
