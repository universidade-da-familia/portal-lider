"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Hierarchy = use("App/Models/Hierarchy");

class HierarchyController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const hierarchies = await Hierarchy.all();

    return hierarchies;
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
      const data = request.only(["name"]);

      const hierarchy = await Hierarchy.create(data);

      return hierarchy;
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: "Falha!",
          message: "Tente cadastrar novamente"
        }
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
    const hierarchy = await Hierarchy.findOrFail(params.id);

    return hierarchy;
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request }) {
    try {
      const data = request.only(["name"]);

      const hierarchy = await Hierarchy.findOrFail(params.id);

      hierarchy.merge(data);

      await hierarchy.save();

      return hierarchy;
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: "Falha!",
          message: "Tente atualizar novamente"
        }
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
      const hierarchy = await Hierarchy.findOrFail(params.id);

      await hierarchy.delete();

      return response.status(200).send({
        title: "Sucesso!",
        message: "A hierarquia foi removida."
      });
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: "Falha!",
          message: "Tente remover novamente"
        }
      });
    }
  }
}

module.exports = HierarchyController;
