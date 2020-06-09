"use strict";

const Antl = use("Antl");

class ForgotPassword {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      email_cpf_cnpj: "required",
      redirect_url: "required|url"
    };
  }

  get messages() {
    return Antl.list("validation");
  }
}

module.exports = ForgotPassword;
