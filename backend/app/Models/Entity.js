'use strict'

const Model = use('Model')
const Hash = use('Hash')

const moment = require('moment')

class Entity extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeSave', async entityInstance => {
      if (entityInstance.dirty.password) {
        entityInstance.password = await Hash.make(entityInstance.password)
      }
    })
  }

  static get computed () {
    return ['age']
  }

  getAge ({ birthday }) {
    const age = moment().diff(moment(birthday), 'years', false)

    return age
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }

  file () {
    return this.belongsTo('App/Models/File')
  }

  addresses () {
    return this.hasMany('App/Models/Address').orderBy('id')
  }

  bankAccounts () {
    return this.hasMany('App/Models/BankAccount').orderBy('id')
  }

  creditCards () {
    return this.hasMany('App/Models/CreditCard')
  }

  checkouts () {
    return this.hasMany('App/Models/Checkout')
  }

  checkoutItems () {
    return this.hasMany('App/Models/CheckoutItem')
  }

  families () {
    return this.belongsToMany('App/Models/Family')
      .pivotTable('entity_families')
      .withPivot(['relationship'])
      .withTimestamps()
  }

  entityOrganizations () {
    return this.belongsToMany('App/Models/Organization')
      .pivotTable('entity_organizations')
      .withPivot(['role', 'can_checkout'])
      .withTimestamps()
  }

  church () {
    return this.belongsTo('App/Models/Organization')
  }

  organizators () {
    return this.belongsToMany('App/Models/Event')
      .pivotTable('organizators')
      .withTimestamps()
  }

  noQuitterParticipants () {
    return this.belongsToMany('App/Models/Event')
      .pivotTable('participants')
      .withPivot([
        'id',
        'assistant',
        'attendance_status',
        'is_quitter',
        'event_authorization',
        'print_date'
      ])
      .withTimestamps()
      .where('is_quitter', false)
      .andWhere('assistant', false)
  }

  participants () {
    return this.belongsToMany('App/Models/Event')
      .pivotTable('participants')
      .withPivot([
        'id',
        'assistant',
        'attendance_status',
        'is_quitter',
        'event_authorization',
        'print_date'
      ])
      .withTimestamps()
  }

  adminPrints () {
    return this.hasMany('App/Models/Event', 'id', 'admin_print_id')
  }

  orders () {
    return this.hasMany('App/Models/Order').orderBy('created_at', 'desc')
  }

  relationships () {
    return this.hasMany('App/Models/Relationship').orderBy('id', 'asc')
  }

  static updateHierarchy (ids, hierarchyName, hierarchyWillBecome) {
    const entities = this.query()
      .whereIn('id', ids).andWhere(hierarchyName, '<', hierarchyWillBecome)
      .update({ [hierarchyName]: hierarchyWillBecome })

    return entities
  }

  logs () {
    return this.hasMany('App/Models/Log')
  }

  static updateLeaderTrainingHierarchy (entityId, hierarchyName, assistantHierarchyId, type) {
    if (type === 'delete') {
      const entity = this.query()
        .where('id', entityId)
        .update({ [hierarchyName]: 1 })

      return entity
    }
    if (type === 'add') {
      const entity = this.query()
        .where('id', entityId)
        .update({ [hierarchyName]: assistantHierarchyId })

      return entity
    }
  }
}

module.exports = Entity
