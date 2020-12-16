import React from 'react';

import classnames from 'classnames';

import templateConfig from '../templateConfig';

// eslint-disable-next-line no-unused-vars
const FullPageLayout = ({ children, ...rest }) => {
  return (
    <div
      className={classnames('login-layout wrapper', {
        'layout-dark': templateConfig.layoutDark,
      })}
    >
      <main className="main text-muted" style={{ backgroundColor: '#F7F7F7' }}>
        {children}
      </main>
    </div>
  );
};

export default FullPageLayout;
