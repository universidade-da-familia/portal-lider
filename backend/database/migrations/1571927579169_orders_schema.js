"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class OrdersSchema extends Schema {
  up() {
    this.create("orders", table => {
      table.increments();
      table.integer("netsuite_id").unsigned();
      table.integer("nfe_id").unsigned();
      table
        .integer("status_id")
        .unsigned()
        .references("id")
        .inTable("statuses")
        .defaultTo(1)
        .notNullable()
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
        .integer("organization_id")
        .unsigned()
        .references("id")
        .inTable("organizations")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table
        .integer("coupon_id")
        .unsigned()
        .references("id")
        .inTable("coupons")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table.string("user_observation", 254);
      table.string("payment_name", 254).notNullable();
      table.string("shipping_name", 254).notNullable();
      table.date("shipping_date");
      table.integer("delivery_estimate_days");
      table.string("shipping_code", 254);
      table.float("shipping_cost").unsigned();
      table.timestamps();
    });
  }

  down() {
    this.drop("orders");
  }
}

module.exports = OrdersSchema;
