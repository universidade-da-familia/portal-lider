'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Attendance extends Model {
  participant () {
    return this.belongsTo('App/Models/Participant')
  }

  lessonReport () {
    return this.belongsTo('App/Models/LessonReport')
  }
}

module.exports = Attendance
