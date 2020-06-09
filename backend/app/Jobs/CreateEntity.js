'use strict'

const Entity = use('App/Models/Entity')

const axios = require('axios')

const api = axios.default.create({
  baseURL: 'https://5260046.restlets.api.netsuite.com/app/site/hosting',
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'NLAuth nlauth_account=5260046, nlauth_email=dev@udf.org.br, nlauth_signature=Shalom1234,nlauth_role=1077'
  }
})

class CreateEntity {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'CreateEntity-job'
  }

  // This is where the work is done.
  async handle (data) {
    console.log('CreateEntity-job started')

    const { id, name, email, cpf, sex } = data

    const fullname = name.split(' ')
    const firstname = fullname[0]
    fullname.shift()
    const lastname = fullname.length >= 1 ? fullname.join(' ') : ''

    const response = await api.post('/restlet.nl?script=162&deploy=1', {
      is_business: false,
      id,
      name,
      firstname,
      lastname,
      email: email || '',
      cpf_cnpj: cpf || '',
      sex: sex || ''
    })

    console.log(response.data)

    if (response.data.id) {
      const entity = await Entity.findOrFail(id)

      entity.netsuite_id = response.data.id || entity.netsuite_id

      await entity.save()

      console.log('Chamada ao netsuite finalizada com sucesso (CreateEntity).')
    } else {
      console.log('Chamada ao netsuite finalizada com falha (CreateEntity).')
      throw new Error({
        title: 'Falha!',
        message: 'Houve um erro ao criar a entidade no Netsuite.'
      })
    }
  }
}

module.exports = CreateEntity
