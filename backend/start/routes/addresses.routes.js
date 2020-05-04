/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  // List all addresses
  Route.get('/', 'AddressController.index');
  // List one address
  Route.get('/:id', 'AddressController.show');
  // Create one address
  Route.post('/', 'AddressController.store');
  // Delete or Update one or more address
  Route.delete('/:id/:index/:netsuite_id', 'AddressController.destroy');
}).prefix('/addresses');
