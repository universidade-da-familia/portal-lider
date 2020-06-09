"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Transaction extends Model {
  checkout() {
    return this.belongsTo("App/Models/Checkout");
  }
}

module.exports = Transaction;
