import React from 'react';

// import LogoMinistery from "./LogoMinistery";
import styled from 'styled-components';

import logo from '../../../../../assets/img/logo-big.png';
// import Container from './Container';
// import Infos from './Infos';
// import TicketButton from './TicketButton';
// import Title from './Title';

const Teste = styled.div`
  width: 100%;
  height: 110px;
  position: relative;
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
`;

const Logo = styled.img`
  height: 50px;
  width: 50px;
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Header = () => (
  // <Container>
  //   <Title />
  //   <TicketButton />
  //   <Infos />
  // </Container>

  <Teste>
    <Logo src={logo} />
  </Teste>
);

export default Header;
