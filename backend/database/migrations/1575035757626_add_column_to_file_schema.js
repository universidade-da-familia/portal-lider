"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddColumnToFileSchema extends Schema {
  up() {
    this.table("files", table => {
      table.string("url");
    });
  }

  down() {
    this.table("files", table => {
      // reverse alternations
      table.dropColumn("url");
    });
  }
}

module.exports = AddColumnToFileSchema;
