/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Kit extends Model {
  defaultEvent() {
    return this.hasOne('App/Models/DefaultEvent');
  }

  products() {
    return this.belongsToMany('App/Models/Product')
      .pivotTable('kit_products')
      .withTimestamps();
  }
}

module.exports = Kit;
