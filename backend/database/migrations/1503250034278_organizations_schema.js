"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class OrganizationsSchema extends Schema {
  up() {
    this.create("organizations", table => {
      table.increments();
      table.integer("netsuite_id");
      table.string("type");
      table
        .integer("file_id")
        .unsigned()
        .references("id")
        .inTable("files")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table.string("corporate_name").notNullable();
      table.string("fantasy_name");
      table
        .string("email", 254)
        .notNullable()
        .unique();
      table.string("password", 60).notNullable();
      table
        .string("cnpj", 14)
        .notNullable()
        .unique();
      table.string("inscricao_estadual", 20);
      table.date("foundation");
      table.string("phone", 20);
      table.string("alt_phone", 20);
      table.string("facebook");
      table.string("instagram");
      table.string("linkedin");
      table.string("token"); //Token para resetar senha
      table.timestamp("token_created_at"); //Data do token para resetar senha
      table.timestamps();
    });
  }

  down() {
    this.drop("organizations");
  }
}

module.exports = OrganizationsSchema;
