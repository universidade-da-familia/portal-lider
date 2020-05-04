// import external modules
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { Route } from 'react-router-dom';

import history from '~/app/history';

import { isAuthenticated } from '../../app/auth';
// import internal(own) modules
import MainLayout from '../mainLayout';

export default function ProtectedMainLayoutRouteAdmin({ render, ...rest }) {
  const profile_data = useSelector(state => state.profile.data);
  const [verified, setVerified] = useState(true);

  function handleGoBack() {
    toastr.confirm('Acesso restrito para administradores!', {
      onOk: () => history.goBack(),
      disableCancel: true,
    });
  }

  useEffect(() => {
    if (profile_data.id) {
      setVerified(profile_data.admin);
    }
  }, [profile_data]);

  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={matchProps =>
        isAuthenticated() && verified ? (
          <MainLayout>{render(matchProps)}</MainLayout>
        ) : (
          handleGoBack()
        )
      }
    />
  );
}
