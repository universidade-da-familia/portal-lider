"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddColumnTotalToOrderProductSchema extends Schema {
  up() {
    this.table("order_products", table => {
      // alter table
      table.float("total");
    });
  }

  down() {
    this.table("order_products", table => {
      // reverse alternations
      table.dropColumn("total");
    });
  }
}

module.exports = AddColumnTotalToOrderProductSchema;
