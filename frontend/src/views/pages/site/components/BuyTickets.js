import React from 'react';
import { useSelector } from 'react-redux';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import styled from 'styled-components';

import globals from '../utils/globals';
import Button from './Button';
import { Title, SubTitle } from './Title';

const Container = styled.div`
  background-color: ${globals.colors.secondary};
  width: 100%;
  padding: 15px;
  text-align: center;
`;

const BuyTicket = styled(Button)`
  margin: 20px auto;
  display: block;
  width: fit-content;
`;

export default function BuyTickets() {
  const data = useSelector(state => state.siteEvent.data);

  return (
    data !== null && (
      <Container>
        <Title
          title={format(
            new Date(data.start_date),
            "'Inicia' dd 'de' MMMM 'de' yyyy",
            {
              locale: ptBR,
            }
          )}
          className="line-height-1"
        />
        <SubTitle
          title={format(
            new Date(data.start_date),
            "'Toda(o)' iiii 'às' p BBBB",
            {
              locale: ptBR,
            }
          )}
        />

        <BuyTicket
          href={`https://lider.udf.org.br/evento/${data.id}/checkout`}
          light
          medium
        >
          Inscrições aqui
        </BuyTicket>
      </Container>
    )
  );
}
