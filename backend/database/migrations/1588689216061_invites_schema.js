/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class InvitesSchema extends Schema {
  up() {
    this.create('invites', table => {
      table.increments();
      table
        .integer('event_id')
        .unsigned()
        .references('id')
        .inTable('events')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('name', 254).notNullable();
      table.string('email', 254).notNullable();
      table.bool('confirmed'); // if null (convite enviado) if true (convite aceito) if false (convite recusado)
      table.string('event_type', 254).notNullable().defaultTo('Grupo');
      table.timestamps();
    });
  }

  down() {
    this.drop('invites');
  }
}

module.exports = InvitesSchema;
