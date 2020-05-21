/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  // Create one kit
  Route.post('/', 'EventOrganizatorController.store');
  // Update one kit
  Route.put('/:id', 'EventOrganizatorController.update');
  // Delete one kit
  Route.delete('/:id', 'EventOrganizatorController.destroy');

  Route.get('/:event_id', 'EventOrganizatorController.index');
  Route.get(
    '/:organizator_type/:cpf_email/:default_event_id',
    'EventOrganizatorController.show',
  );
  Route.delete(
    '/:user_id/event/:event_id',
    'EventOrganizatorController.destroy',
  );
}).prefix('/event_organizators');
