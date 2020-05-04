/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  // List all relationships of the user
  Route.get('/:user_id', 'RelationshipController.index');
  // Create one relationship
  Route.post('/', 'RelationshipController.store');
  // Update one relationship
  Route.put('/:id', 'RelationshipController.update');
  // Delete one relationship
  Route.delete('/:id', 'RelationshipController.destroy');
}).prefix('/relationships');
