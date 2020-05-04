/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class LogSchema extends Schema {
  up() {
    this.create('logs', table => {
      table.increments();
      table.string('action', 254).notNullable();
      table.string('model', 254).notNullable();
      table.text('new_data');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.integer('model_id').unsigned();
      table.string('description', 254);
      table.timestamps();
    });
  }

  down() {
    this.drop('logs');
  }
}

module.exports = LogSchema;
