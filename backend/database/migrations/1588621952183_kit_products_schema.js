/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class KitProductsSchema extends Schema {
  up() {
    this.create('kit_products', table => {
      table.increments();
      table
        .integer('kit_id')
        .unsigned()
        .references('id')
        .inTable('kits')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.unique(['kit_id', 'product_id']);
      table.timestamps();
    });
  }

  down() {
    this.drop('kit_products');
  }
}

module.exports = KitProductsSchema;
