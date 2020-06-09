'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LogsSchema extends Schema {
  up () {
    this.create('logs', table => {
      table.increments()
      table
        .string('action', 254)
        .notNullable()
      table
        .string('model', 254)
        .notNullable()
      table
        .text('old_data')
      table
        .text('new_data')
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
      table.timestamps()
    })
  }

  down () {
    this.drop('logs')
  }
}

module.exports = LogsSchema
