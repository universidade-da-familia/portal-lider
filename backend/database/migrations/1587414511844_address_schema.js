/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddressSchema extends Schema {
  up() {
    this.create('addresses', table => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('type', 80).notNullable();
      table.string('other_type_name', 80);
      table.string('cep', 8).notNullable();
      table.string('city', 254).notNullable();
      table.string('uf', 2).notNullable();
      table.string('country', 100).notNullable();
      table.string('street', 254).notNullable();
      table.string('street_number', 50).notNullable();
      table.string('neighborhood', 100).notNullable();
      table.string('complement', 100);
      table.string('receiver', 254);
      table.timestamps();
    });
  }

  down() {
    this.drop('addresses');
  }
}

module.exports = AddressSchema;
