/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  // List all statuses
  Route.get('/', 'StatusController.index');
  // List one status
  Route.get('/:id', 'StatusController.show');
  // Create one status
  Route.post('/', 'StatusController.store');
  // Update one status
  Route.put('/:id', 'StatusController.update');
  // Delete one status
  Route.delete('/:id', 'StatusController.destroy');
}).prefix('/statuses');
