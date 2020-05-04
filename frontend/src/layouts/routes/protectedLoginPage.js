// import external modules
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { isAuthenticated } from '~/app/auth';

// import internal(own) modules
import FullPageLayout from '../fullpageLayout';

// eslint-disable-next-line react/prop-types
const ProtectedLoginPageLayoutRoute = ({ render, ...rest }) => {
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={matchProps =>
        isAuthenticated() ? (
          <Redirect
            to={{
              pathname: '/eventos/grupos',
              state: { from: matchProps.location },
            }}
          />
        ) : (
          <FullPageLayout>{render(matchProps)}</FullPageLayout>
        )
      }
    />
  );
};

export default ProtectedLoginPageLayoutRoute;
