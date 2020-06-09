"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TransactionsSchema extends Schema {
  up() {
    this.create("transactions", table => {
      table.increments();
      table
        .integer("checkout_id")
        .unsigned()
        .references("id")
        .inTable("checkouts")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table.integer("transaction_id");
      table.integer("tid");
      table.string("status");
      table.integer("authorization_code");
      table.string("brand");
      table.integer("installments").unsigned();
      table.float("authorized_amount");
      table.float("paid_amount");
      table.float("refunded_amount");
      table.timestamps();
    });
  }

  down() {
    this.drop("transactions");
  }
}

module.exports = TransactionsSchema;
