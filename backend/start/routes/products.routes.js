/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  // List all kits
  Route.get('/', 'ProductController.index');
  // List one kit
  Route.get('/:id', 'ProductController.show');
  // Create one kit
  Route.post('/', 'ProductController.store');
  // Update one kit
  Route.put('/:id', 'ProductController.update');
  // Delete one kit
  Route.delete('/:id', 'ProductController.destroy');
}).prefix('/products');
