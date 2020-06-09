'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnTagToMinisterySchema extends Schema {
  up () {
    this.table('ministeries', (table) => {
      // alter table
      table.string('tag', 50).nullable()
    })
  }

  down () {
    this.table('ministeries', (table) => {
      // reverse alternations
      table.dropColumn('tag')
    })
  }
}

module.exports = AddColumnTagToMinisterySchema
