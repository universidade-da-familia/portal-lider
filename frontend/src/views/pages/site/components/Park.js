import React from 'react';
import styled from 'styled-components';
import globals from '../utils/globals';

import { Title, SubTitle } from './Title';
import Button from './Button';

const Container = styled.div`
  background: ${globals.colors.main};
  width: 100%;
  text-align: center;
`;

const ParkAddress = styled(Button)`
  margin: 20px auto;
  display: block;
  width: fit-content;
`;

const ParkName = styled.p`
  font-weight: bold;
  font-size: 1.3em;
`;

const Park = () => !!globals.park && (
<Container>
  <Title title="Estacionamento" />
  <SubTitle title="Estacione em nosso Parceiro" />

  <div>
    <ParkName>
      {`${globals.park.name} - ${globals.park.price} das ${
        globals.park.hour
      }`}
    </ParkName>
    <p>{!!globals.park.phone && `Telefone: ${globals.park.phone}`}</p>
    <ParkAddress href={globals.park.googleMapsLink} light>
      {globals.park.fullAddress}
    </ParkAddress>
  </div>
</Container>
);

export default Park;
