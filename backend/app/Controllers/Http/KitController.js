/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Kit = use('App/Models/Kit');

/**
 * Resourceful controller for interacting with kits
 */
class KitController {
  /**
   * Show a list of all kits.
   * GET kits
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const kits = await Kit.query().with('products').fetch();

    return kits;
  }

  /**
   * Create/save a new kit.
   * POST kits
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request }) {
    const { name, products } = request.only(['name', 'products']);

    const kit = await Kit.create({ name });

    if (products && products.length > 0) {
      await kit.products().attach(products);

      kit.products = await kit.products().fetch();
    }

    return kit;
  }

  /**
   * Display a single kit.
   * GET kits/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const kit = await Kit.findOrFail(params.id);

    await kit.load('products');

    return kit;
  }

  /**
   * Update kit details.
   * PUT or PATCH kits/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const { name, products } = request.only(['name', 'products']);

      const kit = await Kit.findOrFail(params.id);

      kit.name = name || kit.name;

      await kit.save();

      if (products && products.length > 0) {
        await kit.products().detach();
        await kit.products().attach(products);

        kit.products = await kit.products().fetch();
      }

      return kit;
    } catch (err) {
      return response.status(err.status).send({
        error: {
          message: 'Tente atualizar novamente',
        },
      });
    }
  }

  /**
   * Delete a kit with id.
   * DELETE kits/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    try {
      const kit = await Kit.findOrFail(params.id);

      await kit.delete();

      return response.status(200).send({
        message: 'O kit foi removido.',
      });
    } catch (err) {
      return response.status(err.status).send({
        error: {
          message: 'Tente remover novamente',
        },
      });
    }
  }
}

module.exports = KitController;
