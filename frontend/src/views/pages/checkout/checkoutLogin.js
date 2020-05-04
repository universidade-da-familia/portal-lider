// import external modules
import React, { useState, useEffect } from 'react';
import { User, Lock } from 'react-feather';
import { Motion, spring } from 'react-motion';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';
import { Card, CardBody, Row, Col, FormGroup, Button, Label } from 'reactstrap';

// eslint-disable-next-line import/no-extraneous-dependencies
import { css } from '@emotion/core';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import history from '~/app/history';

import logo from '../../../assets/img/logo-big.png';
import { Creators as CheckoutActions } from '../../../store/ducks/checkout';
import { Creators as SiteEventActions } from '../../../store/ducks/siteEvent';

const formSchema = Yup.object().shape({
  email_cpf_cnpj: Yup.string().required('Esse campo é obrigatório'),
  password: Yup.string()
    .min(6, 'Senha muito curta')
    .required('A senha é obrigatória'),
});

export default function CheckoutLogin({ match }) {
  const [mainOrganizators, setMainOrganizators] = useState([]);
  const [checkoutItem, setItem] = useState(null);

  const loading = useSelector(state => state.checkout.loading);
  const siteData = useSelector(state => state.siteEvent.data);

  const dispatch = useDispatch();

  function handleSubmit(values) {
    const { email_cpf_cnpj, password } = values;

    dispatch(
      CheckoutActions.checkoutLoginRequest(
        email_cpf_cnpj,
        password,
        match.params.event_id,
        match.params.id
      )
    );
  }

  useEffect(() => {
    const itemStorage = JSON.parse(
      localStorage.getItem('@dashboard/checkout_item')
    );

    if (
      parseInt(match.params.event_id, 10) === parseInt(itemStorage.event_id, 10)
    ) {
      setItem(itemStorage);
    } else {
      history.push(`/evento/${match.params.event_id}/checkout`);
    }

    dispatch(SiteEventActions.siteEventRequest(match.params.event_id));
  }, []);

  if (siteData !== null && mainOrganizators.length === 0) {
    const organizators = siteData.organizators.filter(organizator => {
      return organizator.hierarchy_id === 1 && organizator;
    });

    setMainOrganizators(organizators);
  }

  return (
    <div className="bg-static-pages-image-6 d-flex flex-column flex-1 p-0 flex-lg-row">
      {siteData !== null && (
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
              <Label className="font-medium-3 text-dark text-bold-400 text-center text-uppercase">
                Confirme sua inscrição
              </Label>
              {checkoutItem !== null && (
                <h5 className="text-dark text-bold-200 text-center mb-4">
                  <em>
                    {checkoutItem.item.name_id}: R$
                    {checkoutItem.item.group_price}
                    ,00
                  </em>
                </h5>
              )}
              <Formik
                initialValues={{
                  email_cpf_cnpj: '',
                  password: '',
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
                          placeholder="pode ser email, CPF ou CNPJ"
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
                              checked={values.rememberme}
                              onChange={handleChange}
                              id="rememberme"
                              name="rememberme"
                            />
                            <Label
                              className="custom-control-label"
                              for="rememberme"
                            >
                              Lembrar login
                            </Label>
                          </div>
                        </Col>
                        <Col sm="12" md="6" lg="6">
                          <div className="text-lg-right text-md-right text-center">
                            <NavLink
                              to="/recuperar-senha"
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
                            !(!!values.email_cpf_cnpj && !!values.password)
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
                              color="#fff"
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
                <Label className="black">Não possui conta?</Label>
              </Row>
              <Row className="justify-content-center">
                <NavLink to="/recuperar-senha" className="blue text-bold-400">
                  <u>Criar uma conta</u>
                </NavLink>
              </Row>
            </CardBody>
          </Card>
        )}
      </Motion>
    </div>
  );
}
