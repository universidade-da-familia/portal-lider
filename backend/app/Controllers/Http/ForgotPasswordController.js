'use strict'

const Entity = use('App/Models/Entity')
const Mail = use('Mail')

const ValidateEmail = use('App/Controllers/Http/Validations/ValidateEmail')

const moment = require('moment')
const crypto = require('crypto')

class ForgotPasswordController {
  async store ({ request, response }) {
    try {
      const validateEmail = new ValidateEmail()

      const email_cpf_cnpj = request.input('email_cpf_cnpj')

      const user = (await validateEmail.validate(email_cpf_cnpj))
        ? await Entity.findByOrFail('email', email_cpf_cnpj)
        : await Entity.findByOrFail('cpf', email_cpf_cnpj)

      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()

      await user.save()

      await Mail.send(
        ['emails.forgot_password', 'emails.forgot_password-text'],
        {
          email: user.email,
          token: user.token,
          link: `${request.input('redirect_url')}/${user.token}`
        },
        message => {
          message
            .to(user.email)
            .from('naoresponda@udf.org.br', 'no-reply | Portal do Líder')
            .subject(`Recuperação de senha Portal do líder - UDF ${user.token}`)
        }
      )

      return {
        email: user.email
      }
    } catch (err) {
      return response.status(err.status).send({
        title: 'Falha!',
        message: 'Esse e-mail existe?'
      })
    }
  }

  async update ({ request, response }) {
    try {
      const { token, password } = request.all()

      const user = await Entity.findByOrFail('token', token)

      const tokenExpired = moment()
        .subtract('2', 'hours')
        .isAfter(user.token_created_at)

      if (tokenExpired) {
        return response.status(401).send({
          title: 'Falha!',
          message: 'O token de recuperação expirou, recupere novamente!'
        })
      }

      user.token = null
      user.token_created_at = null
      user.password = password
      user.user_legacy = null

      await user.save()
    } catch (err) {
      return response.status(err.status).send({
        title: 'Falha!',
        message: 'Houve um erro ao resetar a senha.'
      })
    }
  }
}

module.exports = ForgotPasswordController
