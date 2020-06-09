"use strict";

const Antl = use("Antl");

class Lesson {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      default_event_id: "required",
      title: "required",
      img_url: "required|url"
    };
  }

  get messages() {
    return Antl.list("validation");
  }
}

module.exports = Lesson;
