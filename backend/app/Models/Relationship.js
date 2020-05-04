/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Relationship extends Model {
  user() {
    return this.belongsTo('App/Models/User');
  }

  relationshipUser() {
    return this.belongsTo('App/Models/User', 'relationship_id', 'id');
  }
}

module.exports = Relationship;
