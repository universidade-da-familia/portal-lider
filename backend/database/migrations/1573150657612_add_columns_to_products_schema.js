"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddColumnsToProductsSchema extends Schema {
  up() {
    this.table("products", table => {
      table
        .float("weight")
        .notNullable()
        .defaultTo(0);
      table
        .float("width")
        .notNullable()
        .defaultTo(0);
      table
        .float("height")
        .notNullable()
        .defaultTo(0);
      table
        .float("length")
        .notNullable()
        .defaultTo(0);
      table
        .string("sku_id", 254)
        .notNullable()
        .defaultTo("1");
      table
        .string("product_category", 254)
        .notNullable()
        .defaultTo("Geral");
    });
  }

  down() {
    this.table("products", table => {
      table.dropColumn("weight");
      table.dropColumn("width");
      table.dropColumn("height");
      table.dropColumn("length");
      table.dropColumn("sku_id");
      table.dropColumn("product_category");
    });
  }
}

module.exports = AddColumnsToProductsSchema;
