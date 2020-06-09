"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Lesson extends Model {
  defaultEvent() {
    return this.belongsTo("App/Models/DefaultEvent");
  }

  lessonReports() {
    return this.hasMany("App/Models/LessonReport");
  }
}

module.exports = Lesson;
