"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddressesSchema extends Schema {
  up() {
    this.create("addresses", table => {
      table.increments();
      table
        .integer("entity_id")
        .unsigned()
        .references("id")
        .inTable("entities")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("organization_id")
        .unsigned()
        .references("id")
        .inTable("organizations")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("type", 80).notNullable();
      table.string("other_type_name", 80);
      table.string("cep", 8).notNullable();
      table.string("city", 254).notNullable();
      table.string("uf", 2).notNullable();
      table.string("country", 100).notNullable();
      table.string("street", 254).notNullable();
      table.string("street_number", 50).notNullable();
      table.string("neighborhood", 100).notNullable();
      table.string("complement", 100);
      table.string("receiver", 254);
      table.timestamps();
    });
  }

  down() {
    this.drop("addresses");
  }
}

module.exports = AddressesSchema;
