/* eslint-disable react/prop-types */
// import external modules
import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'react-feather';
import { Motion, spring } from 'react-motion';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardBody, Label } from 'reactstrap';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import history from '~/app/history';
import logo from '~/assets/img/logo-big.png';
import { Creators as EventActions } from '~/store/ducks/event';

export default function InviteConfirmed({ match }) {
  const [invite, setInvite] = useState(null);

  const event = useSelector(state => state.event.data);

  const dispatch = useDispatch();

  function handleManyOrganizators() {
    const last = event.organizators.length - 1;
    const antLast = event.organizators.length - 2;

    const organizators = event.organizators.map((organizator, index) => {
      if (last === index) {
        return organizator.name;
      }
      if (antLast === index) {
        return `${organizator.name} e `;
      }
      return `${organizator.name}, `;
    });

    return `pelos líderes ${organizators.join('')} `;
  }

  useEffect(() => {
    if (event !== null) {
      const participant = event.participants.find(
        participant => participant.id === parseInt(match.params.id, 10)
      );

      if (participant === undefined) {
        history.push(`/evento/${event.id}/convite/expirado`);
      } else {
        setInvite(participant);
      }
    }
  }, [event]);

  useEffect(() => {
    dispatch(EventActions.eventRequest(match.params.event_id));
  }, []);

  return (
    <div className="bg-static-pages-image d-flex flex-column flex-1 p-0 flex-lg-row">
      <div className="fit min-full-height-vh color-overlay" />
      {event !== null && invite !== null && (
        <>
          <div
            className="d-none d-lg-flex flex-column flex-grow-0 text-white width-70-per p-2 p-lg-5"
            style={{ zIndex: 1 }}
          >
            <img
              className="d-none d-lg-block fit width-125 mb-3"
              src={logo}
              alt="Logo UDF"
            />
            <Label className="d-none d-lg-block fit width-800 font-large-3 mb-3 line-height-1">
              {event.defaultEvent.name}
            </Label>
            <Label className="d-none d-lg-block fit width-700 font-medium-1">
              Olá {invite.name}, você foi convidado{' '}
              {event.organizators.length === 1 &&
                `pelo líder ${event.organizators[0].name}`}
              {event.organizators.length > 1 && handleManyOrganizators()} para
              participar do {event.defaultEvent.event_type}{' '}
              {event.defaultEvent.name}. O início do curso será dia{' '}
              <u>
                {format(
                  new Date(event.start_date),
                  "d 'de' MMMM 'de' y',' iiii",
                  {
                    locale: ptBR,
                  }
                )}
              </u>
              .
            </Label>
            <Label className="d-none d-lg-block fit width-700 font-medium-1">
              {event.defaultEvent.description}
            </Label>
          </div>

          <Motion
            defaultStyle={{ x: +200, opacity: 0 }}
            style={{ x: spring(0), opacity: spring(1) }}
          >
            {style => (
              <Card
                style={{
                  transform: `translateX(${style.x}px)`,
                  opacity: style.opacity,
                }}
                className="fit min-full-height-vh m-2 m-lg-0 min-width-30-per rounded-0"
              >
                <CardBody className="d-flex flex-column justify-content-center">
                  <Label className="mb-4 font-medium-3 text-dark text-bold-400 text-center text-uppercase">
                    Parabéns! Você concluiu sua inscrição.
                    <br />
                    Ela será confirmada após o processamento do pagamento.
                  </Label>

                  <CheckCircle
                    className="align-self-center mt-4"
                    size={150}
                    color="#0CC27E"
                  />
                </CardBody>
              </Card>
            )}
          </Motion>
        </>
      )}
    </div>
  );
}
