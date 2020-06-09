"use strict";

const Antl = use("Antl");

class Product {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: "required",
      group_price: "required",
      training_price: "required",
      seminary_price: "required",
      netsuite_id: "required"
    };
  }

  get messages() {
    return Antl.list("validation");
  }
}

module.exports = Product;
