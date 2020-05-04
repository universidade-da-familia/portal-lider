/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const Hash = use('Hash');

const { differenceInCalendarYears } = require('date-fns');

class User extends Model {
  static boot() {
    super.boot();

    this.addHook('beforeSave', async entityInstance => {
      if (entityInstance.dirty.password) {
        entityInstance.password = await Hash.make(entityInstance.password);
      }
    });
  }

  static get computed() {
    return ['age'];
  }

  getAge({ birthday }) {
    const age = differenceInCalendarYears(new Date(), new Date(birthday));

    return age;
  }

  file() {
    return this.belongsTo('App/Models/File');
  }

  // addresses() {
  //   return this.hasMany('App/Models/Address').orderBy('id');
  // }

  // bankAccounts() {
  //   return this.hasMany('App/Models/BankAccount').orderBy('id');
  // }

  // creditCards() {
  //   return this.hasMany('App/Models/CreditCard');
  // }

  church() {
    return this.belongsTo('App/Models/User', 'church_id', 'id');
  }

  // noQuitterParticipants() {
  //   return this.belongsToMany('App/Models/Event')
  //     .pivotTable('participants')
  //     .withPivot([
  //       'id',
  //       'assistant',
  //       'attendance_status',
  //       'is_quitter',
  //       'event_authorization',
  //       'print_date',
  //     ])
  //     .withTimestamps()
  //     .where('is_quitter', false)
  //     .andWhere('assistant', false);
  // }

  // participants() {
  //   return this.belongsToMany('App/Models/Event')
  //     .pivotTable('participants')
  //     .withPivot([
  //       'id',
  //       'assistant',
  //       'attendance_status',
  //       'is_quitter',
  //       'event_authorization',
  //       'print_date',
  //     ])
  //     .withTimestamps();
  // }

  // orders() {
  //   return this.hasMany('App/Models/Order').orderBy('created_at', 'desc');
  // }

  // relationships() {
  //   return this.hasMany('App/Models/Relationship').orderBy('id', 'asc');
  // }

  // logs() {
  //   return this.hasMany('App/Models/Log');
  // }
}

module.exports = User;
