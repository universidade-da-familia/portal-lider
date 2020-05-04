import React from 'react';
import styled from 'styled-components';
import globals from '../utils/globals';

import { useSelector } from 'react-redux';

import { Title, SubTitle } from './Title';
import Video from './Video';

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

const StyledVideo = styled(Video)`
  height: 50vh;
  width: 50%;

  @media screen and (max-width: 1128px) {
    width: 100%;
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
  const data = useSelector(state => state.siteEvent.data);

  return (
    data !== null && (
      <Container>
        <Title title="O evento" />
        <SubTitle title={data.details.title} />

        <Wrapper>
          <StyledVideo />
          <Texts>
            <div>
              <Text className="ml-2 text-dark">{data.details.description}</Text>
              <Text className="ml-2 font-italic text-muted">
                {data.details.sub_description}
              </Text>
            </div>
          </Texts>
        </Wrapper>
      </Container>
    )
  );
}
