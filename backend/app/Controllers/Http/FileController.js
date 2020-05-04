/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Drive = use('Drive');
const File = use('App/Models/File');
const User = use('App/Models/User');

/**
 * Resourceful controller for interacting with files
 */
class FileController {
  /**
   * Create/save a new file.
   * POST files
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, params }) {
    request.multipart.file(
      'file',
      {
        types: ['image'],
        size: '2mb',
      },
      async file => {
        try {
          const ContentType = file.headers['content-type'];
          const ACL = 'public-read';
          const Key = `${(Math.random() * 100).toString(32)}-${
            file.clientName
          }`;

          const url = await Drive.put(Key, file.stream, {
            ContentType,
            ACL,
          });

          const dbFile = await File.create({
            file: Key,
            name: file.clientName,
            type: ContentType,
            url,
          });

          const user = await User.findOrFail(params.user_id);

          if (user.file_id) {
            await user.load('file');

            await Drive.delete(user.file.file);
          }

          user.file_id = dbFile.id || user.file_id;

          await user.save();

          return file;
        } catch (err) {
          return response.status(err.status).send({
            error: {
              message: 'Falha ao criar/atualizar o arquivo.',
            },
          });
        }
      },
    );

    await request.multipart.process();
  }

  /**
   * Display a single file.
   * GET files/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, response }) {
    try {
      const { id } = params;
      const file = await File.findOrFail(id);

      response.implicitEnd = false;
      response.header('Content-Type', file.type);

      const stream = await Drive.getStream(file.file);

      stream.pipe(response.response);

      return stream;
    } catch (err) {
      return response.status(err.status).send({
        error: {
          message: 'Arquivo não existe.',
        },
      });
    }
  }

  /**
   * Delete a file with id.
   * DELETE files/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    try {
      const { id } = params;
      const file = await File.findOrFail(id);

      await Drive.delete(file.file);

      await file.delete();

      return response.status(201).send({
        message: 'Imagem removida com sucesso.',
      });
    } catch (err) {
      return response.status(err.status).send({
        error: {
          message: 'O arquivo não pode ser removido ou não existe.',
        },
      });
    }
  }
}

module.exports = FileController;
