import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import HttpsRedirect from 'react-https-redirect';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';

import './config/reactotron';

import 'font-awesome/css/font-awesome.min.css';

import './index.scss';

import Spinner from './components/spinner/spinner';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

const LazyApp = lazy(() => import('./app/app'));

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<Spinner />}>
      <HttpsRedirect>
        <LazyApp />
      </HttpsRedirect>
      <ReduxToastr
        timeOut={5000}
        newestOnTop={false}
        preventDuplicates
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick
        confirmOptions={{
          okText: 'Ok',
          cancelText: 'Cancelar',
        }}
      />
    </Suspense>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
