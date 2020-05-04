// import external modules
import React, { useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';

import { useDispatch } from 'react-redux';
import { Creators as SiteEventActions } from '~/store/ducks/siteEvent';

import globals from './site/utils/globals';

import Header from './site/components/Header';
import Body from './site/components/Body';
import Footer from './site/components/Footer';

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
    dispatch(SiteEventActions.siteEventRequest(match.params.event_id));
  }, []);

  return (
    <>
      <GlobalStyle />
      <Header />
      <Body />
      <Footer />
    </>
  );
}
