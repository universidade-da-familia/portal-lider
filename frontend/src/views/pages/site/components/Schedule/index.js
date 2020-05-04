import React from 'react';
import styled from 'styled-components';
import schedule from '../../utils/data/schedule';

import List from './List';
import Item from './Item';
import { Title } from '../Title';

const Container = styled.section`
  background: #fff;
  width: 100vw;
  padding-bottom: 2em;
  align-items: center;
`;

const Disclaimer = styled.p`
  padding: 0;
  max-width: 600px;
  margin: 30px auto;
  text-align: right;

  @media screen and (max-width: 600px) {
    text-align: center;
  }
`;

const Schedule = () => !!schedule.length && (
<Container>
  <Title title="Programação" />
  <List>
    {schedule.map(event => (
      <Item
        key={event.title}
        event={event.title}
        time={event.time}
        description={event.description}
      />
    ))}
  </List>
  <Disclaimer>Horário sujeito a alteração sem aviso prévio</Disclaimer>
</Container>
);

export default Schedule;
