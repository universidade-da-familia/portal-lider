"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CheckoutItemsSchema extends Schema {
  up() {
    this.create("checkout_items", table => {
      table.increments();
      table
        .integer("checkout_id")
        .unsigned()
        .references("id")
        .inTable("checkouts")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table
        .integer("entity_id")
        .unsigned()
        .references("id")
        .inTable("entities")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table
        .integer("event_id")
        .unsigned()
        .references("id")
        .inTable("events")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table.integer("quantity");
      table.float("total").unsigned();
      table.timestamps();
    });
  }

  down() {
    this.drop("checkout_items");
  }
}

module.exports = CheckoutItemsSchema;
