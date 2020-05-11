/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class KitsSchema extends Schema {
  up() {
    this.create('kits', table => {
      table.increments();
      table.string('name', 254).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('kits');
  }
}

module.exports = KitsSchema;
