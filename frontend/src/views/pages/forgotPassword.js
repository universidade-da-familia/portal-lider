// import external modules
import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { NavLink } from 'react-router-dom';
import { Motion, spring } from 'react-motion';
import { Card, CardBody, Row, Col, FormGroup, Button, Label } from 'reactstrap';
import { User } from 'react-feather';

import { css } from '@emotion/core';
import { BounceLoader } from 'react-spinners';

import { useSelector, useDispatch } from 'react-redux';
import { Creators as ResetPasswordActions } from '~/store/ducks/resetPassword';

import logo from '~/assets/img/logo-big.png';

const formSchema = Yup.object().shape({
  email_cpf_cnpj: Yup.string().required('Esse campo é obrigatório'),
});

export default function ForgotPassword() {
  const loading = useSelector(state => state.resetPassword.loading);

  const dispatch = useDispatch();

  function handleSubmit(values) {
    const { type, email_cpf_cnpj } = values;

    dispatch(ResetPasswordActions.resetPasswordRequest(type, email_cpf_cnpj));
  }

  return (
    <div className="gradient-blue-indigo d-flex flex-column flex-1 p-0 flex-lg-row">
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
          Esqueceu a senha?
        </Label>
        <Label className="d-none d-lg-block fit width-700 font-medium-1">
          Para recuperar é bem simples, basta informar o seu email, CPF ou CNPJ.
          Enviaremos um email com as informações necessárias para a recuperação
          de sua senha.
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
                Recuperação de senha
              </Label>

              <Formik
                initialValues={{
                  type: 'entity',
                  email_cpf_cnpj: '',
                }}
                validationSchema={formSchema}
                onSubmit={values => handleSubmit(values)}
              >
                {({ errors, touched, values }) => (
                  <Form className="pt-2">
                    <FormGroup>
                      <Label className="pl-2">Digite seu usuário</Label>
                      <Col md="12" className="has-icon-left">
                        <Field
                          type="text"
                          placeholder="pode ser email ou CPF"
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
                      <Col md="12">
                        <Button
                          disabled={!!values.email_cpf_cnpj ? false : true}
                          type="submit"
                          block
                          className={
                            !!values.email_cpf_cnpj
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
                            'Recuperar senha'
                          )}
                        </Button>
                      </Col>
                    </FormGroup>
                  </Form>
                )}
              </Formik>
              <Row className="justify-content-center">
                <Label className="black">Lembrou a senha?</Label>
              </Row>
              {/* <Row className="justify-content-center mb-2">
                <NavLink to="/cadastro" className="blue text-bold-400">
                  <u>Criar uma conta</u>
                </NavLink>
              </Row> */}
              <Row className="justify-content-center mb-2">
                <NavLink to="/" className="blue text-bold-400">
                  <u>Acesse aqui</u>
                </NavLink>
              </Row>
              {/* <Row className="justify-content-center mb-2">
                <NavLink to="/acesso-pj" className="blue text-bold-400">
                  <u>Acesso Pessoa Jurídica</u>
                </NavLink>
              </Row> */}
            </CardBody>
          </Card>
        )}
      </Motion>
    </div>
  );
}
