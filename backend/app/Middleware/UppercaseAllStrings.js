'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const uppercaseFields = require('./utils')

class UppercaseAllString {
  uppercaseStrings (body) {
    Object.keys(body).forEach(key => {
      if (body[key] !== null) {
        if (typeof body[key] === 'string' && uppercaseFields.indexOf(key) !== -1) {
          body[key] = body[key].toUpperCase()
        } else if (typeof body[key] === 'object' || Array.isArray(body[key])) {
          this.uppercaseStrings(body[key])
        }
      }
    })

    return body
  }

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request }, next) {
    request.body = this.uppercaseStrings(request.body)

    // call next to advance the request
    await next()
  }
}

module.exports = UppercaseAllString
