/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class EventsSchema extends Schema {
  up() {
    this.create('events', table => {
      table.increments();
      table
        .integer('default_event_id')
        .unsigned()
        .references('id')
        .inTable('default_events')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table
        .integer('organizator_church_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table
        .integer('event_organization_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table.datetime('start_date').notNullable();
      table.datetime('end_date');
      table.string('cep', 8);
      table.string('city', 254);
      table.string('uf', 60);
      table.string('country', 100);
      table.string('street', 254);
      table.string('street_number', 50);
      table.string('neighborhood', 100);
      table.string('complement', 100);
      table.string('img_address_url').notNullable();
      table.boolean('is_finished').notNullable();
      table.boolean('is_public').notNullable().defaultTo(false);
      table.boolean('is_online_payment').notNullable().defaultTo(false);
      table.boolean('is_inscription_finished').notNullable().defaultTo(false);
      table.integer('extra_participants').unsigned().defaultTo(0);
      table.integer('extra_assistants').unsigned().defaultTo(0);
      table.timestamps();
    });
  }

  down() {
    this.drop('events');
  }
}

module.exports = EventsSchema;
