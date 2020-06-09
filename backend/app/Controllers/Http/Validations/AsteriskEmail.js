'use strict'

class AsteriskEmail {
  async validate (email) {
    const [name, domain] = email.split('@')

    return name
      .substring(0, 3)
      .concat('********@')
      .concat(domain)
  }
}

module.exports = AsteriskEmail
