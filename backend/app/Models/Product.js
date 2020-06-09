"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Product extends Model {
  kits() {
    return this.belongsToMany("App/Models/Kit")
      .pivotTable("kit_products")
      .withTimestamps();
  }

  category() {
    return this.belongsTo("App/Models/Category");
  }

  orders() {
    return this.belongsToMany("App/Models/Order")
      .pivotTable("order_products")
      .withPivot(["quantity"])
      .withTimestamps();
  }
}

module.exports = Product;
