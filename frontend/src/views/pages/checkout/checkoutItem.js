// import external modules
import React, { useState, useEffect } from 'react';
import { Motion, spring } from 'react-motion';
import { Card, CardBody, Button, Label } from 'reactstrap';
import { User, Users, ArrowRightCircle } from 'react-feather';

import history from '~/app/history';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { useSelector, useDispatch } from 'react-redux';
import { Creators as SiteEventActions } from '../../../store/ducks/siteEvent';

import logo from '../../../assets/img/logo-big.png';

export default function CheckoutLogin({ match }) {
  const [mainOrganizators, setMainOrganizators] = useState([]);

  const dispatch = useDispatch();

  const siteData = useSelector(state => state.siteEvent.data);

  if (siteData !== null && mainOrganizators.length === 0) {
    const organizators = siteData.organizators.filter(organizator => {
      return organizator.hierarchy_id === 1 && organizator;
    });

    setMainOrganizators(organizators);
  }

  function handleSubmit(item) {
    const toSend = {
      event_id: siteData.id,
      item,
    };

    localStorage.setItem('@dashboard/checkout_item', JSON.stringify(toSend));

    history.push(`/evento/${siteData.id}/checkout/login`);
  }

  useEffect(() => {
    dispatch(SiteEventActions.siteEventRequest(match.params.event_id));
  }, []);

  return (
    siteData !== null && (
      <div
        className={`bg-static-pages-image-${siteData.ministery_id} d-flex flex-column flex-1 p-0 flex-lg-row`}
      >
        <div className="d-flex flex-column flex-grow-0 text-white width-75-per p-2 p-lg-5">
          <img className="fit width-125 mb-3" src={logo} alt="Logo UDF" />
          <Label className="d-none d-lg-block fit width-800 font-large-3 mb-3 line-height-1">
            {siteData.details.title}
          </Label>
          <Label className="d-block d-lg-none fit width-800 font-large-1 mb-3">
            {siteData.details.title}
          </Label>
          <Label className="fit width-700 font-medium-1">
            Inscrição para participar do {siteData.details.title} com{' '}
            <u>
              {mainOrganizators.length === 1 &&
                `o líder ${mainOrganizators[0].name}`}
              {mainOrganizators.length > 1 &&
                `os líderes ${mainOrganizators[0].name} e ${mainOrganizators[1].name}`}
            </u>{' '}
            com a data de início marcada para o dia{' '}
            <u>
              {format(
                new Date(siteData.start_date),
                "d 'de' MMMM 'de' y',' iiii 'às' p BBBB",
                {
                  locale: ptBR,
                }
              )}
            </u>
            , ocorrendo uma vez por semana durante doze semanas na{' '}
            <u>{siteData.address.name}</u>.
          </Label>
        </div>
        )}
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
              className="fit min-full-height-vh m-2 m-lg-0 min-width-25-per rounded-0"
            >
              <CardBody className="d-flex flex-column justify-content-center">
                <Label className="font-medium-3 text-dark text-bold-400 text-center text-uppercase mb-4">
                  Escolha o tipo da inscrição
                </Label>
                {siteData !== null &&
                  siteData.checkout.items.map(item => {
                    return (
                      <Button
                        outline
                        type="submit"
                        color="default"
                        className="btn-default height-100 icon-light-hover font-medium-2"
                        onClick={() => handleSubmit(item)}
                      >
                        <div className="d-flex justify-content-around align-items-center">
                          {item.id === 'individual' ? (
                            <User size={24} color="#000" className="mr-2" />
                          ) : (
                            <Users size={24} color="#000" className="mr-2" />
                          )}
                          <div>
                            <h5 className="mb-0">{item.name_id}</h5>
                            <h5 className="mb-0 success font-weight-bold">
                              R$ {item.group_price},00
                            </h5>
                          </div>
                          <ArrowRightCircle
                            size={24}
                            color="#000"
                            className="mr-2"
                          />
                        </div>
                      </Button>
                    );
                  })}
              </CardBody>
            </Card>
          )}
        </Motion>
      </div>
    )
  );
}
