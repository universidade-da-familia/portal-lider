/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PaymentPlansSchema extends Schema {
  up() {
    this.create('payment_plans', table => {
      table.increments();
      table
        .integer('event_id')
        .unsigned()
        .references('id')
        .inTable('events')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('title', 254).notNullable();
      table.string('description', 254).notNullable();
      table.float('amount').unsigned().notNullable().defaultTo(0);
      table.string('type', 254).notNullable(); // couple, individual
      table.integer('sequence').unsigned().notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('payment_plans');
  }
}

module.exports = PaymentPlansSchema;
