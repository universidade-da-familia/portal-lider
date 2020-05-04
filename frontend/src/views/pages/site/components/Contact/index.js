import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';

import { Title, SubTitle } from '../Title';
import globals from '../../utils/globals';

// import Slack from "./Slack";
// import Github from './Github';
// import Twitter from './Twitter';
import Facebook from './Facebook';
import Instagram from './Instagram';

const Container = styled.div`
  background-color: ${globals.colors.white};
  width: 100%;
  text-align: center;
`;

export default function Contact() {
  const data = useSelector(state => state.siteEvent.data);

  return (
    data !== null && (
      <Container>
        <Title title="Contato" />
        <SubTitle title="Qualquer dúvida, solicitamos que entre em contato com um dos organizadores do evento" />

        <div className="mt-2">
          <SubTitle
            title={` Organizador: ${data.contact.name}`}
            className="font-medium-4"
            contact
          />
          <SubTitle
            title={`Celular: ${data.contact.phone}`}
            className="font-medium-4"
            contact
          />
          <SubTitle
            title={`Tel. Alternativo: ${data.contact.alt_phone}`}
            className="font-medium-4"
            contact
          />
          <SubTitle
            title={`E-mail: ${data.contact.email}`}
            className="font-medium-4"
            contact
            link={data.contact.email}
          />

          <div className="mb-2" />

          {!!data.contact.facebook && <Facebook data={data.contact} />}
          {!!data.contact.facebook && <Instagram data={data.contact} />}

          <div className="mb-4" />
        </div>
      </Container>
    )
  );
}
