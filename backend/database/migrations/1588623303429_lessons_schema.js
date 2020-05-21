/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class LessonsSchema extends Schema {
  up() {
    this.create('lessons', table => {
      table.increments();
      table
        .integer('default_event_id')
        .unsigned()
        .references('id')
        .inTable('default_events')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('title').notNullable();
      table.string('description').notNullable();
      table.string('video_id');
      table.string('img_url');
      table.timestamps();
    });
  }

  down() {
    this.drop('lessons');
  }
}

module.exports = LessonsSchema;
