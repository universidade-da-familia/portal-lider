"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ParticipantsSchema extends Schema {
  up() {
    this.create("participants", table => {
      table.increments();
      table
        .integer("entity_id")
        .unsigned()
        .references("id")
        .inTable("entities")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table
        .integer("event_id")
        .unsigned()
        .references("id")
        .inTable("events")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .boolean("assistant")
        .notNullable()
        .defaultTo(false);
      table
        .string("attendance_status")
        .notNullable()
        .defaultTo("em andamento"); // em andamento, aprovado, reprovado, reposição
      table
        .boolean("is_quitter")
        .notNullable()
        .defaultTo(false);
      table
        .boolean("event_authorization")
        .notNullable()
        .defaultTo(false);
      table.unique(["entity_id", "event_id"]);
      table.timestamps();
    });
  }

  down() {
    this.drop("participants");
  }
}

module.exports = ParticipantsSchema;
