const Entity = use('App/Models/Entity');
const Organization = use('App/Models/Organization');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with changepasswords
 */
class ChangePasswordController {
  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response, auth }) {
    try {
      let user;
      let token;
      const data = request.only(['password', 'newPassword']);

      if (params.user_type === 'entity') {
        user = await Entity.findOrFail(params.id);

        token = await auth
          .authenticator('jwt_entity')
          .attempt(user.email, data.password);
      } else {
        user = await Organization.findOrFail(params.id);

        token = await auth
          .authenticator('jwt_organization')
          .attempt(user.email, data.password);
      }

      if (token) {
        user.password = data.newPassword;
      }

      await user.save();

      return user;
    } catch (err) {
      return response.status(err.status).send({
        title: 'Falha!',
        message: 'Senha atual incorreta.',
      });
    }
  }
}

module.exports = ChangePasswordController;
