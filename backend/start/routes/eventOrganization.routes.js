/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  // List all kits
  Route.get('/', 'EventOrganizationController.index');
  // Update one kit
  Route.put('/:id', 'EventOrganizationController.update');
  // Delete one kit
  Route.delete('/:id', 'EventOrganizationController.destroy');
  // organization cnpj
  Route.get('/:cnpj', 'EventOrganizationController.show');
  // organization event id
  Route.post('/:event_id', 'EventOrganizationController.store');
}).prefix('/event_organizations');
