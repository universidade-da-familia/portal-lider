// import external modules
import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { NavLink } from 'react-router-dom';
import { Motion, spring } from 'react-motion';
import { Card, CardBody, Row, Col, FormGroup, Button, Label } from 'reactstrap';
import { User, Lock } from 'react-feather';

import { css } from '@emotion/core';
import { BounceLoader } from 'react-spinners';

import { useSelector, useDispatch } from 'react-redux';
import { Creators as LoginActions } from '~/store/ducks/login';

import logo from '~/assets/img/logo-big.png';

const formSchema = Yup.object().shape({
  email_cpf_cnpj: Yup.string().required('Esse campo é obrigatório'),
  password: Yup.string()
    .min(6, 'Senha muito curta')
    .required('A senha é obrigatória'),
});

export default function Login() {
  const loading = useSelector(state => state.login.loading);

  const dispatch = useDispatch();

  function validateCPF(cpf) {
    let error;
    let sum = 0;
    let rest = 0;

    if (
      cpf.toString() === '00000000000' ||
      cpf.toString() === '11111111111' ||
      cpf.toString() === '99999999999'
    )
      error = 'O CPF é inválido';

    for (let index = 1; index <= 9; index++) {
      sum =
        sum +
        parseInt(cpf.toString().substring(index - 1, index)) * (11 - index);
    }

    rest = (sum * 10) % 11;

    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf.toString().substring(9, 10)))
      error = 'O CPF é inválido';

    sum = 0;

    for (let index = 1; index <= 10; index++) {
      sum =
        sum +
        parseInt(cpf.toString().substring(index - 1, index)) * (12 - index);
    }

    rest = (sum * 10) % 11;

    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf.toString().substring(10, 11)))
      error = 'O CPF é inválido';

    return error;
  }

  function handleSubmit(values) {
    const { type, email_cpf_cnpj, password, remember } = values;

    dispatch(
      LoginActions.loginRequest(type, email_cpf_cnpj, password, remember)
    );
  }

  return (
    <div className="bg-static-pages-image-pj d-flex flex-column flex-1 p-0 flex-lg-row">
      <div className="fit min-full-height-vh color-overlay" />
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
            className="fit min-full-height-vh m-2 m-lg-0 min-width-30-per rounded-0"
          >
            <CardBody className="d-flex flex-column justify-content-center">
              <Label className="font-medium-3 text-dark text-bold-400 text-center text-uppercase">
                Acesso Pessoa Júridica
              </Label>

              <Formik
                initialValues={{
                  type: 'organization',
                  email_cpf_cnpj: '',
                  password: '',
                  remember: true,
                }}
                validationSchema={formSchema}
                onSubmit={values => handleSubmit(values)}
              >
                {({ errors, touched, handleChange, values }) => (
                  <Form className="pt-2">
                    <FormGroup>
                      <Label className="pl-2">Digite seu usuário</Label>
                      <Col md="12" className="has-icon-left">
                        <Field
                          type="text"
                          placeholder="pode ser email ou CNPJ"
                          name="email_cpf_cnpj"
                          id="email_cpf_cnpj"
                          className={`
                              form-control
                              new-form-padding
                              ${errors.email_cpf_cnpj &&
                                touched.email_cpf_cnpj &&
                                'is-invalid'}
                            `}
                        />
                        {errors.email_cpf_cnpj && touched.email_cpf_cnpj ? (
                          <div className="invalid-feedback">
                            {errors.email_cpf_cnpj}
                          </div>
                        ) : null}
                        <div className="new-form-control-position">
                          <User size={14} color="#212529" />
                        </div>
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Label className="pl-2">Digite sua senha</Label>
                      <Col md="12" className="has-icon-left">
                        <Field
                          type="password"
                          placeholder="Senha"
                          name="password"
                          id="password"
                          className={`
                              form-control
                              new-form-padding
                              ${errors.password &&
                                touched.password &&
                                'is-invalid'}
                            `}
                        />
                        {errors.password && touched.password ? (
                          <div className="invalid-feedback">
                            {errors.password}
                          </div>
                        ) : null}
                        <div className="new-form-control-position">
                          <Lock size={14} color="#212529" />
                        </div>
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Row className="px-2">
                        <Col sm="12" md="6" lg="6">
                          <div className="custom-control custom-checkbox mb-2 text-center text-md-left text-lg-left">
                            <Field
                              type="checkbox"
                              className="custom-control-input"
                              checked={values.remember}
                              onChange={handleChange}
                              id="remember"
                              name="remember"
                            />
                            <Label
                              className="custom-control-label"
                              for="remember"
                            >
                              Lembrar acesso
                            </Label>
                          </div>
                        </Col>
                        <Col sm="12" md="6" lg="6">
                          <div className="text-lg-right text-md-right text-center">
                            <NavLink
                              to="/recuperar-senha-pj"
                              className="blue text-bold-400"
                            >
                              <u>Esqueceu a senha?</u>
                            </NavLink>
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup>
                      <Col md="12">
                        <Button
                          disabled={
                            !!values.email_cpf_cnpj && !!values.password
                              ? false
                              : true
                          }
                          type="submit"
                          block
                          className={
                            !!values.email_cpf_cnpj && !!values.password
                              ? 'btn-default btn-raised'
                              : 'btn-secondary btn-raised'
                          }
                        >
                          {loading ? (
                            <BounceLoader
                              size={23}
                              color={'#fff'}
                              css={css`
                                display: block;
                                margin: 0 auto;
                              `}
                            />
                          ) : (
                            'Entrar'
                          )}
                        </Button>
                      </Col>
                    </FormGroup>
                  </Form>
                )}
              </Formik>
              <Row className="justify-content-center">
                <Label className="black">É um líder/treinador?</Label>
              </Row>
              {/* <Row className="justify-content-center">
                <NavLink to="/cadastro" className="blue text-bold-400">
                  <u>Criar uma conta</u>
                </NavLink>
              </Row> */}
              <Row className="justify-content-center">
                <NavLink to="/acesso-pf" className="blue text-bold-400">
                  <u>Acesso Pessoa Física</u>
                </NavLink>
              </Row>
            </CardBody>
          </Card>
        )}
      </Motion>
    </div>
  );
}
