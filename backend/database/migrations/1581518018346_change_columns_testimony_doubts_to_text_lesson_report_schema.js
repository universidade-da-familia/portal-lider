'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChangeColumnsTestimonyDoubtsToTextLessonReportSchema extends Schema {
  up () {
    this.table('lesson_reports', (table) => {
      // alter table
      table.text('testimony').alter()
      table.text('doubts').alter()
    })
  }

  // down () {
  //   this.table('lesson_reports', (table) => {
  //     // reverse alternations
  //     table.dropColumn("testimony");
  //     table.dropColumn("doubts");
  //   })
  // }
}

module.exports = ChangeColumnsTestimonyDoubtsToTextLessonReportSchema
