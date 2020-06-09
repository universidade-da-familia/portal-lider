'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Event extends Model {
  static get computed () {
    return ['status']
  }

  getStatus () {
    const currentDate = new Date()
    const event = this.$attributes

    if (event.is_finished === true) return 'Finalizado'

    if (currentDate < event.start_date) {
      return 'Não iniciado'
    } else if (currentDate >= event.start_date) {
      return 'Em andamento'
    }
  }

  defaultEvent () {
    return this.belongsTo('App/Models/DefaultEvent')
  }

  programmations () {
    return this.hasMany('App/Models/Programmation')
  }

  lessonReports () {
    return this.hasMany('App/Models/LessonReport').orderBy('lesson_id')
  }

  invites () {
    return this.hasMany('App/Models/Invite')
  }

  checkoutItems () {
    return this.hasMany('App/Models/CheckoutItems')
  }

  organizators () {
    return this.belongsToMany('App/Models/Entity')
      .pivotTable('organizators')
      .withTimestamps()
      .orderBy('organizators.id')
  }

  paymentPlans () {
    return this.hasMany('App/Models/PaymentPlan')
  }

  noQuitterParticipants () {
    return this.belongsToMany('App/Models/Entity')
      .pivotTable('participants')
      .withPivot([
        'id',
        'assistant',
        'attendance_status',
        'is_quitter',
        'event_authorization'
      ])
      .withTimestamps()
      .where('is_quitter', false)
      .andWhere('assistant', false)
  }

  participants () {
    return this.belongsToMany('App/Models/Entity')
      .pivotTable('participants')
      .withPivot([
        'id',
        'assistant',
        'attendance_status',
        'is_quitter',
        'event_authorization',
        'print_date'
      ])
      .withTimestamps()
  }

  organization () {
    return this.belongsTo(
      'App/Models/Organization',
      'responsible_organization_id',
      'id'
    )
  }

  adminPrint () {
    return this.belongsTo('App/Models/Entity', 'admin_print_id', 'id')
  }

  static waitingForAdminPrintCertificates (page, filterPrintData) {
    return this.query()
      .with('defaultEvent.ministery')
      .with('organizators')
      .with('participants')
      .with('noQuitterParticipants')
      .whereHas('organizators', builder => {
        if (filterPrintData.cpf_print) {
          builder.where('cpf', filterPrintData.cpf_print)
        }
      })
      .whereHas('defaultEvent', builder => {
        if (filterPrintData.event_type_print) {
          builder.where('event_type', filterPrintData.event_type_print)
        }
        if (filterPrintData.ministery_print) {
          builder.where('ministery_id', filterPrintData.ministery_print)
        }
        builder.whereRaw(
          "LOWER(name) like '%' || LOWER(?) || '%'",
          filterPrintData.event_description_print
        )
      })
      .where(function () {
        const currentDate = new Date()
        const [start_date] = filterPrintData.start_date_print.split('T')
        const [end_date] = filterPrintData.end_date_print.split('T')

        this.where('is_inscription_finished', true)
        this.where('is_admin_printed', false)

        if (filterPrintData.id_print) {
          this.where('id', filterPrintData.id_print)
        }

        if (filterPrintData.status_print === 'Finalizado') {
          this.where('is_finished', true)
        }
        if (filterPrintData.status_print === 'Não iniciado') {
          this.where('start_date', '>', currentDate)
          this.where('is_finished', false)
        }
        if (filterPrintData.status_print === 'Em andamento') {
          this.where('start_date', '<=', currentDate)
          this.where('is_finished', false)
        }

        if (start_date) {
          this.where('start_date', '>=', start_date)
        }
        if (end_date) {
          this.where('start_date', '<=', end_date)
        }
      })
      .orderBy('start_date', 'desc')
      .paginate(page, 5)
  }
}

module.exports = Event
