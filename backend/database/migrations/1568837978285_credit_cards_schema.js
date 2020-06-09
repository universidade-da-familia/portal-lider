"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CreditCardsSchema extends Schema {
  up() {
    this.create("credit_cards", table => {
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
      table.string("card_id").notNullable();
      table.string("number").notNullable();
      table.string("holder_name").notNullable();
      table.string("brand").notNullable();
      table.string("expiration_date").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("credit_cards");
  }
}

module.exports = CreditCardsSchema;
