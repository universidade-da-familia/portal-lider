// import external modules
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { isAuthenticated } from '../../app/auth';
// import internal(own) modules
import MainLayout from '../mainLayout';

const ProtectedMainLayoutRoute = ({ render, ...rest }) => {
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={matchProps =>
        isAuthenticated() ? (
          <MainLayout>{render(matchProps)}</MainLayout>
        ) : (
          <Redirect
            to={{ pathname: '/', state: { from: matchProps.location } }}
          />
        )
      }
    />
  );
};

export default ProtectedMainLayoutRoute;
