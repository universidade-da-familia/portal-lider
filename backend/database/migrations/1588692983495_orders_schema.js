/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class OrdersSchema extends Schema {
  up() {
    this.create('orders', table => {
      table.increments();
      table.integer('netsuite_id').unsigned();
      table
        .integer('status_id')
        .unsigned()
        .references('id')
        .inTable('statuses')
        .defaultTo(1)
        .notNullable()
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table.string('type', 80);
      table.string('payment_name', 254).notNullable();
      table.string('shipping_name', 254).notNullable();
      table.date('shipping_date');
      table.string('shipping_code', 254);
      table.integer('delivery_estimate_days');
      table.float('total');
      table.float('shipping_cost').unsigned();
      table.string('shipping_country', 100);
      table.string('shipping_cep', 8);
      table.string('shipping_uf', 60);
      table.string('shipping_city');
      table.string('shipping_street');
      table.string('shipping_street_number');
      table.string('shipping_neighborhood');
      table.string('shipping_complement');
      table.string('shipping_receiver');
      table.timestamps();
    });
  }

  down() {
    this.drop('orders');
  }
}

module.exports = OrdersSchema;
