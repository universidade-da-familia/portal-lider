/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  // List all kits
  Route.get('/', 'LayoutCertificateController.index');
  // List one kit
  Route.get('/:id', 'LayoutCertificateController.show');
  // Create one kit
  Route.post('/', 'LayoutCertificateController.store');
  // Update one kit
  Route.put('/:id', 'LayoutCertificateController.update');
  // Delete one kit
  Route.delete('/:id', 'LayoutCertificateController.destroy');
}).prefix('/layout_certificates');
