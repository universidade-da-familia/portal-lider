'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DefaultEventsSchema extends Schema {
  up () {
    this.create('default_events', (table) => {
      table.increments();
      table
        .integer("kit_id")
        .unsigned()
        .references("id")
        .inTable("kits")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table
        .integer("layout_certificate_id")
        .unsigned()
        .references("id")
        .inTable("layout_certificates")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table
        .integer("ministery_id")
        .unsigned()
        .references("id")
        .inTable("ministeries")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table
        .integer("organizator_hierarchy_id")
        .unsigned()
        .notNullable();
      table
        .integer("assistant_hierarchy_id")
        .unsigned()
        .notNullable();
      table.integer('assistant_will_become_id').unsigned()
      table.integer('assistant_current_event_id').unsigned()
      table
        .integer("participant_hierarchy_id")
        .unsigned()
        .notNullable();
      table
        .integer("participant_will_become_id")
        .unsigned()
        .notNullable();
        table.string("name", 254).notNullable();
        table.text("description");
        table.string("event_type", 100).notNullable();
        table.string("img_name_tag_url").notNullable();
        table.string("img_name_card_url").notNullable();
        table.string("img_banner_site_url").notNullable();
        table.string("img_banner_mobile_site_url").notNullable();
        table.string("img_banner_dash_url").notNullable();
        table.string("img_certificate_url").notNullable();
        table.integer("max_faults").notNullable();
        table.integer("min_participants").notNullable();
        table.integer("max_participants").notNullable();
        table.integer("max_organizators").notNullable();
        table.integer("max_assistants").notNullable();
        table.integer('max_global_inscriptions').unsigned()
      table.string("sex_type", 1).notNullable(); // f = mulher, m = homem, a = todos
      table.string("subscription_type").notNullable(); // individual, couple, mixed
      table.timestamps();
    })
  }

  down () {
    this.drop('default_events')
  }
}

module.exports = DefaultEventsSchema
