import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'reactstrap';

import styled from 'styled-components';

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

export default function Body() {
  const [singlePrice, setSinglePrice] = useState(null);
  const [couplePrice, setCouplePrice] = useState(null);

  const data = useSelector(state => state.event.data);

  useEffect(() => {
    if (data !== null) {
      let auxSumSingle = 0;
      let auxSumCouple = 0;
      data.defaultEvent.kit.products.forEach(product => {
        if (
          product.product_category === 'book' ||
          product.product_category === 'manual' ||
          product.product_category === 'guide'
        ) {
          // alianca romance
          if (data.default_event_id === 50) {
            auxSumCouple += product.training_price;
          }

          // financas crown
          if (data.default_event_id === 54) {
            auxSumSingle += product.training_price;
            auxSumCouple += product.training_price;
          }

          // yes
          if (data.default_event_id === 64) {
            auxSumSingle += product.training_price;
            auxSumCouple += product.training_price;
          }

          // habitudes
          if (data.default_event_id === 63) {
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

          // mulher unica
          if (data.default_event_id === 60) {
            auxSumSingle += product.training_price;
          }

          // mulher prospera
          if (data.default_event_id === 59) {
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
                  {data.defaultEvent.description}
                </EventDescription>
              </Col>
            </Row>
          </Col>
          <Col sm="12" md="12" lg="6" className="p-5">
            <Row className="flex-column">
              <Col className="pb-4 invisible"> .</Col>
              <Col className="pb-1">
                <LocalEvent>{`${data.city}/${data.uf}`}</LocalEvent>
              </Col>
              <Col className="pb-1">
                <LocalEvent>12 a 13 de Dezembro de 2020</LocalEvent>
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
                <Col>Image</Col>
                <Col>
                  <TitleBoxTrainer className="mb-4">
                    Treinadores
                  </TitleBoxTrainer>
                </Col>
                {data.organizators.map(organizator => {
                  return (
                    <Col>
                      <TextBoxTrainer>{organizator.name}</TextBoxTrainer>
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
                <Col>Image</Col>
                <Col>
                  <TitleBoxTrainer className="mb-4">Contato</TitleBoxTrainer>
                </Col>
                <Col>
                  <TextBoxTrainer>{data.organizators[0].email}</TextBoxTrainer>
                </Col>
                <Col>
                  <TextBoxTrainer>{data.organizators[0].phone}</TextBoxTrainer>
                </Col>
              </Row>
            </Col>
          </Row>
        </Row>

        <Row>
          <Col sm="12" md="6" lg="6" className="p-5">
            <Row className="flex-column">
              <Col className="px-4 pb-5">
                <TitleSection2>Pré-requisitos</TitleSection2>
              </Col>
              <Col className="px-4">
                <TextSection2>
                  Ser membro de uma igreja evangélica <br />
                  Ter mais de 18 anos.
                </TextSection2>
              </Col>
            </Row>
          </Col>
          <Col sm="12" md="6" lg="6" className="p-5">
            <Row className="flex-column">
              <Col className="px-4 pb-5">
                <TitleSection2>Informações adicionais</TitleSection2>
              </Col>
              <Col className="px-4">
                <TextSection2>
                  Essa parte é onde poe informações adicionais
                </TextSection2>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row style={{ backgroundColor: '#ffffff' }}>
          <Col sm="12" md="12" lg="12" className="p-5">
            <Row className="flex-column">
              <Col>
                <TitleSection3>Investimento</TitleSection3>
              </Col>
              <Col>
                <Row className="flex-1 justify-content-center">
                  {singlePrice > 0 && (
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
                          <Section3BoxPrice>R$ 150,00</Section3BoxPrice>
                        </Col>
                      </Row>
                    </Col>
                  )}
                  {couplePrice > 0 && (
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
                          <Section3BoxPrice>R$ 200,00</Section3BoxPrice>
                        </Col>
                      </Row>
                    </Col>
                  )}
                </Row>
              </Col>
              <Col>
                <TextSection3>
                  Incluir somente material didádico e participação no evento
                </TextSection3>
              </Col>
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
            </Row>
          </Col>
        </Row>
      </>
    )
  );
}
