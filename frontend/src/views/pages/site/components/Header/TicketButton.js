import React from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';

// import globals from "../../utils/globals";
import Button from '../Button';

const TicketHere = styled(Button)`
  position: absolute;
  right: 35px;
  top: 35px;

  @media screen and (max-width: 480px) {
    position: relative;
    right: inherit;
    top: inherit;
    width: 50%;
  }
`;

export default function TicketButton() {
  const data = useSelector(state => state.event.data);

  return (
    data !== null && (
      <TicketHere href={`https://lider.udf.org.br/evento/${data.id}/checkout`}>
        INSCRIÇÕES AQUI
      </TicketHere>
    )
  );
}
