"use strict";

class ValidateEmail {
  async validate(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

module.exports = ValidateEmail;
