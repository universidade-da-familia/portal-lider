"use strict";

const Antl = use("Antl");

class Ministery {
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

module.exports = Ministery;
