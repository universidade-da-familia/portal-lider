/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  // List all kits
  Route.get('/', 'EventController.index');
  // List one kit
  Route.get('/:id', 'EventController.show');
  // Create one kit
  Route.post('/', 'EventController.store');
  // Update one kit
  Route.put('/:id', 'EventController.update');
  // Delete one kit
  Route.delete('/:id', 'EventController.destroy');
  // export to excel
  Route.post('/event_export_excel', 'EventController.exportExcel');
  // paginate events
  Route.post('/event_paginate', 'EventController.indexPaginate');
  // events for print
  Route.post(
    '/event_for_print_certificate',
    'EventController.waitingForAdminPrintCertificates',
  );
}).prefix('/events');
