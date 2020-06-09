"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class LessonReportsSchema extends Schema {
  up() {
    this.create("lesson_reports", table => {
      table.increments();
      table
        .integer("event_id")
        .unsigned()
        .references("id")
        .inTable("events")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("lesson_id")
        .unsigned()
        .references("id")
        .inTable("lessons")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table
        .float("offer")
        .unsigned()
        .notNullable()
        .defaultTo(0);
      table.date("date");
      table.string("testimony");
      table.string("doubts");
      table.boolean("is_finished").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("lesson_reports");
  }
}

module.exports = LessonReportsSchema;
