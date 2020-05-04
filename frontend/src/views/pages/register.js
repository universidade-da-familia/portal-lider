/* eslint-disable react/jsx-props-no-spreading */
// import external modules
import React from 'react';
import { User, AtSign, CreditCard, Lock } from 'react-feather';
import { Motion, spring } from 'react-motion';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';
import { Card, CardBody, Row, Col, FormGroup, Button, Label } from 'reactstrap';

// eslint-disable-next-line import/no-extraneous-dependencies
import { css } from '@emotion/core';
import classNames from 'classnames';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import logo from '~/assets/img/logo-big.png';
import { Creators as SignupActions } from '~/store/ducks/signup';

const formSchema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      'Digite um email válido'
    )
    .required('O email é obrigatório'),
  cpf_cnpj: Yup.string().required('O CPF/CNPJ é obrigatório'),
  password: Yup.string()
    .min(6, 'Senha muito curta')
    .required('A senha é obrigatória'),
});

export default function Register() {
  const loading = useSelector(state => state.signup.loading);

  const dispatch = useDispatch();

  const InputFeedback = ({ error }) =>
    error ? <div className={classNames('input-feedback')}>{error}</div> : null;

  const RadioButton = ({
    field: { name, value, onChange, onBlur },
    id,
    label,
    className,
    ...props
  }) => {
    return (
      <div>
        <input
          name={name}
          id={id}
          type="radio"
          value={id} // could be something else for output?
          checked={id === value}
          onChange={onChange}
          onBlur={onBlur}
          className={`${classNames('radio-button')} mr-1`}
          {...props}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    );
  };

  // Radio group
  const RadioButtonGroup = ({
    value,
    error,
    touched,
    label,
    className,
    children,
  }) => {
    const classes = classNames(
      'input-field',
      {
        'is-success': value || (!error && touched), // handle prefilled or user-filled
        'is-error': !!error && touched,
      },
      className
    );

    return (
      <div className={classes}>
        <fieldset>
          <legend>{label}</legend>
          {children}
          {touched && <InputFeedback error={error} />}
        </fieldset>
      </div>
    );
  };

  function handleSubmit(values) {
    const {
      entity_company,
      name,
      email,
      cpf_cnpj,
      password,
      remember,
    } = values;

    dispatch(
      SignupActions.signupRequest(
        entity_company,
        name,
        email,
        cpf_cnpj,
        password,
        remember
      )
    );
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
          {/* eslint-disable-next-line react/no-unescaped-entities */}
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
              <Label className="font-medium-3 text-dark text-bold-400 text-center text-uppercase">
                Faça seu cadastro
              </Label>

              <Formik
                initialValues={{
                  entity_company: 'pf',
                  name: '',
                  email: '',
                  cpf_cnpj: '',
                  password: '',
                }}
                validationSchema={formSchema}
                onSubmit={values => handleSubmit(values)}
              >
                {({ errors, touched, values }) => (
                  <Form className="pt-2">
                    <FormGroup className="mb-0">
                      <RadioButtonGroup
                        id="radioGroup"
                        value={values.radioGroup}
                        error={errors.radioGroup}
                        touched={touched.radioGroup}
                        className="new-form-padding"
                      >
                        <Row className="d-flex justify-content-around">
                          <Field
                            component={RadioButton}
                            name="entity_company"
                            id="pf"
                            label="Pessoa física"
                          />
                          <Field
                            component={RadioButton}
                            name="entity_company"
                            id="pj"
                            label="Pessoa jurídica"
                          />
                        </Row>
                      </RadioButtonGroup>
                    </FormGroup>
                    <FormGroup>
                      <Label className="pl-2">
                        {values.entity_company === 'pf'
                          ? 'Digite seu nome'
                          : 'Nome da organização'}
                      </Label>
                      <Col md="12" className="has-icon-left">
                        <Field
                          type="text"
                          placeholder={`${
                            values.entity_company === 'pf'
                              ? 'Jose da Silva'
                              : 'Igreja Evangélica Batista'
                          }`}
                          name="name"
                          id="name"
                          className={`
                              form-control
                              new-form-padding
                              ${errors.name && touched.name && 'is-invalid'}
                            `}
                        />
                        {errors.name && touched.name ? (
                          <div className="invalid-feedback">{errors.name}</div>
                        ) : null}
                        <div className="new-form-control-position">
                          <User size={14} color="#212529" />
                        </div>
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Label className="pl-2">
                        {values.entity_company === 'pf'
                          ? 'Digite seu email'
                          : 'Email da organização'}
                      </Label>
                      <Col md="12" className="has-icon-left">
                        <Field
                          type="text"
                          placeholder={`${
                            values.entity_company === 'pf'
                              ? 'ex: jose.silva@gmail.com'
                              : 'ex: ig.batista@gmail.com'
                          }`}
                          name="email"
                          id="email"
                          className={`
                              form-control
                              new-form-padding
                              ${errors.email && touched.email && 'is-invalid'}
                            `}
                        />
                        {errors.email && touched.email ? (
                          <div className="invalid-feedback">{errors.email}</div>
                        ) : null}
                        <div className="new-form-control-position">
                          <AtSign size={14} color="#212529" />
                        </div>
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Label className="pl-2">
                        {values.entity_company === 'pf'
                          ? 'Digite seu cpf'
                          : 'Digite o CNPJ'}
                      </Label>
                      <Col md="12" className="has-icon-left">
                        <Field
                          type="text"
                          placeholder={`${
                            values.entity_company === 'pf'
                              ? 'ex: 411.127.555-11'
                              : 'ex: 66.494.642/0001-00'
                          }`}
                          name="cpf_cnpj"
                          id="cpf_cnpj"
                          className={`
                              form-control
                              new-form-padding
                              ${errors.cpf_cnpj &&
                                touched.cpf_cnpj &&
                                'is-invalid'}
                            `}
                        />
                        {errors.cpf_cnpj && touched.cpf_cnpj ? (
                          <div className="invalid-feedback">
                            {errors.cpf_cnpj}
                          </div>
                        ) : null}
                        <div className="new-form-control-position">
                          <CreditCard size={14} color="#212529" />
                        </div>
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Label className="pl-2">
                        {values.entity_company === 'pf'
                          ? 'Digite sua senha'
                          : 'Digite a senha'}
                      </Label>
                      <Col md="12" className="has-icon-left">
                        <Field
                          type="password"
                          placeholder="mínimo de 6 caracteres"
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
                      <Col md="12">
                        <Button
                          type="submit"
                          block
                          className="btn-default btn-raised"
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
                            'Criar conta'
                          )}
                        </Button>
                      </Col>
                    </FormGroup>
                  </Form>
                )}
              </Formik>
              <Row className="justify-content-center">
                <Label className="black">Possui uma conta?</Label>
              </Row>
              <Row className="justify-content-center">
                <NavLink to="/" className="blue text-bold-400">
                  <u>Faça login</u>
                </NavLink>
              </Row>
            </CardBody>
          </Card>
        )}
      </Motion>
    </div>
  );
}
