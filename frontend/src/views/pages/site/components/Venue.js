import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { useSelector } from 'react-redux';

// import globals from "../utils/globals";
import theater from '../media/images/theater_apcd.jpg';
import { Title, SubTitle } from './Title';

import Button from './Button';

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

  const data = useSelector(state => state.siteEvent.data);

  if (data !== null) {
    const street_replaced = String(data.address.street).replace(/ /g, '+');

    if (street === '') {
      setStreet(street_replaced);
    }
  }

  return (
    data !== null && (
      <Wrapper banner={data.files.address}>
        <Locale>
          <Title title="Local" light />
          <SubTitle
            title={`${data.address.name}, ${data.address.city}, ${data.address.uf} - ${data.address.country}`}
            light
            className="text-center"
          />

          <Button
            href={`http://maps.google.com/?q=${street},+${data.address.street_number},+${data.address.city}+-+${data.address.uf},+${data.address.cep}`}
            light
          >
            "{data.address.street}, {data.address.street_number} -{' '}
            {data.address.neighborhood}, {data.address.city} - {data.address.uf}
            "
          </Button>
        </Locale>
      </Wrapper>
    )
  );
}
