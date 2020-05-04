/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  up() {
    this.create('users', table => {
      table.increments();
      table.integer('netsuite_id').unsigned();
      table
        .integer('church_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table
        .integer('file_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table.integer('personal_state_id');
      table.string('type', 20).notNullable();
      table.string('name', 254).notNullable();
      table.string('fantasy_name', 254);
      table.string('email', 254).unique();
      table.string('cpf_cnpj', 14).unique();
      table.string('inscricao_estadual', 30);
      table.string('password', 60).notNullable();
      table.date('birthday');
      table.string('sex', 1);
      table.string('phone', 21);
      table.string('alt_phone', 21);
      table.string('facebook');
      table.string('instagram');
      table.string('linkedin');
      table.integer('cmn_hierarchy_id').notNullable().unsigned().defaultTo(0);
      table.integer('mu_hierarchy_id').notNullable().unsigned().defaultTo(0);
      table.integer('crown_hierarchy_id').notNullable().unsigned().defaultTo(0);
      table.integer('mp_hierarchy_id').notNullable().unsigned().defaultTo(0);
      table.integer('ffi_hierarchy_id').notNullable().unsigned().defaultTo(0);
      table.integer('gfi_hierarchy_id').notNullable().unsigned().defaultTo(0);
      table
        .integer('pg_hab_hierarchy_id')
        .notNullable()
        .unsigned()
        .defaultTo(0);
      table
        .integer('pg_yes_hierarchy_id')
        .notNullable()
        .unsigned()
        .defaultTo(0);
      table.bool('user_legacy');
      table.bool('admin').defaultTo(false);
      table.string('token'); // Token para resetar senha
      table.timestamp('token_created_at'); // Data do token para resetar senha
      table.timestamps();
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UserSchema;
