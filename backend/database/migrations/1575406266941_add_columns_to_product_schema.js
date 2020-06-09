"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddColumnsToProductSchema extends Schema {
  up() {
    this.table("products", table => {
      // alter table
      table.dropColumn("unit_price");
      table.float("group_price");
      table.float("training_price");
      table.float("seminary_price");
    });
  }

  down() {
    this.table("products", table => {
      // reverse alternations
      table.dropColumn("group_price");
      table.dropColumn("training_price");
      table.dropColumn("seminary_price");
    });
  }
}

module.exports = AddColumnsToProductSchema;
