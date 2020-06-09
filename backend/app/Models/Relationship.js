'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Relationship extends Model {
  entity () {
    return this.belongsTo('App/Models/Entity')
  }

  relationshipEntity () {
    return this.belongsTo('App/Models/Entity', 'relationship_id', 'id')
  }
}

module.exports = Relationship
