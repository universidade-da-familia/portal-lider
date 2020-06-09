'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EntitySchema extends Schema {
  up () {
    this.create('entities', table => {
      table.increments()
      table.integer('netsuite_id').unsigned()
      table
        .string('entity_type', 20)
        .notNullable()
        .defaultTo('lead')
      table
        .integer('file_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.integer('personal_state_id')
      table.string('name', 254).notNullable()
      table
        .string('email', 254)
        .notNullable()
        .unique()
      table
        .string('cpf', 11)
        .notNullable()
        .unique()
      table.string('password', 60).notNullable()
      table.date('birthday')
      table.string('sex', 1)
      table.string('phone', 21)
      table.string('alt_phone', 21)
      table.string('facebook')
      table.string('instagram')
      table.string('linkedin')
      table
        .integer('cmn_hierarchy_id')
        .unsigned()
        .defaultTo(0)
      table
        .integer('mu_hierarchy_id')
        .unsigned()
        .defaultTo(0)
      table
        .integer('crown_hierarchy_id')
        .unsigned()
        .defaultTo(0)
      table
        .integer('mp_hierarchy_id')
        .unsigned()
        .defaultTo(0)
      table
        .integer('ffi_hierarchy_id')
        .unsigned()
        .defaultTo(0)
      table
        .integer('gfi_hierarchy_id')
        .unsigned()
        .defaultTo(0)
      table
        .integer('pg_hierarchy_id')
        .unsigned()
        .defaultTo(0)
      table.bool('user_legacy')
      table.bool('admin').defaultTo(false)
      table.string('token') // Token para resetar senha
      table.timestamp('token_created_at') // Data do token para resetar senha
      table.timestamps()
    })
  }

  down () {
    this.drop('entities')
  }
}

module.exports = EntitySchema
