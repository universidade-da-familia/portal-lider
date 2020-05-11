'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BankAccountsSchema extends Schema {
  up () {
    this.create('bank_accounts', (table) => {
      table.increments()
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("bank_id")
        .unsigned()
        .references("id")
        .inTable("banks")
        .onUpdate("CASCADE")
        .onDelete('CASCADE');
      table.string('account_type', 254).notNullable();
      table.string('agency', 254).notNullable();
      table.string('account_number', 254).notNullable();
      table.string('favored', 254).notNullable();
      table.string('favored_type', 254).notNullable();
      table.string('cpf_cnpj', 14).notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('bank_accounts')
  }
}

module.exports = BankAccountsSchema
