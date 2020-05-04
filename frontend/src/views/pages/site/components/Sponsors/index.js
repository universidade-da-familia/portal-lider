import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';

import sponsors from '../../utils/data/sponsors';

import { Title } from '../Title';
import Cards from './Cards';
import Card from './Card';
import Container from './Container';

const TypeSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const SponsorCard = ({ type }) =>
  !!sponsors[type].length && (
    <TypeSection>
      {sponsors[type].map(sponsor => (
        <Card key={`sponsor-${sponsor.id}`} sponsor={sponsor} type={type} />
      ))}
    </TypeSection>
  );

export default function Sponsors() {
  const data = useSelector(state => state.siteEvent.data);

  return (
    data !== null && (
      <Container>
        <Title title="Conheça outros cursos" className="text-center" />
        <Cards>
          {Object.keys(sponsors).map(type => (
            <SponsorCard key={`card-${type}`} type={type} />
          ))}
        </Cards>
      </Container>
    )
  );
}
