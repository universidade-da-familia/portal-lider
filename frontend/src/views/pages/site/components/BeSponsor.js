import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';

import globals from '../utils/globals';
import Button from './Button';

const Container = styled.div`
  background: ${globals.colors.white};
  width: 100%;
  height: 100px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

export default function BeSponsor() {
  const data = useSelector(state => state.siteEvent.data);

  return (
    data !== null && (
      <Container>
        <Button href="https://www.udf.org.br">Saiba mais</Button>
      </Container>
    )
  );
}
