// import external modules
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { createGlobalStyle } from 'styled-components';

// import { Creators as SiteEventActions } from '~/store/ducks/siteEvent';
import { Creators as EventActions } from '~/store/ducks/event';

import Body from './site/components/Body';
import Header from './site/components/Header';
import globals from './site/utils/globals';

const GlobalStyle = createGlobalStyle`
  html, body {
    padding: 0;
    margin: 0;
    font-family: ${globals.fonts.default};
    background: ${globals.colors.transparent};
    overflow-x: hidden;

    @media screen and (max-width: 768px) {
      font-size: 12px;
    }
  }
`;

export default function SiteEvent({ match }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(EventActions.eventRequest(match.params.event_id));
  }, []);

  return (
    <>
      <GlobalStyle />
      <Header />
      <Body />
      <Header />
    </>
  );
}
