import React from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';

import globals from '../utils/globals';

const Container = styled.div`
  width: 80%;
  background: ${globals.colors.white};
`;

const Wrapper = styled.div`
  display: flex;
  margin: 50px;

  @media screen and (max-width: 1128px) {
    flex-wrap: wrap;
  }

  @media screen and (max-width: 768px) {
    margin: 0;
  }
`;

const Texts = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  margin: 15px;

  @media screen and (max-width: 1128px) {
    width: 100%;
    text-align: center;
  }
`;

const Text = styled.p`
  line-height: 2;
  color: ${({ grey }) => !!grey && 'rgba(0,0,0,0.6)'};
`;

export default function Event() {
  const data = useSelector(state => state.event.data);

  return (
    data !== null && (
      <Container>
        <Wrapper>
          <Texts>
            <div className="m-auto">
              <Text className="text-dark">{data.defaultEvent.description}</Text>
            </div>
          </Texts>
        </Wrapper>
      </Container>
    )
  );
}
