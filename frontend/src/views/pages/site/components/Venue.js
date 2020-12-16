import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import styled, { keyframes } from 'styled-components';

// import globals from "../utils/globals";
import theater from '../media/images/theater_apcd.jpg';
import Button from './Button';
import { Title, SubTitle } from './Title';

const move = keyframes`
  from {
    background-position: right;
  }

  to {
    background-position: left;
  }
`;

const Wrapper = styled.div`
  display: block;
  width: 100%;
  position: relative;
  height: 400px;
  background: url(${props => (props.banner ? props.banner : theater)}) fixed
    no-repeat;
  background-size: cover;
  animation: ${move} 15s linear infinite alternate;
  will-change: background-position;

  &:after {
    content: '';
    background: linear-gradient(
      rgba(20, 167, 248, 0.35),
      rgba(5, 47, 70, 0.91)
    );
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
  }
`;

const Locale = styled.div`
  z-index: 2;
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
`;

export default function TextVenue() {
  const [street, setStreet] = useState('');

  const data = useSelector(state => state.event.data);

  if (data !== null) {
    const street_replaced = String(data.street).replace(/ /g, '+');

    if (street === '') {
      setStreet(street_replaced);
    }
  }

  return (
    data !== null && (
      <Wrapper banner="https://arcowebarquivos-us.s3.amazonaws.com/imagens/52/21/arq_85221.jpg">
        <Locale>
          <Title title="Local" light />
          <SubTitle
            title={`${data.address_name}, ${data.city}, ${data.uf} - ${data.country}`}
            light
            className="text-center"
          />

          <Button
            href={`http://maps.google.com/?q=${street},+${data.street_number},+${data.city}+-+${data.uf},+${data.cep}`}
            light
          >
            {data.street}, {data.street_number} - {data.neighborhood},{' '}
            {data.city} - {data.uf}
          </Button>
        </Locale>
      </Wrapper>
    )
  );
}
