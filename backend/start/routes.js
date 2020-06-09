'use strict'

const Route = use('Route')

Route.post('payment_confirmation', 'OrderTransactionController.update')

Route.post('generate_lesson_reports', 'GenerateLessonReportController.store')

// Logando usuario
Route.post('sessions', 'SessionController.store')
Route.post('organization_sessions', 'SessionController.store_org')
Route.get('sessions/:type', 'SessionController.show')
Route.get('expired_titles/:cpf', 'SessionController.expired_titles')

// CRUD usuário
Route.resource('entity', 'EntityController').except([
  'edit',
  'create',
  'store',
  'update',
  'update_netsuite'
])
Route.post('entity', 'EntityController.store').validator('Entity')
Route.put('entity/:id', 'EntityController.update').validator('EntityUpdate')
Route.post('entity_paginate', 'EntityController.indexPaginate')
Route.post('entity_export_excel', 'EntityController.exportExcel')
Route.get('entity/cpf/:cpf/:profile_id', 'EntityController.showCpf')

Route.put('change_password/:id/:user_type', 'ChangePasswordController.update')

Route.put('netsuite_entity/:netsuite_id', 'EntityController.update_netsuite')

Route.put('entity_hierarchy/:event_id', 'EntityHierarchyController.update')

// CRUD familia
Route.resource('family', 'FamilyController')

// CRUD ministério
Route.resource('ministery', 'MinisteryController').except(['edit', 'create'])

// CRUD hierarquias
Route.resource('hierarchy', 'HierarchyController').except(['edit', 'create'])

// CRUD ministério
Route.resource('kit', 'KitController').except(['edit', 'create'])

Route.get('layout_certificates', 'LayoutCertificateController.index')
Route.post('layout_certificate', 'LayoutCertificateController.store').validator(
  'LayoutCertificate'
)
Route.get('layout_certificate/:id', 'LayoutCertificateController.show')
Route.put(
  'layout_certificate/:id',
  'LayoutCertificateController.update'
).validator('LayoutCertificate')
Route.delete('layout_certificate/:id', 'LayoutCertificateController.destroy')

// CRUD kits
Route.resource('kit', 'KitController').except(['edit', 'create'])

// CRUD products
Route.resource('product', 'ProductController').except(['edit', 'create'])

// CRUD default event
Route.resource('default_event', 'DefaultEventController').except([
  'organizator_events',
  'edit',
  'create'
])
Route.post('organizator_events', 'DefaultEventController.organizator_events')

// CRUD lesson
Route.resource('lesson', 'LessonController').except(['edit', 'create'])

// CRUD lesson report
Route.get('lesson_reports/:event_id', 'LessonReportController.index')
Route.put('lesson_report/:id', 'LessonReportController.update')
Route.get('lesson_report/:id', 'LessonReportController.show')

// CRUD programation
Route.resource('programation', 'ProgramationController').except([
  'edit',
  'create'
])

// CRUD event
Route.resource('event', 'EventController').except(['edit', 'create'])
Route.post('event_export_excel', 'EventController.exportExcel')
Route.post('event_paginate', 'EventController.indexPaginate')
Route.post(
  'event_for_print_certificate',
  'EventController.waitingForAdminPrintCertificates'
)

// CRUD Organization
Route.resource('organization', 'OrganizationController').except([
  'show',
  'edit',
  'create',
  'update',
  'indexParams'
])
Route.get('organization/:id', 'OrganizationController.show')
Route.put('organization/:id', 'OrganizationController.update').validator('Organization')
Route.post('organization_paginate', 'OrganizationController.indexPaginate')
Route.post('organization_export_excel', 'OrganizationController.exportExcel')
Route.post('organization_params', 'OrganizationController.indexParams')
Route.put('netsuite_organization/:netsuite_id', 'OrganizationController.update_netsuite')

// CRUD invite
Route.resource('invite', 'InviteController').except([
  'index',
  'show',
  'edit',
  'create'
])
Route.get('invites/:id', 'InviteController.index')

// CRUD organizators
Route.resource('event_organizator', 'EventOrganizatorController').except([
  'index',
  'show',
  'delete',
  'edit',
  'create'
])
Route.get('event_organizators/:event_id', 'EventOrganizatorController.index')
Route.get(
  'event_organizator/:organizator_type/:cpf_email/:default_event_id',
  'EventOrganizatorController.show'
)
Route.delete(
  'event_organizator/:entity_id/event/:event_id',
  'EventOrganizatorController.destroy'
)

// CRUD participants
Route.resource('event_participant', 'EventParticipantController').except([
  'index',
  'show',
  'edit',
  'create',
  'destroy'
])
Route.get('event_participants/:event_id', 'EventParticipantController.index')
Route.get(
  'event_participant/:cpf_email/:default_event_id',
  'EventParticipantController.show'
)
Route.delete('event_participant/:entity_id/:participant_id', 'EventParticipantController.destroy')
Route.put('participant_print_date', 'EventParticipantController.updatePrintDate')

// CRUD entity organizators
Route.resource('entity_organizator', 'EntityOrganizatorController').except([
  'edit',
  'create'
])

// CRUD entity participants
Route.resource('entity_participant', 'EntityParticipantController').except([
  'store',
  'edit',
  'create'
])
Route.post('entity_participant/:event_id', 'EntityParticipantController.store')

// CRUD responsible organization on event
Route.resource('event_organization', 'EventOrganizationController').except([
  'show',
  'store',
  'edit',
  'create'
])
Route.get('event_organizations/:cnpj', 'EventOrganizationController.show')
Route.post('event_organization/:event_id', 'EventOrganizationController.store')

// Solicitando e resetando a senha PF
Route.post('forgot_password', 'ForgotPasswordController.store')
Route.put('forgot_password', 'ForgotPasswordController.update')
// Solicitando e resetando a senha PJ
Route.post('forgot_password_pj', 'ForgotPasswordPjController.store')
Route.put('forgot_password_pj', 'ForgotPasswordPjController.update')

Route.post('files/:user_id/:type', 'FileController.store')
Route.get('files/:id', 'FileController.show')
Route.delete('files/:id', 'FileController.destroy')

Route.get('site_event/:id', 'SiteEventController.show')

Route.resource('address', 'AddressController').except(['edit', 'create', 'destroy'])
Route.delete('address/:id/:index/:netsuite_id', 'AddressController.destroy')

Route.resource('bank_account', 'BankAccountController').except(['edit', 'create', 'destroy'])
Route.delete('bank_account/:id/:index/:netsuite_id', 'BankAccountController.destroy')

Route.resource('category', 'CategoryController').except(['edit', 'create'])

Route.resource('status', 'StatusController').except(['edit', 'create'])

Route.resource('coupon', 'CouponController').except(['edit', 'create'])

Route.resource('order', 'OrderController').except(['edit', 'create', 'destroy_netsuite'])
Route.delete('netsuite_order/:netsuite_id/:username', 'OrderController.destroy_netsuite')

Route.post('shipping_tag', 'ShippingTagController.index')

Route.resource('relationship', 'RelationshipController')
Route.get('relationship/entity/:entity_id', 'RelationshipController.indexEntity')

Route.resource('payment_plan', 'PaymentPlanController')

Route.post('logs', 'LogController.index')

Route.group(() => {
  // Busca o Líder solicitado pelo CPF
  Route.get('leader/:cpf', 'LeaderController.show')

  // Busca evento/eventos
  // Route.get("events/:id", "EventController.index");
  // Route.get("event/:id", "EventController.show");

  // Envia email para convidar participante para evento
  // Route.post("event_invite", "InviteController.store");
  // Route.get("event_invite/:id", "InviteController.index");

  // Busca Lição
  Route.get('lesson/:id', 'LessonController.show')
}).middleware(['auth'])
