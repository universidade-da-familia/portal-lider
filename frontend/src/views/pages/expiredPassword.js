import React from 'react';
import { Lock } from 'react-feather';
import { Motion, spring } from 'react-motion';
import { useSelector, useDispatch } from 'react-redux';
import { BounceLoader } from 'react-spinners';
import { Card, CardBody, Col, FormGroup, Button, Label } from 'reactstrap';

// eslint-disable-next-line import/no-extraneous-dependencies
import { css } from '@emotion/core';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import logo from '~/assets/img/logo-big.png';

import { Creators as ResetPasswordActions } from '../../store/ducks/resetPassword';

const formSchema = Yup.object().shape({
  email_cpf_cnpj: Yup.string().required('O usuário é obrigatório'),
});

export default function ExpiredPassword() {
  const loading = useSelector(state => state.resetPassword.loading);
  const username = useSelector(state => state.login.username);

  const dispatch = useDispatch();

  function handleSubmit(values) {
    const { email_cpf_cnpj } = values;

    // VERIFICAR DEPOIS O TYPE PARA ENTITY E ORGANIZATION
    dispatch(
      ResetPasswordActions.resetPasswordRequest('entity', email_cpf_cnpj)
    );
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
          Sua senha expirou!
        </Label>
        <Label className="d-none d-lg-block fit width-700 font-medium-1">
          Para renovar sua senha, digite seu email ou CPF ao lado.
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
                Crie uma nova senha
              </Label>

              <Formik
                initialValues={{
                  email_cpf_cnpj: username || '',
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
                          placeholder="pode ser e-mail ou CPF"
                          name="email_cpf_cnpj"
                          id="email_cpf_cnpj"
                          className={`
                            form-control
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
                          <Lock size={14} color="#212529" />
                        </div>
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Col md="12">
                        <Button
                          disabled={!values.email_cpf_cnpj}
                          type="submit"
                          block
                          className={
                            values.email_cpf_cnpj
                              ? 'btn-default btn-raised'
                              : 'btn-secondary btn-raised'
                          }
                        >
                          {loading ? (
                            <BounceLoader
                              size={23}
                              color="#fff"
                              css={css`
                                display: block;
                                margin: 0 auto;
                              `}
                            />
                          ) : (
                            'Solicitar nova senha'
                          )}
                        </Button>
                      </Col>
                    </FormGroup>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        )}
      </Motion>
    </div>
  );
}
