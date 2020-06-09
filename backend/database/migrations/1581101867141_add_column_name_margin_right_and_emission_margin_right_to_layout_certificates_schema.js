'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnNameMarginRightAndEmissionMarginRightToLayoutCertificatesSchema extends Schema {
  up () {
    this.table('layout_certificates', (table) => {
      // alter table
      table.string('name_margin_left')
      table.string('emission_margin_left')
    })
  }

  down () {
    this.table('layout_certificates', (table) => {
      // reverse alternations
      table.dropColumn('name_margin_left')
      table.dropColumn('emission_margin_left')
    })
  }
}

module.exports = AddColumnNameMarginRightAndEmissionMarginRightToLayoutCertificatesSchema
