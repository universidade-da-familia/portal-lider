"use strict";

const Antl = use("Antl");

class Hierarchy {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: "required"
    };
  }

  get messages() {
    return Antl.list("validation");
  }
}

module.exports = Hierarchy;
