/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  // List all logs
  Route.get('/', 'LogController.index');
}).prefix('/logs');
