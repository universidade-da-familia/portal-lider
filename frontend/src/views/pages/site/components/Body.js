import React, { useEffect, useState, useCallback } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useSelector } from 'react-redux';
import { Row, Col, CardImg } from 'reactstrap';

import { format, differenceInDays } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import styled from 'styled-components';

import contato from '~/assets/img/contato.svg';
import dataEvento from '~/assets/img/data-evento.svg';
import email from '~/assets/img/email.svg';
import fone from '~/assets/img/fone.svg';
import informacoes from '~/assets/img/informacoes.svg';
import investimento from '~/assets/img/investimento.svg';
import local from '~/assets/img/local.svg';
import perfil from '~/assets/img/perfil.svg';
import preRequisitos from '~/assets/img/pre-requisitos.svg';
import treinador from '~/assets/img/treinador.svg';

// import globals from '../utils/globals';

// import * as moment from 'moment';
import 'moment/locale/pt-br';

const EventType = styled.p`
  @font-face {
    font-family: montserratBold;
    src: url('http://${document.location.hostname}:3000/fonts/Montserrat-Bold.ttf');
  }

  font-family: montserratBold;
  flex: 1;
  font-size: 22px;
  color: #999999;
  letter-spacing: 8%;
`;

const EventName = styled.p`
  font-family: montserratBold;
  flex: 1;
  font-size: 64px;
  color: #4d4d4d;
  line-height: 1.3;
`;

const EventDescription = styled.p`
  @font-face {
    font-family: robotoRegular;
    src: url('http://${document.location.hostname}:3000/fonts/Roboto-Regular.ttf');
  }

  font-family: robotoRegular;
  font-size: 22px;
  color: #999999;
  line-height: 1.8;
`;

const LocalEvent = styled.p`
  @font-face {
    font-family: robotoBold;
    src: url('http://${document.location.hostname}:3000/fonts/Roboto-Bold.ttf');
  }

  font-family: robotoBold;
  font-size: 22;
  color: #999999;
`;

const TitleSection1 = styled.p`
  @font-face {
    font-family: montserratMedium;
    src: url('http://${document.location.hostname}:3000/fonts/Montserrat-Medium.ttf');
  }

  font-family: montserratMedium;
  font-size: 32px;
  color: #ffffff;
`;

const TextSection1 = styled.p`
  font-family: robotoBold;
  font-size: 22px;
  color: #ffffff;
  line-height: 1.8;
`;

const TitleBoxTrainer = styled.p`
  font-family: montserratMedium;
  font-size: 32px;
`;

const TextBoxTrainer = styled.p`
  @font-face {
    font-family: robotoMedium;
    src: url('http://${document.location.hostname}:3000/fonts/Roboto-Medium.ttf');
  }

  font-family: robotoMedium;
  font-size: 18px;
  color: #999999;
`;

const TitleSection2 = styled.p`
  font-family: montserratMedium;
  font-size: 32px;
  color: #4d4d4d;
`;

const TextSectionList = styled.ul``;

const TextSectionLi = styled.li`
  font-family: robotoRegular;
  font-size: 18px;
  color: #999999;
  line-height: 1.6;
`;

const TextSection2 = styled.p`
  font-family: robotoRegular;
  font-size: 18px;
  color: #999999;
  line-height: 1.6;
`;

const TitleSection3 = styled.p`
  font-family: montserratMedium;
  font-size: 32px;
  color: #4d4d4d;
  text-align: center;
  vertical-align: middle;
`;

const Section3BoxTitle = styled.p`
  font-family: montserratMedium;
  font-size: 18px;
  color: #4d4d4d;
  letter-spacing: 8%;
  text-align: center;
  vertical-align: middle;
`;

const Section3BoxPrice = styled.p`
  font-family: montserratBold;
  font-size: 32px;
  color: #999999;
  text-align: center;
  vertical-align: middle;
`;

const TextSection3 = styled.p`
  font-family: robotoRegular;
  font-size: 18px;
  line-height: 1.3;
  color: #999999;
  text-align: center;
  vertical-align: middle;
`;

const ButtonInscription = styled.button`
  font-family: montserratBold;
  font-size: 18px;
  border-radius: 50px;
  color: #ffffff;
  background-image: linear-gradient(90deg, #0ba879, #38ef7d);
  border-style: none;

  /* &::hover {
    Shadow: #000000, Opacity: 25%,
    Y: 4px, X:0px Blur: 12px
  } */
`;

const ButtonInscriptionDisabled = styled.button`
  font-family: montserratBold;
  font-size: 18px;
  border-radius: 50px;
  color: #ffffff;
  background-image: linear-gradient(90deg, #ffa402, #fbdf63);
  border-style: none;

  /* &::hover {
    Shadow: #000000, Opacity: 25%,
    Y: 4px, X:0px Blur: 12px
  } */
`;

export default function Body() {
  const [validParticipants, setValidParticipants] = useState([]);
  const [isInscriptionsFinished, setIsInscriptionsFinished] = useState(false);
  const [singlePrice, setSinglePrice] = useState(0);
  const [couplePrice, setCouplePrice] = useState(0);
  const [readableDate, setReadableDate] = useState('');

  const data = useSelector(state => state.event.data);

  const mountReadableDate = useCallback(schedules => {
    if (schedules.length === 1) {
      const firstDate = format(
        new Date(schedules[0].date),
        "d 'de' MMMM 'de' yyyy",
        {
          locale: ptBR,
        }
      );

      setReadableDate(firstDate);
    } else {
      const scheduleMonths = schedules.map(schedule =>
        format(new Date(schedule.date), 'M', { locale: ptBR })
      );

      const isSameMonths = scheduleMonths.every(
        month => month === scheduleMonths[0]
      );

      if (isSameMonths) {
        const firstDate = format(new Date(schedules[0].date), "d 'a' ", {
          locale: ptBR,
        });
        const lastDate = format(
          new Date(schedules[schedules.length - 1].date),
          "d 'de' MMMM 'de' yyyy",
          {
            locale: ptBR,
          }
        );

        setReadableDate(`${firstDate} ${lastDate}`);
      } else {
        const firstDate = format(
          new Date(schedules[0].date),
          "d 'de' MMMM 'a'",
          {
            locale: ptBR,
          }
        );
        const lastDate = format(
          new Date(schedules[schedules.length - 1].date),
          "d 'de' MMMM 'de' yyyy",
          {
            locale: ptBR,
          }
        );

        setReadableDate(`${firstDate} ${lastDate}`);
      }
    }
  }, []);

  useEffect(() => {
    if (data !== null) {
      mountReadableDate(data.schedules);

      let auxSumSingle = 0;
      let auxSumCouple = 0;
      data.defaultEvent.kit.products.forEach(product => {
        if (
          product.product_category === 'book' ||
          product.product_category === 'manual' ||
          product.product_category === 'guide'
        ) {
          // alianca romance
          if (data.default_event_id === 66) {
            auxSumCouple += product.training_price;
          }

          // financas crown
          if (data.default_event_id === 53) {
            auxSumSingle += product.training_price;
            auxSumCouple += product.training_price;
          }

          // yes
          if (data.default_event_id === 52) {
            auxSumSingle += product.training_price;
            auxSumCouple = 215;
          }

          // habitudes
          if (data.default_event_id === 51) {
            auxSumSingle += product.training_price;
            auxSumCouple = 200;
          }

          // coragem
          if (data.default_event_id === 69) {
            auxSumSingle += product.training_price;
            auxSumCouple += product.training_price;
          }

          // hombridade
          if (data.default_event_id === 56) {
            auxSumSingle += product.training_price;
          }

          // mulher unica
          if (data.default_event_id === 60) {
            auxSumSingle += product.training_price;
          }

          // mulher prospera
          if (data.default_event_id === 58) {
            auxSumSingle += product.training_price;
          }

          // paternidade biblica
          if (data.default_event_id === 65) {
            auxSumSingle += product.training_price;
            auxSumCouple += product.training_price;
          }
        }
      });

      setSinglePrice(auxSumSingle);
      setCouplePrice(auxSumCouple);

      const differenceBetweenTodayAndStartDate = differenceInDays(
        new Date(data.start_date),
        new Date()
      );

      if (
        data.is_inscription_finished ||
        differenceBetweenTodayAndStartDate <= 15
      ) {
        setIsInscriptionsFinished(true);
      }

      const filteredParticipants = data.participants.filter(participant => {
        const isAssistant = participant.pivot.assistant;
        const isQuitter = participant.pivot.is_quitter;
        const paymentStatus = participant.participant_order?.order.status_id;

        if (
          !isAssistant &&
          !isQuitter &&
          (paymentStatus === 1 ||
            paymentStatus === 2 ||
            paymentStatus === 3 ||
            participant.participant_order === null)
        ) {
          return participant;
        }

        return null;
      });

      setValidParticipants(filteredParticipants);
    }
  }, [data]);

  return (
    data !== null && (
      <>
        <Row style={{ backgroundColor: '#ffffff' }}>
          <Col sm="12" md="12" lg="6" className="p-5">
            <Row className="flex-column">
              <Col className="pb-4">
                <EventType>{data.defaultEvent.event_type}</EventType>
              </Col>
              <Col className="pb-4">
                <EventName>{data.defaultEvent.name}</EventName>
              </Col>
              <Col>
                <EventDescription>
                  {ReactHtmlParser(data.defaultEvent.description)}
                </EventDescription>
              </Col>
            </Row>
          </Col>
          <Col sm="12" md="12" lg="6" className="p-5">
            <Row className="flex-column">
              <Col className="pb-4 invisible"> .</Col>
              <Col className="pb-1">
                <Row>
                  <Col sm="1" md="1" lg="1">
                    <CardImg
                      alt="local"
                      className="mb-2 width-35 img-fluid"
                      src={local}
                    />
                  </Col>
                  <Col sm="11" md="11" lg="11">
                    {data.city !== null ? (
                      <LocalEvent>{`${data.city}/${data.uf}`}</LocalEvent>
                    ) : (
                      <LocalEvent>Online</LocalEvent>
                    )}
                  </Col>
                </Row>
              </Col>
              <Col className="pb-1">
                <Row>
                  <Col sm="1" md="1" lg="1">
                    <CardImg
                      alt="dataEvento"
                      className="mb-2 width-35 img-fluid"
                      src={dataEvento}
                    />
                  </Col>
                  <Col sm="11" md="11" lg="11">
                    <LocalEvent>{readableDate}</LocalEvent>
                  </Col>
                </Row>
              </Col>
              <Col>
                {data !== null && (
                  <div
                    style={{
                      display: 'flex',
                    }}
                  >
                    <img
                      alt="event banner"
                      src={data.defaultEvent.img_banner_dash_url}
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </div>
                )}
              </Col>
            </Row>
          </Col>
        </Row>

        {/* FEITO */}
        <Row
          style={{
            backgroundImage: 'linear-gradient(90deg, #3E66DE, #1A3891)',
          }}
          className="p-5"
        >
          <Col sm="12" md="6" lg="6" className="p-5">
            <Row className="flex-column">
              <Col className="pb-4">
                <TitleSection1>Programação</TitleSection1>
              </Col>
              <Col>
                <Row>
                  {data.schedules.map((schedule, index) => {
                    return (
                      <Col sm="12" md="6" lg="6" className="pb-1">
                        <TextSection1>{`Dia ${index + 1} (${
                          schedule.start_time
                        } às ${schedule.end_time})`}</TextSection1>
                      </Col>
                    );
                  })}
                </Row>
              </Col>
            </Row>
          </Col>
          {data.city !== null && (
            <Col sm="12" md="6" lg="6" className="p-5">
              <Row className="flex-column">
                <Col className="pb-4">
                  <TitleSection1>Local</TitleSection1>
                </Col>
                <Col>
                  <TextSection1>
                    {`${data.street}, ${data.street_number} - ${data.neighborhood}`}
                  </TextSection1>
                  <TextSection1>{`${data.city} - ${data.uf}, ${data.cep}`}</TextSection1>
                </Col>
              </Row>
            </Col>
          )}
        </Row>

        <Row className="px-5 mt-n5">
          <Row
            style={{
              width: '100%',
              boxShadow: '1px 1px 15px rgba(27,27,27,0.2)',
              borderRadius: '10px',
              backgroundColor: '#ffffff',
            }}
          >
            <Col className="p-5">
              <Row className="flex-column">
                <Col>
                  <CardImg
                    alt="treinador"
                    className="mb-2 width-50 img-fluid"
                    src={treinador}
                  />
                </Col>
                <Col>
                  <TitleBoxTrainer className="mb-4 mt-2">
                    Treinadores
                  </TitleBoxTrainer>
                </Col>
                {data.organizators.map(organizator => {
                  return (
                    <Col>
                      <Row>
                        <Col sm="1" md="1" lg="1">
                          <CardImg
                            alt="perfil"
                            className="mb-2 width-25 img-fluid"
                            src={perfil}
                          />
                        </Col>
                        <Col sm="11" md="11" lg="11">
                          <TextBoxTrainer>{organizator.name}</TextBoxTrainer>
                        </Col>
                      </Row>
                    </Col>
                  );
                })}

                {/* <Col>
                  <TextBoxTrainer>Gabi Marinelli</TextBoxTrainer>
                </Col> */}
              </Row>
            </Col>
            <Col className="p-5">
              <Row className="flex-column">
                <Col>
                  <CardImg
                    alt="contato"
                    className="mb-2 width-50 img-fluid"
                    src={contato}
                  />
                </Col>
                <Col>
                  <TitleBoxTrainer className="mb-4 mt-2">
                    Contato
                  </TitleBoxTrainer>
                </Col>
                <Col>
                  <Row>
                    <Col sm="1" md="1" lg="1">
                      <CardImg
                        alt="name"
                        className="mb-2 width-25 img-fluid"
                        src={perfil}
                      />
                    </Col>
                    <Col sm="11" md="11" lg="11">
                      <TextBoxTrainer>
                        {data.contact_name || data.organizators[0].name}
                      </TextBoxTrainer>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <Col sm="1" md="1" lg="1">
                      <CardImg
                        alt="email"
                        className="mb-2 width-25 img-fluid"
                        src={email}
                      />
                    </Col>
                    <Col sm="11" md="11" lg="11">
                      <TextBoxTrainer>
                        {data.contact_email || data.organizators[0].email}
                      </TextBoxTrainer>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <Col sm="1" md="1" lg="1">
                      <CardImg
                        alt="fone"
                        className="mb-2 width-25 img-fluid"
                        src={fone}
                      />
                    </Col>
                    <Col sm="11" md="11" lg="11">
                      <TextBoxTrainer>
                        {data.contact_phone || data.organizators[0].phone}
                      </TextBoxTrainer>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Row>

        <Row>
          <Col sm="12" md="6" lg="6" className="p-5">
            <Row className="flex-column">
              <Col>
                <CardImg
                  alt="pre-requisitos"
                  className="ml-3 mb-4 width-125 img-fluid"
                  src={preRequisitos}
                />
              </Col>
              <Col className="px-4 pb-5">
                <TitleSection2>Pré-requisitos</TitleSection2>
              </Col>
              <Col className="px-4">
                <TextSectionList>
                  <TextSectionLi>
                    Ser membro de uma igreja evangélica;
                  </TextSectionLi>
                  <TextSectionLi>Ter mais de 18 anos.</TextSectionLi>
                </TextSectionList>
              </Col>
            </Row>
          </Col>
          {data.additional_information && (
            <Col sm="12" md="6" lg="6" className="p-5">
              <Row className="flex-column">
                <Col>
                  <CardImg
                    alt="informacoes"
                    className="ml-3 mb-4 width-125 img-fluid"
                    src={informacoes}
                  />
                </Col>
                <Col className="px-4 pb-5">
                  <TitleSection2>Informações adicionais</TitleSection2>
                </Col>
                <Col className="px-4">
                  <TextSection2>{data.additional_information}</TextSection2>
                </Col>
              </Row>
            </Col>
          )}
        </Row>

        <Row style={{ backgroundColor: '#ffffff' }}>
          <Col sm="12" md="12" lg="12" className="p-5">
            <Row className="flex-column">
              <Col className="text-center">
                <CardImg
                  alt="investimento"
                  className="mb-4 width-125 img-fluid"
                  src={investimento}
                />
              </Col>
              <Col>
                <TitleSection3>Investimento</TitleSection3>
              </Col>
              {singlePrice > 0 && couplePrice === 0 && (
                <Col className="align-self-center" sm="4" md="4" lg="4">
                  <Row
                    className="flex-column"
                    style={{
                      border: '1px solid #999999',
                      borderRadius: '10px',
                    }}
                  >
                    <Col>
                      <Section3BoxTitle>Individual</Section3BoxTitle>
                    </Col>
                    <Col>
                      <Section3BoxPrice>{`R$ ${singlePrice}`}</Section3BoxPrice>
                    </Col>
                  </Row>
                </Col>
              )}
              {singlePrice === 0 && couplePrice > 0 && (
                <Col className="align-self-center" sm="4" md="4" lg="4">
                  <Row
                    className="flex-column"
                    style={{
                      border: '1px solid #999999',
                      borderRadius: '10px',
                    }}
                  >
                    <Col>
                      <Section3BoxTitle>Individual</Section3BoxTitle>
                    </Col>
                    <Col>
                      <Section3BoxPrice>{`R$ ${couplePrice}`}</Section3BoxPrice>
                    </Col>
                  </Row>
                </Col>
              )}
              {singlePrice > 0 && couplePrice > 0 && (
                <Col>
                  <Row className="flex-1 justify-content-center">
                    <Col>
                      <Row
                        className="flex-column m-4 w3-row"
                        style={{
                          border: '1px solid #999999',
                          borderRadius: '10px',
                          width: '50%',
                        }}
                      >
                        <Col>
                          <Section3BoxTitle>Individual</Section3BoxTitle>
                        </Col>
                        <Col>
                          <Section3BoxPrice>{`R$ ${singlePrice}`}</Section3BoxPrice>
                        </Col>
                      </Row>
                    </Col>
                    <Col sm="12" md="6" lg="4">
                      <Row
                        className="flex-column m-4"
                        style={{
                          border: '1px solid #999999',
                          borderRadius: '10px',
                        }}
                      >
                        <Col>
                          <Section3BoxTitle>Casal</Section3BoxTitle>
                        </Col>
                        <Col>
                          <Section3BoxPrice>{`R$ ${couplePrice}`}</Section3BoxPrice>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              )}
              <Col>
                <TextSection3>
                  O valor inclui material didático e participação do evento. Não
                  incluso frete.
                </TextSection3>
              </Col>
              {!isInscriptionsFinished &&
              validParticipants.length < data.inscriptions_limit ? (
                <Col
                  className="mt-3"
                  style={{ textAlign: 'center', marginBottom: '100px' }}
                >
                  <ButtonInscription
                    className="p-2"
                    onClick={() => {
                      window.location = `/evento/${data.id}/confirmacao-treinamento`;
                    }}
                  >
                    Inscrever-me
                  </ButtonInscription>
                </Col>
              ) : (
                <Col
                  className="mt-3"
                  style={{ textAlign: 'center', marginBottom: '100px' }}
                >
                  <ButtonInscriptionDisabled className="p-2">
                    Inscrições encerradas
                  </ButtonInscriptionDisabled>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </>
    )
  );
}
