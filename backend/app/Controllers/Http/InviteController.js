"use strict";

//phone number 5519933007189
const Invite = use("App/Models/Invite");

class InviteController {
  /**
   * Show a list of all items.
   * GET items
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ params }) {
    const invites = await Invite.query()
      .where("event_id", params.id)
      .fetch();

    return invites;
  }

  async store({ request }) {
    const data = request.only(["event_id", "event_type", "name", "email"]);

    const invite = await Invite.create(data);

    return invite;
  }

  /**
   * Display a single layoutcertificate.
   * GET layoutcertificates/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, response }) {
    try {
      const invite = await Invite.findOrFail(params.id);

      return invite;
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: "Falha!",
          message: "Erro ao mostrar o convite"
        }
      });
    }
  }

  /**
   * Update layoutcertificate details.
   * PUT or PATCH layoutcertificates/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const data = request.all();

      const invite = await Invite.findOrFail(params.id);

      invite.merge(data);

      await invite.save();

      return invite;
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: "Falha!",
          message: "Erro ao atualizar o convite"
        }
      });
    }
  }

  /**
   * Delete a layoutcertificate with id.
   * DELETE layoutcertificates/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    try {
      const invite = await Invite.findOrFail(params.id);

      await invite.delete();

      return response.status(200).send({
        title: "Sucesso!",
        message: "O convite foi removido."
      });
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: "Falha!",
          message: "Erro ao deletar o convite"
        }
      });
    }
  }
}

module.exports = InviteController;
