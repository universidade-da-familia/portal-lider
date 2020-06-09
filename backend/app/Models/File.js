"use strict";

const Model = use("Model");

class File extends Model {
  entity() {
    return this.hasOne("App/Models/Entity");
  }

  organization() {
    return this.hasOne("App/Models/Organization");
  }
}

module.exports = File;
