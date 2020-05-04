import React from 'react';
import styled from 'styled-components';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Clock, Star } from 'react-feather';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { useSelector } from 'react-redux';

import globals from '../utils/globals';
import { Title, SubTitle } from './Title';

const Container = styled.div`
  background-color: ${globals.colors.secondary};
  width: 100%;
  padding: 15px;
`;

// const timelineStyle = {};

export default function Programations() {
  const data = useSelector(state => state.siteEvent.data);

  return (
    data !== null && (
      <Container>
        <Title title="Programação" className="text-center" />
        <SubTitle title="Veja com detalhes" className="text-center" />

        <VerticalTimeline>
          {data.programation.map(program => {
            return (
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                date={format(new Date(program.date), "dd 'de' MMMM 'de' yyyy", {
                  locale: ptBR,
                })}
                iconStyle={{ background: '#fc0', color: '#fff' }}
                icon={<Clock />}
              >
                <h3 className="vertical-timeline-element-title">
                  {program.title}
                </h3>
                {/* <h4 className="vertical-timeline-element-subtitle">
                  Miami, FL
                </h4> */}
                <p>{program.description}</p>
              </VerticalTimelineElement>
            );
          })}
          <VerticalTimelineElement
            date="Aqui você recebe seu certificado"
            iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
            icon={<Star />}
          />
        </VerticalTimeline>
      </Container>
    )
  );
}
