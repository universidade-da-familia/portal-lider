'use strict'

const Antl = use('Antl')

class EntityUpdate {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      email: 'unique:entities',
      cpf: 'unique:entities',
      password: 'min:6'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = EntityUpdate
