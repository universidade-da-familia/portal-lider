'use strict'

const Entity = use('App/Models/Entity')
const Organization = use('App/Models/Organization')

const ValidateEmail = use('App/Controllers/Http/Validations/ValidateEmail')

const axios = require('axios')

const api = axios.default.create({
  baseURL: 'https://5260046.restlets.api.netsuite.com/app/site/hosting',
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'NLAuth nlauth_account=5260046, nlauth_email=dev@udf.org.br, nlauth_signature=Shalom1234,nlauth_role=1077'
  }
})

/**
 * Resourceful controller for interacting with sessions
 */
class SessionController {
  /**
   * Create/save a new session.
   * POST sessions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {
      const { email_cpf_cnpj, password } = request.all()

      const validateEmail = new ValidateEmail()
      const isEmail = await validateEmail.validate(email_cpf_cnpj)

      const user = isEmail
        ? await Entity.findByOrFail('email', email_cpf_cnpj)
        : await Entity.findByOrFail('cpf', email_cpf_cnpj)

      if (user.user_legacy === true) {
        return {
          expired: {
            title: 'Senha expirada!',
            message: 'Atualize a sua senha de acesso.'
          }
        }
      }

      if (
        user.cmn_hierarchy_id < 2 &&
        user.mu_hierarchy_id < 2 &&
        user.crown_hierarchy_id < 2 &&
        user.mp_hierarchy_id < 2 &&
        user.ffi_hierarchy_id < 2 &&
        user.gfi_hierarchy_id < 2 &&
        user.pg_hab_hierarchy_id < 2 &&
        user.pg_yes_hierarchy_id < 2
      ) {
        return response.status(401).send({
          title: 'Não permitido!',
          message: 'Acesso restrito para igrejas, líderes e assistentes.'
        })
      }

      const token = isEmail
        ? await auth
          .authenticator('jwt_entity')
          .attempt(email_cpf_cnpj, password)
        : await auth.authenticator('jwt_cpf').attempt(email_cpf_cnpj, password)

      return {
        user_type: 'entity',
        token,
        user
      }
    } catch (err) {
      return response.status(err.status).send({
        title: 'Falha!',
        message: 'Usuário ou senha inválidos.'
      })
    }
  }

  async store_org ({ request, response, auth }) {
    try {
      const { email_cpf_cnpj, password } = request.all()

      const validateEmail = new ValidateEmail()
      const isEmail = await validateEmail.validate(email_cpf_cnpj)

      const user = isEmail
        ? await Organization.findByOrFail('email', email_cpf_cnpj)
        : await Organization.findByOrFail('cnpj', email_cpf_cnpj)

      const token = isEmail
        ? await auth
          .authenticator('jwt_organization')
          .attempt(email_cpf_cnpj, password)
        : await auth
          .authenticator('jwt_cnpj')
          .attempt(email_cpf_cnpj, password)

      return {
        user_type: 'organization',
        token,
        user
      }
    } catch (err) {
      return response.status(err.status).send({
        title: 'Falha!',
        message: 'Usuário ou senha inválidos.'
      })
    }
  }

  async show ({ params, auth }) {
    const user = await auth
      .authenticator(`${params.type === 'entity' ? 'jwt' : 'jwt_organization'}`)
      .getUser()

    params.type === 'entity'
      ? await user.loadMany([
        'file',
        'relationships.relationshipEntity.file',
        'addresses',
        'bankAccounts',
        'creditCards',
        'checkouts',
        'checkoutItems',
        'families',
        'entityOrganizations',
        'organizators.defaultEvent.ministery',
        'organizators.organization',
        'organizators.noQuitterParticipants',
        'participants.noQuitterParticipants',
        'participants.defaultEvent.ministery',
        'orders.status',
        'orders.transaction',
        'church'
      ])
      : await user.loadMany([
        'file',
        'addresses',
        'bankAccounts',
        'creditCards',
        'checkouts',
        'entityOrganizations',
        'events',
        'orders.status',
        'entities'
      ])

    return user
  }

  async expired_titles ({ params }) {
    const { data: overdue_cpfs } = await api.get(`/restlet.nl?script=184&deploy=1&cpf=${params.cpf}`)
    const unique_cpfs = [...new Set(overdue_cpfs)]
    const overdue = unique_cpfs.find(cpf => cpf === params.cpf)

    return {
      expired_titles: overdue !== undefined
    }
  }
}

module.exports = SessionController
