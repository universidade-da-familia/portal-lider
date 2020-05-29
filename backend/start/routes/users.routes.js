/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  // ENTITIES
  // List all
  Route.get('/entities', 'UserController.index');
  // List one
  Route.get('/entities/:id', 'UserController.show');
  // Create one
  Route.post(
    '/entities/',
    'UserController.store',
  ); /* .validator('CreateUser'); */
  // Update one
  Route.put('/entities/:id', 'UserController.update');
  // Delete one
  Route.delete('/entities/:id', 'UserController.destroy');

  // ORGANIZATIONS
  // List all
  Route.get('/organizations/', 'UserController.index');
  // List one
  Route.get('/organizations/:id', 'UserController.show');
  // Create one
  Route.post(
    '/organizations/',
    'UserController.store',
  ); /* .validator('CreateUser'); */
  // Update one
  Route.put('/organizations/:id', 'UserController.update');
  // Delete one
  Route.delete('/organizations/:id', 'UserController.destroy');
  // Organization paginate
  Route.post('/organization_paginate', 'UserController.organizationPaginate');
  // Organization export excel
  Route.post(
    '/organization_export_excel',
    'UserController.organizationExportExcel',
  );
  // organization params
  Route.post('/organization_params', 'UserController.organizationParams');
  // netsuite organization
  Route.post(
    '/netsuite_organization/:netsuite_id',
    'UserController.update_netsuite',
  );
}).prefix('/users');
