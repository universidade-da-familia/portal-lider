/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  //
  Route.get('/:id', 'InviteController.index');
  // Create one invite
  Route.post('/', 'InviteController.store');
  // Update one invite
  Route.put('/:id', 'InviteController.update');
  // Delete one invite
  Route.delete('/:id', 'InviteController.destroy');
}).prefix('/invites');
