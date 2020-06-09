"use strict";

const Antl = use("Antl");

class Kit {
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

module.exports = Kit;
