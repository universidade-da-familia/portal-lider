"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddColumnTotalToOrdersSchema extends Schema {
  up() {
    this.table("orders", table => {
      // alter table
      table.float("total");
    });
  }

  down() {
    this.table("orders", table => {
      // reverse alternations
      table.dropColumn("total");
    });
  }
}

module.exports = AddColumnTotalToOrdersSchema;
