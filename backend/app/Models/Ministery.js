/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Ministery extends Model {
  defaultEvents() {
    return this.hasMany('App/Models/DefaultEvent');
  }
}

module.exports = Ministery;

module.exports = Ministery;
