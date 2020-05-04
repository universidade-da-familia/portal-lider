/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { BounceLoader } from 'react-spinners';
import { Row, Col, Button, FormGroup, Card, CardBody, Label } from 'reactstrap';

// eslint-disable-next-line import/no-extraneous-dependencies
import { css } from '@emotion/core';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import 'react-table/react-table.css';

import history from '~/app/history';
import ContentHeader from '~/components/contentHead/contentHeader';
import { Creators as MinisteryActions } from '~/store/ducks/ministery';

const formDetails = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
});

export default function MinisteryEdit({ match }) {
  const ministeryData = useSelector(state => state.ministery.ministeryData);
  const loading = useSelector(state => state.ministery.loading);
  const userData = useSelector(state => state.profile.data);

  const dispatch = useDispatch();

  function handleSubmit(values) {
    if (values.phone === null) {
      values.phone = '';
    }

    dispatch(
      MinisteryActions.editMinisteryRequest(match.params.ministery_id, values)
    );
  }

  useEffect(() => {
    if (!!userData.email && !!userData.cpf) {
      if (parseInt(match.params.ministery_id, 10) === 1) {
        if (userData.cmn_hierarchy_id !== 7) {
          toastr.confirm('Sem permissão para editar o ministério.', {
            onOk: () => history.push('/admin/configuracao/ministerios'),
            disableCancel: true,
          });
        }
      }
      if (parseInt(match.params.ministery_id, 10) === 2) {
        if (parseInt(userData.mu_hierarchy_id, 10) !== 7) {
          toastr.confirm('Sem permissão para editar o ministério.', {
            onOk: () => history.push('/admin/configuracao/ministerios'),
            disableCancel: true,
          });
        }
      }
      if (parseInt(match.params.ministery_id, 10) === 3) {
        if (parseInt(userData.crown_hierarchy_id, 10) !== 7) {
          toastr.confirm('Sem permissão para editar o ministério.', {
            onOk: () => history.push('/admin/configuracao/ministerios'),
            disableCancel: true,
          });
        }
      }
      if (parseInt(match.params.ministery_id, 10) === 4) {
        if (parseInt(userData.mp_hierarchy_id, 10) !== 7) {
          toastr.confirm('Sem permissão para editar o ministério.', {
            onOk: () => history.push('/admin/configuracao/ministerios'),
            disableCancel: true,
          });
        }
      }
      if (parseInt(match.params.ministery_id, 10) === 5) {
        if (parseInt(userData.ffi_hierarchy_id, 10) !== 7) {
          toastr.confirm('Sem permissão para editar o ministério.', {
            onOk: () => history.push('/admin/configuracao/ministerios'),
            disableCancel: true,
          });
        }
      }
      if (parseInt(match.params.ministery_id, 10) === 6) {
        if (parseInt(userData.gfi_hierarchy_id, 10) !== 7) {
          toastr.confirm('Sem permissão para editar o ministério.', {
            onOk: () => history.push('/admin/configuracao/ministerios'),
            disableCancel: true,
          });
        }
      }
      if (parseInt(match.params.ministery_id, 10) === 7) {
        if (parseInt(userData.pg_hab_hierarchy_id, 10) !== 7) {
          toastr.confirm('Sem permissão para editar o ministério.', {
            onOk: () => history.push('/admin/configuracao/ministerios'),
            disableCancel: true,
          });
        }
      }
      if (parseInt(match.params.ministery_id, 10) === 8) {
        if (parseInt(userData.pg_yes_hierarchy_id, 10) !== 7) {
          toastr.confirm('Sem permissão para editar o ministério.', {
            onOk: () => history.push('/admin/configuracao/ministerios'),
            disableCancel: true,
          });
        }
      }
    }

    dispatch(MinisteryActions.ministeryRequest(match.params.ministery_id));
  }, []);

  return (
    <>
      <ContentHeader>Editar ministério</ContentHeader>
      <Card>
        <CardBody className="d-flex flex-column justify-content-center">
          <Formik
            enableReinitialize
            initialValues={{
              name: ministeryData ? ministeryData.name : '',
              email: ministeryData ? ministeryData.email : '',
              phone: ministeryData ? ministeryData.phone : '',
            }}
            validationSchema={formDetails}
            onSubmit={values => handleSubmit(values)}
          >
            {({ errors, touched }) => (
              <Form>
                <h4 className="form-section">Dados do ministério</h4>
                <Row>
                  <Col sm="12" md="12" lg="6" className="mb-2">
                    <FormGroup>
                      <Label for="name">Nome do ministério</Label>
                      <Field
                        type="text"
                        name="name"
                        id="name"
                        className={`
                          form-control
                          ${errors.name && touched.name && 'is-invalid'}
                        `}
                      />
                      {errors.name && touched.name ? (
                        <div className="invalid-feedback">{errors.name}</div>
                      ) : null}
                    </FormGroup>
                  </Col>
                </Row>

                <h4 className="form-section mt-3">Contato</h4>
                <Row>
                  <Col sm="12" md="12" lg="6" className="mb-2">
                    <FormGroup>
                      <Label for="name">Email</Label>
                      <Field
                        type="text"
                        name="email"
                        id="email"
                        className="form-control"
                      />
                    </FormGroup>
                  </Col>

                  <Col sm="12" md="12" lg="6" className="mb-2">
                    <FormGroup>
                      <Label for="name">Telefone</Label>
                      <Field
                        type="text"
                        name="phone"
                        id="phone"
                        className="form-control"
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <div className="form-actions right">
                  <FormGroup>
                    {loading ? (
                      <Button disabled color="secondary">
                        <BounceLoader
                          size={23}
                          color="#fff"
                          css={css`
                            display: block;
                            margin: 0 auto;
                          `}
                        />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        color="success"
                        className="btn-default btn-raised"
                      >
                        Salvar
                      </Button>
                    )}
                  </FormGroup>
                </div>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
}
