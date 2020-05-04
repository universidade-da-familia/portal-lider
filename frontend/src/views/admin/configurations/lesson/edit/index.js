/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BounceLoader } from 'react-spinners';
import { Row, Col, Button, FormGroup, Card, CardBody, Label } from 'reactstrap';

import { css } from '@emotion/core';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import 'react-table/react-table.css';

import ContentHeader from '~/components/contentHead/contentHeader';
import { Creators as LessonActions } from '~/store/ducks/lesson';

const formDetails = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  description: Yup.string().required('A descrição é obrigatória'),
});

export default function LessonEdit({ match }) {
  const lessonData = useSelector(state => state.lesson.lessonData);
  const loading = useSelector(state => state.lesson.loading);

  const dispatch = useDispatch();

  function handleSubmit(values) {
    if (values.phone === null) {
      values.phone = '';
    }

    dispatch(LessonActions.editLessonRequest(match.params.lesson_id, values));
  }

  useEffect(() => {
    dispatch(LessonActions.lessonRequest(match.params.lesson_id));
  }, []);

  return (
    <>
      <ContentHeader>Editar lição</ContentHeader>
      <Card>
        <CardBody className="d-flex flex-column justify-content-center">
          <Formik
            enableReinitialize
            initialValues={{
              title: lessonData ? lessonData.title : '',
              description: lessonData ? lessonData.description : '',
              video_id: lessonData ? lessonData.video_id : '',
              img_url: lessonData ? lessonData.img_url : '',
            }}
            validationSchema={formDetails}
            onSubmit={values => handleSubmit(values)}
          >
            {({ errors, touched }) => (
              <Form>
                <h4 className="form-section">Dados da lição</h4>
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
