/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  Route.post('/', 'SessionController.store');
  Route.post('/organization_sessions', 'SessionController.store_org');
  Route.get('/:type', 'SessionController.show');
  Route.get('expired_titles/:cpf', 'SessionController.expired_titles');
}).prefix('/sessions');
