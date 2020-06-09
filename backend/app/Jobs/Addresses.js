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

class Addresses {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'Addresses-job'
  }

  // This is where the work is done.
  async handle ({ netsuite_id, netsuiteAddresses }) {
    console.log('Addresses-job started')

    const response = await api.post(
      '/restlet.nl?script=186&deploy=1',
      {
        netsuite_id,
        netsuiteAddresses
      }
    )

    console.log(response.data)
  }
}

module.exports = Addresses
