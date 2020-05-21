const Drive = use('Drive');
const File = use('App/Models/File');
const Entity = use('App/Models/Entity');
const Organization = use('App/Models/Organization');

class FileController {
  async show({ params, response }) {
    try {
      const { id } = params;
      const file = await File.findOrFail(id);

      response.implicitEnd = false;
      response.header('Content-Type', file.type);

      const stream = await Drive.getStream(file.file);

      stream.pipe(response.response);
    } catch (err) {
      return response.status(err.status).send({
        error: {
          message: 'Arquivo não existe!',
          err_message: err.message,
        },
      });
    }
  }

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
            url,
            type: ContentType,
            subtype: file.subtype,
          });

          if (params.type === 'entity') {
            const entity = await Entity.findOrFail(params.user_id);

            entity.file_id = dbFile.id || entity.file_id;

            await entity.save();
          } else {
            const organization = await Organization.findOrFail(params.user_id);

            organization.file_id = dbFile.id || organization.file_id;

            await organization.save();
          }

          return response.status(200).send(file);
        } catch (err) {
          return response.status(err.status).send({
            error: {
              message: 'Não foi possível enviar o arquivo!',
              err_message: err.message,
            },
          });
        }
      },
    );

    await request.multipart.process();
  }

  async destroy({ params, response }) {
    try {
      const { id } = params;
      const file = await File.findOrFail(id);

      await Drive.delete(file.file);

      await file.delete();

      return response.status(200).send({
        message: 'A imagem foi removida.',
      });
    } catch (err) {
      return response.status(err.status).send({
        error: {
          message: 'O arquivo não existe',
          err_message: err.message,
        },
      });
    }
  }
}

module.exports = FileController;
