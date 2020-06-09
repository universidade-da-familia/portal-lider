"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CouponsSchema extends Schema {
  up() {
    this.create("coupons", table => {
      table.increments();
      table.string("name", 254).notNullable();
      table
        .integer("percent")
        .unsigned()
        .notNullable();
      table.date("initial_date").notNullable();
      table.date("expiration_date").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("coupons");
  }
}

module.exports = CouponsSchema;
