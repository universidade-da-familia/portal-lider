/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Log extends Model {
  user() {
    return this.belongsTo('App/Models/User');
  }
}

module.exports = Log;
