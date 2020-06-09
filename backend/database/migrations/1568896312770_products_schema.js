"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProductsSchema extends Schema {
  up() {
    this.create("products", table => {
      table.increments();
      table.integer("netsuite_id").unsigned();
      table.string("name", 254).notNullable();
      table
        .float("unit_price")
        .notNullable()
        .unsigned();
      table.timestamps();
    });
  }

  down() {
    this.drop("products");
  }
}

module.exports = ProductsSchema;
