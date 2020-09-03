/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { User, Calendar, RefreshCw, MapPin } from 'react-feather';
import { Datepicker } from 'react-formik-ui';
import { useDispatch, useSelector, useStore } from 'react-redux';
import 'react-table/react-table.css';
import { BounceLoader } from 'react-spinners';
import {
  Row,
  Col,
  Button,
  FormGroup,
  Card,
  CardBody,
  Label,
  Input,
} from 'reactstrap';

// import { css } from '@emotion/core';
import CountryStateCity from 'country-state-city';
import { subMonths } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

// import history from '~/app/history';
import ContentHeader from '~/components/contentHead/contentHeader';
import CepFormat from '~/components/fields/CepFormat';
// import { validateCPF } from '~/services/validateCPF';
import { Creators as CepActions } from '~/store/ducks/cep';
import { Creators as DefaultEventActions } from '~/store/ducks/defaultEvent';
import { Creators as EventActions } from '~/store/ducks/event';

const formDetails = Yup.object().shape({
  organizator_name: Yup.string().required('O líder é obrigatório'),
  organization_name: Yup.string().required('A Igreja é obrigatória'),
  initial_date: Yup.string().required('A data inicial é obrigatória'),
  default_event_id: Yup.string().required('Tipo do grupo é obrigatório'),
  ministery: Yup.string().required('Ministério é obrigatório'),
  modality: Yup.string().required('A modalidade é obrigatória'),
  country: Yup.string(),
  cep: Yup.string().when('country', {
    is: '30',
    then: Yup.string().required('O CEP é obrigatório'),
  }),
  uf: Yup.string().when('country', {
    is: '30',
    then: Yup.string().required('O estado é obrigatório'),
  }),
  city: Yup.string().when('country', {
    is: '30',
    then: Yup.string().required('A cidade é obrigatória'),
  }),
  apiUf: Yup.string().when('country', {
    is: country => country !== '30',
    then: Yup.string().required('O estado é obrigatório'),
  }),
  // apiCity: Yup.string().when('country', {
  //   is: country => country !== '30',
  //   then: Yup.string().required('A cidade é obrigatória'),
  // }),
});

// eslint-disable-next-line no-unused-vars
export default function GroupCreate({ className }) {
  const [initialState, setInitialState] = useState({
    cnpj: '',
    cpf: '',
    organization_id: null,
    organization_name: '',
    organizator_id: null,
    organizator_name: '',
    aux_organizator_id: '',
    aux_organizator_name: '',
    is_public: '',
    is_online_payment: '',
    initial_date: '',
    end_date: '',
    default_event_id: '',
    ministery: '',
    modality: '',
    address: '',
    cep: '',
    country: '30',
    apiUf: '',
    apiCity: '',
    uf: '',
    city: '',
  });
  const [ministeriesOrganizer, setMinisteriesOrganizer] = useState([]);
  const [defaultEventsOrganizer, setDefaultEventsOrganizer] = useState([]);
  const [loadCep, setLoadCep] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const userData = useSelector(state => state.profile.data);
  const cep_data = useSelector(state => state.cep.data);
  const defaultData = useSelector(state => state.defaultEvent.data);
  const event_loading = useSelector(state => state.event.loading);
  const cep_loading = useSelector(state => state.cep.loading);

  const dispatch = useDispatch();
  const store = useStore();

  const DatepickerButton = ({ value, onClick }) => (
    <Button
      outline
      block
      color="secondary"
      className="form-control height-38"
      onClick={onClick}
    >
      {value}
    </Button>
  );

  function handleSubmit(values) {
    if (values.country === '30') {
      values.cep = values.cep.replace('-', '');
      values.country = 'BRASIL';
    } else {
      values.cep = '';
      values.country = CountryStateCity.getCountryById(values.country).id;
      values.uf = CountryStateCity.getStateById(values.apiUf).id;
      values.city = CountryStateCity.getCityById(values.apiCity).id;
    }

    const data = {
      is_public: values.is_public === 'true',
      is_online_payment: values.is_online_payment === 'true',
      default_event_id: parseInt(values.default_event_id, 10),
      modality: values.modality,
      responsible_organization_id: values.organization_id,
      organizator_id: values.organizator_id,
      start_date: values.initial_date,
      end_date: values.end_date,
      img_address_url:
        'https://arcowebarquivos-us.s3.amazonaws.com/imagens/52/21/arq_85221.jpg',
      is_finished: false,
      cep: values.cep,
      country: values.country,
      uf: values.uf,
      city: values.city,
    };

    dispatch(EventActions.addEventRequest(data));
  }

  function handleEvent(event, setFieldValue) {
    const { value } = event.target;
    setFieldValue('default_event_id', value);

    // defaultData.map(default_event => {
    //   if (default_event.id === parseInt(value)) {
    //     setFieldValue('ministery', default_event.ministery.name);
    //   }
    // });
  }

  function handleMinistery(event, setFieldValue) {
    const { value } = event.target;

    setFieldValue('ministery', value);
    setFieldValue('default_event_id', '');

    const defaultEventAux = [];

    defaultData.map(defaultEvent => {
      if (parseInt(defaultEvent.ministery.id, 10) === parseInt(value, 10)) {
        defaultEventAux.push(defaultEvent);
      }
    });

    setDefaultEventsOrganizer(defaultEventAux);
  }

  function handleCep(cep, setFieldValue, values) {
    const formattedCep = cep.replace('-', '');
    setFieldValue('cep', formattedCep);

    if (loadCep && cep.length === 8) {
      setInitialState({
        ...initialState,
        initial_date: values.initial_date,
        end_date: values.end_date,
        ministery: values.ministery,
        modality: values.modality,
        default_event_id: values.default_event_id,
      });
      dispatch(CepActions.cepRequest(cep, 0));
    }
  }

  function handleCountryChange(event, setFieldValue) {
    const countryId = event.target.value;

    setStates(CountryStateCity.getStatesOfCountry(countryId));

    setFieldValue('country', countryId);
    setFieldValue('apiUf', '');
    setFieldValue('apiCity', '');
  }

  function handleStateChange(event, setFieldValue) {
    const stateId = event.target.value;

    setCities(CountryStateCity.getCitiesOfState(stateId));

    setFieldValue('apiUf', stateId);
    setFieldValue('apiCity', '');
  }

  function handleCityChange(event, setFieldValue) {
    setFieldValue('apiCity', event.target.value);
  }

  useEffect(() => {
    // if (userData.church === null) {
    //   setModalWithoutChurch(true);
    // }

    if (userData.id) {
      setInitialState({
        ...initialState,
        organization_id: userData.church !== null ? userData.church.id : '',
        organization_name:
          userData.church !== null
            ? `${userData.church.corporate_name} (sua igreja)`
            : 'Igreja não informada',
        organizator_id: userData.id,
        organizator_name: userData.name
          ? `${userData.name} (você)`
          : 'Falha, recarregue a página',
      });

      const data = {
        sex: userData.sex,
        cmn_hierarchy_id: userData.cmn_hierarchy_id || 0,
        mu_hierarchy_id: userData.mu_hierarchy_id || 0,
        crown_hierarchy_id: userData.crown_hierarchy_id || 0,
        mp_hierarchy_id: userData.mp_hierarchy_id || 0,
        ffi_hierarchy_id: userData.ffi_hierarchy_id || 0,
        gfi_hierarchy_id: userData.gfi_hierarchy_id || 0,
        pg_hab_hierarchy_id: userData.pg_hab_hierarchy_id || 0,
        pg_yes_hierarchy_id: userData.pg_yes_hierarchy_id || 0,
      };

      dispatch(DefaultEventActions.organizatorEventRequest(data));
    }
  }, [userData]);

  // useEffect(() => {
  //   if (cep_data.cep) {
  //     setInitialState({
  //       ...initialState,
  //       cep: cep_data.cep.replace('-', ''),
  //       uf: cep_data.uf,
  //       city: cep_data.localidade,
  //       street: cep_data.logradouro !== '' ? cep_data.logradouro : '',
  //       neighborhood: cep_data.bairro !== '' ? cep_data.bairro : '',
  //       complement: cep_data.complemento !== '' ? cep_data.complemento : '',
  //     });
  //   }
  // }, [cep_data]);

  useEffect(() => {
    if (cep_data.cep) {
      setInitialState({
        ...initialState,
        cep: cep_data.cep.replace('-', ''),
        uf: cep_data.uf,
        city: cep_data.localidade,
      });
    }
  }, [cep_data]);

  useEffect(() => {
    if (defaultData !== null) {
      const auxMinisteries = [];

      defaultData.map(defaultEvent => {
        const find = auxMinisteries.find(
          aux => aux.id === defaultEvent.ministery.id
        );

        if (find === undefined) {
          auxMinisteries.push({
            id: defaultEvent.ministery.id,
            name: defaultEvent.ministery.name,
          });
        }
      });

      setMinisteriesOrganizer(auxMinisteries);
    }
  }, [defaultData]);

  useEffect(() => {
    setCountries(CountryStateCity.getAllCountries());
    setStates(CountryStateCity.getStatesOfCountry('30'));

    return () => {
      store.getState().cep.data = {};
    };
  }, []);

  return (
    defaultData !== null &&
    userData !== {} && (
      <>
        <ContentHeader>Criar Grupo</ContentHeader>
        <Card>
          <CardBody>
            {/* DADOS DA IGREJA */}
            <Formik
              enableReinitialize
              initialValues={initialState}
              validationSchema={formDetails}
              onSubmit={values => handleSubmit(values)}
            >
              {({ errors, touched, values, setFieldValue }) => (
                <Form>
                  {/* DADOS DO GRUPO */}
                  <div className="form-body">
                    <h4 className="form-section">
                      <User size={20} color="#212529" /> Dados do Grupo
                    </h4>
                    {/* <Row>
                      <Col lg="4" md="6" sm="12">
                        <FormGroup>
                          <Label for="is_public">É público?</Label>
                          <HelpCircle
                            id="is_public"
                            className="ml-1 bg-white text-muted cursor-pointer"
                          />
                          <UncontrolledPopover
                            trigger="legacy"
                            placement="right"
                            target="is_public"
                          >
                            <PopoverHeader className="cz-bg-color">
                              Evento público
                            </PopoverHeader>
                            <PopoverBody>
                              Esse campo indica se o grupo será público. Se
                              "Sim" o grupo aparecerá para qualquer pessoa se
                              inscrever online e você também podera compartilhar
                              um link, se "Não" você deverá inscrever os
                              participantes manualmente.
                            </PopoverBody>
                          </UncontrolledPopover>
                          <Field
                            type="select"
                            component="select"
                            id="is_public"
                            name="is_public"
                            value={values.is_public || ''}
                            onChange={handleChange}
                            className={`
                                  form-control
                                  ${errors.is_public &&
                                    touched.is_public &&
                                    'is-invalid'}
                                `}
                          >
                            <option value="" disabled="">
                              Selecione uma opção
                            </option>
                            <option value="true">Sim</option>
                            <option value="false">Não</option>
                          </Field>
                          {errors.is_public && touched.is_public ? (
                            <div className="invalid-feedback">
                              {errors.is_public}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col lg="5" md="6" sm="12">
                        <FormGroup>
                          <Label for="is_online_payment">
                            Pagamento online
                          </Label>
                          <HelpCircle
                            id="is_online_payment"
                            className="ml-1 bg-white text-muted cursor-pointer"
                          />
                          <UncontrolledPopover
                            trigger="legacy"
                            placement="right"
                            target="is_online_payment"
                          >
                            <PopoverHeader className="cz-bg-color">
                              Pagamento
                            </PopoverHeader>
                            <PopoverBody>
                              Esse campo indica o responsável pelo pagamento. Se
                              "Participante" cada participante fará seu
                              pagamento no momento da inscrição, se
                              "Organizador" você realizará o pagamento.
                            </PopoverBody>
                          </UncontrolledPopover>
                          <Field
                            type="select"
                            component="select"
                            id="is_online_payment"
                            name="is_online_payment"
                            onChange={handleChange}
                            className={`
                                  form-control
                                  ${errors.is_online_payment &&
                                    touched.is_online_payment &&
                                    'is-invalid'}
                                `}
                          >
                            <option value={null} disabled="">
                              Selecione uma opção
                            </option>
                            <option value="true">Sim</option>
                            <option value="false">Não</option>
                          </Field>
                          {errors.is_online_payment &&
                          touched.is_online_payment ? (
                            <div className="invalid-feedback">
                              {errors.is_online_payment}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row> */}
                    <Row>
                      <Col xl="4" lg="5" md="5" sm="12">
                        <FormGroup>
                          <Label for="initial_date">Data Inicial</Label>
                          <div className="position-relative has-icon-left">
                            <Datepicker
                              name="initial_date"
                              id="initial_date"
                              locale={pt}
                              selected={values.initial_date}
                              onChange={date =>
                                setFieldValue('initial_date', date)
                              }
                              customInput={<DatepickerButton />}
                              minDate={subMonths(new Date(), 12)}
                              withPortal
                              isClearable
                              // fixedHeight
                              dateFormat="dd/MM/yyyy"
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                              // showTimeSelect
                              // timeFormat="HH:mm"
                              // timeIntervals={15}
                              // timeCaption="Horário"
                              className={`
                                form-control
                                ${errors.initial_date &&
                                  touched.initial_date &&
                                  'is-invalid'}
                              `}
                            />
                            {errors.initial_date && touched.initial_date ? (
                              <div className="invalid-feedback">
                                {errors.initial_date}
                              </div>
                            ) : null}
                            <div className="form-control-position">
                              <Calendar size={14} color="#212529" />
                            </div>
                          </div>
                        </FormGroup>
                      </Col>
                      {!!values.initial_date && (
                        <Col xl="4" lg="5" md="5" sm="12">
                          <FormGroup>
                            <Label for="end_date">Formatura (opcional)</Label>
                            <div className="position-relative has-icon-left">
                              <Datepicker
                                name="end_date"
                                id="end_date"
                                locale={pt}
                                selected={values.end_date}
                                onChange={date =>
                                  setFieldValue('end_date', date)
                                }
                                customInput={<DatepickerButton />}
                                minDate={values.initial_date}
                                withPortal
                                fixedHeight
                                dateFormat="dd/MM/yyyy"
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                // showTimeSelect
                                // timeFormat="HH:mm"
                                // timeIntervals={5}
                                // timeCaption="Horário"
                                className="form-control"
                              />
                              <div className="form-control-position">
                                <Calendar size={14} color="#212529" />
                              </div>
                            </div>
                          </FormGroup>
                        </Col>
                      )}
                    </Row>
                    <Row>
                      <Col lg="4" md="12" sm="12">
                        <FormGroup>
                          <Label for="ministery">Ministério</Label>
                          <Field
                            type="select"
                            component="select"
                            id="ministery"
                            name="ministery"
                            onChange={e => handleMinistery(e, setFieldValue)}
                            className={`
                                  form-control
                                  ${errors.ministery &&
                                    touched.ministery &&
                                    'is-invalid'}
                                `}
                          >
                            <option value="" disabled="">
                              Selecione uma opção
                            </option>

                            {ministeriesOrganizer.map(ministery => (
                              <option key={ministery.id} value={ministery.id}>
                                {ministery.name}
                              </option>
                            ))}
                          </Field>
                          {errors.ministery && touched.ministery ? (
                            <div className="invalid-feedback">
                              {errors.ministery}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>

                      <Col lg="8" md="12" sm="12">
                        <FormGroup>
                          <Label for="default_event_id">Curso</Label>
                          <Field
                            type="select"
                            component="select"
                            id="default_event_id"
                            name="default_event_id"
                            onChange={e => handleEvent(e, setFieldValue)}
                            className={`
                                  form-control
                                  ${errors.default_event_id &&
                                    touched.default_event_id &&
                                    'is-invalid'}
                                `}
                          >
                            <option value="" disabled="">
                              Selecione uma opção
                            </option>

                            <optgroup label="Curso">
                              {defaultEventsOrganizer.map(
                                event =>
                                  event.event_type === 'Curso' && (
                                    <option key={event.id} value={event.id}>
                                      {event.event_type}: {event.name}
                                    </option>
                                  )
                              )}
                            </optgroup>
                          </Field>
                          {errors.default_event_id &&
                          touched.default_event_id ? (
                            <div className="invalid-feedback">
                              {errors.default_event_id}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="4" md="12" sm="12">
                        <FormGroup>
                          <Label for="modality">Modalidade</Label>
                          <Field
                            type="select"
                            component="select"
                            id="modality"
                            name="modality"
                            className={`
                                  form-control
                                  ${errors.modality &&
                                    touched.modality &&
                                    'is-invalid'}
                                `}
                          >
                            <option value="" disabled="">
                              Selecione uma opção
                            </option>

                            <option key="presencial" value="Presencial">
                              Presencial
                            </option>

                            <option key="online" value="Online">
                              Online
                            </option>

                            <option key="misto" value="Misto">
                              Misto
                            </option>
                          </Field>
                          {errors.modality && touched.modality ? (
                            <div className="invalid-feedback">
                              {errors.modality}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>

                    <h4 className="form-section">
                      <i className="fa fa-user" size={20} color="#212529" />{' '}
                      Líder responsável
                    </h4>
                    <Row className="align-items-center">
                      <Col sm="12" md="12" lg="6" className="mb-2">
                        <FormGroup>
                          <Label for="organizator_name">Nome do líder</Label>
                          <Field
                            readOnly
                            type="text"
                            name="organizator_name"
                            id="organizator_name"
                            value={`${userData.name} (você)`}
                            className={`
                              form-control
                              ${errors.organizator_name &&
                                touched.organizator_name &&
                                'is-invalid'}
                            `}
                          />
                          {errors.organizator_name &&
                          touched.organizator_name ? (
                            <div className="invalid-feedback">
                              {errors.organizator_name}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>

                    <h4 className="form-section">
                      <i className="fa fa-home" size={20} color="#212529" />{' '}
                      Igreja responsável
                    </h4>
                    <Row className="align-items-center">
                      <Col sm="12" md="6" lg="6" className="mb-2">
                        <FormGroup>
                          <Label className="ml-2" for="church">
                            Nome da Igreja
                          </Label>
                          <Field
                            readOnly
                            type="text"
                            placeholder="Pesquise a igreja"
                            name="organization_name"
                            id="organization_name"
                            // onClick={toggleModalChurch}
                            className={`
                              form-control
                              ${errors.organization_name &&
                                touched.organization_name &&
                                'is-invalid'}
                            `}
                          />
                          {errors.organization_name &&
                          touched.organization_name ? (
                            <div className="invalid-feedback">
                              {errors.organization_name}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>

                    <h4 className="form-section">
                      <MapPin size={20} color="#212529" /> Localização do grupo
                    </h4>
                    <Row>
                      <Col sm="4">
                        <FormGroup>
                          <Label>País</Label>
                          <Input
                            type="select"
                            id="country"
                            name="country"
                            onChange={e => {
                              handleCountryChange(e, setFieldValue);
                            }}
                          >
                            {countries.map(country => {
                              return (
                                <option
                                  key={country.id}
                                  value={country.id}
                                  selected={country.id === '30'}
                                >
                                  {country.name}
                                </option>
                              );
                            })}
                          </Input>
                        </FormGroup>
                      </Col>
                      {/* estado */}
                      {values.country !== '30' && (
                        <>
                          <Col sm="4">
                            <FormGroup>
                              <Label>Estado</Label>
                              <Input
                                type="select"
                                id="apiUf"
                                name="apiUf"
                                onChange={e => {
                                  handleStateChange(e, setFieldValue);
                                }}
                                className={`
                                        form-control
                                        ${errors &&
                                          errors.apiUf &&
                                          touched &&
                                          touched.apiUf &&
                                          'is-invalid'}
                                      `}
                              >
                                <option value="">Selecione uma opção</option>

                                {states.map(state => {
                                  return (
                                    <option key={state.id} value={state.id}>
                                      {state.name}
                                    </option>
                                  );
                                })}
                              </Input>
                              {errors.apiUf && touched.apiUf ? (
                                <div className="invalid-feedback">
                                  {errors.apiUf}
                                </div>
                              ) : null}
                            </FormGroup>
                          </Col>
                          <Col sm="4">
                            <FormGroup>
                              <Label>Cidade</Label>
                              <Input
                                type="select"
                                id="apiCity"
                                name="apiCity"
                                onChange={e => {
                                  handleCityChange(e, setFieldValue);
                                }}
                                className={`
                                        form-control
                                        ${errors &&
                                          errors.apiCity &&
                                          touched &&
                                          touched.apiCity &&
                                          'is-invalid'}
                                      `}
                              >
                                <option value="">Selecione uma opção</option>
                                {cities.map(city => {
                                  return (
                                    <option key={city.id} value={city.id}>
                                      {city.name}
                                    </option>
                                  );
                                })}
                              </Input>
                              {/* {errors.apiCity && touched.apiCity ? (
                                <div className="invalid-feedback">
                                  {errors.apiCity}
                                </div>
                              ) : null} */}
                            </FormGroup>
                          </Col>
                        </>
                      )}
                    </Row>

                    {values.country === '30' && (
                      <Row>
                        <Col sm="4">
                          <FormGroup>
                            <Label for="cep">CEP</Label>
                            <div className="position-relative has-icon-right">
                              <CepFormat
                                autoComplete="cep"
                                id="cep"
                                name="cep"
                                placeholder="Ex: 17580-000"
                                value={values.cep}
                                className={`
                                        form-control
                                        ${errors &&
                                          errors.cep &&
                                          touched &&
                                          touched.cep &&
                                          'is-invalid'}
                                      `}
                                onValueChange={val => {
                                  setLoadCep(true);
                                  handleCep(val.value, setFieldValue, values);
                                }}
                              />
                              {errors.cep && touched.cep ? (
                                <div className="invalid-feedback">
                                  {errors.cep}
                                </div>
                              ) : null}
                              {cep_loading && (
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
                        <Col sm="3">
                          <FormGroup>
                            <Label for="uf">Estado</Label>
                            <Field
                              type="text"
                              readOnly
                              id="uf"
                              name="uf"
                              // onChange={handleChange}
                              className={`
                                  form-control
                                  ${errors.uf && touched.uf && 'is-invalid'}
                                `}
                            />
                            {errors.uf && touched.uf ? (
                              <div className="invalid-feedback">
                                {errors.uf}
                              </div>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col sm="5">
                          <FormGroup>
                            <Label for="city">Cidade</Label>
                            <Field
                              type="text"
                              readOnly
                              autoComplete="city"
                              id="city"
                              name="city"
                              className={`
                                  form-control
                                  ${errors.city && touched.city && 'is-invalid'}
                                `}
                            />
                            {errors.city && touched.city ? (
                              <div className="invalid-feedback">
                                {errors.city}
                              </div>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                    )}
                    {/* <Row>
                          <Col lg="8" md="8" sm="12">
                            <FormGroup>
                              <Label for="street">Rua</Label>
                              <div className="position-relative has-icon-left">
                                <Field
                                  autoComplete="street"
                                  type="text"
                                  placeholder="Ex: Jose Cândido Prisão"
                                  name="street"
                                  id="street"
                                  className={`
                                  form-control
                                  ${errors.street &&
                                    touched.street &&
                                    'is-invalid'}
                                `}
                                />
                                {errors.street && touched.street ? (
                                  <div className="invalid-feedback">
                                    {errors.street}
                                  </div>
                                ) : null}
                                <div className="form-control-position">
                                  <i className="fa fa-road" />
                                </div>
                              </div>
                            </FormGroup>
                          </Col>
                          <Col lg="4" md="4" sm="12">
                            <FormGroup>
                              <Label for="street_number">Número</Label>
                              <div className="position-relative has-icon-left">
                                <Field
                                  autoComplete="street_number"
                                  type="text"
                                  placeholder="Ex: 543"
                                  name="street_number"
                                  id="street_number"
                                  className={`
                                  form-control
                                  ${errors.street_number &&
                                    touched.street_number &&
                                    'is-invalid'}
                                `}
                                />
                                {errors.street_number &&
                                touched.street_number ? (
                                  <div className="invalid-feedback">
                                    {errors.street_number}
                                  </div>
                                ) : null}
                                <div className="form-control-position">
                                  <Navigation size={14} color="#212529" />
                                </div>
                              </div>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="6" md="6" sm="12">
                            <FormGroup>
                              <Label for="neighborhood">Bairro</Label>
                              <div className="position-relative has-icon-left">
                                <Field
                                  type="text"
                                  placeholder="Ex: Vila Paulinia"
                                  name="neighborhood"
                                  id="neighborhood"
                                  className={`
                                  form-control
                                  ${errors.neighborhood &&
                                    touched.neighborhood &&
                                    'is-invalid'}
                                `}
                                />
                                {errors.neighborhood && touched.neighborhood ? (
                                  <div className="invalid-feedback">
                                    {errors.neighborhood}
                                  </div>
                                ) : null}
                                <div className="form-control-position">
                                  <i className="fa fa-map-signs" />
                                </div>
                              </div>
                            </FormGroup>
                          </Col>
                          <Col lg="6" md="6" sm="12">
                            <FormGroup>
                              <Label for="complement">Complemento</Label>
                              <div className="position-relative has-icon-left">
                                <Field
                                  type="text"
                                  placeholder="Complemento"
                                  name="complement"
                                  id="complement"
                                  className="form-control"
                                />
                                <div className="form-control-position">
                                  <Edit size={14} color="#212529" />
                                </div>
                              </div>
                            </FormGroup>
                          </Col>
                        </Row> */}

                    <div className="form-actions right">
                      <FormGroup>
                        {event_loading ? (
                          <Button disabled color="secondary">
                            <BounceLoader
                              size={23}
                              color="#fff"
                              // css={css`
                              //   display: block;
                              //   margin: 0 auto;
                              // `}
                            />
                          </Button>
                        ) : (
                          <Button
                            type="submit"
                            color="success"
                            className="btn-default btn-raised"
                          >
                            Criar grupo
                          </Button>
                        )}
                      </FormGroup>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </>
    )
  );
}
