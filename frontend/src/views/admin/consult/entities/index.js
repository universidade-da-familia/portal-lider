/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { Collapse } from 'react-collapse';
import { CreditCard, AtSign, RefreshCw } from 'react-feather';
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
} from 'reactstrap';

// eslint-disable-next-line import/no-extraneous-dependencies
import { css } from '@emotion/core';
import pt from 'date-fns/locale/pt';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import UFsAndCities from '~/assets/data/statesCities';
import ContentHeader from '~/components/contentHead/contentHeader';
import CepFormat from '~/components/fields/CepFormat';
import CNPJFormat from '~/components/fields/CNPJFormat';
import CPFFormat from '~/components/fields/CPFFormat';
import QuantityFormat from '~/components/fields/QuantityFormat';
import CustomTabs from '~/components/tabs/default';
import { Creators as CepActions } from '~/store/ducks/cep';
import { Creators as DefaultEventActions } from '~/store/ducks/defaultEvent';
import { Creators as EntityActions } from '~/store/ducks/entity';

import AllEntitiesTable from './table';
import AllEntitiesTablePJ from './tablePJ';
// import CertificatesTable from './tableCertificates';

const formSchema = Yup.object().shape({
  email: Yup.string().matches(
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    'Digite um email válido'
  ),
  cep: Yup.string().min(8, 'Um CEP válido contém 8 dígitos.'),
});

export default function AdminEntities() {
  const filterStorage = JSON.parse(
    localStorage.getItem('@dashboard/admin_filter_entities')
  );
  const localPage = parseInt(
    localStorage.getItem('@dashboard/admin_entities_page'),
    10
  );

  const [allData, setAllData] = useState({
    data: [],
    page: 1,
    filters: {
      collapse: filterStorage ? filterStorage.collapse : false,
      id: filterStorage ? filterStorage.id : '',
      hierarchy: filterStorage ? filterStorage.hierarchy : '0',
      entity_type: filterStorage ? filterStorage.entity_type : 'pf',
      cpf: filterStorage ? filterStorage.cpf : '',
      cnpj: filterStorage ? filterStorage.cnpj : '',
      email: filterStorage ? filterStorage.email : '',
      cep: filterStorage ? filterStorage.cep : '',
      uf: filterStorage ? filterStorage.uf : '',
      city: filterStorage ? filterStorage.city : '',
      only_organizators: filterStorage ? filterStorage.only_organizators : '',
      ministery: filterStorage ? filterStorage.ministery : '',
      default_event_id: filterStorage ? filterStorage.default_event_id : '',
      status: filterStorage ? filterStorage.status : '',
      start_date: filterStorage ? filterStorage.start_date : '',
      end_date: filterStorage ? filterStorage.end_date : '',
    },
    refresh: true,
  });
  // eslint-disable-next-line no-unused-vars
  const [reload, setReload] = useState(false);
  const [defaultEventsData, setDefaultEventsData] = useState([]);

  const all_entities = useSelector(state => state.entity.allEntities);
  const defaultData = useSelector(state => state.defaultEvent.allData);
  const loading = useSelector(state => state.entity.loading);
  const cepData = useSelector(state => state.cep.data);
  const cepLoading = useSelector(state => state.cep.loading);

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
    const formattedCpf = values.cpf
      .replace('.', '')
      .replace('.', '')
      .replace('-', '');

    const formattedCnpj = values.cnpj
      .replace('.', '')
      .replace('.', '')
      .replace('/', '')
      .replace('-', '');

    values.cpf = formattedCpf;
    values.cnpj = formattedCnpj;

    setAllData({
      ...allData,
      filters: values,
      refresh: false,
    });
    setReload(true);

    localStorage.setItem(
      '@dashboard/admin_filter_entities',
      JSON.stringify(values)
    );
    localStorage.setItem('@dashboard/admin_entities_page', 1);

    store.getState().exportExcel.entityData = null;
    store.getState().exportExcel.organizationData = null;
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

  function validateCNPJ(cnpj) {
    const formattedCNPJ = cnpj
      .replace('.', '')
      .replace('.', '')
      .replace('/', '')
      .replace('-', '');

    let error;
    let size;
    let numbers;
    let sum = 0;
    let pos;
    let result;

    if (formattedCNPJ === '') return;

    if (formattedCNPJ.length !== 14) error = 'O CNPJ deve conter 14 dígitos';

    // Elimina CNPJs invalidos conhecidos
    if (
      formattedCNPJ === '00000000000000' ||
      formattedCNPJ === '11111111111111' ||
      formattedCNPJ === '22222222222222' ||
      formattedCNPJ === '33333333333333' ||
      formattedCNPJ === '44444444444444' ||
      formattedCNPJ === '55555555555555' ||
      formattedCNPJ === '66666666666666' ||
      formattedCNPJ === '77777777777777' ||
      formattedCNPJ === '88888888888888' ||
      formattedCNPJ === '99999999999999'
    )
      error = 'O CNPJ é inválido';

    // Valida DVs
    size = formattedCNPJ.length - 2;
    numbers = formattedCNPJ.substring(0, size);
    const digits = formattedCNPJ.substring(size);
    pos = size - 7;

    // eslint-disable-next-line no-plusplus
    for (let i = size; i >= 1; i--) {
      // eslint-disable-next-line no-plusplus
      sum += numbers.charAt(size - i) * pos--;
      if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    if (result.toString() !== digits.charAt(0)) error = 'O CNPJ é inválido';

    size += 1;
    numbers = formattedCNPJ.substring(0, size);
    sum = 0;
    pos = size - 7;

    // eslint-disable-next-line no-plusplus
    for (let i = size; i >= 1; i--) {
      // eslint-disable-next-line no-plusplus
      sum += numbers.charAt(size - i) * pos--;
      if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    if (result.toString() !== digits.charAt(1)) error = 'O CNPJ é inválido';

    // eslint-disable-next-line consistent-return
    return error;
  }

  function handleEntityType(event, setFieldValue) {
    store.getState().exportExcel.entityData = null;
    store.getState().exportExcel.organizationData = null;
    setFieldValue('entity_type', event.target.value);

    if (event.target.value === 'pf') {
      setFieldValue('cnpj', '');

      setAllData({
        ...allData,
        filters: {
          ...allData.filters,
          entity_type: 'pf',
        },
      });
    } else {
      setFieldValue('cpf', '');
      setFieldValue('hierarchy', '');

      setAllData({
        ...allData,
        filters: {
          ...allData.filters,
          entity_type: 'pj',
          hierarchy: '0',
        },
      });
    }
  }

  function handleCep(cep, setFieldValue) {
    setFieldValue('cep', cep);

    if (cep.length === 8) {
      dispatch(CepActions.cepRequest(cep, 0));
    }
  }

  function handleToggleCollapseFilters(values, setFieldValue) {
    setFieldValue('hierarchy', values.hierarchy);
    setFieldValue('only_organizators', '');
    setFieldValue('ministery', '');
    setFieldValue('default_event_id', '');
    setFieldValue('status', '');
    setFieldValue('start_date', '');
    setFieldValue('end_date', '');

    setAllData({
      ...allData,
      filters: {
        ...allData.filters,
        collapse: !allData.filters.collapse,
        id: values.id,
        hierarchy: values.hierarchy,
        entity_type: values.entity_type,
        cpf: values.cpf,
        cnpj: values.cnpj,
        email: values.email,
        cep: values.cep,
        uf: values.uf,
        city: values.city,
      },
    });

    // LIMPAR DADOS FILTRO MINISTERIAIS
  }

  function handleClearFilters(event, setFieldValue) {
    event.preventDefault();

    setFieldValue('collapse', allData.filters.collapse);
    setFieldValue('id', '');
    setFieldValue('hierarchy', '0');
    setFieldValue('entity_type', 'pf');
    setFieldValue('cpf', '');
    setFieldValue('cnpj', '');
    setFieldValue('email', '');
    setFieldValue('cep', '');
    setFieldValue('uf', '');
    setFieldValue('city', '');
    setFieldValue('only_organizators', '');
    setFieldValue('ministery', '');
    setFieldValue('default_event_id', '');
    setFieldValue('status', '');
    setFieldValue('start_date', '');
    setFieldValue('end_date', '');
    setFieldValue('perPage', 10);

    setAllData({
      ...allData,
      filters: {
        collapse: allData.filters.collapse,
        id: '',
        hierarchy: '0',
        entity_type: 'pf',
        cpf: '',
        cnpj: '',
        email: '',
        cep: '',
        uf: '',
        city: '',
        only_organizators: '',
        ministery: '',
        default_event_id: '',
        status: '',
        start_date: '',
        end_date: '',
      },
      refresh: false,
    });

    localStorage.setItem('@dashboard/admin_entities_page', 1);
    localStorage.removeItem('@dashboard/admin_filter_entities');

    store.getState().exportExcel.entityData = null;
    store.getState().exportExcel.organizationData = null;
  }

  function handleMinistery(event, setFieldValue) {
    const { value } = event.target;

    const [, ministery_id] = value.split('/');

    setFieldValue('ministery', value);
    setFieldValue('default_event_id', '');

    const defaultEventAux = defaultData.filter(
      defaultEvent =>
        parseInt(defaultEvent.ministery.id, 10) === parseInt(ministery_id, 10)
    );

    setDefaultEventsData(defaultEventAux);
  }

  function handleEvent(event, setFieldValue) {
    const { value } = event.target;
    setFieldValue('default_event_id', value);
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
      EntityActions.allConsultEntitiesRequest(allData.page, allData.filters)
    );
  }, [allData.page, allData.filters, allData.refresh]);

  useEffect(() => {
    if (allData.filters.ministery) {
      const [, ministery_id] = allData.filters.ministery.split('/');

      const defaultEventAux = defaultData.filter(
        defaultEvent =>
          parseInt(defaultEvent.ministery.id, 10) === parseInt(ministery_id, 10)
      );

      setDefaultEventsData(defaultEventAux);
    }
  }, [defaultData, allData.filters]);

  useEffect(() => {
    if (cepData.cep) {
      setAllData({
        ...allData,
        filters: {
          ...allData.filters,
          cep: cepData.cep.replace('-', ''),
          uf: cepData.uf,
          city: cepData.localidade,
        },
      });
    }
  }, [cepData]);

  useEffect(() => {
    setAllData({
      ...allData,
      page: all_entities.page,
      lastPage: all_entities.lastPage,
      data: all_entities.data,
      refresh: true,
    });
  }, [all_entities]);

  useEffect(() => {
    dispatch(DefaultEventActions.allDefaultEventRequest());

    return () => {
      store.getState().cep.data = {};
    };
  }, []);

  return (
    <>
      <ContentHeader>Entidades</ContentHeader>
      <Row className="row-eq-height">
        <Col sm="12">
          <Card>
            <CardBody>
              <Badge color="info" className="align-self-center mb-3">
                Todas as entidades
              </Badge>

              <Formik
                initialValues={allData.filters}
                validationSchema={formSchema}
                enableReinitialize
                onSubmit={values => handleSearchAllData(values)}
              >
                {({ values, setFieldValue, errors, touched }) => (
                  <Form>
                    <FormGroup>
                      <Row>
                        <Col lg="2" md="2" sm="12">
                          <Label>Id</Label>
                          <Field
                            type="number"
                            name="id"
                            id="id"
                            className="form-control"
                            render={({ field }) => (
                              <QuantityFormat
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                {...field}
                                id="id"
                                name="id"
                                placeholder="código entidade"
                                className="form-control"
                                value={values.id}
                              />
                            )}
                          />
                        </Col>
                        {values.entity_type === 'pf' && (
                          <Col lg="3" md="4" sm="12">
                            <Label>Hierarquia</Label>
                            <Field
                              type="select"
                              component="select"
                              name="hierarchy"
                              id="hierarchy"
                              className="form-control"
                            >
                              <option value="0">Sem filtro</option>
                              <option value="1">Participante</option>
                              <option value="2">Líder em treinamento</option>
                              <option value="3">Facilitador</option>
                              <option value="4">Líder</option>
                              <option value="5">Treinador</option>
                              <option value="6">Coordenador</option>
                              <option value="7">Funcionário</option>
                            </Field>
                          </Col>
                        )}
                      </Row>
                      <Row className="mt-3">
                        <Col lg="3" md="3" sm="12">
                          <Label>Tipo entidade</Label>
                          <Field
                            type="select"
                            component="select"
                            name="entity_type"
                            id="entity_type"
                            className="form-control"
                            onChange={event =>
                              handleEntityType(event, setFieldValue)
                            }
                          >
                            <option value="pf">Pessoa física</option>
                            <option value="pj">Pessoa jurídica</option>
                          </Field>
                        </Col>
                        {values.entity_type === 'pf' ? (
                          <Col lg="4" md="4" sm="12">
                            <Label>CPF Entidade</Label>
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
                        ) : (
                          <Col lg="4" md="4" sm="12">
                            <Label>CNPJ Entidade</Label>
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
                        )}
                        <Col lg="5" md="4" sm="12">
                          <Label>Email</Label>
                          <div className="position-relative has-icon-left">
                            <Field
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
                                  disabled={cepLoading}
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
                      <Row className="mt-3">
                        <Col lg="4">
                          <Button
                            color="info"
                            onClick={() =>
                              handleToggleCollapseFilters(values, setFieldValue)
                            }
                          >
                            {allData.filters.collapse
                              ? 'Ocultar e limpar filtros ministeriais (eventos)'
                              : 'Mostrar filtros ministeriais (eventos)'}
                          </Button>
                        </Col>
                      </Row>
                      <Collapse isOpened={allData.filters.collapse}>
                        <Row className="mt-3">
                          {values.entity_type === 'pf' && (
                            <Col lg="3" md="3" sm="12">
                              <Label>Participante/Organizador</Label>
                              <Field
                                type="select"
                                component="select"
                                name="only_organizators"
                                id="only_organizators"
                                className="form-control"
                              >
                                <option value="">
                                  Participantes e organizadores
                                </option>
                                <option value="participants">
                                  Apenas participantes
                                </option>
                                <option value="organizators">
                                  Apenas organizadores
                                </option>
                              </Field>
                            </Col>
                          )}
                          {(values.hierarchy !== '0' ||
                            values.entity_type === 'pj') && (
                            <Col lg="3" md="3" sm="12">
                              <Label>Ministério</Label>
                              <Field
                                type="select"
                                component="select"
                                name="ministery"
                                id="ministery"
                                onChange={e =>
                                  handleMinistery(e, setFieldValue)
                                }
                                className="form-control"
                              >
                                <option value="">Sem filtro</option>
                                <option value="cmn_hierarchy_id/1">
                                  CMN - Hombridade
                                </option>
                                <option value="mu_hierarchy_id/2">
                                  CMN - Mulher Única
                                </option>
                                <option value="crown_hierarchy_id/3">
                                  Crown - Finanças
                                </option>
                                <option value="mp_hierarchy_id/4">
                                  A Mulher que Prospera
                                </option>
                                <option value="ffi_hierarchy_id/5">FFI</option>
                                <option value="gfi_hierarchy_id/6">GFI</option>
                                <option value="pg_hab_hierarchy_id/7">
                                  PG - Habitudes
                                </option>
                                <option value="pg_yes_hierarchy_id/9">
                                  PG - Yes!
                                </option>
                              </Field>
                            </Col>
                          )}
                          {!!values.ministery && (
                            <Col lg="6" md="5" sm="12">
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
                          )}
                        </Row>
                        <Row className="mt-3">
                          <Col lg="2" md="3" sm="12">
                            <Label>Status evento</Label>
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
                              onChange={date =>
                                setFieldValue('start_date', date)
                              }
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
                              minDate={
                                values.start_date ? values.start_date : ''
                              }
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
                      </Collapse>
                    </FormGroup>
                    <FormGroup>
                      <Row className="mt-3">
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

              {allData.filters.entity_type === 'pf' && allData.refresh && (
                <CustomTabs
                  TabContent={
                    <AllEntitiesTable
                      data={allData}
                      reload={reload => setReload(reload)}
                    />
                  }
                />
              )}

              {allData.filters.entity_type === 'pj' && allData.refresh && (
                <CustomTabs
                  TabContent={
                    <AllEntitiesTablePJ
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
