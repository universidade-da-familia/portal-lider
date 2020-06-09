'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnPrayRequestToLessonReportSchema extends Schema {
  up () {
    this.table('lesson_reports', (table) => {
      // alter table
      table.text('pray_request')
    })
  }

  down () {
    this.table('lesson_reports', (table) => {
      // reverse alternations
      table.dropColumn('pray_request')
    })
  }
}

module.exports = AddColumnPrayRequestToLessonReportSchema
