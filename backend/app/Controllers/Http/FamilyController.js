"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Family = use("App/Models/Family");

const Database = use("Database");

/**
 * Resourceful controller for interacting with families
 */
class FamilyController {
  /**
   * Show a list of all families.
   * GET families
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const families = await Family.query()
      .with("entities")
      .fetch();

    return families;
  }

  /**
   * Create/save a new family.
   * POST families
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const {
        name,
        wedding_date,
        is_divorced,
        husband_id,
        wife_id
      } = request.only([
        "name",
        "wedding_date",
        "is_divorced",
        "husband_id",
        "wife_id"
      ]);

      const trx = await Database.beginTransaction();

      const family = await Family.create({ name, wedding_date, is_divorced });

      await family.entities().attach(
        [husband_id],
        row => {
          row.relationship = "Marido";
        },
        trx
      );

      await family.entities().attach(
        [wife_id],
        row => {
          row.relationship = "Esposa";
        },
        trx
      );

      family.entities = await family.entities().fetch();

      await trx.commit();

      return family;
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
   * Display a single family.
   * GET families/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, response }) {
    try {
      const family = await Family.findByOrFail("name", params.id);

      await family.load("entities");

      return family;
    } catch (err) {
      return response.status(404).send({
        teste: "familia nao encontrada"
      });
    }
  }

  /**
   * Update family details.
   * PUT or PATCH families/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const { name, wedding_date, is_divorced, entities } = request.only([
        "name",
        "wedding_date",
        "is_divorced",
        "entities"
      ]);

      const family = await Family.findOrFail(params.id);

      family.name = name || family.name;
      family.wedding_date = wedding_date || family.wedding_date;
      family.is_divorced = is_divorced || family.is_divorced;

      await family.save();

      if (entities && entities.length > 0) {
        await family.entities().detach();

        await family
          .entities()
          .attach(entities.map(entity => entity.id), row => {
            const entity = entities.find(entity => entity.id === row.entity_id);

            row.relationship = entity.relationship;
          });

        family.entities = await family.entities().fetch();
      }

      return family;
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
   * Delete a family with id.
   * DELETE families/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    try {
      const family = await Family.findOrFail(params.id);

      await family.delete();

      return response.status(200).send({
        title: "Sucesso!",
        message: "A família foi removida."
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

module.exports = FamilyController;
