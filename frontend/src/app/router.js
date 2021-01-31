/* eslint-disable react/jsx-props-no-spreading */
// import external modules
import React, { Suspense, lazy } from 'react';
import ReactGA from 'react-ga';
import { Switch } from 'react-router-dom';

import { ConnectedRouter } from 'connected-react-router';

import Spinner from '~/components/spinner/spinner';
// import internal(own) modules
import ErrorLayoutRoute from '~/layouts/routes/errorRoutes';
import FullPageLayout from '~/layouts/routes/fullpageRoutes';
// import MainLayoutRoutes from '~/layouts/routes/mainRoutes';
import ProtectedFullPageLayout from '~/layouts/routes/protectedFullPageRoutes';
import ProtectedLoginPage from '~/layouts/routes/protectedLoginPage';
import ProtectedMainLayoutRoutes from '~/layouts/routes/protectedMainRoutes';
import ProtectedMainLayoutRoutesAdmin from '~/layouts/routes/protectedMainRoutesAdmin';

import history from './history';

// UDF
const LazyGroups = lazy(() => import('~/views/events/groups/index'));
const LazyGroupEdit = lazy(() => import('~/views/events/groups/edit/index'));
const LazyLessonEdit = lazy(() =>
  import('~/views/events/groups/edit/lesson/index')
);

const LazyGroupCreate = lazy(() =>
  import('~/views/events/groups/create/index')
);

const LazyTrainings = lazy(() => import('~/views/events/trainings/index'));
const LazyTrainingEdit = lazy(() =>
  import('~/views/events/trainings/edit/index')
);

const LazyTrainingCreate = lazy(() =>
  import('~/views/events/trainings/create/index')
);
const LazySeminaries = lazy(() => import('~/views/events/seminaries/index'));
const LazySeminariesSmallGroups = lazy(() =>
  import('~/views/events/seminaries/smallGroups/index')
);

const LazyOrders = lazy(() => import('~/views/orders/index'));
const LazyOrdersCreate = lazy(() => import('~/views/orders/create/index'));
const LazyOrdersRead = lazy(() => import('~/views/orders/read/index'));

const LazyFaq = lazy(() => import('~/views/pages/faq'));

const LazyUserProfile = lazy(() => import('~/views/profile/index'));
// const LazyHome = lazy(() => import('~/views/home/index'));

// Opções para edição de grupos
const LazyCertificate = lazy(() => import('~/views/certificate/index'));
const LazyNameTag = lazy(() => import('~/views/nameTag/index'));
const LazyNameCard = lazy(() => import('~/views/nameCard/index'));
// MUDAR DEPOIS PARA /VIEWS/EVENTS/SEMINARIES ***
const LazyGroupSeparation = lazy(() =>
  import('~/views/events/groups/edit/groupSeparation/index')
);

// Main Layout
const LazyHorizontalTimeline = lazy(() =>
  import('~/views/pages/horizontalTimeline')
);
const LazyVerticalTimeline = lazy(() =>
  import('~/views/pages/verticalTimeline')
);
const LazyInvoice = lazy(() => import('~/views/pages/invoice'));
const LazyGallery = lazy(() => import('~/views/pages/gallery'));
const LazyFAQ = lazy(() => import('~/views/pages/faq'));
const LazyKnowledgeBase = lazy(() => import('~/views/pages/knowledgeBase'));
const LazySearch = lazy(() => import('~/views/pages/search'));
const LazyBlankPage = lazy(() => import('~/views/pages/blankPage'));
const LazyChangeLogPage = lazy(() => import('~/views/pages/changeLogPage'));

// Full Layout
const LazySiteEvent = lazy(() => import('~/views/pages/siteEvent'));
const LazyForgotPassword = lazy(() => import('~/views/pages/forgotPassword'));
const LazyForgotPasswordPJ = lazy(() =>
  import('~/views/pages/forgotPasswordPJ')
);
const LazyExpiredPassword = lazy(() => import('~/views/pages/expiredPassword'));
const LazyResetPassword = lazy(() =>
  import('~/views/pages/forgotPasswordConfirmation')
);
const LazyResetPasswordPJ = lazy(() =>
  import('~/views/pages/forgotPasswordConfirmationPJ')
);
// const LazyLoginChoice = lazy(() => import('~/views/pages/loginChoice'));
const LazyLoginChoicePF = lazy(() => import('~/views/pages/loginChoicePF'));
// const LazyLoginChoicePJ = lazy(() => import('~/views/pages/loginChoicePJ'));
const LazyRegister = lazy(() => import('~/views/pages/register'));
const LazyCheckoutItem = lazy(() =>
  import('~/views/pages/checkout/checkoutItem')
);
const LazyCheckoutLogin = lazy(() =>
  import('~/views/pages/checkout/checkoutLogin')
);
const LazyCheckoutPayment = lazy(() =>
  import('~/views/pages/checkout/checkoutPayment')
);
const LazyInviteConfirmation = lazy(() =>
  import('~/views/pages/inviteConfirmation')
);
const LazyInviteConfirmationBuyer = lazy(() =>
  import('~/views/pages/inviteConfirmationBuyer/index')
);
const LazyInviteTrainingConfirmationBuyer = lazy(() =>
  import('~/views/pages/inviteTrainingConfirmationBuyer/index')
);
const LazyInviteConfirmed = lazy(() => import('~/views/pages/inviteConfirmed'));
const LazyInviteTrainingConfirmed = lazy(() =>
  import('~/views/pages/inviteTrainingConfirmed')
);

const LazyInviteExpired = lazy(() => import('~/views/pages/inviteExpired'));

const LazyMaintainance = lazy(() => import('~/views/pages/maintainance'));
const LazyLockScreen = lazy(() => import('~/views/pages/lockScreen'));

// ADMIN PAGES
const LazyAdminMinistery = lazy(() =>
  import('~/views/admin/configurations/ministery/index')
);
const LazyAdminEditMinistery = lazy(() =>
  import('~/views/admin/configurations/ministery/edit')
);

const LazyAdminCertificate = lazy(() =>
  import('~/views/admin/configurations/certificate')
);
// const LazyAdminEditCertificate = lazy(() => import('~/views/admin/configurations/certificate/edit'));
// const LazyAdminCreateCertificate = lazy(() => import('~/views/admin/configurations/certificate/create'));

// const LazyAdminProduct = lazy(() => import('~/views/admin/configurations/product'));
// const LazyAdminEditProduct = lazy(() => import('~/views/admin/configurations/product/edit'));
// const LazyAdminCreateProduct = lazy(() => import('~/views/admin/configurations/product/create'));

// const LazyAdminKit = lazy(() => import('~/views/admin/configurations/kit'));
// const LazyAdminEditKit = lazy(() => import('~/views/admin/configurations/kit/edit'));
// const LazyAdminCreateKit = lazy(() => import('~/views/admin/configurations/kit/create'));

// const LazyAdminDefaultEvent = lazy(() => import('~/views/admin/configurations/defaultEvent'));
// const LazyAdminEditDefaultEvent = lazy(() => import('~/views/admin/configurations/defaultEvent/edit'));
// const LazyAdminCreateDefaultEvent = lazy(() => import('~/views/admin/configurations/defaultEvent/create'));

const LazyAdminLesson = lazy(() =>
  import('~/views/admin/configurations/lesson')
);
const LazyAdminEditLesson = lazy(() =>
  import('~/views/admin/configurations/lesson/edit')
);
const LazyAdminCreateLesson = lazy(() =>
  import('~/views/admin/configurations/lesson/create')
);

// ADMIN CONSULT EVENTS
const LazyAdminConsultEvent = lazy(() =>
  import('~/views/admin/consult/events')
);
// ADMIN CONSULT ENTITIES
const LazyAdminConsultEntities = lazy(() =>
  import('~/views/admin/consult/entities')
);
const LazyAdminConsultEntitiesEdit = lazy(() =>
  import('~/views/admin/consult/entities/edit')
);
const LazyAdminConsultOrganizationsEdit = lazy(() =>
  import('~/views/admin/consult/entities/editPJ')
);

// Error Pages
const LazyErrorPage = lazy(() => import('~/views/pages/error'));

ReactGA.initialize('UA-158685144-1');

history.listen(location => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

export default function Router() {
  return (
    // Set the directory path if you are deplying in sub-folder
    <ConnectedRouter history={history}>
      <Switch>
        {/* COMENTADO ATÉ LIBERAR LOGIN PARA EMPRESA */}
        {/* <ProtectedLoginPage
            exact
            path="/"
            render={matchprops => (
              <Suspense fallback={<Spinner />}>
                <LazyLoginChoice {...matchprops} />
              </Suspense>
            )}
          /> */}

        {/* <ProtectedLoginPage
            exact
            path="/acesso-pf"
            render={matchprops => (
              <Suspense fallback={<Spinner />}>
                <LazyLoginChoicePF {...matchprops} />
              </Suspense>
            )}
          />
          <ProtectedLoginPage
            exact
            path="/acesso-pj"
            render={matchprops => (
              <Suspense fallback={<Spinner />}>
                <LazyLoginChoicePJ {...matchprops} />
              </Suspense>
            )}
          /> */}

        {/* APAGAR ESSA ROTA DEPOIS QUE LIBERAR LOGIN PARA EMPRESA */}
        <ProtectedLoginPage
          exact
          path="/"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyLoginChoicePF {...matchprops} />
            </Suspense>
          )}
        />

        {/* <ProtectedMainLayoutRoutes
            exact
            path="/inicio"
            render={matchprops => (
              <Suspense fallback={<Spinner />}>
                <LazyHome {...matchprops} />
              </Suspense>
            )}
          /> */}

        {/* Eventos */}
        <ProtectedMainLayoutRoutes // GRUPOS
          exact
          path="/eventos/grupos"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyGroups {...matchprops} />
            </Suspense>
          )}
        />

        <ProtectedMainLayoutRoutes // GRUPOS EDITAR
          exact
          path="/eventos/grupo/:event_id/editar"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyGroupEdit {...matchprops} />
            </Suspense>
          )}
        />

        <ProtectedMainLayoutRoutes
          exact
          path="/eventos/grupo/:event_id/editar/aula/:lesson_id"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyLessonEdit {...matchprops} />
            </Suspense>
          )}
        />

        <ProtectedMainLayoutRoutes // grupos
          exact
          path="/eventos/grupo/criar"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyGroupCreate {...matchprops} />
            </Suspense>
          )}
        />

        <ProtectedMainLayoutRoutes
          exact
          path="/eventos/treinamentos"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyTrainings {...matchprops} />
            </Suspense>
          )}
        />

        <ProtectedMainLayoutRoutes // treinamentos EDITAR
          exact
          path="/eventos/treinamento/:event_id/editar"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyTrainingEdit {...matchprops} />
            </Suspense>
          )}
        />

        <ProtectedMainLayoutRoutes // treinamentos
          exact
          path="/eventos/treinamento/criar"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyTrainingCreate {...matchprops} />
            </Suspense>
          )}
        />

        <ProtectedMainLayoutRoutes // SEMINARIOS
          exact
          path="/eventos/seminarios"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazySeminaries {...matchprops} />
            </Suspense>
          )}
        />

        <ProtectedMainLayoutRoutes // SEMINARIOS
          exact
          path="/eventos/seminarios/grupospequenos"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazySeminariesSmallGroups {...matchprops} />
            </Suspense>
          )}
        />

        <ProtectedMainLayoutRoutes
          exact
          path="/pedidos"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyOrders {...matchprops} />
            </Suspense>
          )}
        />

        <ProtectedMainLayoutRoutes
          exact
          path="/pedidos/criar"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyOrdersCreate {...matchprops} />
            </Suspense>
          )}
        />

        <ProtectedMainLayoutRoutes
          exact
          path="/pedido/:order_id/visualizar"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyOrdersRead {...matchprops} />
            </Suspense>
          )}
        />

        <ProtectedMainLayoutRoutes
          exact
          path="/faq"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyFaq {...matchprops} />
            </Suspense>
          )}
        />

        {/* Saperate Pages Views */}
        <FullPageLayout
          exact
          path="/senha-expirada"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyExpiredPassword {...matchprops} />
            </Suspense>
          )}
        />

        <FullPageLayout
          exact
          path="/recuperar-senha-pf"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyForgotPassword {...matchprops} />
            </Suspense>
          )}
        />
        <FullPageLayout
          exact
          path="/recuperar-senha-pj"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyForgotPasswordPJ {...matchprops} />
            </Suspense>
          )}
        />

        <FullPageLayout
          exact
          path="/resetar-senha-pf/:token"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyResetPassword {...matchprops} />
            </Suspense>
          )}
        />
        <FullPageLayout
          exact
          path="/resetar-senha-pj/:token"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyResetPasswordPJ {...matchprops} />
            </Suspense>
          )}
        />

        <ProtectedMainLayoutRoutes
          exact
          path="/horizontal-timeline"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyHorizontalTimeline {...matchprops} />
            </Suspense>
          )}
        />

        <ProtectedMainLayoutRoutes
          exact
          path="/vertical-timeline"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyVerticalTimeline {...matchprops} />
            </Suspense>
          )}
        />

        <FullPageLayout
          exact
          path="/cadastro"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyRegister {...matchprops} />
            </Suspense>
          )}
        />

        <ProtectedMainLayoutRoutes
          exact
          path="/perfil"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyUserProfile {...matchprops} />
            </Suspense>
          )}
        />

        <FullPageLayout
          exact
          path="/lockscreen"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyLockScreen {...matchprops} />
            </Suspense>
          )}
        />

        <ProtectedMainLayoutRoutes
          exact
          path="/invoice"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyInvoice {...matchprops} />
            </Suspense>
          )}
        />

        <ProtectedMainLayoutRoutes
          exact
          path="/blank-page"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyBlankPage {...matchprops} />
            </Suspense>
          )}
        />

        <ProtectedMainLayoutRoutes
          exact
          path="/change-log"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyChangeLogPage {...matchprops} />
            </Suspense>
          )}
        />

        <FullPageLayout
          exact
          path="/maintenance"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyMaintainance {...matchprops} />
            </Suspense>
          )}
        />

        <ProtectedMainLayoutRoutes
          exact
          path="/gallery"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyGallery {...matchprops} />
            </Suspense>
          )}
        />

        <ProtectedMainLayoutRoutes
          exact
          path="/faq"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyFAQ {...matchprops} />
            </Suspense>
          )}
        />

        <ProtectedMainLayoutRoutes
          exact
          path="/knowledge-base"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyKnowledgeBase {...matchprops} />
            </Suspense>
          )}
        />

        <ProtectedMainLayoutRoutes
          exact
          path="/search"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazySearch {...matchprops} />
            </Suspense>
          )}
        />

        {/* -------------- Site dos eventos --------------*/}
        <FullPageLayout
          exact
          path="/evento/:event_id"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazySiteEvent {...matchprops} />
            </Suspense>
          )}
        />

        {/* Tela de escolha do item do checkout - inscrição em eventos */}
        <FullPageLayout
          exact
          path="/evento/:event_id/convite/:id/confirmacao"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyInviteConfirmation {...matchprops} />
            </Suspense>
          )}
        />

        <FullPageLayout
          exact
          path="/evento/:event_id/convite/:id/confirmacao-comprador"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyInviteConfirmationBuyer {...matchprops} />
            </Suspense>
          )}
        />

        <FullPageLayout
          exact
          path="/evento/:event_id/confirmacao-treinamento"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyInviteTrainingConfirmationBuyer {...matchprops} />
            </Suspense>
          )}
        />

        <FullPageLayout
          exact
          path="/evento/:event_id/convite/:id/confirmacao/sucesso"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyInviteConfirmed {...matchprops} />
            </Suspense>
          )}
        />

        <FullPageLayout
          exact
          path="/evento/:event_id/convite/:id/confirmacao/treinamento/sucesso"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyInviteTrainingConfirmed {...matchprops} />
            </Suspense>
          )}
        />

        <FullPageLayout
          exact
          path="/evento/:event_id/convite/expirado"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyInviteExpired {...matchprops} />
            </Suspense>
          )}
        />

        {/* Tela de escolha do item do checkout - inscrição em eventos */}
        <FullPageLayout
          exact
          path="/evento/:event_id/checkout/convite/:id"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyCheckoutItem {...matchprops} />
            </Suspense>
          )}
        />
        <FullPageLayout
          exact
          path="/evento/:event_id/checkout"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyCheckoutItem {...matchprops} />
            </Suspense>
          )}
        />

        {/* Tela de login do checkout - inscrição em eventos */}
        <FullPageLayout
          exact
          path="/evento/:event_id/checkout/login/convite/:id"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyCheckoutLogin {...matchprops} />
            </Suspense>
          )}
        />
        <FullPageLayout
          exact
          path="/evento/:event_id/checkout/login"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyCheckoutLogin {...matchprops} />
            </Suspense>
          )}
        />

        {/* Tela de pagamento do checkout - inscrição em eventos */}
        <FullPageLayout
          exact
          path="/evento/:event_id/checkout/pagamento/convite/:id"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyCheckoutPayment {...matchprops} />
            </Suspense>
          )}
        />
        <FullPageLayout
          exact
          path="/evento/:event_id/checkout/pagamento"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyCheckoutPayment {...matchprops} />
            </Suspense>
          )}
        />

        {/* -------------------- teste de certificados ------------------------*/}
        <ProtectedFullPageLayout
          exact
          path="/eventos/grupo/:event_id/certificados"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyCertificate {...matchprops} />
            </Suspense>
          )}
        />
        <ProtectedFullPageLayout
          exact
          path="/eventos/grupo/:event_id/crachas"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyNameTag {...matchprops} />
            </Suspense>
          )}
        />
        <ProtectedFullPageLayout
          exact
          path="/eventos/grupo/:event_id/cartoes"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyNameCard {...matchprops} />
            </Suspense>
          )}
        />
        <ProtectedMainLayoutRoutes
          exact
          path="/eventos/grupo/:event_id/organizacao-grupos"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyGroupSeparation {...matchprops} />
            </Suspense>
          )}
        />

        {/* -------- TELAS ADMINISTRATIVAS ---------- */}
        {/* <ProtectedMainLayoutRoutes
            exact
            path="/admin/eventos"
            render={matchprops => (
              <Suspense fallback={<Spinner />}>
                <LazyAdminDefaultEvent {...matchprops} />
              </Suspense>
            )}
          />
            */}

        <ProtectedMainLayoutRoutesAdmin
          exact
          path="/admin/configuracao/licoes"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyAdminLesson {...matchprops} />
            </Suspense>
          )}
        />
        <ProtectedMainLayoutRoutesAdmin
          exact
          path="/admin/configuracao/licoes/:lesson_id/editar"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyAdminEditLesson {...matchprops} />
            </Suspense>
          )}
        />
        <ProtectedMainLayoutRoutesAdmin
          exact
          path="/admin/configuracao/licoes/criar"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyAdminCreateLesson {...matchprops} />
            </Suspense>
          )}
        />

        <ProtectedMainLayoutRoutesAdmin
          exact
          path="/admin/configuracao/ministerios"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyAdminMinistery {...matchprops} />
            </Suspense>
          )}
        />
        <ProtectedMainLayoutRoutesAdmin
          exact
          path="/admin/configuracao/ministerios/:ministery_id/editar"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyAdminEditMinistery {...matchprops} />
            </Suspense>
          )}
        />

        <ProtectedMainLayoutRoutesAdmin
          exact
          path="/admin/configuracao/certificados"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyAdminCertificate {...matchprops} />
            </Suspense>
          )}
        />

        {/* ADMIN CONSULT EVENTS */}
        <ProtectedMainLayoutRoutesAdmin
          exact
          path="/admin/consulta/eventos"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyAdminConsultEvent {...matchprops} />
            </Suspense>
          )}
        />

        {/* ADMIN CONSULT ENTITIES */}
        <ProtectedMainLayoutRoutesAdmin
          exact
          path="/admin/consulta/entidades"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyAdminConsultEntities {...matchprops} />
            </Suspense>
          )}
        />

        <ProtectedMainLayoutRoutesAdmin
          exact
          path="/admin/consulta/entidades/:id"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyAdminConsultEntitiesEdit {...matchprops} />
            </Suspense>
          )}
        />

        <ProtectedMainLayoutRoutes
          exact
          path="/admin/consulta/entidades/pj/:id"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyAdminConsultOrganizationsEdit {...matchprops} />
            </Suspense>
          )}
        />

        {/*
          <ProtectedMainLayoutRoutes
            exact
            path="/admin/produtos"
            render={matchprops => (
              <Suspense fallback={<Spinner />}>
                <LazyAdminProduct {...matchprops} />
              </Suspense>
            )}
          />
          <ProtectedMainLayoutRoutes
            exact
            path="/admin/kits"
            render={matchprops => (
              <Suspense fallback={<Spinner />}>
                <LazyAdminKit {...matchprops} />
              </Suspense>
            )}
          /> */}

        <ErrorLayoutRoute
          exact
          path="/error"
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyErrorPage {...matchprops} />
            </Suspense>
          )}
        />

        <ErrorLayoutRoute
          render={matchprops => (
            <Suspense fallback={<Spinner />}>
              <LazyErrorPage {...matchprops} />
            </Suspense>
          )}
        />
      </Switch>
    </ConnectedRouter>
  );
}
