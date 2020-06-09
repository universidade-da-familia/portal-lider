"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class RelationshipsSchema extends Schema {
  up() {
    this.create("relationships", table => {
      table.increments();
      table
        .integer("entity_id")
        .unsigned()
        .references("id")
        .inTable("entities")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("relationship_id")
        .unsigned()
        .references("id")
        .inTable("entities")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("relationship_type", 254).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("relationships");
  }
}

module.exports = RelationshipsSchema;
