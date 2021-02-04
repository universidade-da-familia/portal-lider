/* eslint-disable react/prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { CreditCard, RefreshCw } from 'react-feather';
import { Datepicker } from 'react-formik-ui';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { BounceLoader } from 'react-spinners';
import {
  Card,
  CardBody,
  Row,
  Col,
  Button,
  Badge,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

// eslint-disable-next-line import/no-extraneous-dependencies
import { css } from '@emotion/core';
import CountryStateCity from 'country-state-city';
import pt from 'date-fns/locale/pt';
import { Formik, Field, Form } from 'formik';

import UFsAndCities from '~/assets/data/statesCities';
import ContentHeader from '~/components/contentHead/contentHeader';
import CepFormat from '~/components/fields/CepFormat';
import CPFFormat from '~/components/fields/CPFFormat';
import CustomTabs from '~/components/tabs/default';
import { Creators as CepActions } from '~/store/ducks/cep';
import { Creators as DefaultEventActions } from '~/store/ducks/defaultEvent';
import { Creators as EventActions } from '~/store/ducks/event';

import AllEventsTable from './table';
// import CertificatesTable from './tableCertificates';

export default function AdminEvents() {
  const filterStorage = JSON.parse(
    localStorage.getItem('@dashboard/admin_filter')
  );

  if (filterStorage) {
    if (filterStorage.country === 'BRASIL') {
      filterStorage.country = '30';
    }
  }

  const localPage = parseInt(
    localStorage.getItem('@dashboard/admin_event_page'),
    10
  );

  const all_events = useSelector(state => state.event.allEvents);
  const defaultData = useSelector(state => state.defaultEvent.allData);
  const loading = useSelector(state => state.event.loading);
  const cep_data = useSelector(state => state.cep.data);
  const cep_loading = useSelector(state => state.cep.loading);

  const [allData, setAllData] = useState({
    page: localPage || 1,
    lastPage: 1,
    filters: {
      cpf: filterStorage ? filterStorage.cpf : '',
      id: filterStorage ? filterStorage.id : '',
      default_event_id: filterStorage ? filterStorage.default_event_id : '',
      start_date: filterStorage ? filterStorage.start_date : '',
      end_date: filterStorage ? filterStorage.end_date : '',
      ministery: filterStorage ? filterStorage.ministery : '',
      status: filterStorage ? filterStorage.status : '',
      is_printed: '',
      modality: filterStorage ? filterStorage.modality : '',
      event_type: filterStorage ? filterStorage.event_type : '',
      country: filterStorage ? filterStorage.country : '',
      cep: filterStorage ? filterStorage.cep : '',
      uf: filterStorage ? filterStorage.uf : '',
      city: filterStorage ? filterStorage.city : '',
      apiUf: filterStorage ? filterStorage.apiUf : '',
      apiCity: filterStorage ? filterStorage.apiCity : '',
      perPage: 20,
    },
    data: [],
    refresh: true,
  });
  // eslint-disable-next-line no-unused-vars
  const [reload, setReload] = useState(false);
  const [defaultEventsData, setDefaultEventsData] = useState([]);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const dispatch = useDispatch();
  const store = useStore();

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

  function handleSearchAllData(values) {
    values.cpf = values.cpf
      .replace('.', '')
      .replace('.', '')
      .replace('-', '');

    if (values.country === '30') {
      values.cep = values.cep.replace('-', '');
      values.apiUf = '';
      values.apiCity = '';
    } else if (values.country === '') {
      values.country = '';
      values.apiUf = '';
      values.apiCity = '';
      values.uf = '';
      values.city = '';
    } else {
      values.cep = '';
      values.country = CountryStateCity.getCountryById(values.country).id;
      values.uf = values.uf ? CountryStateCity.getStateById(values.uf).id : '';
      values.city = values.city
        ? CountryStateCity.getCityById(values.city).id
        : '';
    }

    localStorage.setItem('@dashboard/admin_event_page', 1);

    setAllData({
      ...allData,
      page: 1,
      filters: values,
      data: [],
      refresh: false,
    });
    setReload(true);

    localStorage.setItem('@dashboard/admin_filter', JSON.stringify(values));
    store.getState().exportExcel.eventData = null;
  }

  function validateCPF(cpf) {
    const formattedCpf = cpf
      .replace('.', '')
      .replace('.', '')
      .replace('-', '');

    let error;
    let sum = 0;
    let rest = 0;

    if (formattedCpf === '') return;

    if (formattedCpf.length !== 11) error = 'O CPF deve conter 11 dígitos';

    if (
      formattedCpf.toString() === '00000000000' ||
      formattedCpf.toString() === '11111111111' ||
      formattedCpf.toString() === '99999999999'
    )
      error = 'O CPF é inválido';

    for (let index = 1; index <= 9; index += 1) {
      sum +=
        parseInt(formattedCpf.toString().substring(index - 1, index), 10) *
        (11 - index);
    }

    rest = (sum * 10) % 11;

    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(formattedCpf.toString().substring(9, 10), 10))
      error = 'O CPF é inválido';

    sum = 0;

    for (let index = 1; index <= 10; index += 1) {
      sum +=
        parseInt(formattedCpf.toString().substring(index - 1, index), 10) *
        (12 - index);
    }

    rest = (sum * 10) % 11;

    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(formattedCpf.toString().substring(10, 11), 10))
      error = 'O CPF é inválido';

    // eslint-disable-next-line consistent-return
    return error;
  }

  function handleClearFilters(event, setFieldValue) {
    event.preventDefault();

    store.getState().exportExcel.eventData = null;

    setFieldValue('cpf', '');
    setFieldValue('id', '');
    setFieldValue('default_event_id', '');
    setFieldValue('start_date', '');
    setFieldValue('end_date', '');
    setFieldValue('ministery', '');
    setFieldValue('status', '');
    setFieldValue('is_printed', '');
    setFieldValue('modality', '');
    setFieldValue('event_type', '');
    setFieldValue('cep', '');
    setFieldValue('uf', '');
    setFieldValue('city', '');
    setFieldValue('apiUf', '');
    setFieldValue('apiCity', '');

    localStorage.setItem('@dashboard/admin_event_page', 1);
    localStorage.removeItem('@dashboard/admin_filter');

    setAllData({
      page: 1,
      lastPage: 1,
      filters: {
        cpf: '',
        id: '',
        default_event_id: '',
        start_date: '',
        end_date: '',
        ministery: '',
        status: '',
        is_printed: '',
        modality: '',
        event_type: '',
        country: '',
        cep: '',
        uf: '',
        city: '',
        apiUf: '',
        apiCity: '',
        perPage: 20,
      },
      data: [],
      refresh: false,
    });
  }

  function handleCep(cep, setFieldValue) {
    setFieldValue('cep', cep);

    if (cep.length === 8) {
      setAllData({
        ...allData,
        filters: {
          ...allData.filters,
          country: '30',
        },
      });

      dispatch(CepActions.cepRequest(cep, 0));
    }
  }

  function handleMinistery(event, setFieldValue) {
    const { value } = event.target;

    setFieldValue('ministery', value);
    setFieldValue('default_event_id', '');

    const defaultEventAux = defaultData.filter(
      defaultEvent =>
        parseInt(defaultEvent.ministery.id, 10) === parseInt(value, 10)
    );

    setDefaultEventsData(defaultEventAux);
  }

  function handleEvent(event, setFieldValue) {
    const { value } = event.target;
    setFieldValue('default_event_id', value);
  }

  function handleCountryChange(event, setFieldValue) {
    const countryId = event.target.value;

    setStates(CountryStateCity.getStatesOfCountry(countryId));
    setCities(CountryStateCity.getCitiesOfState(''));

    setFieldValue('country', countryId);
    setFieldValue('apiUf', '');
    setFieldValue('apiCity', '');
    setFieldValue('uf', '');
    setFieldValue('city', '');
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
    if (localPage) {
      setAllData({
        ...allData,
        page: localPage,
      });
    }
  }, [localPage]);

  useEffect(() => {
    dispatch(
      EventActions.allConsultEventRequest(allData.page, allData.filters)
    );
  }, [allData.page, allData.filters, allData.refresh]);

  useEffect(() => {
    setAllData({
      ...allData,
      page: all_events.page,
      lastPage: all_events.lastPage,
      data: all_events.data,
      refresh: true,
    });
  }, [all_events]);

  useEffect(() => {
    if (allData.filters.ministery) {
      const defaultEventAux = defaultData.filter(
        defaultEvent =>
          parseInt(defaultEvent.ministery.id, 10) ===
          parseInt(allData.filters.ministery, 10)
      );

      setDefaultEventsData(defaultEventAux);
    }
  }, [defaultData, allData.filters]);

  useEffect(() => {
    setCountries(CountryStateCity.getAllCountries());

    if (cep_data.cep) {
      // if (filterStorage?.cep !== '') {
      setAllData({
        ...allData,
        filters: {
          ...allData.filters,
          cep: cep_data.cep.replace('-', ''),
          uf: cep_data.uf,
          city: cep_data.localidade,
        },
      });
    }
    // }
  }, [cep_data]);

  useEffect(() => {
    setCountries(CountryStateCity.getAllCountries());
    setStates(
      CountryStateCity.getStatesOfCountry(
        filterStorage ? filterStorage.country : '30'
      )
    );
    setCities(
      CountryStateCity.getCitiesOfState(
        filterStorage ? filterStorage.apiUf : ''
      )
    );

    dispatch(DefaultEventActions.allDefaultEventRequest());
  }, []);

  return (
    <>
      <ContentHeader>Eventos</ContentHeader>
      <Row className="row-eq-height">
        <Col sm="12">
          <Card>
            <CardBody>
              <Badge color="info" className="align-self-center mb-3">
                Todos os eventos
              </Badge>

              <Formik
                enableReinitialize
                initialValues={allData.filters}
                onSubmit={values => handleSearchAllData(values)}
              >
                {({ values, setFieldValue, errors, touched }) => (
                  <Form>
                    <FormGroup>
                      <Row>
                        <Col lg="4" md="4" sm="12">
                          <Label>CPF Líder</Label>
                          <div className="position-relative has-icon-left">
                            <Field
                              name="cpf"
                              id="cpf"
                              className={`
                                    form-control
                                    ${errors.cpf && touched.cpf && 'is-invalid'}
                                  `}
                              validate={validateCPF}
                              render={({ field }) => (
                                <CPFFormat
                                  // eslint-disable-next-line react/jsx-props-no-spreading
                                  {...field}
                                  id="cpf"
                                  name="cpf"
                                  className={`
                                      form-control
                                      ${errors.cpf &&
                                        touched.cpf &&
                                        'is-invalid'}
                                    `}
                                  value={values.cpf}
                                />
                              )}
                            />
                            {errors.cpf && touched.cpf ? (
                              <div className="invalid-feedback">
                                {errors.cpf}
                              </div>
                            ) : null}
                            <div className="form-control-position">
                              <CreditCard size={14} color="#212529" />
                            </div>
                          </div>
                        </Col>
                        {/* <Col lg="3" md="3" sm="12">
                          <Label>Certificado Impresso</Label>
                          <Field
                            type="select"
                            component="select"
                            name="is_printed"
                            id="is_printed"
                            className="form-control"
                          >
                            <option value="">Sem filtro</option>
                            <option value>Sim</option>
                            <option value={false}>Não</option>
                          </Field>
                        </Col> */}
                        <Col lg="4" md="4" sm="12">
                          <Label>Modalidade</Label>
                          <Field
                            type="select"
                            component="select"
                            name="modality"
                            id="modality"
                            className="form-control"
                          >
                            <option value="">Sem filtro</option>
                            <option value="Online">Online</option>
                            <option value="Presencial">Presencial</option>
                            <option value="Misto">Misto</option>
                          </Field>
                        </Col>
                        <Col lg="4" md="4" sm="12">
                          <Label>Tipo evento</Label>
                          <Field
                            type="select"
                            component="select"
                            name="event_type"
                            id="event_type"
                            className="form-control"
                          >
                            <option value="">Sem filtro</option>
                            <option value="Curso">Curso</option>
                            <option value="Treinamento de treinadores">
                              Treinamento de treinadores
                            </option>
                            <option value="Capacitação de líderes">
                              Capacitação de líderes
                            </option>
                            {/* <option value="Seminário">Seminário</option> */}
                          </Field>
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col lg="2" md="2" sm="12">
                          <Label>ID</Label>
                          <Field
                            type="number"
                            name="id"
                            id="id"
                            className="form-control"
                          />
                        </Col>
                        <Col lg="4" md="6" sm="12">
                          <Label>Ministério</Label>
                          <Field
                            type="select"
                            component="select"
                            name="ministery"
                            id="ministery"
                            onChange={e => handleMinistery(e, setFieldValue)}
                            className="form-control"
                          >
                            <option value="">Sem filtro</option>
                            <option value="1">CMN - Hombridade</option>
                            <option value="2">CMN - Mulher Única</option>
                            <option value="3">Crown - Finanças</option>
                            <option value="4">A Mulher que Prospera</option>
                            <option value="5">FFI</option>
                            <option value="6">GFI</option>
                            <option value="7">PG - Habitudes</option>
                            <option value="8">PG - Yes!</option>
                          </Field>
                        </Col>
                        <Col lg="6" md="6" sm="12">
                          <Label>Curso</Label>
                          <Field
                            type="select"
                            component="select"
                            name="default_event_id"
                            id="default_event_id"
                            onChange={e => handleEvent(e, setFieldValue)}
                            className="form-control"
                          >
                            <option value="">Sem filtro</option>
                            {defaultEventsData.map(event => (
                              <option key={event.id} value={event.id}>
                                {event.name}
                              </option>
                            ))}
                          </Field>
                        </Col>
                      </Row>

                      <Row className="mt-3">
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
                              <option value="">Todos os países</option>
                              {countries.map(country => {
                                return (
                                  <option
                                    key={country.id}
                                    value={country.id}
                                    selected={
                                      allData.filters.country === country.id
                                    }
                                  >
                                    {country.name}
                                  </option>
                                );
                              })}
                            </Input>
                          </FormGroup>
                        </Col>
                        {/* estado */}

                        {(() => {
                          if (values.country !== '') {
                            if (values.country !== '30') {
                              return (
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
                                        className="form-control"
                                      >
                                        <option value="">
                                          Selecione uma opção
                                        </option>

                                        {states.map(state => {
                                          return (
                                            <option
                                              key={state.id}
                                              value={state.id}
                                              selected={
                                                allData.filters.apiUf ===
                                                state.id
                                              }
                                            >
                                              {state.name}
                                            </option>
                                          );
                                        })}
                                      </Input>
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
                                        className="form-control"
                                      >
                                        <option value="">
                                          Selecione uma opção
                                        </option>
                                        {cities.map(city => {
                                          return (
                                            <option
                                              key={city.id}
                                              value={city.id}
                                              selected={
                                                allData.filters.apiCity ===
                                                city.id
                                              }
                                            >
                                              {city.name}
                                            </option>
                                          );
                                        })}
                                      </Input>
                                    </FormGroup>
                                  </Col>
                                </>
                              );
                            }
                          }
                        })()}

                        {/* {values.country !== '30' && (
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
                                  className="form-control"
                                >
                                  <option value="">Selecione uma opção</option>

                                  {states.map(state => {
                                    return (
                                      <option
                                        key={state.id}
                                        value={state.id}
                                        selected={
                                          allData.filters.apiUf === state.id
                                        }
                                      >
                                        {state.name}
                                      </option>
                                    );
                                  })}
                                </Input>
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
                                  className="form-control"
                                >
                                  <option value="">Selecione uma opção</option>
                                  {cities.map(city => {
                                    return (
                                      <option
                                        key={city.id}
                                        value={city.id}
                                        selected={
                                          allData.filters.apiCity === city.id
                                        }
                                      >
                                        {city.name}
                                      </option>
                                    );
                                  })}
                                </Input>
                              </FormGroup>
                            </Col>
                          </>
                        )} */}
                      </Row>

                      {values.country === '30' && (
                        <Row className="mt-3">
                          <Col sm="12" md="6" lg="6" xl="3">
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
                                  ${errors.cep && touched.cep && 'is-invalid'}
                                `}
                                  onValueChange={val =>
                                    handleCep(val.value, setFieldValue)
                                  }
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
                          {values.cep ? (
                            <>
                              <Col sm="12" md="6" lg="6" xl="3">
                                <FormGroup>
                                  <Label for="uf">Estado</Label>
                                  <Field
                                    readOnly
                                    type="text"
                                    id="uf"
                                    name="uf"
                                    className="form-control"
                                  />
                                </FormGroup>
                              </Col>
                              <Col sm="12" md="6" lg="6" xl="6">
                                <FormGroup>
                                  <Label for="city">Cidade</Label>
                                  <Field
                                    readOnly
                                    type="text"
                                    disabled={cep_loading}
                                    id="city"
                                    name="city"
                                    className="form-control"
                                  />
                                </FormGroup>
                              </Col>
                            </>
                          ) : (
                            <>
                              <Col lg="3" md="3" sm="12">
                                <Label>Estado</Label>
                                <Field
                                  type="select"
                                  component="select"
                                  name="uf"
                                  id="uf"
                                  className="form-control"
                                >
                                  <option value="">Sem filtro</option>
                                  {UFsAndCities.map(uf => (
                                    <option key={uf.sigla} value={uf.sigla}>
                                      {uf.nome}
                                    </option>
                                  ))}
                                </Field>
                              </Col>
                              <Col lg="4" md="4" sm="12">
                                <Label>Cidade</Label>
                                <Field
                                  type="select"
                                  component="select"
                                  name="city"
                                  id="city"
                                  className="form-control"
                                >
                                  <option value="">Sem filtro</option>

                                  {values.uf &&
                                    UFsAndCities.map(uf => {
                                      if (values.uf === uf.sigla) {
                                        const cities = uf.cidades.map(city => {
                                          return (
                                            <option key={city} value={city}>
                                              {city}
                                            </option>
                                          );
                                        });

                                        return cities;
                                      }
                                    })}
                                </Field>
                              </Col>
                            </>
                          )}
                        </Row>
                      )}
                      <Row className="mt-3">
                        <Col lg="2" md="3" sm="12">
                          <Label>Status</Label>
                          <Field
                            type="select"
                            component="select"
                            name="status"
                            id="status"
                            className="form-control"
                          >
                            <option value="">Sem filtro</option>
                            <option value="Em andamento">Em andamento</option>
                            <option value="Não iniciado">Não iniciado</option>
                            <option value="Finalizado">Finalizado</option>
                          </Field>
                        </Col>
                        <Col lg="4" md="4" sm="12">
                          <Label>Data inicio</Label>
                          <Datepicker
                            name="start_date"
                            id="start_date"
                            locale={pt}
                            selected={values.start_date}
                            onChange={date => setFieldValue('start_date', date)}
                            customInput={<DatepickerButton />}
                            maxDate={values.end_date ? values.end_date : ''}
                            withPortal
                            isClearable
                            fixedHeight
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            className="form-control"
                          />
                        </Col>
                        <Col lg="4" md="4" sm="12">
                          <Label>até</Label>
                          <Datepicker
                            name="end_date"
                            id="end_date"
                            locale={pt}
                            selected={values.end_date}
                            onChange={date => setFieldValue('end_date', date)}
                            customInput={<DatepickerButton />}
                            minDate={values.start_date ? values.start_date : ''}
                            withPortal
                            isClearable
                            fixedHeight
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            className="form-control"
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup>
                      <Row>
                        <Col lg="8">
                          {loading ? (
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
                              Filtrar
                            </Button>
                          )}
                        </Col>
                        <Col lg="4">
                          <Button
                            className="ml-2"
                            outline
                            color="warning"
                            onClick={event =>
                              handleClearFilters(event, setFieldValue)
                            }
                          >
                            Limpar filtros
                          </Button>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Form>
                )}
              </Formik>

              {allData.refresh && (
                <CustomTabs
                  TabContent={
                    <AllEventsTable
                      data={allData}
                      reload={reload => setReload(reload)}
                    />
                  }
                />
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}
