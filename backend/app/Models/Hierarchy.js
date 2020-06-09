"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Hierarchy extends Model {
  defaultEvents() {
    return this.hasMany("App/Models/DefaultEvent");
  }
}

module.exports = Hierarchy;
