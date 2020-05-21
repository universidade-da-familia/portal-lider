const Organization = use('App/Models/Organization');
const Mail = use('Mail');

const ValidateEmail = use('App/Controllers/Http/Validations/ValidateEmail');
const AsteriskEmail = use('App/Controllers/Http/Validations/AsteriskEmail');

const moment = require('moment');
const crypto = require('crypto');

class ForgotPasswordControllerPJ {
  async store({ request, response }) {
    try {
      const validateEmail = new ValidateEmail();
      const asteriskEmail = new AsteriskEmail();

      const email_cpf_cnpj = request.input('email_cpf_cnpj');

      const user = (await validateEmail.validate(email_cpf_cnpj))
        ? await Organization.findByOrFail('email', email_cpf_cnpj)
        : await Organization.findByOrFail('cnpj', email_cpf_cnpj);

      user.token = crypto.randomBytes(10).toString('hex');
      user.token_created_at = new Date();

      await user.save();

      await Mail.send(
        ['emails.forgot_password', 'emails.forgot_password-text'],
        {
          email: user.email,
          token: user.token,
          link: `${request.input('redirect_url')}/${user.token}`,
        },
        message => {
          message
            .to(user.email)
            .from('naoresponda@udf.org.br', 'no-reply | Portal do Líder')
            .subject('Recuperação de senha');
        },
      );

      return {
        email: await asteriskEmail.validate(user.email),
      };
    } catch (err) {
      return response.status(err.status).send({
        title: 'Falha!',
        message: 'Esse e-mail existe?',
      });
    }
  }

  async update({ request, response }) {
    try {
      const { token, password } = request.all();

      const user = await Organization.findByOrFail('token', token);

      const tokenExpired = moment()
        .subtract('2', 'hours')
        .isAfter(user.token_created_at);

      if (tokenExpired) {
        return response.status(401).send({
          title: 'Falha!',
          message: 'O token de recuperação expirou, recupere novamente!',
        });
      }

      user.token = null;
      user.token_created_at = null;
      user.password = password;

      await user.save();
    } catch (err) {
      return response.status(err.status).send({
        title: 'Falha!',
        message: 'Houve um erro ao resetar a senha.',
      });
    }
  }
}

module.exports = ForgotPasswordControllerPJ;
