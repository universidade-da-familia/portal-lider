'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RemoveColumnEntityTypeToEntitySchema extends Schema {
  up () {
    this.table('entities', (table) => {
      // alter table
      table.dropColumn("entity_type");
    })
  }
}

module.exports = RemoveColumnEntityTypeToEntitySchema
