/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Coupon = use('App/Models/Coupon');

class CouponController {
  /**
   * Show a list of all coupons.
   * GET coupons
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const coupon = Coupon.query().fetch();

    return coupon;
  }

  /**
   * Create/save a new coupon.
   * POST coupons
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const data = request.only(['name', 'percent']);

      const coupon = await Coupon.create(data);

      return coupon;
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
   * Display a single coupon.
   * GET coupons/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, response }) {
    try {
      const coupon = await Coupon.findOrFail(params.id);

      return coupon;
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: 'Falha!',
          message: 'Nenhum cupom encontrado.',
        },
      });
    }
  }

  /**
   * Update coupon details.
   * PUT or PATCH coupons/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const coupon = await Coupon.findOrFail(params.id);

      const data = request.all();

      coupon.merge(data);

      await coupon.save();

      return coupon;
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
   * Delete a coupon with id.
   * DELETE coupons/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    try {
      const coupon = await Coupon.findOrFail(params.id);

      await coupon.delete();

      return response.status(200).send({
        title: 'Sucesso!',
        message: 'O cupom foi removido.',
      });
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: 'Falha!',
          message: 'Erro ao excluir o cupom',
        },
      });
    }
  }
}

module.exports = CouponController;
