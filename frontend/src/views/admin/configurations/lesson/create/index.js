import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';

import * as Yup from 'yup';
import 'react-table/react-table.css';

import ContentHeader from '~/components/contentHead/contentHeader';

import { Row, Col, Button, FormGroup, Card, CardBody, Label } from 'reactstrap';

import { css } from '@emotion/core';
import { BounceLoader } from 'react-spinners';

import { Creators as LessonActions } from '~/store/ducks/lesson';
import { Creators as DefaultEventActions } from '~/store/ducks/defaultEvent';

const formDetails = Yup.object().shape({
  default_event_id: Yup.number().required('O tipo de evento é obrigatório'),
  title: Yup.string().required('O título é obrigatório'),
  description: Yup.string().required('A descrição é obrigatória'),
});

export default function LessonCreate() {
  const loading = useSelector(state => state.lesson.loading);
  const userData = useSelector(state => state.profile.data);
  const defaultData = useSelector(state => state.defaultEvent.allData);

  const [defaultEvents, setDefaultEvents] = useState([]);

  const dispatch = useDispatch();

  function handleSubmit(values) {
    dispatch(LessonActions.addLessonRequest(values));
  }

  useEffect(() => {
    dispatch(DefaultEventActions.allDefaultEventRequest());
  }, []);

  useEffect(() => {
    if (defaultData.length > 0 && userData !== {}) {
      const defaultEvent = defaultData.filter(event => {
        if (event.ministery_id === 1 && userData.cmn_hierarchy_id === 7) {
          return event;
        }
        if (event.ministery_id === 2 && userData.mu_hierarchy_id === 7) {
          return event;
        }
        if (event.ministery_id === 3 && userData.crown_hierarchy_id === 7) {
          return event;
        }
        if (event.ministery_id === 4 && userData.mp_hierarchy_id === 7) {
          return event;
        }
        if (event.ministery_id === 5 && userData.ffi_hierarchy_id === 7) {
          return event;
        }
        if (event.ministery_id === 6 && userData.gfi_hierarchy_id === 7) {
          return event;
        }
        if (event.ministery_id === 7 && userData.pg_hab_hierarchy_id === 7) {
          return event;
        }
        if (event.ministery_id === 8 && userData.pg_yes_hierarchy_id === 7) {
          return event;
        }
      });

      setDefaultEvents(defaultEvent);
    }
  }, [defaultData]);

  return (
    <Fragment>
      <ContentHeader>Criar lição</ContentHeader>
      <Card>
        <CardBody className="d-flex flex-column justify-content-center">
          <Formik
            enableReinitialize
            initialValues={{
              default_event_id: '',
              title: '',
              description: '',
              video_id: '',
              img_url: '',
            }}
            validationSchema={formDetails}
            onSubmit={values => handleSubmit(values)}
          >
            {({ errors, touched, handleChange }) => (
              <Form>
                <h4 className="form-section">Dados da lição</h4>
                <Row>
                  <Col sm="6">
                    <FormGroup>
                      <Label for="default_event_id">Evento padrão</Label>
                      <div className="position-relative">
                        <Field
                          type="select"
                          component="select"
                          id="default_event_id"
                          name="default_event_id"
                          onChange={handleChange}
                          className={`
                              form-control
                              ${errors.default_event_id &&
                                touched.default_event_id &&
                                'is-invalid'}
                            `}
                        >
                          <option value="" defaultValue="" disabled="">
                            Selecione uma opção
                          </option>
                          {defaultEvents.length > 0 &&
                            defaultEvents.map((defaultEvent, index) => (
                              <option key={index} value={defaultEvent.id}>
                                {defaultEvent.name}
                              </option>
                            ))}
                        </Field>
                        {errors.default_event_id && touched.default_event_id ? (
                          <div className="invalid-feedback">
                            {errors.default_event_id}
                          </div>
                        ) : null}
                      </div>
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col sm="12" md="12" lg="6" className="mb-2">
                    <FormGroup>
                      <Label for="name">Titulo</Label>
                      <Field
                        type="text"
                        name="title"
                        id="title"
                        className={`
                          form-control
                          ${errors.title && touched.title && 'is-invalid'}
                        `}
                      />
                      {errors.title && touched.title ? (
                        <div className="invalid-feedback">{errors.title}</div>
                      ) : null}
                    </FormGroup>
                  </Col>

                  <Col sm="12" md="12" lg="6" className="mb-2">
                    <FormGroup>
                      <Label for="name">Descrição</Label>
                      <Field
                        type="text"
                        name="description"
                        id="description"
                        className={`
                          form-control
                          ${errors.description &&
                            touched.description &&
                            'is-invalid'}
                        `}
                      />
                      {errors.description && touched.description ? (
                        <div className="invalid-feedback">
                          {errors.description}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col sm="12" md="12" lg="6" className="mb-2">
                    <FormGroup>
                      <Label for="name">Video ID(vimeo)</Label>
                      <Field
                        type="text"
                        name="video_id"
                        id="video_id"
                        className="form-control"
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="12" md="12" lg="6" className="mb-2">
                    <FormGroup>
                      <Label for="name">Imagem de fundo</Label>
                      <Field
                        type="text"
                        name="img_url"
                        id="img_url"
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
                          color={'#fff'}
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
                        Criar
                      </Button>
                    )}
                  </FormGroup>
                </div>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </Fragment>
  );
}
