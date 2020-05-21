/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  // List all kits
  Route.get('/', 'LessonController.index');
  // List one kit
  Route.get('/:id', 'LessonController.show');
  // Create one kit
  Route.post('/', 'LessonController.store');
  // Update one kit
  Route.put('/:id', 'LessonController.update');
  // Delete one kit
  Route.delete('/:id', 'LessonController.destroy');
}).prefix('/lessons');
