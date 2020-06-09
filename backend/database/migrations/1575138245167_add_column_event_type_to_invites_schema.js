"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddColumnEventTypeToInvitesSchema extends Schema {
  up() {
    this.table("invites", table => {
      // alter table
      table
        .string("event_type", 254)
        .notNullable()
        .defaultTo("Grupo");
    });
  }

  down() {
    this.table("invites", table => {
      // reverse alternations
      table.dropColumn("event_type");
    });
  }
}

module.exports = AddColumnEventTypeToInvitesSchema;
