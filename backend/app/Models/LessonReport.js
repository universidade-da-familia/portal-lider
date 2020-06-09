'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class LessonReport extends Model {
  event () {
    return this.belongsTo('App/Models/Event')
  }

  lesson () {
    return this.belongsTo('App/Models/Lesson')
  }

  attendances () {
    return this.belongsToMany('App/Models/Participant')
      .pivotTable('attendances')
      .withPivot(['participant_id', 'lesson_report_id', 'is_present'])
      .withTimestamps()
  }
}

module.exports = LessonReport
