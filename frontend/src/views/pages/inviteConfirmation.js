/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/prop-types */
// import external modules
import React, { Component, useState, useEffect } from 'react';
import { RefreshCw, User } from 'react-feather';
import { Motion, spring } from 'react-motion';
import NumberFormat from 'react-number-format';
import { useSelector, useDispatch } from 'react-redux';
import { BounceLoader } from 'react-spinners';
import { Card, CardBody, Row, Col, FormGroup, Button, Label } from 'reactstrap';

// eslint-disable-next-line import/no-extraneous-dependencies
import { css } from '@emotion/core';
import classnames from 'classnames';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Formik, Field, Form } from 'formik';
import randomstring from 'randomstring';
import * as Yup from 'yup';

import history from '~/app/history';
import logo from '~/assets/img/logo-big.png';
import { validateCPF } from '~/services/validateCPF';
import { Creators as EventActions } from '~/store/ducks/event';
import { Creators as InviteActions } from '~/store/ducks/invite';
import { Creators as ParticipantActions } from '~/store/ducks/participant';

const formSchema = Yup.object().shape({
  cpf: Yup.string().required('O CPF é obrigatório'),
});

const InputFeedback = ({ error }) =>
  error ? <div className={classnames('input-feedback')}>{error}</div> : null;

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
        className={`${classnames('radio-button')} mr-1`}
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
  const classes = classnames(
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

class CpfFormat extends Component {
  state = {
    value: '',
  };

  render() {
    return (
      <NumberFormat
        inputMode="decimal"
        displayType="input"
        format="###.###.###-##"
        allowNegative={false}
        value={this.state.value}
        onValueChange={vals => {
          this.setState({ value: vals.value });
        }}
        {...this.props}
      />
    );
  }
}

export default function InviteConfirmation({ match }) {
  const [invite, setInvite] = useState(null);
  const [participant, setParticipant] = useState(null);
  const [errorSex, setErrorSex] = useState(false);
  const [notFoundParticipant, setNotFoundParticipant] = useState(false);

  const event = useSelector(state => state.event.data);
  const participantData = useSelector(state => state.participant.data);
  const loading = useSelector(state => state.participant.loading);

  const dispatch = useDispatch();

  function handleSearchCpf(cpf) {
    setParticipant(null);

    const formattedCpf = cpf
      .replace('.', '')
      .replace('.', '')
      .replace('-', '');

    if (formattedCpf.length === 11) {
      dispatch(
        ParticipantActions.searchParticipantRequest(
          formattedCpf,
          event.defaultEvent.id
        )
      );
    }
  }

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

  function handleSubmit(values) {
    const data = {
      invite_id: parseInt(match.params.id, 10),
      entity_id: participant.id,
      event_id: parseInt(match.params.event_id, 10),
      assistant: false,
    };

    if (notFoundParticipant === true) {
      const password = randomstring.generate(6);
      const formattedCpf = values.cpf
        .replace('.', '')
        .replace('.', '')
        .replace('-', '');

      dispatch(
        InviteActions.createByInviteRequest(
          match.params.id,
          values.name,
          formattedCpf,
          values.email,
          values.sex,
          password,
          parseInt(match.params.event_id, 10)
        )
      );
    } else {
      dispatch(InviteActions.confirmInviteRequest(data));
    }
  }

  useEffect(() => {
    if (event !== null) {
      const invite = event.invites.find(
        invite => invite.id === parseInt(match.params.id, 10)
      );

      if (invite === undefined) {
        history.push(`/evento/${event.id}/convite/expirado`);
      } else {
        setInvite(invite);
      }
    }
  }, [event]);

  useEffect(() => {
    if (participantData !== null) {
      setParticipant(participantData);
      setErrorSex(false);
      setNotFoundParticipant(false);

      if (participantData.error !== undefined) {
        if (participantData.error.type === 'sex_type') {
          setErrorSex(true);
        } else if (participantData.error.type === 'not_found') {
          setNotFoundParticipant(true);
        } else {
          setErrorSex(false);
          setNotFoundParticipant(false);
        }
      }
    }
  }, [participantData]);

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
            <Label className="d-none d-lg-block fit width-700 font-medium-1">
              Confirme sua inscrição ao lado!
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
                    Confirmação de convite
                  </Label>

                  <Formik
                    initialValues={{
                      cpf: '',
                      name: '',
                      email: '',
                      sex: '',
                    }}
                    validationSchema={formSchema}
                    onSubmit={values => handleSubmit(values)}
                  >
                    {({ errors, touched, values }) => (
                      <Form className="pt-2">
                        <FormGroup>
                          <Row>
                            <Col sm="12">
                              <Label className="pl-2" for="cpf">
                                Digite seu CPF
                              </Label>
                              <div className="position-relative has-icon-right">
                                <Field
                                  name="cpf"
                                  id="cpf"
                                  className={`
                                    new-form-padding
                                    form-control
                                    ${errors.cpf && touched.cpf && 'is-invalid'}
                                  `}
                                  validate={validateCPF}
                                  render={({ field }) => (
                                    <CpfFormat
                                      {...field}
                                      id="cpf"
                                      name="cpf"
                                      placeholder="Ex: 423.123.321-12"
                                      className={`
                                        new-form-padding
                                        form-control
                                        ${errors.cpf &&
                                          touched.cpf &&
                                          'is-invalid'}
                                      `}
                                      value={values.cpf}
                                      onValueChange={val =>
                                        handleSearchCpf(val.value)
                                      }
                                    />
                                  )}
                                />
                                {errors.cpf && touched.cpf ? (
                                  <div className="invalid-feedback">
                                    {errors.cpf}
                                  </div>
                                ) : null}
                                {loading && (
                                  <div className="new-form-control-position">
                                    <RefreshCw size={16} className="spinner" />
                                  </div>
                                )}
                              </div>
                            </Col>

                            {!!values.cpf &&
                              participant !== null &&
                              participant.error === undefined &&
                              typeof participant === 'object' && (
                                <Col sm="12" className="mt-2">
                                  <Label>Nome</Label>
                                  <div className="position-relative has-icon-left">
                                    <Field
                                      readOnly
                                      type="text"
                                      name="name"
                                      id="name"
                                      value={participant.name}
                                      className="new-form-padding form-control"
                                      autoComplete="off"
                                    />
                                    <div className="new-form-control-position">
                                      <User size={14} color="#212529" />
                                    </div>
                                  </div>
                                </Col>
                              )}

                            {notFoundParticipant === true && (
                              <>
                                <Label className="font-small-3 text-center text-dark text-bold-400 text-uppercase mt-3 mx-auto">
                                  Complete seu cadastro
                                </Label>
                                <Col sm="12" className="mt-2">
                                  <Label>Nome</Label>
                                  <div className="position-relative has-icon-left">
                                    <Field
                                      type="text"
                                      name="name"
                                      id="name"
                                      className="new-form-padding form-control"
                                      autoComplete="off"
                                    />
                                    <div className="new-form-control-position">
                                      <User size={14} color="#212529" />
                                    </div>
                                  </div>
                                </Col>
                                <Col sm="12" className="mt-2">
                                  <Label>Email</Label>
                                  <div className="position-relative has-icon-left">
                                    <Field
                                      type="email"
                                      name="email"
                                      id="email"
                                      className="new-form-padding form-control"
                                      autoComplete="off"
                                    />
                                    <div className="new-form-control-position">
                                      <User size={14} color="#212529" />
                                    </div>
                                  </div>
                                </Col>
                                <Col sm="12" className="mt-2">
                                  <RadioButtonGroup
                                    id="radioGroup"
                                    value={values.radioGroup}
                                    error={errors.radioGroup}
                                    touched={touched.radioGroup}
                                    className={`
                                    new-form-padding
                                    form-control
                                    border-0
                                    ${errors.sex && touched.sex && 'is-invalid'}
                                  `}
                                  >
                                    <Row className="d-flex justify-content-around">
                                      {event.defaultEvent.sex_type === 'M' && (
                                        <Field
                                          component={RadioButton}
                                          name="sex"
                                          id="M"
                                          label="Masculino"
                                        />
                                      )}
                                      {event.defaultEvent.sex_type === 'F' && (
                                        <Field
                                          component={RadioButton}
                                          name="sex"
                                          id="F"
                                          label="Feminino"
                                        />
                                      )}
                                      {event.defaultEvent.sex_type === 'A' && (
                                        <>
                                          <Field
                                            component={RadioButton}
                                            name="sex"
                                            id="M"
                                            label="Masculino"
                                          />
                                          <Field
                                            component={RadioButton}
                                            name="sex"
                                            id="F"
                                            label="Feminino"
                                          />
                                        </>
                                      )}
                                    </Row>
                                  </RadioButtonGroup>
                                </Col>
                              </>
                            )}
                          </Row>
                        </FormGroup>
                        <FormGroup>
                          <Row>
                            <Col md="12">
                              <Button
                                disabled={!(!!values.cpf && errorSex === false)}
                                type="submit"
                                block
                                className={
                                  values.cpf
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
                                  'Quero participar!'
                                )}
                              </Button>
                            </Col>
                          </Row>
                        </FormGroup>
                      </Form>
                    )}
                  </Formik>
                </CardBody>
              </Card>
            )}
          </Motion>
        </>
      )}
    </div>
  );
}
