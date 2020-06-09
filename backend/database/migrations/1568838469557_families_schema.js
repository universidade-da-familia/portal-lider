"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class FamiliesSchema extends Schema {
  up() {
    this.create("families", table => {
      table.increments();
      table.string("name").notNullable();
      table.date("wedding_date").notNullable();
      table
        .boolean("is_divorced")
        .notNullable()
        .defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop("families");
  }
}

module.exports = FamiliesSchema;
