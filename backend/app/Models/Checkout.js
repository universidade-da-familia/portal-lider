"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Checkout extends Model {
  transaction() {
    return this.hasOne("App/Models/Transaction");
  }

  checkoutItems() {
    return this.hasMany("App/Models/CheckoutItem");
  }

  entity() {
    return this.belongsTo("App/Models/Entity");
  }

  organization() {
    return this.belongsTo("App/Models/Organization");
  }
}

module.exports = Checkout;
