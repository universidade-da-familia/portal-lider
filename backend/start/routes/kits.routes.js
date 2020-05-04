/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  // List all kits
  Route.get('/', 'KitController.index');
  // List one kit
  Route.get('/:id', 'KitController.show');
  // Create one kit
  Route.post('/', 'KitController.store');
  // Update one kit
  Route.put('/:id', 'KitController.update');
  // Delete one kit
  Route.delete('/:id', 'KitController.destroy');
}).prefix('/kits');
