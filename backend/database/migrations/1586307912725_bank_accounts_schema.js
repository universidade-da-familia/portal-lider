'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BankAccountsSchema extends Schema {
  up () {
    this.create('bank_accounts', (table) => {
      table.increments()
      table
        .integer('entity_id')
        .unsigned()
        .references('id')
        .inTable('entities')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('organization_id')
        .unsigned()
        .references('id')
        .inTable('organizations')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('bank', 254).notNullable()
      table
        .integer('branch')
        .unsigned()
        .notNullable()
      table
        .integer('account')
        .unsigned()
        .notNullable()
      table
        .string('favored', 254)
      table
        .string('account_type', 254)
        .notNullable()
      table
        .string('entity_type', 254)
        .notNullable()
      table
        .string('cpf_cnpj', 14)
        .notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('bank_accounts')
  }
}

module.exports = BankAccountsSchema
