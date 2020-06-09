"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class CreditCard extends Model {
  entity() {
    return this.belongsTo("App/Models/Entity");
  }

  organization() {
    return this.belongsTo("App/Models/Organization");
  }
}

module.exports = CreditCard;
