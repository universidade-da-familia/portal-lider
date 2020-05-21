/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  // List all kits
  Route.get('/', 'LessonReportController.index');
  // List one kit
  Route.get('/:id', 'LessonReportController.show');
  // Update one kit
  Route.put('/:id', 'LessonReportController.update');
}).prefix('/lesson_reports');
