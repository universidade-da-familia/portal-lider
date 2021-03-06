/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Event = use('App/Models/Event');
const User = use('App/Models/User');
const DefaultEvent = use('App/Models/DefaultEvent');
const Participant = use('App/Models/Participant');
const Log = use('App/Models/Log');

const ValidateEmail = use('App/Controllers/Http/Validations/ValidateEmail');

/**
 * Resourceful controller for interacting with participants
 */
class EventParticipantController {
  /**
   * Show a list of all participants.
   * GET participants
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ params }) {
    const event = await Event.findOrFail(params.event_id);
    const participants = event.participants().fetch();

    return participants;
  }

  /**
   * Create/save a new participant.
   * POST participants
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const { user_id, event_id, assistant } = request.only([
      'user_id',
      'event_id',
      'assistant',
    ]);

    const user_logged_id = parseInt(request.header('user_logged_id'), 10);
    const user_logged_type = request.header('user_logged_type');

    const event = await Event.findOrFail(event_id);
    await event.load('defaultEvent.ministery');

    const user = await User.findOrFail(user_id);

    await user.load('organizators');
    await user.load('participants');

    const event_organizator = user
      .toJSON()
      .organizators.find(
        organizator => organizator.id === parseInt(event_id, 10),
      );

    const event_participant = user
      .toJSON()
      .participants.find(
        participant => participant.id === parseInt(event_id, 10),
      );

    if (event_organizator === undefined) {
      if (event_participant !== undefined) {
        if (!event_participant.pivot.assistant && assistant) {
          await event.participants().detach([user_id]);

          // event.participants_count = event.participants_count - 1;

          await event.participants().attach([user_id], row => {
            row.assistant = assistant;
          });

          if (user_logged_id && user_logged_type) {
            await Log.create({
              action: 'update',
              model: 'participant',
              model_id: event_id,
              description: `O participante id ${user_id} foi atualizado no evento id ${event_id}.`,
              new_data: {
                event_id,
                user_id,
                assistant,
              },
              [`${user_logged_type}_id`]: user_logged_id,
            });
          }
        } else if (event_participant.pivot.assistant && assistant) {
          return response.status(200).send({
            error: {
              title: 'Aviso!',
              message: 'O usuário informado é um líder em treinamento',
            },
          });
        } else if (!event_participant.pivot.assistant && !assistant) {
          return response.status(200).send({
            error: {
              title: 'Aviso!',
              message: 'O usuário informado é um participante',
            },
          });
        } else if (event_participant.pivot.assistant && !assistant) {
          await event.participants().detach([user_id]);

          await event.participants().attach([user_id], row => {
            row.assistant = assistant;
          });

          if (user_logged_id && user_logged_type) {
            await Log.create({
              action: 'update',
              model: 'participant',
              model_id: event_id,
              description: `O participante id ${user_id} foi atualizado no evento id ${event_id}.`,
              new_data: {
                event_id,
                user_id,
                assistant,
              },
              [`${user_logged_type}_id`]: user_logged_id,
            });
          }
        }
      } else {
        if (assistant) {
          if (
            parseInt(user[event.toJSON().defaultEvent.ministery.tag], 10) <
            parseInt(event.toJSON().defaultEvent.assistant_current_event_id, 10)
          ) {
            await User.updateLeaderTrainingHierarchy(
              user_id,
              event.toJSON().defaultEvent.ministery.tag,
              parseInt(
                event.toJSON().defaultEvent.assistant_current_event_id,
                10,
              ),
              'add',
            );
          }
        }

        await event.participants().attach([user_id], row => {
          row.assistant = assistant;
        });

        if (user_logged_id && user_logged_type) {
          await Log.create({
            action: 'create',
            model: 'participant',
            model_id: event_id,
            description: `O participante id ${user_id} foi inserido no evento id ${event_id}.`,
            new_data: {
              event_id,
              user_id,
              assistant,
            },
            [`${user_logged_type}_id`]: user_logged_id,
          });
        }
      }

      await event.participants().fetch();

      // if (!assistant) {
      //   event.participants_count = event.participants_count + 1;
      // }

      await event.save();
    } else {
      return response.status(200).send({
        error: {
          title: 'Falha!',
          message: 'O usuário informado é um organizador.',
        },
      });
    }

    return event;
  }

  /**
   * Display a single participant.
   * GET participants/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, response }) {
    try {
      const defaultEvent = await DefaultEvent.findOrFail(
        params.default_event_id,
      );

      const validateEmail = new ValidateEmail();
      const isEmail = await validateEmail.validate(params.cpf_email);

      const { ministery_id } = defaultEvent;
      const { participant_hierarchy_id } = defaultEvent;
      // const assistant_hierarchy_id = defaultEvent.assistant_hierarchy_id
      const { sex_type } = defaultEvent;

      const participant = isEmail
        ? await User.findByOrFail('email', params.cpf_email)
        : await User.findByOrFail('cpf', params.cpf_email);

      await participant.load('file');

      if (participant.sex === sex_type || sex_type === 'A') {
        if (ministery_id === 1) {
          if (participant.cmn_hierarchy_id >= participant_hierarchy_id) {
            return participant;
          }
          return response.status(200).send({
            error: {
              title: 'Aviso!',
              message: 'O usuário informado não é de um participante válido',
            },
          });
        }
        if (ministery_id === 2) {
          if (participant.mu_hierarchy_id >= participant_hierarchy_id) {
            return participant;
          }
          return response.status(200).send({
            error: {
              title: 'Aviso!',
              message: 'O usuário informado não é de um participante válido',
            },
          });
        }
        if (ministery_id === 3) {
          if (participant.crown_hierarchy_id >= participant_hierarchy_id) {
            return participant;
          }
          return response.status(200).send({
            error: {
              title: 'Aviso!',
              message: 'O usuário informado não é de um participante válido',
            },
          });
        }
        if (ministery_id === 4) {
          if (participant.mp_hierarchy_id >= participant_hierarchy_id) {
            return participant;
          }
          return response.status(200).send({
            error: {
              title: 'Aviso!',
              message: 'O usuário informado não é de um participante válido',
            },
          });
        }
        if (ministery_id === 5) {
          if (participant.ffi_hierarchy_id >= participant_hierarchy_id) {
            return participant;
          }
          return response.status(200).send({
            error: {
              title: 'Aviso!',
              message: 'O usuário informado não é de um participante válido',
            },
          });
        }
        if (ministery_id === 6) {
          if (participant.gfi_hierarchy_id >= participant_hierarchy_id) {
            return participant;
          }
          return response.status(200).send({
            error: {
              title: 'Aviso!',
              message: 'O usuário informado não é de um participante válido',
            },
          });
        }
        if (ministery_id === 7) {
          if (participant.pg_hab_hierarchy_id >= participant_hierarchy_id) {
            return participant;
          }
          return response.status(200).send({
            error: {
              title: 'Aviso!',
              message: 'O usuário informado não é de um participante válido',
            },
          });
        }
        if (ministery_id === 8) {
          if (participant.pg_yes_hierarchy_id >= participant_hierarchy_id) {
            return participant;
          }
          return response.status(200).send({
            error: {
              title: 'Aviso!',
              message: 'O usuário informado não é de um participante válido',
            },
          });
        }
      } else {
        if (sex_type === 'M') {
          return response.status(200).send({
            error: {
              title: 'Aviso!',
              message: 'Evento exclusivo para o sexo masculino.',
              type: 'sex_type',
            },
          });
        }
        return response.status(200).send({
          error: {
            title: 'Aviso!',
            message: 'Evento exclusivo para o sexo feminino.',
            type: 'sex_type',
          },
        });
      }
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: 'Falha!',
          message: 'Nenhum participante foi encontrado',
          type: 'not_found',
        },
      });
    }
  }

  /**
   * Update participant details.
   * PUT or PATCH participants/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const { is_quitter, assistant, print_date } = request.only([
        'is_quitter',
        'assistant',
        'print_date',
      ]);

      const user_logged_id = parseInt(request.header('user_logged_id'), 10);
      const user_logged_type = request.header('user_logged_type');

      const participant = await Participant.findOrFail(params.id);

      if (user_logged_id && user_logged_type) {
        await Log.create({
          action: 'update',
          model: 'participant',
          model_id: participant.event_id,
          description: `O participante id ${participant.user_id} foi atualizado no evento id ${participant.event_id}.`,
          new_data: {
            id: participant.id,
            user_id: participant.user_id,
            event_id: participant.event_id,
            is_quitter,
            assistant,
            print_date,
          },
          [`${user_logged_type}_id`]: user_logged_id,
        });
      }

      participant.is_quitter = is_quitter;
      participant.assistant = assistant;
      participant.print_date = print_date;

      await participant.save();

      return participant;
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: 'Falha!',
          message: 'Erro ao atualizar o participante',
        },
      });
    }
  }

  /**
   * Update participant details.
   * PUT or PATCH participants/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async updatePrintDate({ request, response }) {
    try {
      const { participants_id, event_id } = request.only([
        'participants_id',
        'event_id',
      ]);

      const user_logged_id = parseInt(request.header('user_logged_id'), 10);
      const user_logged_type = request.header('user_logged_type');

      const current_date = new Date();

      const participants = await Participant.query()
        .whereIn('id', participants_id)
        .update({ print_date: current_date });

      if (user_logged_id && user_logged_type) {
        await Log.create({
          action: 'update',
          model: 'participant',
          model_id: event_id,
          description: `Certificados impressos para vários participantes no evento id ${event_id}.`,
          new_data: {
            participants: participants_id,
            current_date,
          },
          [`${user_logged_type}_id`]: user_logged_id,
        });
      }

      return participants;
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: 'Falha!',
          message: 'Erro ao atualizar o participante',
        },
      });
    }
  }

  /**
   * Delete a participant with id.
   * DELETE participants/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ request, params, response }) {
    try {
      const user_logged_id = parseInt(request.header('user_logged_id'), 10);
      const user_logged_type = request.header('user_logged_type');

      const user = await User.findOrFail(params.user_id);
      const participant = await Participant.findOrFail(params.participant_id);
      const event = await Event.findOrFail(participant.event_id);
      await event.load('defaultEvent.ministery');

      await event.participants().detach([participant.user_id]);

      await event.participants().fetch();

      await event.save();

      if (
        parseInt(user[event.toJSON().defaultEvent.ministery.tag], 10) <=
        parseInt(event.toJSON().defaultEvent.assistant_current_event_id, 10)
      ) {
        await User.updateLeaderTrainingHierarchy(
          params.user_id,
          event.toJSON().defaultEvent.ministery.tag,
          parseInt(event.toJSON().defaultEvent.assistant_current_event_id, 10),
          'delete',
        );
      }

      if (user_logged_id && user_logged_type) {
        await Log.create({
          action: 'delete',
          model: 'participant',
          model_id: event.id,
          description: `O participante id ${user.id} foi removido do evento id ${event.id}.`,
          [`${user_logged_type}_id`]: user_logged_id,
        });
      }

      return response.status(200).send({
        title: 'Sucesso!',
        message: 'O participante foi removido do evento.',
      });
    } catch (err) {
      return response.status(err.status).send({
        error: {
          title: 'Falha!',
          message: 'Erro ao excluir o participante no evento',
        },
      });
    }
  }
}

module.exports = EventParticipantController;
