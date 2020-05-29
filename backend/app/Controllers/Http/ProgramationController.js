"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Programation = use("App/Models/Programation");

class ProgramationController {
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
    const programations = await Programation.all();

    return programations;
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
        "event_id",
        "title",
        "description",
        "date",
        "start_time",
        "end_time"
      ]);

      const programation = await Programation.create(data);

      return programation;
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
    const programation = await Programation.findOrFail(params.id);

    return programation;
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
      const data = request.only([
        "event_id",
        "title",
        "description",
        "date",
        "start_time",
        "end_time"
      ]);

      const programation = await Programation.findOrFail(params.id);

      programation.merge(data);

      await programation.save();

      return programation;
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
      const programation = await Programation.findOrFail(params.id);

      await programation.delete();

      return response.status(200).send({
        title: "Sucesso!",
        message: "A programação foi removida."
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

module.exports = ProgramationController;
