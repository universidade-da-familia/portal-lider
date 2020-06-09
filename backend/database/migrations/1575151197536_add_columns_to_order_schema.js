"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddColumnsToOrderSchema extends Schema {
  up() {
    this.table("orders", table => {
      // alter table
      table.string("shipping_cep", 8);
      table.string("shipping_uf", 2);
      table.string("shipping_city");
      table.string("shipping_street");
      table.string("shipping_street_number");
      table.string("shipping_neighborhood");
      table.string("shipping_complement");
      table.string("shipping_receiver");
    });
  }

  down() {
    this.table("orders", table => {
      // reverse alternations
      table.dropColumn("shipping_cep");
      table.dropColumn("shipping_uf");
      table.dropColumn("shipping_city");
      table.dropColumn("shipping_street");
      table.dropColumn("shipping_street_number");
      table.dropColumn("shipping_neighborhood");
      table.dropColumn("shipping_complement");
      table.dropColumn("shipping_receiver");
    });
  }
}

module.exports = AddColumnsToOrderSchema;
