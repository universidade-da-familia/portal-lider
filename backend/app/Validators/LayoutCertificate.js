"use strict";

const Antl = use("Antl");

class LayoutCertificate {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      content_justify: "required",
      content_align: "required",
      name_margin: "required",
      name_font_family: "required",
      name_font_size: "required",
      emission_margin: "required",
      emission_font_family: "required",
      emission_font_size: "required"
    };
  }

  get messages() {
    return Antl.list("validation");
  }
}

module.exports = LayoutCertificate;
