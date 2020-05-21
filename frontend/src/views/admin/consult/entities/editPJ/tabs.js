/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import Avatar from 'react-avatar';
import {
  Map,
  User,
  Box,
  Clock,
  AtSign,
  CreditCard,
  Calendar,
  Smartphone,
  Phone,
  RefreshCw,
  Facebook,
  Instagram,
  Linkedin,
  Edit,
  Navigation,
  Plus,
  X,
  Share2,
  Lock,
  Eye,
  EyeOff,
  Globe,
} from 'react-feather';
import { Datepicker } from 'react-formik-ui';
import { useSelector, useDispatch, useStore } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { BounceLoader } from 'react-spinners';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  Row,
  Col,
  Label,
  FormGroup,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';

// eslint-disable-next-line import/no-extraneous-dependencies
import { css } from '@emotion/core';
import classnames from 'classnames';
import pt from 'date-fns/locale/pt';
import { Formik, Field, Form, FieldArray, getIn } from 'formik';
import * as Yup from 'yup';

import CepFormat from '~/components/fields/CepFormat';
import CNPJFormat from '~/components/fields/CNPJFormat';
import PhoneFormat from '~/components/fields/PhoneFormat';
import { validateCNPJ } from '~/services/validateCNPJ';
import { Creators as AddressActions } from '~/store/ducks/address';
import { Creators as AvatarActions } from '~/store/ducks/avatar';
import { Creators as CepActions } from '~/store/ducks/cep';
import { Creators as OrganizationActions } from '~/store/ducks/organization';
import { Creators as ProfileActions } from '~/store/ducks/profile';
import OrderTable from '~/views/orders/table';
import HistoryTable from '~/views/profile/historyTable';
import RelationshipTable from '~/views/profile/relationshipTable';

// import TableExtended from './table';

const fileSchema = Yup.object().shape({
  file: Yup.mixed(),
});

const formSchema = Yup.object().shape({
  corporate_name: Yup.string()
    .required('A razão social é obrigatória.')
    .max(35, 'Máximo 35 caracteres.'),
  fantasy_name: Yup.string().max(35, 'Máximo 35 caracteres.'),
  email: Yup.string().matches(
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    'Digite um email válido.'
  ),
});

const addressSchema = Yup.object().shape({
  addresses: Yup.array().of(
    Yup.object().shape({
      type: Yup.string().required('O tipo é obrigatório.'),
      other_type_name: Yup.string().when('type', {
        is: 'other',
        then: Yup.string().required('O apelido é obrigatório.'),
      }),
      cep: Yup.string().required('O cep é obrigatório.'),
      city: Yup.string().required('A cidade é obrigatória.'),
      street: Yup.string().required('A rua é obrigatória.'),
      street_number: Yup.string().required('O número é obrigatório.'),
      neighborhood: Yup.string().required('A bairro é obrigatório.'),
      complement: Yup.string().max(60, 'Máximo de 60 caracteres.'),
    })
  ),
});

export default function OrganizationTabs({ match }) {
  const [activeTab, setActiveTab] = useState('1');
  const [src, setSrc] = useState(null);
  const [firstAndLastName, setFirstAndLastName] = useState(null);
  const [addresses, setAddresses] = useState([
    {
      id: null,
      organization_id: parseInt(match.params.id, 10),
      type: '',
      other_type_name: '',
      cep: '',
      country: 'Brasil',
      uf: '',
      city: '',
      street: '',
      street_number: '',
      neighborhood: '',
      complement: '',
      receiver: '',
    },
  ]);
  const [loadCep, setLoadCep] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [socialNetwork, setSocialNetwork] = useState({
    facebook: '',
    instagram: '',
    linkedin: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const dispatch = useDispatch();
  const store = useStore();

  const data = useSelector(state => state.organization.data);
  const loading = useSelector(state => state.organization.loading);
  const loadingProfile = useSelector(state => state.profile.loading);
  const addressLoading = useSelector(state => state.address.loading);
  const cepData = useSelector(state => state.cep.data);
  const cepLoading = useSelector(state => state.cep.loading);

  // eslint-disable-next-line react/prop-types
  const DatepickerButton = ({ value, onClick }) => (
    <Button
      outline
      color="secondary"
      className="form-control height-38 mb-0"
      onClick={onClick}
    >
      {value}
    </Button>
  );

  function toggle(tab) {
    if (activeTab !== tab) {
      setActiveTab(tab);
      localStorage.setItem('@dashboard/adminProfileActiveTabPJ', tab);
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
          match.params.id,
          user_type
        )
      );
    }
  }

  function handleCep(cep, setFieldValue, values, index) {
    setFieldValue(`addresses.${index}.cep`, cep);

    if (loadCep && cep.length === 8) {
      setAddresses(values.addresses);

      dispatch(CepActions.cepRequest(cep, index));
    }
  }

  function handleUpdateProfile(values) {
    const formattedCnpj = values.cnpj
      .replace('.', '')
      .replace('.', '')
      .replace('/', '')
      .replace('-', '');
    const formattedPhone = values.phone
      .replace('(', '')
      .replace(')', '')
      .replace('-', '');
    const formattedAltPhone = values.altPhone
      .replace('(', '')
      .replace(')', '')
      .replace('-', '');

    const toSend = {
      organization_id: parseInt(match.params.id, 10),
      corporate_name: values.corporate_name,
      fantasy_name: values.fantasy_name,
      inscricao_estadual: values.inscricao_estadual,
      foundation: values.foundation,
      phone: formattedPhone,
      alt_phone: formattedAltPhone,
    };

    // const toSend = {
    //   organization_id: parseInt(match.params.id, 10),
    //   name: values.corporate_name,
    //   fantasy_name: values.fantasy_name,
    //   inscricao_estadual: values.inscricao_estadual,
    //   birthday: values.foundation,
    //   phone: formattedPhone,
    //   alt_phone: formattedAltPhone,
    // };

    if (values.email !== data.email) {
      toSend.email = values.email;
    }
    if (formattedCnpj !== data.cnpj) {
      toSend.cnpj = formattedCnpj;
    }

    dispatch(OrganizationActions.editOrganizationRequest(toSend));
    // dispatch(UserActions.editUserRequest(toSend));
  }

  function handleUpdateAddress(values) {
    let addressesToUpdate = values.addresses;

    const addressesPut = addressesToUpdate.filter(
      addressFind => addressFind.id !== null
    );

    addressesToUpdate = values.addresses;

    const addressesPost = addressesToUpdate.filter(addressFind => {
      if (addressFind.id === null) {
        delete addressFind.id;

        return addressFind;
      }
    });

    const user_type = 'organization';

    dispatch(
      AddressActions.addressRequest(
        data.netsuite_id,
        user_type,
        addressesPost,
        addressesPut
      )
    );
  }

  function handleDeleteAddress(id, remove, index) {
    toastr.confirm('Deseja realmente remover esse endereço?', {
      onOk: () => {
        dispatch(
          AddressActions.deleteAddressRequest(id, index, data.netsuite_id)
        );
        remove(index);
      },
      onCancel: () => {},
    });
  }

  function handleUpdateSocialNetwork(values) {
    const toSend = {
      organization_id: parseInt(match.params.id, 10),
      facebook: values.facebook,
      instagram: values.instagram,
      linkedin: values.linkedin,
    };

    dispatch(OrganizationActions.editOrganizationRequest(toSend));
  }

  function handleUpdatePassword(values) {
    const user_type = 'organization';

    const toSend = {
      user_type,
      organization_id: match.params.id,
      password: values.password,
      newPassword: values.newPassword,
    };

    dispatch(ProfileActions.passwordProfileRequest(toSend));
  }

  useEffect(() => {
    if (cepData.cep) {
      const copy = addresses;

      copy[cepData.index].cep = cepData.cep.replace('-', '');
      copy[cepData.index].uf = cepData.uf !== '' ? cepData.uf : '';
      copy[cepData.index].city =
        cepData.localidade !== '' ? cepData.localidade : '';
      copy[cepData.index].street =
        cepData.logradouro !== ''
          ? cepData.logradouro
          : addresses[cepData.index].street;
      copy[cepData.index].neighborhood =
        cepData.bairro !== ''
          ? cepData.bairro
          : addresses[cepData.index].neighborhood;

      setAddresses(copy);
      setAddresses([...addresses]);
    }
  }, [cepData]);

  useEffect(() => {
    if (data.addresses && data.addresses.length > 0) {
      setAddresses(data.addresses);
    }

    if (data.events && data.events.length > 0) {
      setAllEvents(
        data.events.map(event => {
          event.history_type = 'Igreja';
          return event;
        })
      );
    }

    if (data.id) {
      setSocialNetwork({
        ...socialNetwork,
        facebook: data.facebook,
        instagram: data.instagram,
        linkedin: data.linkedin,
      });
    }

    if (data.file) {
      setSrc(data.file.url);
    }

    if (data.fantasy_name) {
      const fullname = data.fantasy_name.split(' ');
      const firstname = fullname[0];
      const lastname = fullname[fullname.length - 1];

      setFirstAndLastName(`${firstname} ${lastname}`);
    } else if (data.corporate_name) {
      const fullname = data.corporate_name.split(' ');
      const firstname = fullname[0];
      const lastname = fullname[fullname.length - 1];

      setFirstAndLastName(`${firstname} ${lastname}`);
    }
  }, [data]);

  useEffect(() => {
    const storageTab = localStorage.getItem(
      '@dashboard/adminProfileActiveTabPJ'
    );

    if (storageTab) {
      setActiveTab(storageTab);
    }

    dispatch(OrganizationActions.organizationRequest(match.params.id));

    return () => {
      store.getState().cep.data = {};
      store.getState().organization.data = {
        orders: [],
      };
    };
  }, []);

  return (
    <div className="tabs-vertical">
      <div>
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
                  <Label for="file" className="cursor-pointer rounded">
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
                      title={firstAndLastName}
                      name={firstAndLastName}
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
                      <span style={{ marginTop: '100px' }}>alterar foto</span>
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
        <div className="mt-4 d-none d-lg-flex d-xl-flex">
          <Nav tabs className="width-300">
            <NavItem className="width-300">
              <NavLink
                className={`
                  ${classnames({
                    active: activeTab === '1',
                  })}
                  d-flex
                  justify-content-between
                  align-items-center
                `}
                onClick={() => {
                  toggle('1');
                }}
              >
                Dados gerais
                <User size={18} color="#212529" />
              </NavLink>
            </NavItem>
            <NavItem className="width-300">
              <NavLink
                className={`
                ${classnames({
                  active: activeTab === '4',
                })}
                  d-flex
                  justify-content-between
                  align-items-center
                `}
                onClick={() => {
                  toggle('4');
                }}
              >
                Endereços
                <Map size={18} color="#212529" />
              </NavLink>
            </NavItem>
            <NavItem className="width-300">
              <NavLink
                className={`
                ${classnames({
                  active: activeTab === '5',
                })}
                  d-flex
                  justify-content-between
                  align-items-center
                `}
                onClick={() => {
                  toggle('5');
                }}
              >
                Pedidos
                <Box size={18} color="#212529" />
              </NavLink>
            </NavItem>
            <NavItem className="width-300">
              <NavLink
                className={`
                  ${classnames({
                    active: activeTab === '6',
                  })}
                  d-flex
                  justify-content-between
                  align-items-center
                `}
                onClick={() => {
                  toggle('6');
                }}
              >
                Histórico
                <Clock size={18} color="#212529" />
              </NavLink>
            </NavItem>
            <NavItem className="width-300">
              <NavLink
                className={`
                  ${classnames({
                    active: activeTab === '7',
                  })}
                  d-flex
                  justify-content-between
                  align-items-center
                `}
                onClick={() => {
                  toggle('7');
                }}
              >
                Redes Sociais
                <Share2 size={18} color="#212529" />
              </NavLink>
            </NavItem>
            <NavItem className="width-300">
              <NavLink
                className={`
                  ${classnames({
                    active: activeTab === '8',
                  })}
                  d-flex
                  justify-content-between
                  align-items-center
                `}
                onClick={() => {
                  toggle('8');
                }}
              >
                Segurança
                <Lock size={18} color="#212529" />
              </NavLink>
            </NavItem>
          </Nav>
        </div>

        <div className="mt-4 d-lg-none d-sm-flex d-md-flex justify-content-center">
          <Nav pills className="justify-content-center">
            <NavItem className="width-200">
              <NavLink
                className={`
                  ${classnames({
                    active: activeTab === '1',
                  })}
                  d-flex
                  justify-content-between
                  align-items-center
                `}
                onClick={() => {
                  toggle('1');
                }}
              >
                Dados gerais
                <User size={18} color="#212529" />
              </NavLink>
            </NavItem>
            <NavItem className="width-200">
              <NavLink
                className={`
                ${classnames({
                  active: activeTab === '4',
                })}
                  d-flex
                  justify-content-between
                  align-items-center
                `}
                onClick={() => {
                  toggle('4');
                }}
              >
                Endereços
                <Map size={18} color="#212529" />
              </NavLink>
            </NavItem>
            <NavItem className="width-200">
              <NavLink
                className={`
                  ${classnames({
                    active: activeTab === '5',
                  })}
                  d-flex
                  justify-content-between
                  align-items-center
                `}
                onClick={() => {
                  toggle('5');
                }}
              >
                Pedidos
                <Box size={18} color="#212529" />
              </NavLink>
            </NavItem>
            <NavItem className="width-200">
              <NavLink
                className={`
                  ${classnames({
                    active: activeTab === '6',
                  })}
                  d-flex
                  justify-content-between
                  align-items-center
                `}
                onClick={() => {
                  toggle('6');
                }}
              >
                Histórico
                <Clock size={18} color="#212529" />
              </NavLink>
            </NavItem>
            <NavItem className="width-200">
              <NavLink
                className={`
                  ${classnames({
                    active: activeTab === '7',
                  })}
                  d-flex
                  justify-content-between
                  align-items-center
                `}
                onClick={() => {
                  toggle('7');
                }}
              >
                Redes Sociais
                <Share2 size={18} color="#212529" />
              </NavLink>
            </NavItem>
            <NavItem className="width-200">
              <NavLink
                className={`
                  ${classnames({
                    active: activeTab === '8',
                  })}
                  d-flex
                  justify-content-between
                  align-items-center
                `}
                onClick={() => {
                  toggle('8');
                }}
              >
                Segurança
                <Lock size={18} color="#212529" />
              </NavLink>
            </NavItem>
          </Nav>
        </div>
      </div>

      <TabContent activeTab={activeTab} className="w-100">
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <Formik
                enableReinitialize
                initialValues={{
                  netsuite_id: data.netsuite_id ? data.netsuite_id : '',
                  corporate_name: data.corporate_name
                    ? data.corporate_name
                    : '',
                  fantasy_name: data.fantasy_name ? data.fantasy_name : '',
                  inscricao_estadual: data.inscricao_estadual
                    ? data.inscricao_estadual
                    : '',
                  email: data.email ? data.email : '',
                  cnpj: data.cnpj ? data.cnpj : '',
                  foundation: data.foundation ? data.foundation : new Date(),
                  phone: data.phone ? data.phone : '',
                  altPhone: data.alt_phone ? data.alt_phone : '',
                }}
                validationSchema={formSchema}
                onSubmit={values => handleUpdateProfile(values)}
              >
                {({ errors, touched, setFieldValue, values }) => (
                  <Form>
                    <FormGroup>
                      <Row>
                        <Col lg="3" xl="3" className="has-icon-left">
                          <Label>Netsuite ID</Label>
                          <div className="position-relative has-icon-left">
                            <Field
                              type="text"
                              name="netsuite_id"
                              id="netsuite_id"
                              disabled
                              className={`
                                      form-control
                                      ${errors.netsuite_id &&
                                        touched.netsuite_id &&
                                        'is-invalid'}
                                    `}
                              autoComplete="off"
                            />
                            {errors.netsuite_id && touched.netsuite_id ? (
                              <div className="invalid-feedback">
                                {errors.netsuite_id}
                              </div>
                            ) : null}
                            <div className="form-control-position">
                              <Globe size={14} color="#212529" />
                            </div>
                          </div>
                        </Col>
                      </Row>
                      {/* Razão social e nome fantasia */}
                      <Row className="mt-3">
                        <Col
                          sm="12"
                          md="12"
                          lg="12"
                          xl="6"
                          className="has-icon-left"
                        >
                          <Label>Razão Social</Label>
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
                            {errors.corporate_name && touched.corporate_name ? (
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
                          md="12"
                          lg="12"
                          xl="6"
                          className="has-icon-left"
                        >
                          <Label>Nome fantasia</Label>
                          <div className="position-relative has-icon-left">
                            <Field
                              type="text"
                              name="fantasy_name"
                              id="fantasy_name"
                              className="form-control"
                              autoComplete="off"
                            />
                            <div className="form-control-position">
                              <User size={14} color="#212529" />
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col
                          sm="12"
                          md="12"
                          lg="12"
                          xl="4"
                          className="has-icon-left"
                        >
                          <Label for="cnpj">cnpj</Label>
                          <div className="position-relative has-icon-left">
                            <Field
                              name="cnpj"
                              id="cnpj"
                              className={`
                                    form-control
                                    ${errors.cnpj &&
                                      touched.cnpj &&
                                      'is-invalid'}
                                  `}
                              validate={validateCNPJ}
                              render={({ field }) => (
                                <CNPJFormat
                                  // eslint-disable-next-line react/jsx-props-no-spreading
                                  {...field}
                                  id="cnpj"
                                  name="cnpj"
                                  className={`
                                      form-control
                                      ${errors.cnpj &&
                                        touched.cnpj &&
                                        'is-invalid'}
                                    `}
                                  value={values.cnpj}
                                />
                              )}
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
                        <Col
                          sm="12"
                          md="12"
                          lg="12"
                          xl="4"
                          className="has-icon-left"
                        >
                          <Label>Inscrição estadual</Label>
                          <div className="position-relative has-icon-left">
                            <Field
                              type="text"
                              name="inscricao_estadual"
                              id="inscricao_estadual"
                              className="form-control"
                              autoComplete="off"
                            />
                            <div className="form-control-position">
                              <User size={14} color="#212529" />
                            </div>
                          </div>
                        </Col>
                        <Col
                          sm="12"
                          md="6"
                          lg="12"
                          xl="4"
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
                                ${errors.email && touched.email && 'is-invalid'}
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
                      <Row className="mt-3">
                        <Col sm="12" md="6" lg="6" xl="4">
                          <Label for="foundation">Fundação</Label>
                          <div className="position-relative has-icon-left">
                            <Datepicker
                              name="foundation"
                              id="foundation"
                              locale={pt}
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
                        </Col>
                        <Col
                          sm="12"
                          md="6"
                          lg="12"
                          xl="4"
                          className="has-icon-left"
                        >
                          <Label>Telefone (NF)</Label>
                          <div className="position-relative has-icon-left">
                            <Field
                              name="phone"
                              id="phone"
                              className="form-control"
                              render={({ field }) => (
                                <PhoneFormat
                                  // eslint-disable-next-line react/jsx-props-no-spreading
                                  {...field}
                                  id="phone"
                                  name="phone"
                                  className="form-control"
                                  value={values.phone}
                                />
                              )}
                            />
                            <div className="form-control-position">
                              <Smartphone size={14} color="#212529" />
                            </div>
                          </div>
                        </Col>
                        <Col sm="12" md="6" lg="12" xl="4">
                          <Label>Tel. Alternativo</Label>
                          <div className="position-relative has-icon-left">
                            <Field
                              name="altPhone"
                              id="altPhone"
                              className="form-control"
                              render={({ field }) => (
                                <PhoneFormat
                                  // eslint-disable-next-line react/jsx-props-no-spreading
                                  {...field}
                                  id="altPhone"
                                  name="altPhone"
                                  className="form-control"
                                  value={values.altPhone}
                                />
                              )}
                            />
                            <div className="form-control-position">
                              <Phone size={14} color="#212529" />
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>

                    <FormGroup>
                      {loading || loadingProfile ? (
                        <Button
                          disabled
                          color="success"
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
                          className="btn-default btn-raised"
                        >
                          Atualizar perfil
                        </Button>
                      )}
                    </FormGroup>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </TabPane>

        {/* ---------------- ABA DE FAMILIARES ----------------- */}
        <TabPane tabId="3">
          <RelationshipTable relationships={data.relationships} match={match} />
        </TabPane>

        {/* --------------------ABA DE ENDEREÇO-------------------- */}
        <TabPane tabId="4">
          <Formik
            enableReinitialize
            initialValues={{
              addresses,
            }}
            validationSchema={addressSchema}
            onSubmit={values => handleUpdateAddress(values)}
          >
            {({ errors, touched, setFieldValue, values, handleChange }) => (
              <Form>
                <FieldArray
                  name="addresses"
                  render={({ remove, push }) => (
                    <>
                      {values.addresses.length > 0 &&
                        values.addresses.map((address, index) => {
                          const type = `addresses[${index}].type`;
                          const errorType = getIn(errors, type);
                          const touchedType = getIn(touched, type);

                          const otherTypeName = `addresses[${index}].other_type_name`;
                          const errorOtherTypeName = getIn(
                            errors,
                            otherTypeName
                          );
                          const touchedOtherTypeName = getIn(
                            touched,
                            otherTypeName
                          );

                          const cep = `addresses[${index}].cep`;
                          const errorCep = getIn(errors, cep);
                          const touchedCep = getIn(touched, cep);

                          const city = `addresses[${index}].city`;
                          // const errorCity = getIn(errors, city);
                          // const touchedCity = getIn(touched, city);

                          const street = `addresses[${index}].street`;
                          const errorStreet = getIn(errors, street);
                          const touchedStreet = getIn(touched, street);

                          const streetNumber = `addresses[${index}].street_number`;
                          const errorStreetNumber = getIn(errors, streetNumber);
                          const touchedStreetNumber = getIn(
                            touched,
                            streetNumber
                          );

                          const neighborhood = `addresses[${index}].neighborhood`;
                          const errorNeighborhood = getIn(errors, neighborhood);
                          const touchedNeighborhood = getIn(
                            touched,
                            neighborhood
                          );

                          const complement = `addresses[${index}].complement`;
                          const errorComplement = getIn(errors, complement);
                          const touchedComplement = getIn(touched, complement);

                          const receiver = `addresses[${index}].receiver`;

                          return (
                            // eslint-disable-next-line react/no-array-index-key
                            <div key={index}>
                              <Row className="justify-content-between ml-0 mr-0">
                                <h3>Endereço {index + 1}</h3>
                                {values.addresses.length > 1 && (
                                  <Button
                                    color="danger"
                                    onClick={() =>
                                      address.id !== null
                                        ? handleDeleteAddress(
                                            address.id,
                                            remove,
                                            index
                                          )
                                        : remove(index)
                                    }
                                  >
                                    <X size={18} color="#fff" />
                                  </Button>
                                )}
                              </Row>
                              <Row>
                                <Col sm="12" md="12" lg="12" xl="4">
                                  <FormGroup>
                                    <Label for={type}>Tipo endereço</Label>
                                    <div className="position-relative has-icon-left">
                                      <Field
                                        type="select"
                                        component="select"
                                        id={type}
                                        name={type}
                                        className={`
                                              form-control
                                              ${errorType &&
                                                touchedType &&
                                                'is-invalid'}
                                            `}
                                        onChange={handleChange}
                                      >
                                        <option
                                          value=""
                                          defaultValue=""
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
                                      </Field>
                                      {errorType && touchedType ? (
                                        <div className="invalid-feedback">
                                          {errorType}
                                        </div>
                                      ) : null}
                                      <div className="form-control-position">
                                        <Map size={14} color="#212529" />
                                      </div>
                                    </div>
                                  </FormGroup>
                                </Col>
                                {address.type === 'other' && (
                                  <Col sm="12" md="12" lg="12" xl="8">
                                    <FormGroup>
                                      <Label for={otherTypeName}>
                                        Apelido do endereço
                                      </Label>
                                      <Field
                                        type="text"
                                        id={otherTypeName}
                                        name={otherTypeName}
                                        placeholder="Ex: Casa da minha mãe"
                                        className={`
                                              form-control
                                              ${errorOtherTypeName &&
                                                touchedOtherTypeName &&
                                                'is-invalid'}
                                            `}
                                      />
                                      {errorOtherTypeName &&
                                      touchedOtherTypeName ? (
                                        <div className="invalid-feedback">
                                          {errorOtherTypeName}
                                        </div>
                                      ) : null}
                                    </FormGroup>
                                  </Col>
                                )}
                              </Row>
                              <Row>
                                <Col sm="12" md="6" lg="6" xl="3">
                                  <FormGroup>
                                    <Label for={cep}>CEP</Label>
                                    <div className="position-relative has-icon-right">
                                      <CepFormat
                                        autoComplete="cep"
                                        id={cep}
                                        name={cep}
                                        placeholder="Ex: 17580-000"
                                        value={address.cep}
                                        className={`
                                              form-control
                                              ${errorCep &&
                                                touchedCep &&
                                                'is-invalid'}
                                            `}
                                        onValueChange={val => {
                                          setLoadCep(true);
                                          handleCep(
                                            val.value,
                                            setFieldValue,
                                            values,
                                            index
                                          );
                                        }}
                                      />
                                      {errorCep && touchedCep ? (
                                        <div className="invalid-feedback">
                                          {errorCep}
                                        </div>
                                      ) : null}
                                      {cepLoading && (
                                        <div className="form-control-position">
                                          <RefreshCw
                                            size={14}
                                            color="#212529"
                                            className="spinner"
                                          />
                                        </div>
                                      )}
                                    </div>
                                  </FormGroup>
                                </Col>
                                <Col sm="12" md="6" lg="6" xl="3">
                                  <FormGroup>
                                    <Label for={`addresses.${index}.uf`}>
                                      Estado
                                    </Label>
                                    <Field
                                      readOnly
                                      type="text"
                                      id={`addresses.${index}.uf`}
                                      name={`addresses.${index}.uf`}
                                      className="form-control"
                                    />
                                  </FormGroup>
                                </Col>
                                <Col sm="12" md="12" lg="12" xl="6">
                                  <FormGroup>
                                    <Label for={city}>Cidade</Label>
                                    <Field
                                      readOnly
                                      type="text"
                                      disabled={cepLoading}
                                      id={city}
                                      name={city}
                                      className="form-control"
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col sm="12" md="12" lg="12" xl="6">
                                  <FormGroup>
                                    <Label for={street}>Rua</Label>
                                    <div className="position-relative has-icon-left">
                                      <Field
                                        type="text"
                                        disabled={cepLoading}
                                        id={street}
                                        name={street}
                                        className={`
                                              form-control
                                              ${errorStreet &&
                                                touchedStreet &&
                                                'is-invalid'}
                                            `}
                                      />
                                      {errorStreet && touchedStreet ? (
                                        <div className="invalid-feedback">
                                          {errorStreet}
                                        </div>
                                      ) : null}
                                      <div className="form-control-position">
                                        <i className="fa fa-road" />
                                      </div>
                                    </div>
                                  </FormGroup>
                                </Col>
                                <Col sm="12" md="4" lg="12" xl="6">
                                  <FormGroup>
                                    <Label for={streetNumber}>Número</Label>
                                    <div className="position-relative has-icon-left">
                                      <Field
                                        type="text"
                                        id={streetNumber}
                                        name={streetNumber}
                                        className={`
                                              form-control
                                              ${errorStreetNumber &&
                                                touchedStreetNumber &&
                                                'is-invalid'}
                                            `}
                                      />
                                      {errorStreetNumber &&
                                      touchedStreetNumber ? (
                                        <div className="invalid-feedback">
                                          {errorStreetNumber}
                                        </div>
                                      ) : null}
                                      <div className="form-control-position">
                                        <Navigation size={14} color="#212529" />
                                      </div>
                                    </div>
                                  </FormGroup>
                                </Col>
                                <Col sm="12" md="8" lg="12" xl="12">
                                  <FormGroup>
                                    <Label for={neighborhood}>Bairro</Label>
                                    <div className="position-relative has-icon-left">
                                      <Field
                                        type="text"
                                        disabled={cepLoading}
                                        id={neighborhood}
                                        name={neighborhood}
                                        className={`
                                              form-control
                                              ${errorNeighborhood &&
                                                touchedNeighborhood &&
                                                'is-invalid'}
                                            `}
                                      />
                                      {errorNeighborhood &&
                                      touchedNeighborhood ? (
                                        <div className="invalid-feedback">
                                          {errorNeighborhood}
                                        </div>
                                      ) : null}
                                      <div className="form-control-position">
                                        <i className="fa fa-map-signs" />
                                      </div>
                                    </div>
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col sm="12" md="6" lg="12" xl="6">
                                  <FormGroup>
                                    <Label for={complement}>Complemento</Label>
                                    <div className="position-relative has-icon-left">
                                      <Field
                                        type="text"
                                        id={complement}
                                        name={complement}
                                        className={`
                                              form-control
                                              ${errorComplement &&
                                                touchedComplement &&
                                                'is-invalid'}
                                            `}
                                      />
                                      {errorComplement && touchedComplement ? (
                                        <div className="invalid-feedback">
                                          {errorComplement}
                                        </div>
                                      ) : null}
                                      <div className="form-control-position">
                                        <Edit size={14} color="#212529" />
                                      </div>
                                    </div>
                                  </FormGroup>
                                </Col>
                                <Col sm="12" md="6" lg="12" xl="6">
                                  <FormGroup>
                                    <Label for={receiver}>Recebedor</Label>
                                    <div className="position-relative has-icon-left">
                                      <Field
                                        type="text"
                                        id={receiver}
                                        name={receiver}
                                        className="form-control"
                                      />
                                      <div className="form-control-position">
                                        <Edit size={14} color="#212529" />
                                      </div>
                                    </div>
                                  </FormGroup>
                                </Col>
                              </Row>
                              <div className="form-actions right" />
                            </div>
                          );
                        })}

                      <FormGroup>
                        <Row className="pl-1">
                          {addressLoading ? (
                            <Button
                              disabled
                              color="secondary"
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
                              className="btn-default btn-raised"
                            >
                              Atualizar endereços
                            </Button>
                          )}
                        </Row>
                      </FormGroup>

                      <div className="form-actions right" />

                      <FormGroup>
                        <Row className="pl-1">
                          <Button
                            outline
                            color="success"
                            onClick={() =>
                              push({
                                id: null,
                                organization_id: parseInt(match.params.id, 10),
                                type: '',
                                other_type_name: '',
                                cep: '',
                                country: 'Brasil',
                                uf: '',
                                city: '',
                                street: '',
                                street_number: '',
                                neighborhood: '',
                                complement: '',
                                receiver: '',
                              })
                            }
                          >
                            <Plus size={16} color="#0cc27e" /> Adicionar outro
                            endereço
                          </Button>
                        </Row>
                      </FormGroup>
                    </>
                  )}
                />
              </Form>
            )}
          </Formik>
        </TabPane>

        {/* ---------------- ABA DE PEDIDOS ----------------- */}
        <TabPane tabId="5">
          <OrderTable data={data.orders} rows={10} />
        </TabPane>

        {/* ---------------- ABA DE HISTÓRICO ----------------- */}
        <TabPane tabId="6">
          <HistoryTable events={allEvents} />
        </TabPane>

        {/* ---------------------ABA DE REDES SOCIAIS ------------------------ */}
        <TabPane tabId="7">
          <Formik
            enableReinitialize
            initialValues={socialNetwork}
            onSubmit={values => handleUpdateSocialNetwork(values)}
          >
            {() => (
              <Form>
                <div className="form-body">
                  <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                      <FormGroup>
                        <Label for="facebook">Facebook</Label>
                        <div className="input-group">
                          <div className="has-icon-left input-group-prepend">
                            <span className="pl-4 input-group-text">
                              facebook.com/
                            </span>
                            <div className="form-control-position">
                              <Facebook size={14} color="#212529" />
                            </div>
                          </div>
                          <Field
                            type="text"
                            id="facebook"
                            name="facebook"
                            className="form-control"
                          />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col sm="12" md="12" lg="12" xl="12">
                      <FormGroup>
                        <Label for="instagram">Instagram</Label>
                        <div className="input-group">
                          <div className="has-icon-left input-group-prepend">
                            <span className="pl-4 input-group-text">
                              instagram.com/
                            </span>
                            <div className="form-control-position">
                              <Instagram size={14} color="#212529" />
                            </div>
                          </div>
                          <Field
                            type="text"
                            id="instagram"
                            name="instagram"
                            className="form-control"
                          />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col sm="12" md="12" lg="12" xl="12">
                      <FormGroup>
                        <Label for="linkedin">Linkedin</Label>
                        <div className="input-group">
                          <div className="has-icon-left input-group-prepend">
                            <span className="pl-4 input-group-text">
                              linkedin.com/in/
                            </span>
                            <div className="form-control-position">
                              <Linkedin size={14} color="#212529" />
                            </div>
                          </div>
                          <Field
                            type="text"
                            id="linkedin"
                            name="linkedin"
                            className="form-control"
                          />
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
                <div className="form-actions right" />

                {loading || loadingProfile ? (
                  <Button
                    disabled
                    color="secondary"
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
                    className="btn-default btn-raised"
                  >
                    Atualizar redes sociais
                  </Button>
                )}
              </Form>
            )}
          </Formik>
        </TabPane>

        {/* ---------------- ABA DE HISTORICO ------------------ */}
        <TabPane tabId="8">
          <Formik
            initialValues={{
              password: '',
              newPassword: '',
            }}
            onSubmit={values => handleUpdatePassword(values)}
          >
            {(errors, touched) => (
              <Form>
                <div className="form-body">
                  <Row>
                    <Col sm="10" md="10" lg="5" xl="5">
                      <Label for="password">Senha atual</Label>
                      <div className="position-relative has-icon-left">
                        <InputGroup>
                          <Field
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            id="password"
                            className={`
                              rounded-right
                              form-control
                              ${errors.password &&
                                touched.password &&
                                'is-invalid'}
                            `}
                            autoComplete="off"
                          />
                          {errors.password && touched.password ? (
                            <div className="invalid-feedback">
                              {errors.password}
                            </div>
                          ) : null}
                          <div className="form-control-position">
                            <Lock size={14} color="#212529" />
                          </div>
                          <InputGroupAddon addonType="append">
                            <NavLink
                              className="bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <Eye size={18} color="#212529" />
                              ) : (
                                <EyeOff size={18} color="#212529" />
                              )}
                            </NavLink>
                          </InputGroupAddon>
                        </InputGroup>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="10" md="10" lg="5" xl="5">
                      <Label for="newPassword">Nova senha</Label>
                      <div className="position-relative has-icon-left">
                        <InputGroup>
                          <Field
                            type={showNewPassword ? 'text' : 'password'}
                            name="newPassword"
                            id="newPassword"
                            className={`
                              rounded-right
                              form-control
                              ${errors.newPassword &&
                                touched.newPassword &&
                                'is-invalid'}
                            `}
                            autoComplete="off"
                          />
                          {errors.newPassword && touched.newPassword ? (
                            <div className="invalid-feedback">
                              {errors.newPassword}
                            </div>
                          ) : null}
                          <div className="form-control-position">
                            <Lock size={14} color="#212529" />
                          </div>
                          <InputGroupAddon addonType="append">
                            <NavLink
                              className="bg-transparent"
                              onClick={() =>
                                setShowNewPassword(!showNewPassword)
                              }
                            >
                              {showNewPassword ? (
                                <Eye size={18} color="#212529" />
                              ) : (
                                <EyeOff size={18} color="#212529" />
                              )}
                            </NavLink>
                          </InputGroupAddon>
                        </InputGroup>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="form-actions right" />

                {loading || loadingProfile ? (
                  <Button
                    disabled
                    color="secondary"
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
                    className="btn-default btn-raised"
                  >
                    Atualizar senha
                  </Button>
                )}
              </Form>
            )}
          </Formik>
        </TabPane>
      </TabContent>
    </div>
  );
}
