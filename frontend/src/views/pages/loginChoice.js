// import external modules
import React from 'react';
import { Motion, spring } from 'react-motion';
import { Card, CardBody, Button, Label } from 'reactstrap';
import { User, ArrowRightCircle } from 'react-feather';

import history from '~/app/history';

import logo from '~/assets/img/logo-big.png';

export default function Login() {
  function handlePF() {
    history.push('/acesso-pf');
  }

  function handlePJ() {
    history.push('/acesso-pj');
  }

  return (
    <div className="bg-static-pages-image d-flex flex-column flex-1 p-0 flex-lg-row">
      <div className="fit min-full-height-vh color-overlay" />
      <div
        className="d-none d-lg-flex flex-column flex-grow-0 text-white width-75-per p-2 p-lg-5"
        style={{ zIndex: 1 }}
      >
        <img
          className="d-none d-lg-block fit width-125 mb-3"
          src={logo}
          alt="Logo UDF"
        />
        <Label className="d-none d-lg-block fit width-800 font-large-3 mb-3 line-height-1">
          Seja bem vindo
        </Label>
        <Label className="d-none d-lg-block fit width-700 font-medium-1">
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently
          with desktop publishing software like Aldus PageMaker including
          versions of Lorem Ipsum.
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
            className="fit min-full-height-vh m-2 m-lg-0 min-width-25-per rounded-0"
          >
            <CardBody className="d-flex flex-column justify-content-center">
              <Label className="font-medium-3 text-dark text-bold-400 text-center text-uppercase mb-4">
                Escolha o tipo de acesso
              </Label>
              <Button
                outline
                type="submit"
                color="default"
                className="btn-default height-100 icon-light-hover font-medium-2"
                onClick={() => handlePF()}
              >
                <div className="d-flex justify-content-around align-items-center">
                  <User size={24} color="#000" className="mr-2" />
                  <div>
                    <h5 className="mb-0">Acesso PF</h5>
                  </div>
                  <ArrowRightCircle size={24} color="#000" className="mr-2" />
                </div>
              </Button>

              <Button
                outline
                type="submit"
                color="default"
                className="btn-default height-100 icon-light-hover font-medium-2"
                onClick={() => handlePJ()}
              >
                <div className="d-flex justify-content-around align-items-center">
                  <i className="fa fa-building black font-small-4" />
                  <div>
                    <h5 className="mb-0">Acesso PJ</h5>
                  </div>
                  <ArrowRightCircle size={24} color="#000" className="mr-2" />
                </div>
              </Button>
            </CardBody>
          </Card>
        )}
      </Motion>
    </div>
  );
}
