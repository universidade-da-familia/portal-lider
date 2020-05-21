/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Lesson = use('App/Models/Lesson');

class LessonController {
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
    const lessons = await Lesson.query().with('defaultEvent.ministery').fetch();

    return lessons;
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
        'default_event_id',
        'title',
        'description',
        'video_id',
        'img_url',
      ]);

      const lesson = await Lesson.create(data);

      return lesson;
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
    const lesson = await Lesson.findOrFail(params.id);

    await lesson.load('defaultEvent');

    return lesson;
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
        'default_event_id',
        'title',
        'description',
        'video_id',
        'img_url',
      ]);

      const lesson = await Lesson.findOrFail(params.id);

      lesson.merge(data);

      await lesson.save();

      return lesson;
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
      const lesson = await Lesson.findOrFail(params.id);

      await lesson.delete();

      return response.status(200).send({
        title: 'Sucesso!',
        message: 'A lição foi removida.',
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

module.exports = LessonController;
