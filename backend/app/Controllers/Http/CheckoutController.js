/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Checkout = use('App/Models/Checkout');

class CheckoutController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request }) {
    const data = request.only(['entity_id', 'organization_id']);

    const checkouts = await Checkout.query()
      .where('entity_id', data.entity_id)
      .orWhere('organization_id', data.organization_id)
      .fetch();

    return checkouts;
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const data = request.only([
        'entity_id',
        'organization_id',
        'total',
        'tax',
        'current',
        'items',
      ]);

      const checkout = await Checkout.create(data);

      return checkout;
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: 'Falha!',
          message: 'Tente cadastrar novamente',
        },
      });
    }
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const checkout = await Checkout.findOrFail(params.id);

    await checkout.loadMany([
      'transaction',
      'checkoutItems',
      'entity',
      'organization',
    ]);

    return checkout;
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const data = request.only([
        'entity_id',
        'organization_id',
        'total',
        'tax',
        'current',
        'items',
      ]);

      const checkout = await Checkout.findOrFail(params.id);

      checkout.merge(data);

      await checkout.save();

      return checkout;
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: 'Falha!',
          message: 'Tente atualizar novamente',
        },
      });
    }
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    try {
      const checkout = await Checkout.findOrFail(params.id);

      await checkout.delete();

      return response.status(200).send({
        title: 'Sucesso!',
        message: 'O checkout foi removido.',
      });
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: 'Falha!',
          message: 'Tente remover novamente',
        },
      });
    }
  }
}

module.exports = CheckoutController;
