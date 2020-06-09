"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Invite extends Model {
  static boot() {
    super.boot();

    this.addHook("beforeUpdate", "InviteHook.sendNewInviteMail");
    this.addHook("afterCreate", "InviteHook.sendNewInviteMail");
  }

  event() {
    return this.belongsTo("App/Models/Event");
  }
}

module.exports = Invite;
