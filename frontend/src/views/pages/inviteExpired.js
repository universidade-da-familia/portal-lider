// import external modules
import React, { useEffect } from 'react';
import { AlertCircle } from 'react-feather';
import { Motion, spring } from 'react-motion';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardBody, Label } from 'reactstrap';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import logo from '~/assets/img/logo-big.png';
import { Creators as EventActions } from '~/store/ducks/event';

export default function InviteExpired({ match }) {
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

    return `com os líderes ${organizators.join('')} `;
  }

  useEffect(() => {
    dispatch(EventActions.eventRequest(match.params.event_id));
  }, []);

  return (
    <div className="bg-static-pages-image d-flex flex-column flex-1 p-0 flex-lg-row">
      <div className="fit min-full-height-vh color-overlay" />
      {event !== null && (
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
              Entre em contato com o{' '}
              {event.organizators.length === 1 &&
                `líder ${event.organizators[0].name}`}
              {event.organizators.length > 1 && handleManyOrganizators()} para
              participar do {event.defaultEvent.name}. O início do curso será
              dia{' '}
              <u>
                {format(
                  new Date(event.start_date),
                  "d 'de' MMMM 'de' y',' iiii 'às' p BBBB",
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
                    Convite expirado! Contate o administrador do evento.
                  </Label>

                  <AlertCircle
                    className="align-self-center mt-4"
                    size={150}
                    color="#FF8D60"
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
