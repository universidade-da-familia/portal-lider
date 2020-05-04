/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  // List all
  Route.get('/', 'UserController.index');
  // List one
  Route.get('/:id', 'UserController.show');
  // Create one
  Route.post('/', 'UserController.store'); /* .validator('CreateUser'); */
  // Update one
  Route.put('/:id', 'UserController.update');
  // Delete one
  Route.delete('/:id', 'UserController.destroy');
}).prefix('/users');
