'use strict'

const Mail = use('Mail')
const moment = require('moment')
moment.locale('pt-br')

class SendLessonReport {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'SendLessonReport-job'
  }

  // This is where the work is done.
  async handle (data) {
    console.log('SendLessonReport-job started')

    const { email } = data.event.defaultEvent.ministery

    await Mail.send(
      ['emails.lesson_report', 'emails.lesson_report-text'],
      {
        lesson_title: data.lesson.title,
        send_date: moment(data.date).format('LLL'),
        pray_request: data.pray_request || 'Sem pedido de oração',
        offer: data.offer > 0 ? `R$ ${data.offer}` : 'Sem ofertas',
        event_id: data.event.id,
        event_type: data.event.defaultEvent.event_type,
        event_name: data.event.defaultEvent.name,
        organizator_name: data.event.organizators[0].name,
        organizator_cpf: data.event.organizators[0].cpf || 'sem CPF'
      },
      message => {
        message
          .to(email)
          .from('naoresponda@udf.org.br', 'no-reply | Portal do Líder')
          .subject(`Relatório da ${data.lesson.title} do evento ${data.event.id} foi enviado`)
      }
    )

    console.log('SendLessonReport-job enviado com sucesso!')
  }
}

module.exports = SendLessonReport
