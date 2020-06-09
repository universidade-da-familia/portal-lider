"use strict";

const Antl = use("Antl");

class Programation {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      event_id: "required",
      title: "required",
      date: "required|date",
      start_time: "required",
      end_time: "required"
    };
  }

  get messages() {
    return Antl.list("validation");
  }
}

module.exports = Programation;
