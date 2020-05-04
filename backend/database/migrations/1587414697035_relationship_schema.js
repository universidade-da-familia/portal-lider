/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class RelationshipSchema extends Schema {
  up() {
    this.create('relationships', table => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('relationship_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('relationship_type', 254).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('relationships');
  }
}

module.exports = RelationshipSchema;
