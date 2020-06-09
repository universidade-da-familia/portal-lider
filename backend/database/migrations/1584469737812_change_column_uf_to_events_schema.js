'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChangeColumnUfToEventsSchema extends Schema {
  up () {
    this.table('events', (table) => {
      // alter table
      table.string('uf', 60).alter()
    })
  }

  // down () {
  //   this.table('change_column_uf_to_events', (table) => {
  //     // reverse alternations
  //   })
  // }
}

module.exports = ChangeColumnUfToEventsSchema
