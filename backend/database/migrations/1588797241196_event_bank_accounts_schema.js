'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventBankAccountsSchema extends Schema {
  up () {
    this.create('event_bank_accounts', (table) => {
      table.increments()
      table
        .integer("event_id")
        .unsigned()
        .references("id")
        .inTable("events")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("bank_account_id")
        .unsigned()
        .references("id")
        .inTable("bank_accounts")
        .onUpdate("CASCADE")
        .onDelete('CASCADE');
      table.timestamps()
    })
  }

  down () {
    this.drop('event_bank_accounts')
  }
}

module.exports = EventBankAccountsSchema
