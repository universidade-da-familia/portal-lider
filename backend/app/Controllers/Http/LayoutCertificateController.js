"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const LayoutCertificate = use("App/Models/LayoutCertificate");

/**
 * Resourceful controller for interacting with layoutcertificates
 */
class LayoutCertificateController {
  /**
   * Show a list of all layoutcertificates.
   * GET layoutcertificates
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const layoutCertificate = await LayoutCertificate.all();

    return layoutCertificate;
  }

  /**
   * Create/save a new layoutcertificate.
   * POST layoutcertificates
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const data = request.only([
        "content_justify",
        "content_align",
        "name_margin",
        "name_font_family",
        "name_font_size",
        "emission_margin",
        "emission_font_family",
        "emission_font_size"
      ]);

      const layoutCertificate = await LayoutCertificate.create(data);

      return layoutCertificate;
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: "Falha!",
          message: "Erro ao criar o layout do certificado"
        }
      });
    }
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
      const layoutCertificate = await LayoutCertificate.findOrFail(params.id);

      return layoutCertificate;
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: "Falha!",
          message: "Erro ao mostrar o layout do certificado"
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
      const data = request.only([
        "content_justify",
        "content_align",
        "name_margin",
        "name_font_family",
        "name_font_size",
        "emission_margin",
        "emission_font_family",
        "emission_font_size"
      ]);

      const layoutCertificate = await LayoutCertificate.findOrFail(params.id);

      layoutCertificate.merge(data);

      await layoutCertificate.save();

      return layoutCertificate;
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: "Falha!",
          message: "Erro ao atualizar o layout do certificado"
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
      const layoutCertificate = await LayoutCertificate.findOrFail(params.id);

      await layoutCertificate.delete();

      return response.status(200).send({
        title: "Sucesso!",
        message: "O layout do certificado foi removido."
      });
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: "Falha!",
          message: "Erro ao deletar o layout do certificado"
        }
      });
    }
  }
}

module.exports = LayoutCertificateController;
