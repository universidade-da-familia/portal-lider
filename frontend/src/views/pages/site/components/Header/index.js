import React from "react";

// import LogoMinistery from "./LogoMinistery";
import Container from "./Container";
import TicketButton from "./TicketButton";
import Title from "./Title";
import Infos from "./Infos";

const Header = () => (
  <Container>
    <Title />
    <TicketButton />
    {/* <LogoMinistery /> */}
    <Infos />
  </Container>
);

export default Header;
