import React, { Component, Fragment } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
  FormGroup,
  Label,
} from 'reactstrap';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

// import classnames from "classnames";
import ContentHeader from '../../components/contentHead/contentHeader';
import ContentSubHeader from '../../components/contentHead/contentSubHeader';

const formSchema = Yup.object().shape({
  required: Yup.string().required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  number: Yup.number().required('Required'),
  url: Yup.string()
    .url()
    .required('Required'),
  date: Yup.date().required('Required'),
  minlength: Yup.string()
    .min(4, 'Too Short!')
    .required('Required'),
  maxlength: Yup.string()
    .max(5, 'Too Long!')
    .required('Required'),
});

class Validation extends Component {
  render() {
    return (
      <Fragment>
        <ContentHeader>Form Validation</ContentHeader>
        <ContentSubHeader>
          <p>Form Validation example.</p>
          <a
            href="https://github.com/jaredpalmer/formik"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://img.shields.io/github/stars/jaredpalmer/formik.svg?style=social"
              alt="Stars"
            />
            <img
              src="https://img.shields.io/npm/dm/formik.svg"
              alt="Downloads"
            />
          </a>
        </ContentSubHeader>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <CardTitle>Formik</CardTitle>
                <p>
                  <a
                    href="https://github.com/jaredpalmer/formik"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Formik
                  </a>{' '}
                  is designed to manage forms with complex validation with ease.
                  Formik supports synchronous and asynchronous form-level and
                  field-level validation. Furthermore, it comes with baked-in
                  support for schema-based form-level validation through Yup.
                </p>
                <Formik
                  initialValues={{
                    required: '',
                    email: '',
                    url: '',
                    number: '',
                    date: '',
                    minlength: '',
                    maxlength: '',
                  }}
                  validationSchema={formSchema}
                  onSubmit={values => {}}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <FormGroup>
                        <Label for="required">Required</Label>
                        <Field
                          name="required"
                          id="required"
                          className={`form-control ${errors.required &&
                            touched.required &&
                            'is-invalid'}`}
                        />
                        {errors.required && touched.required ? (
                          <div className="invalid-feedback">
                            {errors.required}
                          </div>
                        ) : null}
                      </FormGroup>
                      <FormGroup>
                        <Label for="email">Email</Label>
                        <Field
                          type="email"
                          name="email"
                          id="email"
                          className={`form-control ${errors.email &&
                            touched.email &&
                            'is-invalid'}`}
                        />
                        {errors.email && touched.email ? (
                          <div className="invalid-feedback">{errors.email}</div>
                        ) : null}
                      </FormGroup>
                      <FormGroup>
                        <Label for="url">Website URL</Label>
                        <Field
                          name="url"
                          id="url"
                          className={`form-control ${errors.url &&
                            touched.url &&
                            'is-invalid'}`}
                        />
                        {errors.url && touched.url ? (
                          <div className="invalid-feedback">{errors.url}</div>
                        ) : null}
                      </FormGroup>
                      <FormGroup>
                        <Label for="number">Number</Label>
                        <Field
                          name="number"
                          id="number"
                          className={`form-control ${errors.number &&
                            touched.number &&
                            'is-invalid'}`}
                        />
                        {errors.number && touched.number ? (
                          <div className="invalid-feedback">
                            {errors.number}
                          </div>
                        ) : null}
                      </FormGroup>
                      <FormGroup>
                        <Label for="date">Date</Label>
                        <Field
                          type="date"
                          name="date"
                          id="date"
                          className={`form-control ${errors.date &&
                            touched.date &&
                            'is-invalid'}`}
                        />
                        {errors.date && touched.date ? (
                          <div className="invalid-feedback">{errors.date}</div>
                        ) : null}
                      </FormGroup>
                      <FormGroup>
                        <Label for="minlength">
                          Min Length (Minimum 4 Characters)
                        </Label>
                        <Field
                          name="minlength"
                          id="minlength"
                          className={`form-control ${errors.minlength &&
                            touched.minlength &&
                            'is-invalid'}`}
                        />
                        {errors.minlength && touched.minlength ? (
                          <div className="invalid-feedback">
                            {errors.minlength}
                          </div>
                        ) : null}
                      </FormGroup>
                      <FormGroup>
                        <Label for="maxlength">
                          Max Length (Maximum 5 Characters)
                        </Label>
                        <Field
                          name="maxlength"
                          id="maxlength"
                          className={`form-control ${errors.maxlength &&
                            touched.maxlength &&
                            'is-invalid'}`}
                        />
                        {errors.maxlength && touched.maxlength ? (
                          <div className="invalid-feedback">
                            {errors.maxlength}
                          </div>
                        ) : null}
                      </FormGroup>
                      <Button type="submit">Submit</Button>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default Validation;
