import React from 'react';
import styled from 'styled-components';
import globals from '../utils/globals';

import Event from './Event';
import Venue from './Venue';
import Park from './Park';
import Speakers from './Speakers';
import Schedule from './Schedule';
// import C4P from './C4P';
import Sponsors from './Sponsors';
// import Supporters from './Supporters';
// import Promotions from './Promotions';
import Programations from './Programations';
import BuyTickets from './BuyTickets';
import Contact from './Contact';
import Meetups from './Meetups';
// import AfterParty from './AfterParty';
import BeSponsor from './BeSponsor';

const Container = styled.div`
  display: flex;
  background: ${globals.colors.white};
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

const App = () => (
  <Container>
    <Event /> {/* O EVENTO */}
    <Venue /> {/* LOCAL */}
    <Programations /> {/* PROGRAMAÇÃO */}
    <Speakers /> {/* PALESTRANTES */}
    <Schedule />
    <Park /> {/* ESTACIONAMENTO */}
    <BuyTickets /> {/* INICIA 'DIA' DE 'MES' DE 'ANO' */}
    {/* <Supporters />
    <Promotions />
    <AfterParty /> */}
    <Sponsors /> {/* CONHEÇA OUTROS CURSOS */}
    <BeSponsor /> {/* SAIBA MAIS BOTAO DE CONHEÇA OUTROS CURSOS */}
    <Meetups /> {/* EVENTOS NO BRASIL */}
    {/* <C4P /> */}
    <Contact /> {/* CONTATO */}
  </Container>
);

export default App;
