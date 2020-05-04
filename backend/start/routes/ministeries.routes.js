/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  // List all ministeries
  Route.get('/', 'MinisteryController.index');
  // List one ministery
  Route.get('/:id', 'MinisteryController.show');
  // Create one ministery
  Route.post('/', 'MinisteryController.store');
  // Update one ministery
  Route.put('/:id', 'MinisteryController.update');
  // Delete one ministery
  Route.delete('/:id', 'MinisteryController.destroy');
}).prefix('/ministeries');
