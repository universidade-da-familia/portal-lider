/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ParticipantsSchema extends Schema {
  up() {
    this.create('participants', table => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table
        .integer('event_id')
        .unsigned()
        .references('id')
        .inTable('events')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.boolean('assistant').notNullable().defaultTo(false);
      table.string('attendance_status').notNullable().defaultTo('em andamento'); // em andamento, aprovado, reprovado, reposição
      table.boolean('is_approved').notNullable().defaultTo(false);
      table.boolean('is_quitter').notNullable().defaultTo(false);
      table.datetime('print_date');
      table.unique(['user_id', 'event_id']);
      table.timestamps();
    });
  }

  down() {
    this.drop('participants');
  }
}

module.exports = ParticipantsSchema;
