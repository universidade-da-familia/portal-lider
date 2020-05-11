'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderTransactionsSchema extends Schema {
  up () {
    this.create('order_transactions', (table) => {
      table.increments();
      table
        .integer("order_id")
        .unsigned()
        .references("id")
        .inTable("orders")
        .onUpdate("SET NULL")
        .onDelete("SET NULL");
      table.string("transaction_id", 254);
      table.integer("api_order_id");
      table.string("status", 254);
      table.string("brand", 254);
      table.string("boleto_url", 254);
      table.string("authorization_code", 254);
      table.float("authorized_amount");
      table.float("installments");
      table.timestamps();
    })
  }

  down () {
    this.drop('order_transactions')
  }
}

module.exports = OrderTransactionsSchema
