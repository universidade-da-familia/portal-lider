/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  // List all kits
  Route.get('/', 'DefaultEventController.index');
  // List one kit
  Route.get('/:id', 'DefaultEventController.show');
  // Create one kit
  Route.post('/', 'DefaultEventController.store');
  // Update one kit
  Route.put('/:id', 'DefaultEventController.update');
  // Delete one kit
  Route.delete('/:id', 'DefaultEventController.destroy');
  // organizator events
  Route.post(
    '/organizator_events',
    'DefaultEventController.organizator_events',
  );
}).prefix('/default_events');
