/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  // List all payment plans
  Route.get('/', 'PaymentPlanController.index');
  // List one payment plan
  Route.get('/:id', 'PaymentPlanController.show');
  // Create one payment plan
  Route.post('/', 'PaymentPlanController.store');
  // Update one payment plan
  Route.put('/:id', 'PaymentPlanController.update');
  // Delete one payment plan
  Route.delete('/:id', 'PaymentPlanController.destroy');
}).prefix('/payment_plans');
