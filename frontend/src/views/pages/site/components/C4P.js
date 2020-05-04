import React from 'react';
import styled from 'styled-components';

import globals from '../utils/globals';
import { Title } from './Title';
import Button from './Button';

const Container = styled.div`
  width: 100%;
  background-color: #d9d9d9;
  text-align: center;
`;

const SendYourTalk = styled(Button)`
  margin: 20px auto;
  display: block;
  width: fit-content;
`;

const C4P = () => (
  <Container>
    <Title title="CALL FOR PAPERS" />

    <SendYourTalk href={globals.contacts.c4p} big secondary>
      Envie sua talk
    </SendYourTalk>
  </Container>
);

export default C4P;
