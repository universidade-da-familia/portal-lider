"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EntityFamiliesSchema extends Schema {
  up() {
    this.create("entity_families", table => {
      table.increments();
      table
        .integer("entity_id")
        .unsigned()
        .references("id")
        .inTable("entities")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("family_id")
        .unsigned()
        .references("id")
        .inTable("families")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("relationship", 50).notNullable();
      table.unique(["entity_id", "family_id"]);
      table.timestamps();
    });
  }

  down() {
    this.drop("entity_families");
  }
}

module.exports = EntityFamiliesSchema;
