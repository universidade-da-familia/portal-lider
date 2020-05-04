/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  // List one
  Route.get('/:id', 'FileController.show');
  // Create one
  Route.post('/:user_id', 'FileController.store');
  // Delete one
  Route.delete('/:id', 'FileController.destroy');
}).prefix('/files');
