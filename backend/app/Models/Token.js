"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Token extends Model {
  entity() {
    return this.belongsTo("App/Models/Entity");
  }
}

module.exports = Token;
