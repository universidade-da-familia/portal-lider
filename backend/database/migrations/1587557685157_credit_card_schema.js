/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CreditCardSchema extends Schema {
  up() {
    this.create('credit_cards', table => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('card_id').notNullable();
      table.string('number').notNullable();
      table.string('holder_name').notNullable();
      table.string('brand').notNullable();
      table.string('expiration_date').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('credit_cards');
  }
}

module.exports = CreditCardSchema;
