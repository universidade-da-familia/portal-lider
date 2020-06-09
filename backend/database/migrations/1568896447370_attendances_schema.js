"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AttendanceSchema extends Schema {
  up() {
    this.create("attendances", table => {
      table.increments();
      table
        .integer("participant_id")
        .unsigned()
        .references("id")
        .inTable("participants")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("lesson_report_id")
        .unsigned()
        .references("id")
        .inTable("lesson_reports")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .boolean("is_present")
        .notNullable()
        .defaultTo(true);
      table.unique(["participant_id", "lesson_report_id"]);
      table.timestamps();
    });
  }

  down() {
    this.drop("attendances");
  }
}

module.exports = AttendanceSchema;
