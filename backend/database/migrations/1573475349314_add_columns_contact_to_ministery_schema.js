'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnsContactToMinisterySchema extends Schema {
  up () {
    this.table('ministeries', (table) => {
      table
        .string("email", 254)
        .unique();
      table.string("phone", 20);
    })
  }

  down () {
    this.table('ministeries', (table) => {
      table.dropColumn("email");
      table.dropColumn("phone");
    })
  }
}

module.exports = AddColumnsContactToMinisterySchema
