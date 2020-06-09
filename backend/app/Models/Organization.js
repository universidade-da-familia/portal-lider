'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Hash = use('Hash')

class Organization extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeSave', async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })

    // this.addHook("afterCreate", async userInstance => {
    //   userInstance.smart_id = await `A${userInstance.id}`;
    //   await userInstance.save();
    // });
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

  entityOrganizations () {
    return this.belongsToMany('App/Models/Entity')
      .pivotTable('entity_organizations')
      .withPivot(['role', 'can_checkout'])
      .withTimestamps()
  }

  events () {
    return this.hasMany(
      'App/Models/Event',
      'id',
      'responsible_organization_id'
    )
  }

  checkouts () {
    return this.hasMany('App/Models/Checkout')
  }

  orders () {
    return this.hasMany('App/Models/Order')
  }

  entities () {
    return this.hasMany('App/Models/Entity')
  }

  logs () {
    return this.hasMany('App/Models/Log')
  }
}

module.exports = Organization
