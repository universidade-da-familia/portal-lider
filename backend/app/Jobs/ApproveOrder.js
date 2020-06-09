'use strict'

const axios = require('axios')

const api = axios.default.create({
  baseURL: 'https://5260046.restlets.api.netsuite.com/app/site/hosting',
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'NLAuth nlauth_account=5260046, nlauth_email=dev@udf.org.br, nlauth_signature=Shalom1234,nlauth_role=1077'
  }
})

class ApproveOrder {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'ApproveOrder-job'
  }

  // This is where the work is done.
  async handle ({ orderNetsuite }) {
    console.log('ApproveOrder-job started')

    const response = await api.put(
      '/restlet.nl?script=190&deploy=1',
      orderNetsuite
    )

    console.log(response.data)

    if (response.data.id) {
      console.log('Chamada ao netsuite finalizada com sucesso (ApproveOrder).')
    } else {
      console.log('Chamada ao netsuite finalizada com falha (ApproveOrder).')
      throw new Error({
        title: 'Falha!',
        message: 'Houve um erro ao atualizar o pedido no Netsuite.'
      })
    }
  }
}

module.exports = ApproveOrder
