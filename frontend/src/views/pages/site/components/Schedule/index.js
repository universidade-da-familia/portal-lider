import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'reactstrap';

import moment from 'moment';
import styled from 'styled-components';

import { Title } from '../Title';
// import Item from './Item';
import List from './List';

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

export default function Schedule() {
  const data = useSelector(state => state.event.data);

  return (
    data !== null && (
      <Container>
        <Title title="Programação" />
        <List>
          {data.schedules.map((schedule, index) => (
            <Table>
              <thead>
                <tr>
                  <th>{`Dia ${index + 1}`}</th>
                  <th>Início</th>
                  <th>Fim</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    {moment(schedule.date).format('DD/MM/YYYY')}
                  </th>
                  <td>{schedule.start_time}</td>
                  <td>{schedule.end_time}</td>
                </tr>
              </tbody>
            </Table>
          ))}
        </List>
        <Disclaimer>Horário sujeito a alteração sem aviso prévio</Disclaimer>
      </Container>
    )
  );
}
