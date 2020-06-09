"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class RemoveColumnParticipantsCountToEventSchema extends Schema {
  up() {
    this.table("events", table => {
      // alter table
      table.dropColumn("participants_count");
    });
  }
}

module.exports = RemoveColumnParticipantsCountToEventSchema;
