import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';

import globals from '../utils/globals';
import meetups from '../utils/data/meetups';
import Button from './Button';
import { Title } from './Title';

const Container = styled.div`
  background: ${globals.colors.main};
  width: 100%;
`;

const Buttons = styled.div`
  padding: 15px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  @media screen and (max-width: 768px) {
    padding: 0;
  }
`;

const MeetupButton = styled(Button)`
  margin: 10px;

  @media screen and (max-width: 580px) {
    width: 50%;
  }
`;

export default function Meetups() {
  const data = useSelector(state => state.siteEvent.data);

  return (
    data !== null && (
      <Container>
        <Title title="Eventos no Brasil" />
        <Buttons>
          {meetups.map(meetup => (
            <MeetupButton key={meetup.name} href={meetup.link} light>
              {meetup.name}
            </MeetupButton>
          ))}
        </Buttons>
      </Container>
    )
  );
}
