"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class LayoutCertificatesSchema extends Schema {
  up() {
    this.create("layout_certificates", table => {
      table.increments();
      table.string("content_justify").notNullable();
      table.string("content_align").notNullable();
      table.string("name_margin").notNullable();
      table.string("name_font_family").notNullable();
      table.string("name_font_size").notNullable();
      table.string("emission_margin").notNullable();
      table.string("emission_font_family").notNullable();
      table.string("emission_font_size").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("layout_certificates");
  }
}

module.exports = LayoutCertificatesSchema;
