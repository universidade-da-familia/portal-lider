/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import Avatar from 'react-avatar';
import {
  CheckSquare,
  User,
  AtSign,
  CreditCard,
  Calendar,
  Smartphone,
  Phone,
  MapPin,
  Map,
  Facebook,
  Instagram,
  Linkedin,
  Edit,
  Navigation,
} from 'react-feather';
import { Datepicker } from 'react-formik-ui';
import { useSelector, useDispatch } from 'react-redux';
import { BounceLoader } from 'react-spinners';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  Row,
  Col,
  Label,
  FormGroup,
  Input,
  CardBody,
} from 'reactstrap';

// eslint-disable-next-line import/no-extraneous-dependencies
import { css } from '@emotion/core';
import classnames from 'classnames';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import { Creators as AvatarActions } from '~/store/ducks/avatar';
import { Creators as ProfileActions } from '~/store/ducks/profile';

import statesCities from '../../assets/data/statesCities';
import CustomTabs from '../../components/tabs/default';
import TableExtended from './table';

const fileSchema = Yup.object().shape({
  file: Yup.mixed(),
});

const formSchema = Yup.object().shape({
  corporate_name: Yup.string().required('A razão social é obrigatória'),
  email: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      'Digite um email válido'
    )
    .required('O email é obrigatório'),
  cnpj: Yup.string()
    .max(14, 'Um CNPJ válido contem 11 dígitos')
    .required('O CNPJ é obrigatório'),
  phone: Yup.string().required('O celular é obrigatório'),
});

export default function TabsBorderBottom() {
  const [activeTab, setActiveTab] = useState('1');
  const [estado, setEstado] = useState('');
  const [src, setSrc] = useState(null);
  // const [firstAndLastName, setFirstAndLastName] = useState(null);

  const dispatch = useDispatch();

  const loading = useSelector(state => state.profile.loading);
  const data = useSelector(state => state.profile.data);

  const DatepickerButton = ({ value, onClick }) => (
    <Button
      outline
      color="secondary"
      className="form-control height-38"
      onClick={onClick}
    >
      {value}
    </Button>
  );

  function toggle(tab) {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  }

  function handleChangeAvatar(event) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.currentTarget.files[0];

      const reader = new FileReader();

      reader.onloadend = () => {
        setSrc(reader.result);
      };

      reader.readAsDataURL(file);

      const user_type = 'entity';

      dispatch(
        AvatarActions.avatarRequest(
          file,
          file.name,
          file.size,
          file.type,
          null,
          user_type
        )
      );
    }
  }

  function stateChange(value) {
    setEstado(value);
  }

  function handleUpdateProfile(values) {
    const data = {
      corporate_name: values.corporate_name,
      fantasy_name: values.fantasy_name,
      email: values.email,
      cnpj: values.cnpj,
      foundation: values.foundation,
      phone: values.phone,
      alt_phone: values.altPhone,
    };

    dispatch(ProfileActions.editProfileRequest(data));
  }

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === '1',
            })}
            onClick={() => {
              toggle('1');
            }}
          >
            Dados da empresa
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === '2',
            })}
            onClick={() => {
              toggle('2');
            }}
          >
            Endereços
          </NavLink>
        </NavItem>
        {/* <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === '3',
            })}
            onClick={() => {
              toggle('3');
            }}
          >
            Membros
          </NavLink>
        </NavItem> */}
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === '4',
            })}
            onClick={() => {
              toggle('4');
            }}
          >
            Redes Sociais
          </NavLink>
        </NavItem>
        {/* <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === '5',
            })}
            onClick={() => {
              toggle('5');
            }}
          >
            Histórico de atividades
          </NavLink>
        </NavItem> */}
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="3">
              <CardBody>
                <Row className="py-2">
                  <Formik
                    enableReinitialize
                    initialValues={{
                      file: null,
                    }}
                    validationSchema={fileSchema}
                  >
                    {() => (
                      <FormGroup className="m-auto d-flex justify-content-center">
                        <Row>
                          <Col sm="12" md="12" lg="12" xl="5">
                            <Label
                              for="file"
                              className="cursor-pointer rounded"
                            >
                              <Avatar
                                color={Avatar.getRandomColor('sitebase', [
                                  '#63D471 ',
                                  '#6A605C',
                                  '#B07BAC',
                                  '#FB3640',
                                  '#22AED1',
                                ])}
                                size="225"
                                round
                                // title={firstAndLastName}
                                // name={firstAndLastName}
                                src={src}
                              />
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  position: 'absolute',
                                  top: 0,
                                  background: 'rgba(0,0,0,0.3)',
                                  width: '225px',
                                  height: '225px',
                                  borderRadius: '225px',
                                  margin: '0 auto',
                                  color: '#fff',
                                  fontWeight: 'bold',
                                  fontSize: '18px',
                                }}
                              >
                                <span style={{ marginTop: '100px' }}>
                                  alterar foto
                                </span>
                              </div>
                            </Label>
                            <Field
                              type="file"
                              id="file"
                              name="file"
                              className="form-control d-none"
                              onChange={event => handleChangeAvatar(event)}
                            />
                          </Col>
                        </Row>
                      </FormGroup>
                    )}
                  </Formik>
                </Row>
              </CardBody>
            </Col>
            <Col sm="9">
              <Card>
                <CardBody>
                  <Formik
                    enableReinitialize
                    initialValues={{
                      corporate_name: data.corporate_name
                        ? data.corporate_name
                        : '',
                      fantasy_name: data.fantasy_name ? data.fantasy_name : '',
                      email: data.email ? data.email : '',
                      cnpj: data.cnpj ? data.cnpj : '',
                      foundation: data.foundation
                        ? data.foundation
                        : new Date(),
                      phone: data.phone ? data.phone : '',
                      altPhone: data.alt_phone ? data.alt_phone : '',
                    }}
                    validationSchema={formSchema}
                    onSubmit={values => handleUpdateProfile(values)}
                  >
                    {({ errors, touched, values, setFieldValue }) => (
                      <Form>
                        <FormGroup>
                          {/* Nome e sobrenome */}
                          <Row>
                            <Col
                              sm="12"
                              md="6"
                              lg="6"
                              className="has-icon-left"
                            >
                              <Label>Razão social</Label>
                              <div className="position-relative has-icon-left">
                                <Field
                                  type="text"
                                  name="corporate_name"
                                  id="corporate_name"
                                  className={`
                                      form-control
                                      ${errors.corporate_name &&
                                        touched.corporate_name &&
                                        'is-invalid'}
                                    `}
                                  autoComplete="off"
                                />
                                {errors.corporate_name &&
                                touched.corporate_name ? (
                                  <div className="invalid-feedback">
                                    {errors.corporate_name}
                                  </div>
                                ) : null}
                                <div className="form-control-position">
                                  <User size={14} color="#212529" />
                                </div>
                              </div>
                            </Col>
                            <Col
                              sm="12"
                              md="6"
                              lg="6"
                              className="has-icon-left"
                            >
                              <Label>Nome fantasia</Label>
                              <div className="position-relative has-icon-left">
                                <Field
                                  type="text"
                                  name="fantasy_name"
                                  id="fantasy_name"
                                  className={`
                                      form-control
                                      ${errors.fantasy_name &&
                                        touched.fantasy_name &&
                                        'is-invalid'}
                                    `}
                                  autoComplete="off"
                                />
                                {errors.fantasy_name && touched.fantasy_name ? (
                                  <div className="invalid-feedback">
                                    {errors.fantasy_name}
                                  </div>
                                ) : null}
                                <div className="form-control-position">
                                  <User size={14} color="#212529" />
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </FormGroup>
                        <FormGroup>
                          {/* Email e estado civil */}
                          <Row>
                            <Col
                              sm="12"
                              md="6"
                              lg="8"
                              className="has-icon-left"
                            >
                              <Label>Email</Label>
                              <div className="position-relative has-icon-left">
                                <Field
                                  type="text"
                                  name="email"
                                  id="email"
                                  className={`
                                      form-control
                                      ${errors.email &&
                                        touched.email &&
                                        'is-invalid'}
                                    `}
                                />
                                {errors.email && touched.email ? (
                                  <div className="invalid-feedback">
                                    {errors.email}
                                  </div>
                                ) : null}
                                <div className="form-control-position">
                                  <AtSign size={14} color="#212529" />
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </FormGroup>
                        <FormGroup>
                          {/* CPF e Nascimento e genero */}
                          <Row>
                            <Col
                              sm="12"
                              md="12"
                              lg="5"
                              className="has-icon-left"
                            >
                              <Label>CNPJ</Label>
                              <div className="position-relative has-icon-left">
                                <Field
                                  type="text"
                                  name="cnpj"
                                  id="cnpj"
                                  className={`
                                      form-control
                                      ${errors.cnpj &&
                                        touched.cnpj &&
                                        'is-invalid'}
                                    `}
                                />
                                {errors.cnpj && touched.cnpj ? (
                                  <div className="invalid-feedback">
                                    {errors.cnpj}
                                  </div>
                                ) : null}
                                <div className="form-control-position">
                                  <CreditCard size={14} color="#212529" />
                                </div>
                              </div>
                            </Col>
                            <Col sm="12" md="6" lg="4">
                              <FormGroup className="mb-0">
                                <Label for="foundation">Fundação</Label>
                                <div className="position-relative has-icon-left">
                                  <Datepicker
                                    name="foundation"
                                    id="foundation"
                                    selected={values.foundation}
                                    onChange={date =>
                                      setFieldValue('foundation', date)
                                    }
                                    customInput={<DatepickerButton />}
                                    withPortal
                                    fixedHeight
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    className={`
                                      form-control
                                      ${errors.foundation &&
                                        touched.foundation &&
                                        'is-invalid'}
                                    `}
                                  />
                                  {errors.foundation && touched.foundation ? (
                                    <div className="invalid-feedback">
                                      {errors.foundation}
                                    </div>
                                  ) : null}
                                  <div className="form-control-position">
                                    <Calendar size={14} color="#212529" />
                                  </div>
                                </div>
                              </FormGroup>
                            </Col>
                          </Row>
                        </FormGroup>
                        <FormGroup>
                          {/* Celular e telefone */}
                          <Row>
                            <Col
                              sm="12"
                              md="6"
                              lg="6"
                              className="has-icon-left"
                            >
                              <Label>Celular</Label>
                              <div className="position-relative has-icon-left">
                                <Field
                                  type="text"
                                  name="phone"
                                  id="phone"
                                  className={`
                                      form-control
                                      ${errors.phone &&
                                        touched.phone &&
                                        'is-invalid'}
                                    `}
                                />
                                {errors.phone && touched.phone ? (
                                  <div className="invalid-feedback">
                                    {errors.phone}
                                  </div>
                                ) : null}
                                <div className="form-control-position">
                                  <Smartphone size={14} color="#212529" />
                                </div>
                              </div>
                            </Col>
                            <Col sm="12" md="6" lg="6">
                              <Label>Telefone</Label>
                              <div className="position-relative has-icon-left">
                                <Field
                                  type="text"
                                  name="altPhone"
                                  id="altPhone"
                                  className={`
                                      form-control
                                      ${errors.altPhone &&
                                        touched.altPhone &&
                                        'is-invalid'}
                                    `}
                                />
                                {errors.altPhone && touched.altPhone ? (
                                  <div className="invalid-feedback">
                                    {errors.altPhone}
                                  </div>
                                ) : null}
                                <div className="form-control-position">
                                  <Phone size={14} color="#212529" />
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </FormGroup>
                        <FormGroup>
                          {loading ? (
                            <Button
                              disabled
                              color="success"
                              block
                              className="btn-default btn-raised"
                            >
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
                              block
                              className="btn-default btn-raised"
                            >
                              Atualizar perfil
                            </Button>
                          )}
                        </FormGroup>
                      </Form>
                    )}
                  </Formik>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </TabPane>

        {/* --------------------ABA DE ENDEREÇO-------------------- */}
        <TabPane tabId="2">
          <Card>
            <CardBody>
              <div className="px-3">
                <Form>
                  <h3>Endereço 1</h3>
                  <div className="form-body">
                    <Row>
                      <Col sm="3">
                        <FormGroup>
                          <Label for="cep">Tipo endereço</Label>
                          <div className="position-relative has-icon-left">
                            <Input
                              type="select"
                              id="state"
                              name="state"
                              onChange={e => {
                                stateChange(`${e.target.value}`);
                              }}
                            >
                              <option
                                value="none"
                                defaultValue="none"
                                disabled=""
                              >
                                Selecione uma opção
                              </option>
                              <option key="home" value="home">
                                Casa
                              </option>
                              <option key="work" value="work">
                                Trabalho
                              </option>
                              <option key="other" value="other">
                                Outro
                              </option>
                            </Input>
                            <div className="form-control-position">
                              <Map size={14} color="#212529" />
                            </div>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col sm="3">
                        <FormGroup>
                          <Label for="cep">CEP</Label>
                          <div className="position-relative has-icon-left">
                            <Input type="text" id="cep" name="cep" />
                            <div className="form-control-position">
                              <MapPin size={14} color="#212529" />
                            </div>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col sm="3">
                        <FormGroup>
                          <Label for="state">Estado</Label>
                          <Input
                            type="select"
                            id="state"
                            name="state"
                            onChange={e => {
                              stateChange(`${e.target.value}`);
                            }}
                          >
                            <option
                              value="none"
                              defaultValue="none"
                              disabled=""
                            >
                              Selecione uma opção
                            </option>

                            {statesCities.map(state => {
                              return (
                                <option key={state.sigla} value={state.sigla}>
                                  {state.nome}
                                </option>
                              );
                            })}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col sm="3">
                        <FormGroup>
                          <Label for="city">Cidade</Label>
                          <Input type="select" id="city" name="city">
                            <option
                              value="none"
                              defaultValue="none"
                              disabled=""
                            >
                              Selecione uma opção
                            </option>

                            {/* eslint-disable-next-line consistent-return */}
                            {statesCities.map(element => {
                              if (estado === element.sigla) {
                                const teste = element.cidades.map(cidade => {
                                  return (
                                    <option key={cidade} value={cidade}>
                                      {cidade}
                                    </option>
                                  );
                                });
                                return teste;
                              }
                            })}
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6">
                        <FormGroup>
                          <Label for="street">Rua</Label>
                          <div className="position-relative has-icon-left">
                            <Input type="text" id="street" name="street" />
                            <div className="form-control-position">
                              <i className="fa fa-road" />
                            </div>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col sm="2">
                        <FormGroup>
                          <Label for="streetNumber">Número</Label>
                          <div className="position-relative has-icon-left">
                            <Input
                              type="text"
                              id="streetNumber"
                              name="streetNumber"
                            />
                            <div className="form-control-position">
                              <Navigation size={14} color="#212529" />
                            </div>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col sm="4">
                        <FormGroup>
                          <Label for="neighborhood">Bairro</Label>
                          <div className="position-relative has-icon-left">
                            <Input
                              type="text"
                              id="neighborhood"
                              name="neighborhood"
                            />
                            <div className="form-control-position">
                              <i className="fa fa-map-signs" />
                            </div>
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup>
                      <Label for="complement">Complemento</Label>
                      <div className="position-relative has-icon-left">
                        <Input type="text" id="complement" name="complement" />
                        <div className="form-control-position">
                          <Edit size={14} color="#212529" />
                        </div>
                      </div>
                    </FormGroup>
                  </div>
                  <div className="form-actions right" />
                  <h3>Endereço 2</h3>
                  <div className="form-body">
                    <Row>
                      <Col sm="3">
                        <FormGroup>
                          <Label for="cep">Tipo endereço</Label>
                          <div className="position-relative has-icon-left">
                            <Input
                              type="select"
                              id="state"
                              name="state"
                              onChange={e => {
                                stateChange(`${e.target.value}`);
                              }}
                            >
                              <option
                                value="none"
                                defaultValue="none"
                                disabled=""
                              >
                                Selecione uma opção
                              </option>
                              <option key="home" value="home">
                                Casa
                              </option>
                              <option key="work" value="work">
                                Trabalho
                              </option>
                              <option key="other" value="other">
                                Outro
                              </option>
                            </Input>
                            <div className="form-control-position">
                              <Map size={14} color="#212529" />
                            </div>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col sm="3">
                        <FormGroup>
                          <Label for="cep">CEP</Label>
                          <div className="position-relative has-icon-left">
                            <Input type="text" id="cep" name="cep" />
                            <div className="form-control-position">
                              <MapPin size={14} color="#212529" />
                            </div>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col sm="3">
                        <FormGroup>
                          <Label for="state">Estado</Label>
                          <Input
                            type="select"
                            id="state"
                            name="state"
                            onChange={e => {
                              stateChange(`${e.target.value}`);
                            }}
                          >
                            <option
                              value="none"
                              defaultValue="none"
                              disabled=""
                            >
                              Selecione uma opção
                            </option>

                            {statesCities.map(state => {
                              return (
                                <option key={state.sigla} value={state.sigla}>
                                  {state.nome}
                                </option>
                              );
                            })}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col sm="3">
                        <FormGroup>
                          <Label for="city">Cidade</Label>
                          <Input type="select" id="city" name="city">
                            <option
                              value="none"
                              defaultValue="none"
                              disabled=""
                            >
                              Selecione uma opção
                            </option>

                            {/* eslint-disable-next-line consistent-return */}
                            {statesCities.map(element => {
                              if (estado === element.sigla) {
                                const teste = element.cidades.map(cidade => {
                                  return (
                                    <option key={cidade} value={cidade}>
                                      {cidade}
                                    </option>
                                  );
                                });
                                return teste;
                              }
                            })}
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6">
                        <FormGroup>
                          <Label for="street">Rua</Label>
                          <div className="position-relative has-icon-left">
                            <Input type="text" id="street" name="street" />
                            <div className="form-control-position">
                              <i className="fa fa-road" />
                            </div>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col sm="2">
                        <FormGroup>
                          <Label for="streetNumber">Número</Label>
                          <div className="position-relative has-icon-left">
                            <Input
                              type="text"
                              id="streetNumber"
                              name="streetNumber"
                            />
                            <div className="form-control-position">
                              <Navigation size={14} color="#212529" />
                            </div>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col sm="4">
                        <FormGroup>
                          <Label for="neighborhood">Bairro</Label>
                          <div className="position-relative has-icon-left">
                            <Input
                              type="text"
                              id="neighborhood"
                              name="neighborhood"
                            />
                            <div className="form-control-position">
                              <i className="fa fa-map-signs" />
                            </div>
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup>
                      <Label for="complement">Complemento</Label>
                      <div className="position-relative has-icon-left">
                        <Input type="text" id="complement" name="complement" />
                        <div className="form-control-position">
                          <Edit size={14} color="#212529" />
                        </div>
                      </div>
                    </FormGroup>
                  </div>
                  <div className="form-actions right">
                    {loading ? (
                      <Button
                        disabled
                        color="success"
                        block
                        className="btn-default btn-raised"
                      >
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
                        block
                        className="btn-default btn-raised"
                      >
                        Atualizar endereços
                      </Button>
                    )}
                  </div>
                </Form>
              </div>
            </CardBody>
          </Card>
        </TabPane>
        {/* ---------------------ABA DE REDES SOCIAIS ------------------------ */}
        <TabPane tabId="4">
          <Card>
            <CardBody>
              <div className="px-3">
                <Form>
                  <div className="form-body">
                    <FormGroup>
                      <Label for="facebook">Facebook</Label>
                      <div className="input-group">
                        <div className="has-icon-left input-group-prepend">
                          <span className="pl-4 input-group-text">
                            https://www.facebook.com/
                          </span>
                          <div className="form-control-position">
                            <Facebook size={14} color="#212529" />
                          </div>
                        </div>
                        <Input type="text" id="facebook" name="facebook" />
                      </div>
                    </FormGroup>
                    <FormGroup>
                      <Label for="instagram">Instagram</Label>
                      <div className="input-group">
                        <div className="has-icon-left input-group-prepend">
                          <span className="pl-4 input-group-text">
                            https://www.instagram.com/
                          </span>
                          <div className="form-control-position">
                            <Instagram size={14} color="#212529" />
                          </div>
                        </div>
                        <Input type="text" id="instagram" name="instagram" />
                      </div>
                    </FormGroup>
                    <FormGroup>
                      <Label for="linkedin">Linkedin</Label>
                      <div className="input-group">
                        <div className="has-icon-left input-group-prepend">
                          <span className="pl-4 input-group-text">
                            https://www.linkedin.com/in/
                          </span>
                          <div className="form-control-position">
                            <Linkedin size={14} color="#212529" />
                          </div>
                        </div>
                        <Input type="text" id="linkedin" name="linkedin" />
                      </div>
                    </FormGroup>
                  </div>
                  <div className="form-actions right">
                    <Button color="primary" className="mr-1" size="lg">
                      <CheckSquare size={14} color="#FFF" /> Salvar
                    </Button>
                  </div>
                </Form>
              </div>
            </CardBody>
          </Card>
        </TabPane>

        {/* ---------------- ABA DE HISTORICO ------------------ */}
        <TabPane tabId="5">
          <Card>
            <CardBody>
              <CustomTabs TabContent={<TableExtended />} />
            </CardBody>
          </Card>
        </TabPane>
      </TabContent>
    </div>
  );
}
