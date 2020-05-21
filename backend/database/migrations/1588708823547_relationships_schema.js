/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class RelationshipsSchema extends Schema {
  up() {
    this.create('relationships', table => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('relationship_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('relationship_type', 254).notNullable();
    });
  }

  down() {
    this.drop('relationships');
  }
}

module.exports = RelationshipsSchema;
