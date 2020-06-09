"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Family extends Model {
  entities() {
    return this.belongsToMany("App/Models/Entity")
      .pivotTable("entity_families")
      .withPivot(["relationship"])
      .withTimestamps();
  }
}

module.exports = Family;
