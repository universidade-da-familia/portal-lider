'use strict'

const Antl = use('Antl')

class Organization {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      email: 'email|unique:organizations',
      cnpj: 'unique:organizations',
      password: 'min:6'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Organization
