/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  // Show all participants from event
  Route.get('/:event_id', 'EventParticipantController.index');
  // Create one participant
  Route.post('/', 'EventParticipantController.store');
  // Update one participant
  Route.put('/:id', 'EventParticipantController.update');
  // Show one participant from event
  Route.get('/:cpf_email/:default_event_id', 'EventParticipantController.show');
  // Delete one participant
  Route.delete(
    '/:user_id/:participant_id',
    'EventParticipantController.destroy',
  );
  // Update participant print_date
  Route.put(
    'participant_print_date',
    'EventParticipantController.updatePrintDate',
  );
}).prefix('/event_participants');
