"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CheckoutSchema extends Schema {
  up() {
    this.create("checkouts", table => {
      table.increments();
      table
        .integer("entity_id")
        .unsigned()
        .references("id")
        .inTable("entities")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table
        .integer("organization_id")
        .unsigned()
        .references("id")
        .inTable("organizations")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table
        .float("total")
        .unsigned()
        .notNullable();
      table
        .float("tax")
        .unsigned()
        .notNullable();
      table.boolean("current").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("checkouts");
  }
}

module.exports = CheckoutSchema;
