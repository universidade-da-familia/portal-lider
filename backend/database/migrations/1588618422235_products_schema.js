/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProductsSchema extends Schema {
  up() {
    this.create('products', table => {
      table.increments();
      table.integer('netsuite_id').unsigned();
      table.string('name', 254).notNullable();
      table.float('weight').notNullable().defaultTo(0);
      table.float('width').notNullable().defaultTo(0);
      table.float('height').notNullable().defaultTo(0);
      table.float('length').notNullable().defaultTo(0);
      table.string('sku_id', 254).notNullable().defaultTo('1');
      table.string('product_category', 254).notNullable().defaultTo('Geral');
      table.float('group_price');
      table.float('training_price');
      table.float('seminary_price');
      table.timestamps();
    });
  }

  down() {
    this.drop('products');
  }
}

module.exports = ProductsSchema;
