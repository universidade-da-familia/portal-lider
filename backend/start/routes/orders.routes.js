/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  // List all orders
  Route.get('/', 'OrderController.index');
  // List one order
  Route.get('/:id', 'OrderController.show');
  // Create one order
  Route.post('/', 'OrderController.store');
  // Update one order
  Route.put('/:id', 'OrderController.update');
  // Delete one order
  Route.delete('/:id', 'OrderController.destroy');
  // Delete order netsuite
  Route.delete(
    '/netsuite_order/:netsuite_id/:username',
    'OrderController.destroy_netsuite',
  );
}).prefix('/orders');
