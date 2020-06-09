"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Progammation extends Model {
  event() {
    return this.belongsTo("App/Models/Event");
  }
}

module.exports = Progammation;
