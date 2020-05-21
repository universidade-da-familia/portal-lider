/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class MinisteriesSchema extends Schema {
  up() {
    this.create('ministeries', table => {
      table.increments();
      table.string('name', 50).notNullable();
      table.string('email', 254).unique();
      table.string('phone', 20);
      table.string('tag', 50).nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('ministeries');
  }
}

module.exports = MinisteriesSchema;
