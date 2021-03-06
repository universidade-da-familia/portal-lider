/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  User,
  RefreshCw,
  MapPin,
  HelpCircle,
  Plus,
  Edit,
  Navigation,
  X,
  Smartphone,
} from 'react-feather';
import { Datepicker } from 'react-formik-ui';
// import NumberFormat from 'react-number-format';
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
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody,
  // Modal,
  // ModalHeader,
  // ModalBody,
  // ModalFooter,
  // ButtonGroup,
  // Table,
} from 'reactstrap';

// import { css } from '@emotion/core';
// import { TextField } from '@material-ui/core';
// import { TimePicker } from '@material-ui/pickers';
import CountryStateCity from 'country-state-city';
import { subMonths, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Formik, Field, Form, getIn, FieldArray } from 'formik';
import * as Yup from 'yup';

// import history from '~/app/history';
import ContentHeader from '~/components/contentHead/contentHeader';
import CepFormat from '~/components/fields/CepFormat';
import CNPJFormat from '~/components/fields/CNPJFormat';
import CPFFormat from '~/components/fields/CPFFormat';
import PhoneFormat from '~/components/fields/PhoneFormat';
import { validateCNPJ } from '~/services/validateCNPJ';
import { validateCPF } from '~/services/validateCPF';
import { Creators as BankActions } from '~/store/ducks/bank';
import { Creators as CepActions } from '~/store/ducks/cep';
import { Creators as DefaultEventActions } from '~/store/ducks/defaultEvent';
import { Creators as DefaultEventScheduleActions } from '~/store/ducks/defaultEventSchedule';
import { Creators as EventActions } from '~/store/ducks/event';

const formDetails = Yup.object().shape({
  modality: Yup.string().required('A modalidade é obrigatória'),
  organizator_name: Yup.string().required('O treinador é obrigatório'),
  default_event_id: Yup.string().required('Tipo do treinamento é obrigatório'),
  default_event_max_participants: Yup.number(),
  inscriptions_limit: Yup.number().when(
    'default_event_max_participants',
    default_event_max_participants => {
      return default_event_max_participants
        ? Yup.number()
            .max(
              default_event_max_participants,
              `O limite de inscrições deve ser menor ou igual a ${default_event_max_participants}.`
            )
            .required('O limite de inscrições é obrigatório.')
        : Yup.number()
            .max(0)
            .required('O limite de inscrições é obrigatório.');
    }
  ),
  ministery: Yup.string().required('Ministério é obrigatório'),
  contact_name: Yup.string().required('Nome do contato é obrigatório'),
  contact_email: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      'Digite um email válido'
    )
    .required('O email do contato é obrigatório'),
  contact_phone: Yup.string().required('Telefone do contato é obrigatório'),
  schedules: Yup.array().of(
    Yup.object().shape({
      date: Yup.string().required('A data é obrigatória.'),
      start_time: Yup.string().required('Horario início é obrigatório.'),
      end_time: Yup.string().required('Horario fim é obrigatório.'),
    })
  ),
  cep: Yup.string().when(['country', 'modality'], {
    is: (country, modality) => country === '30' && modality === 'Presencial',
    then: Yup.string().required('O CEP é obrigatório'),
  }),
  uf: Yup.string().when(['country', 'modality'], {
    is: (country, modality) => country === '30' && modality === 'Presencial',
    then: Yup.string().required('O estado é obrigatório'),
  }),
  city: Yup.string().when(['country', 'modality'], {
    is: (country, modality) => country === '30' && modality === 'Presencial',
    then: Yup.string().required('A cidade é obrigatória'),
  }),
  // apiUf: Yup.string().when(['country', 'modality'], {
  //   is: (country, modality) => country === '30' && modality === 'Presencial',
  //   then: Yup.string().required('O estado é obrigatório'),
  // }),
  address_name: Yup.string().when(['country', 'modality'], {
    is: (country, modality) => country === '30' && modality === 'Presencial',
    then: Yup.string().required('O local é obrigatório'),
  }),
  street: Yup.string().when(['country', 'modality'], {
    is: (country, modality) => country === '30' && modality === 'Presencial',
    then: Yup.string().required('A rua é obrigatória'),
  }),
  street_number: Yup.string().when(['country', 'modality'], {
    is: (country, modality) => country === '30' && modality === 'Presencial',
    then: Yup.string().required('O numero é obrigatório'),
  }),
  neighborhood: Yup.string().when(['country', 'modality'], {
    is: (country, modality) => country === '30' && modality === 'Presencial',
    then: Yup.string().required('O bairro é obrigatório'),
  }),
  bank_account_id: Yup.string().required('Conta bancária é obrigatória'),
  bank_id: Yup.string().required('O banco é obrigatório.'),
  agency: Yup.string().required('A agência é obrigatório.'),
  account_number: Yup.string().required('Número da conta é obrigatório.'),
  favored: Yup.string().required('Titular é obrigatório.'),
  account_type: Yup.string().required('Tipo de conta é obrigatório.'),
  favored_type: Yup.string().required('Tipo de pessoa é obrigatório.'),
  cpf_cnpj: Yup.string().required('Este campo é obrigatório.'),
});

// const formAddPaymentPlan = Yup.object().shape({
//   title: Yup.string().required('O título é obrigatório'),
//   description: Yup.string().required('A descrição é obrigatória'),
//   plan_type: Yup.string().required('Escolha um tipo de plano de pagamento'),
// });

// class CurrencyFormat extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       value: '',
//     };
//   }

//   render() {
//     const { currencyValue } = this.state;

//     return (
//       <NumberFormat
//         inputMode="decimal"
//         prefix="R$ "
//         thousandSeparator="."
//         decimalSeparator=","
//         fixedDecimalScale
//         decimalScale={2}
//         allowNegative={false}
//         // defaultValue={0}
//         value={currencyValue}
//         onValueChange={vals => {
//           this.setState({ value: vals.formattedValue });
//         }}
//         {...this.props}
//       />
//     );
//   }
// }

// eslint-disable-next-line no-unused-vars
export default function TrainingCreate({ className }) {
  const userId = localStorage.getItem('@dashboard/user');

  const [initialState, setInitialState] = useState({
    is_public: 'true',
    modality: '',
    ministery: '',
    default_event_id: '',
    default_event_max_participants: 0,
    inscriptions_limit: 0,
    additional_information: '',
    organizator_id: null,
    organizator_name: '',
    aux_organizator_id: '',
    aux_organizator_name: '',
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    schedules: [
      {
        date: '',
        start_time: '',
        end_time: '',
      },
    ],
    country: '30',
    cep: '',
    uf: '',
    city: '',
    apiUf: '',
    apiCity: '',
    address_name: '',
    street: '',
    street_number: '',
    neighborhood: '',
    complement: '',
    bank_account_id: '',
    bank_id: '',
    agency: '',
    account_number: '',
    favored: '',
    account_type: '',
    favored_type: '',
    cpf_cnpj: '',
  });
  const [bankAccounts, setBankAccounts] = useState([
    {
      id: null,
      entity_id: parseInt(userId, 10),
      bank_id: '',
      agency: '',
      account_number: '',
      favored: '',
      account_type: '',
      favored_type: '',
      cpf_cnpj: '',
    },
  ]);
  const [ministeriesOrganizer, setMinisteriesOrganizer] = useState([]);
  const [defaultEventsOrganizer, setDefaultEventsOrganizer] = useState([]);
  const [loadCep, setLoadCep] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const userData = useSelector(state => state.profile.data);
  const bankData = useSelector(state => state.bank.allData);
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

  // function toggleModalEditSchedule() {
  //   setModalEditSchedule(!modalEditSchedule);
  // }

  // function toggleModalEditPaymentPlan() {
  //   setModalEditPaymentPlan(!modalEditPaymentPlan);
  // }

  // function handleAddPaymantPlan(values) {
  //   const { title, description, plan_type, amount } = values;

  //   setPaymentPlans([
  //     ...paymentPlans,
  //     { title, description, plan_type, amount },
  //   ]);

  function handleChangeBankAccount(event, setFieldValue) {
    const { name, value } = event.target;

    setFieldValue(name, value);

    if (value !== 'other' && value !== '') {
      const bankAccount = bankAccounts.find(
        bankAccountFind => bankAccountFind.id === parseInt(value, 10)
      );

      setFieldValue('bank_id', bankAccount.bank_id);
      setFieldValue('agency', parseInt(bankAccount.agency, 10));
      setFieldValue('account_number', parseInt(bankAccount.account_number, 10));
      setFieldValue('favored', bankAccount.favored);
      setFieldValue('account_type', bankAccount.account_type);
      setFieldValue('favored_type', bankAccount.favored_type);
      setFieldValue('cpf_cnpj', bankAccount.cpf_cnpj);
    } else if (value === '') {
      setFieldValue('bank_id', '');
      setFieldValue('agency', '');
      setFieldValue('account_number', '');
      setFieldValue('favored', '');
      setFieldValue('account_type', '');
      setFieldValue('favored_type', '');
      setFieldValue('cpf_cnpj', '');
    } else {
      setFieldValue('bank_account_id', 'other');
      setFieldValue('bank_id', '');
      setFieldValue('agency', '');
      setFieldValue('account_number', '');
      setFieldValue('favored', '');
      setFieldValue('account_type', '');
      setFieldValue('favored_type', '');
      setFieldValue('cpf_cnpj', '');
    }
  }

  function handleSubmit(values) {
    const formattedContactPhone = values.contact_phone
      .replace('(', '')
      .replace(')', '')
      .replace('-', '');

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
      start_date: values.schedules[0].date,
      modality: values.modality,
      is_online_payment: values.is_online_payment === 'true',
      default_event_id: parseInt(values.default_event_id, 10),
      inscriptions_limit: parseInt(values.inscriptions_limit, 10),
      additional_information: values.additional_information,
      organizator_id: values.organizator_id,
      contact_name: values.contact_name,
      contact_email: values.contact_email,
      contact_phone: formattedContactPhone,
      schedules: values.schedules,
      img_address_url:
        'https://arcowebarquivos-us.s3.amazonaws.com/imagens/52/21/arq_85221.jpg',
      is_finished: false,
      cep: values.cep,
      country: values.country,
      uf: values.uf,
      city: values.city,
      address_name: values.address_name,
      street: values.street,
      street_number: values.street_number,
      neighborhood: values.neighborhood,
      complement: values.complement,
      bank_account: {
        bank_account_id: values.bank_account_id,
        bank_id: values.bank_id,
        agency: values.agency,
        account_number: values.account_number,
        favored: values.favored,
        account_type: values.account_type,
        favored_type: values.favored_type,
        cpf_cnpj: values.cpf_cnpj,
      },
    };

    dispatch(EventActions.addEventRequest(data));
  }

  function handleEvent(event, setFieldValue) {
    const { value } = event.target;

    const defaultEventFinded = defaultData.find(
      defaultEvent => defaultEvent.id === parseInt(value, 10)
    );

    setFieldValue('default_event_id', value);

    if (defaultEventFinded) {
      setFieldValue(
        'default_event_max_participants',
        defaultEventFinded.max_participants
      );
      setFieldValue('inscriptions_limit', defaultEventFinded.max_participants);
      dispatch(
        DefaultEventScheduleActions.allDefaultEventScheduleRequest(value)
      );
    }
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
        is_public: values.is_public,
        modality: values.modality,
        ministery: values.ministery,
        default_event_id: values.default_event_id,
        schedules: values.schedules,
        bank_account_id: values.bank_account_id,
        bank_id: values.bank_id,
        agency: values.agency,
        account_number: values.account_number,
        favored: values.favored,
        account_type: values.account_type,
        favored_type: values.favored_type,
        cpf_cnpj: values.cpf_cnpj,
      });
      dispatch(CepActions.cepRequest(cep, 0));
    }
  }

  function handleModalityChange(event, setFieldValue) {
    const newModality = event.target.value;

    setFieldValue('modality', newModality);
    if (newModality === 'Online') {
      setFieldValue('cep', '');
      setFieldValue('country', '');
      setFieldValue('apiUf', '');
      setFieldValue('apiCity', '');
      setFieldValue('address_name', '');
      setFieldValue('street', '');
      setFieldValue('street_number', '');
      setFieldValue('neighborhood', '');
      setFieldValue('complement', '');
    } else {
      setFieldValue('country', '30');
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

  function handleChangeStartTime(event, index, setFieldValue) {
    setFieldValue(`schedules[${index}].start_time`, event.target.value);
  }

  function handleChangeEndTime(event, index, setFieldValue) {
    setFieldValue(`schedules[${index}].end_time`, event.target.value);
  }

  function minScheduleDate(schedules, scheduleLength, index) {
    if (scheduleLength === 1) {
      return subMonths(new Date(), 12);
    }
    if (scheduleLength > 1 && index !== 0) {
      return addDays(schedules[index - 1].date, 1);
    }
    return subMonths(new Date(), 12);
  }

  useEffect(() => {
    // if (userData.church === null) {
    //   setModalWithoutChurch(true);
    // }

    if (userData.id) {
      setInitialState({
        ...initialState,
        // organization_id: userData.church !== null ? userData.church.id : '',
        // organization_name:
        //   userData.church !== null
        //     ? `${userData.church.corporate_name} (sua igreja)`
        //     : 'Igreja não informada',
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

      if (userData.bankAccounts && userData.bankAccounts.length > 0) {
        setBankAccounts(userData.bankAccounts);
      }

      dispatch(DefaultEventActions.organizatorEventRequest(data));
    }
  }, [userData]);

  useEffect(() => {
    if (cep_data.cep) {
      setInitialState({
        ...initialState,
        cep: cep_data.cep.replace('-', ''),
        uf: cep_data.uf,
        city: cep_data.localidade,
        street: cep_data.logradouro !== '' ? cep_data.logradouro : '',
        neighborhood: cep_data.bairro !== '' ? cep_data.bairro : '',
        complement: cep_data.complemento !== '' ? cep_data.complemento : '',
      });
    }
  }, [cep_data]);

  // useEffect(() => {
  //   if (cep_data.cep) {
  //     setInitialState({
  //       ...initialState,
  //       cep: cep_data.cep.replace('-', ''),
  //       uf: cep_data.uf,
  //       city: cep_data.localidade,
  //     });
  //   }
  // }, [cep_data]);

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

    dispatch(BankActions.bankRequest());

    return () => {
      store.getState().cep.data = {};
    };
  }, []);

  return (
    defaultData !== null &&
    userData !== {} && (
      <>
        <ContentHeader>Criar Treinamento</ContentHeader>
        <Card>
          <CardBody>
            {/* DADOS DA IGREJA */}
            <Formik
              enableReinitialize
              initialValues={initialState}
              validationSchema={formDetails}
              onSubmit={values => handleSubmit(values)}
            >
              {({ errors, touched, values, setFieldValue, handleChange }) => (
                <Form>
                  {/* DADOS DO TREINAMENTO */}
                  <div className="form-body">
                    <h4 className="form-section">
                      <User size={20} color="#212529" /> Dados do treinamento
                    </h4>
                    <Row>
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
                      <Col lg="4" md="6" sm="12">
                        <FormGroup>
                          <FormGroup>
                            <Label for="modality">Modalidade</Label>
                            <Field
                              type="select"
                              component="select"
                              id="modality"
                              name="modality"
                              onChange={e =>
                                handleModalityChange(e, setFieldValue)
                              }
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

                              {/* <option key="misto" value="Misto">
                                Misto
                              </option> */}
                            </Field>
                            {errors.modality && touched.modality ? (
                              <div className="invalid-feedback">
                                {errors.modality}
                              </div>
                            ) : null}
                          </FormGroup>
                        </FormGroup>
                      </Col>
                      {/* <Col lg="5" md="6" sm="12">
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
                      </Col> */}
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

                      <Col lg="4" md="12" sm="12">
                        <FormGroup>
                          <Label for="default_event_id">Treinamento</Label>
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

                            <optgroup label="Treinamento">
                              {defaultEventsOrganizer.map(
                                event =>
                                  (event.event_type ===
                                    'Treinamento de treinadores' ||
                                    event.event_type ===
                                      'Capacitação de líderes') && (
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
                      <Field
                        type="hidden"
                        name="default_event_max_participants"
                        id="default_event_max_participants"
                      />
                      {values.default_event_id && (
                        <Col sm="12" md="12" lg="4" className="mb-2">
                          <FormGroup>
                            <Label for="inscriptions_limit">
                              Limite de inscrições
                            </Label>
                            <Field
                              type="number"
                              name="inscriptions_limit"
                              id="inscriptions_limit"
                              className={`
                              form-control
                              ${errors.inscriptions_limit &&
                                touched.inscriptions_limit &&
                                'is-invalid'}
                            `}
                            />
                            {errors.inscriptions_limit &&
                            touched.inscriptions_limit ? (
                              <div className="invalid-feedback">
                                {errors.inscriptions_limit}
                              </div>
                            ) : null}
                          </FormGroup>
                        </Col>
                      )}
                    </Row>
                    <Row>
                      <Col lg="12" md="12" sm="12">
                        <FormGroup>
                          <Label for="additional_information">
                            Informações adicionais
                          </Label>
                          <Field
                            component="textarea"
                            type="textarea"
                            id="additional_information"
                            name="additional_information"
                            rows="5"
                            className="form-control"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <h4 className="form-section">
                      <i className="fa fa-home" size={20} color="#212529" />{' '}
                      Cronograma
                    </h4>
                    <FieldArray
                      name="schedules"
                      render={({ remove, push }) => (
                        <>
                          {values.schedules.length > 0 &&
                            values.schedules.map((schedule, index) => {
                              const scheduleDate = `schedules[${index}].date`;
                              const errorScheduleDate = getIn(
                                errors,
                                scheduleDate
                              );
                              const touchedScheduleDate = getIn(
                                touched,
                                scheduleDate
                              );

                              const startTime = `schedules[${index}].start_time`;
                              const errorStartTime = getIn(errors, startTime);
                              const touchedStartTime = getIn(
                                touched,
                                startTime
                              );

                              const endTime = `schedules[${index}].end_time`;
                              const errorEndTime = getIn(errors, endTime);
                              const touchedEndTime = getIn(touched, endTime);

                              return (
                                <div>
                                  <Row className="justify-content-between ml-0 mr-0">
                                    <h3>Dia {index + 1}</h3>
                                    {values.schedules.length > 1 && (
                                      <Button
                                        color="danger"
                                        onClick={() => remove(index)}
                                      >
                                        <X size={18} color="#fff" />
                                      </Button>
                                    )}
                                  </Row>
                                  <Row>
                                    <Col sm="12" md="12" lg="3">
                                      <FormGroup>
                                        <Label for={`schedules[${index}].date`}>
                                          Data
                                        </Label>
                                        <Datepicker
                                          id={`schedules[${index}].date`}
                                          name={`schedules[${index}].date`}
                                          locale={pt}
                                          selected={
                                            values.schedules[index].date
                                          }
                                          onChange={date =>
                                            setFieldValue(
                                              `schedules[${index}].date`,
                                              date
                                            )
                                          }
                                          customInput={<DatepickerButton />}
                                          minDate={minScheduleDate(
                                            values.schedules,
                                            values.schedules.length,
                                            index
                                          )}
                                          withPortal
                                          isClearable
                                          dateFormat="dd/MM/yyyy"
                                          showMonthDropdown
                                          showYearDropdown
                                          dropdownMode="select"
                                          className={`
                                              form-control
                                              ${errorScheduleDate &&
                                                touchedScheduleDate &&
                                                'is-invalid'}
                                            `}
                                        />
                                        {errorScheduleDate &&
                                        touchedScheduleDate ? (
                                          <div className="invalid-feedback">
                                            {errorScheduleDate}
                                          </div>
                                        ) : null}
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col sm="12" md="12" lg="2">
                                      <FormGroup>
                                        <Label
                                          for={`schedules[${index}].start_time`}
                                        >
                                          Horário início
                                        </Label>
                                        <Input
                                          id={`schedules[${index}].start_time`}
                                          name={`schedules[${index}].start_time`}
                                          type="time"
                                          onChange={e => {
                                            handleChangeStartTime(
                                              e,
                                              index,
                                              setFieldValue
                                            );
                                          }}
                                          className={`
                                              form-control
                                              ${errorStartTime &&
                                                touchedStartTime &&
                                                'is-invalid'}
                                            `}
                                        />
                                        {errorStartTime && touchedStartTime ? (
                                          <div className="invalid-feedback">
                                            {errorStartTime}
                                          </div>
                                        ) : null}
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col sm="12" md="12" lg="2">
                                      <FormGroup>
                                        <Label
                                          for={`schedules[${index}].end_time`}
                                        >
                                          Horário fim
                                        </Label>
                                        <Input
                                          id={`schedules[${index}].end_time`}
                                          name={`schedules[${index}].end_time`}
                                          type="time"
                                          onChange={e => {
                                            handleChangeEndTime(
                                              e,
                                              index,
                                              setFieldValue
                                            );
                                          }}
                                          className={`
                                              form-control
                                              ${errorEndTime &&
                                                touchedEndTime &&
                                                'is-invalid'}
                                            `}
                                        />
                                        {errorEndTime && touchedEndTime ? (
                                          <div className="invalid-feedback">
                                            {errorEndTime}
                                          </div>
                                        ) : null}
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                  <div className="form-actions right" />
                                </div>
                              );
                            })}

                          <FormGroup>
                            <Row className="pl-1">
                              <Button
                                outline
                                color="success"
                                onClick={() =>
                                  push({
                                    date: '',
                                    start_time: '',
                                    end_time: '',
                                  })
                                }
                              >
                                <Plus size={16} color="#0cc27e" /> Adicionar dia
                              </Button>
                            </Row>
                          </FormGroup>
                        </>
                      )}
                    />

                    <h4 className="form-section">
                      <i className="fa fa-user" size={20} color="#212529" />{' '}
                      Treinador responsável
                    </h4>
                    <Row className="align-items-center">
                      <Col sm="12" md="12" lg="6" className="mb-2">
                        <FormGroup>
                          <Label for="organizator_name">
                            Nome do treinador
                          </Label>
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
                      <i
                        className="fa fa-address-card"
                        size={20}
                        color="#212529"
                      />{' '}
                      Contato do treinamento
                    </h4>
                    <Row className="align-items-center">
                      <Col sm="12" md="6" lg="4" className="mb-2">
                        <FormGroup>
                          <Label for="contact_name">Nome do contato</Label>
                          <Field
                            type="text"
                            name="contact_name"
                            id="contact_name"
                            className={`
                              form-control
                              ${errors.contact_name &&
                                touched.contact_name &&
                                'is-invalid'}
                            `}
                          />
                          {errors.contact_name && touched.contact_name ? (
                            <div className="invalid-feedback">
                              {errors.contact_name}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col sm="12" md="6" lg="4" className="mb-2">
                        <FormGroup>
                          <Label for="contact_email">Email do contato</Label>
                          <Field
                            type="text"
                            name="contact_email"
                            id="contact_email"
                            className={`
                              form-control
                              ${errors.contact_email &&
                                touched.contact_email &&
                                'is-invalid'}
                            `}
                          />
                          {errors.contact_email && touched.contact_email ? (
                            <div className="invalid-feedback">
                              {errors.contact_email}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col
                        sm="12"
                        md="6"
                        lg="4"
                        xl="4"
                        className="has-icon-left mb-2"
                      >
                        <FormGroup>
                          <Label>Telefone do contato</Label>
                          <div className="position-relative has-icon-left">
                            <Field
                              name="contact_phone"
                              id="contact_phone"
                              className={`
                                    form-control
                                    ${errors.contact_phone &&
                                      touched.contact_phone &&
                                      'is-invalid'}
                                  `}
                              render={({ field }) => (
                                <PhoneFormat
                                  // eslint-disable-next-line react/jsx-props-no-spreading
                                  {...field}
                                  id="contact_phone"
                                  name="contact_phone"
                                  className={`
                                        form-control
                                        ${errors.contact_phone &&
                                          touched.contact_phone &&
                                          'is-invalid'}
                                      `}
                                  value={values.contact_phone}
                                />
                              )}
                            />
                            {errors.contact_phone && touched.contact_phone ? (
                              <div className="invalid-feedback">
                                {errors.contact_phone}
                              </div>
                            ) : null}
                            <div className="form-control-position">
                              <Smartphone size={14} color="#212529" />
                            </div>
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>

                    {values.modality === 'Presencial' && (
                      <>
                        <h4 className="form-section">
                          <MapPin size={20} color="#212529" /> Localização do
                          treinamento
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
                                    className="form-control"
                                  >
                                    <option value="">
                                      Selecione uma opção
                                    </option>

                                    {states.map(state => {
                                      return (
                                        <option key={state.id} value={state.id}>
                                          {state.name}
                                        </option>
                                      );
                                    })}
                                  </Input>
                                  {/* {errors.apiUf && touched.apiUf ? (
                                    <div className="invalid-feedback">
                                      {errors.apiUf}
                                    </div>
                                  ) : null} */}
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
                                    <option value="">
                                      Selecione uma opção
                                    </option>
                                    {cities.map(city => {
                                      return (
                                        <option key={city.id} value={city.id}>
                                          {city.name}
                                        </option>
                                      );
                                    })}
                                  </Input>
                                </FormGroup>
                              </Col>
                            </>
                          )}
                        </Row>
                        {values.country !== '30' && (
                          <Row>
                            <Col lg="8" md="8" sm="12">
                              <FormGroup>
                                <Label for="address_name">
                                  Local do evento
                                </Label>
                                <div className="position-relative">
                                  <Field
                                    type="text"
                                    placeholder="Ex: Igreja do centro da cidade"
                                    id="address_name"
                                    name="address_name"
                                    className={`
                                  form-control
                                  ${errors.address_name &&
                                    touched.address_name &&
                                    'is-invalid'}
                                `}
                                  />
                                  {errors.address_name &&
                                  touched.address_name ? (
                                    <div className="invalid-feedback">
                                      {errors.address_name}
                                    </div>
                                  ) : null}
                                </div>
                              </FormGroup>
                            </Col>
                          </Row>
                        )}

                        {values.country === '30' && (
                          <>
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
                                        handleCep(
                                          val.value,
                                          setFieldValue,
                                          values
                                        );
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
                                      ${errors.city &&
                                        touched.city &&
                                        'is-invalid'}
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
                            <Row>
                              <Col lg="8" md="8" sm="12">
                                <FormGroup>
                                  <Label for="address_name">
                                    Local do evento
                                  </Label>
                                  <div className="position-relative">
                                    <Field
                                      type="text"
                                      placeholder="Ex: Igreja do centro da cidade"
                                      id="address_name"
                                      name="address_name"
                                      className={`
                                        form-control
                                        ${errors.address_name &&
                                          touched.address_name &&
                                          'is-invalid'}
                                      `}
                                    />
                                    {errors.address_name &&
                                    touched.address_name ? (
                                      <div className="invalid-feedback">
                                        {errors.address_name}
                                      </div>
                                    ) : null}
                                  </div>
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="8" md="8" sm="12">
                                <FormGroup>
                                  <Label for="street">Rua</Label>
                                  <div className="position-relative has-icon-left">
                                    <Field
                                      autoComplete="street"
                                      type="text"
                                      placeholder="Ex: Jose Cândido Prisão"
                                      id="street"
                                      name="street"
                                      // className="form-control"
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
                                      id="street_number"
                                      name="street_number"
                                      // className="form-control"
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
                                      id="neighborhood"
                                      name="neighborhood"
                                      // className="form-control"
                                      className={`
                                        form-control
                                        ${errors.neighborhood &&
                                          touched.neighborhood &&
                                          'is-invalid'}
                                      `}
                                    />
                                    {errors.neighborhood &&
                                    touched.neighborhood ? (
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
                                      id="complement"
                                      name="complement"
                                      className="form-control"
                                    />
                                    <div className="form-control-position">
                                      <Edit size={14} color="#212529" />
                                    </div>
                                  </div>
                                </FormGroup>
                              </Col>
                            </Row>
                          </>
                        )}
                      </>
                    )}

                    <h4 className="form-section">
                      <i className="fa fa-home" size={20} color="#212529" />{' '}
                      Contas Bancárias
                    </h4>
                    <Row className="align-items-center">
                      <Col sm="12" md="6" lg="6" className="mb-2">
                        <FormGroup>
                          <Label className="ml-2" for="church">
                            Contas bancárias
                          </Label>
                          <Field
                            type="select"
                            component="select"
                            id="bank_account_id"
                            name="bank_account_id"
                            className={`
                              form-control
                              ${errors &&
                                errors.bank_account_id &&
                                touched &&
                                touched.bank_account_id &&
                                'is-invalid'}
                            `}
                            onChange={event =>
                              handleChangeBankAccount(event, setFieldValue)
                            }
                          >
                            <option value="" defaultValue="" disabled="">
                              Selecione uma opção
                            </option>
                            {bankAccounts.length > 0 &&
                              bankAccounts[0].id !== null &&
                              bankAccounts.map(bankAccount => (
                                <option
                                  key={bankAccount.id}
                                  value={bankAccount.id}
                                >
                                  {bankAccount.bank.name}
                                </option>
                              ))}
                            <option key="other" value="other">
                              Nova conta bancária
                            </option>
                          </Field>
                          {errors.bank_account_id && touched.bank_account_id ? (
                            <div className="invalid-feedback">
                              {errors.bank_account_id}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>

                    {(() => {
                      if (values.bank_account_id !== '') {
                        if (values.bank_account_id === 'other') {
                          return (
                            <>
                              <Row>
                                <Col sm="12" md="12" lg="12" xl="6">
                                  <FormGroup>
                                    <Label for="bank_id">Banco</Label>
                                    <Field
                                      type="select"
                                      component="select"
                                      id="bank_id"
                                      name="bank_id"
                                      className={`
                                        form-control
                                        ${errors &&
                                          errors.bank_id &&
                                          touched &&
                                          touched.bank_id &&
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
                                      {bankData.length > 0 &&
                                        bankData.map(bank => {
                                          return (
                                            <option
                                              key={bank.id}
                                              value={bank.id}
                                            >
                                              {bank.id} - {bank.name}
                                            </option>
                                          );
                                        })}
                                    </Field>
                                    {errors &&
                                    errors.bank_id &&
                                    touched &&
                                    touched.bank_id ? (
                                      <div className="invalid-feedback">
                                        {errors.bank_id}
                                      </div>
                                    ) : null}
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col sm="12" md="12" lg="12" xl="4">
                                  <FormGroup>
                                    <Label for="agency">Agência</Label>
                                    <Field
                                      type="text"
                                      id="agency"
                                      name="agency"
                                      className={`
                                        form-control
                                        ${errors &&
                                          errors.agency &&
                                          touched &&
                                          touched.agency &&
                                          'is-invalid'}
                                      `}
                                    />
                                    {errors &&
                                    errors.agency &&
                                    touched &&
                                    touched.agency ? (
                                      <div className="invalid-feedback">
                                        {errors.agency}
                                      </div>
                                    ) : null}
                                  </FormGroup>
                                </Col>
                                <Col sm="12" md="12" lg="12" xl="8">
                                  <FormGroup>
                                    <Label for="account_number">Conta</Label>
                                    <Field
                                      type="text"
                                      id="account_number"
                                      name="account_number"
                                      className={`
                                        form-control
                                        ${errors &&
                                          errors.account_number &&
                                          touched &&
                                          touched.account_number &&
                                          'is-invalid'}
                                      `}
                                    />
                                    {errors &&
                                    errors.account_number &&
                                    touched &&
                                    touched.account_number ? (
                                      <div className="invalid-feedback">
                                        {errors.account_number}
                                      </div>
                                    ) : null}
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col sm="12" md="12" lg="12" xl="12">
                                  <FormGroup>
                                    <Label for="favored">Titular</Label>
                                    <Field
                                      type="text"
                                      id="favored"
                                      name="favored"
                                      className={`
                                        form-control
                                        ${errors &&
                                          errors.favored &&
                                          touched &&
                                          touched.favored &&
                                          'is-invalid'}
                                      `}
                                    />
                                    {errors &&
                                    errors.favored &&
                                    touched &&
                                    touched.favored ? (
                                      <div className="invalid-feedback">
                                        {errors.favored}
                                      </div>
                                    ) : null}
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col sm="12" md="12" lg="12" xl="6">
                                  <FormGroup>
                                    <Label for="account_type">
                                      Tipo de conta
                                    </Label>
                                    <Field
                                      type="select"
                                      component="select"
                                      id="account_type"
                                      name="account_type"
                                      className={`
                                        form-control
                                        ${errors &&
                                          errors.account_type &&
                                          touched &&
                                          touched.account_type &&
                                          'is-invalid'}
                                      `}
                                      onChange={handleChange}
                                    >
                                      <option value="" disabled="">
                                        Selecione uma opção
                                      </option>
                                      <option
                                        key="transaction"
                                        value="transaction"
                                      >
                                        Conta corrente
                                      </option>
                                      <option key="saving" value="saving">
                                        Conta poupança
                                      </option>
                                    </Field>
                                    {errors &&
                                    errors.account_type &&
                                    touched &&
                                    touched.account_type ? (
                                      <div className="invalid-feedback">
                                        {errors.account_type}
                                      </div>
                                    ) : null}
                                  </FormGroup>
                                </Col>
                                <Col sm="12" md="12" lg="12" xl="6">
                                  <FormGroup>
                                    <Label for="favored_type">
                                      Tipo de pessoa
                                    </Label>
                                    <Field
                                      type="select"
                                      component="select"
                                      id="favored_type"
                                      name="favored_type"
                                      className={`
                                        form-control
                                        ${errors &&
                                          errors.favored_type &&
                                          touched &&
                                          touched.favored_type &&
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
                                      <option key="pf" value="pf">
                                        Física
                                      </option>
                                      <option key="pj" value="pj">
                                        Jurídica
                                      </option>
                                    </Field>
                                    {errors &&
                                    errors.favored_type &&
                                    touched &&
                                    touched.favored_type ? (
                                      <div className="invalid-feedback">
                                        {errors.favored_type}
                                      </div>
                                    ) : null}
                                  </FormGroup>
                                </Col>
                              </Row>
                              {values.favored_type === 'pf' && (
                                <Row>
                                  <Col sm="12" md="12" lg="12" xl="12">
                                    <FormGroup>
                                      <Label for="cpf_cnpj">CPF</Label>
                                      <Field
                                        id="cpf_cnpj"
                                        name="cpf_cnpj"
                                        className={`
                                          form-control
                                          ${errors &&
                                            errors.cpf_cnpj &&
                                            touched &&
                                            touched.cpf_cnpj &&
                                            'is-invalid'}
                                        `}
                                        validate={validateCPF}
                                        render={({ field }) => (
                                          <CPFFormat
                                            // eslint-disable-next-line react/jsx-props-no-spreading
                                            {...field}
                                            id="cpf_cnpj"
                                            name="cpf_cnpj"
                                            className={`
                                              form-control
                                              ${errors &&
                                                errors.cpf_cnpj &&
                                                touched &&
                                                touched.cpf_cnpj &&
                                                'is-invalid'}
                                            `}
                                            value={values.cpf_cnpj}
                                          />
                                        )}
                                      />
                                      {errors &&
                                      errors.cpf_cnpj &&
                                      touched &&
                                      touched.cpf_cnpj ? (
                                        <div className="invalid-feedback">
                                          {errors.cpf_cnpj}
                                        </div>
                                      ) : null}
                                    </FormGroup>
                                  </Col>
                                </Row>
                              )}

                              {values.favored_type === 'pj' && (
                                <Row>
                                  <Col sm="12" md="12" lg="12" xl="12">
                                    <FormGroup>
                                      <Label for="cpf_cnpj">CNPJ</Label>
                                      <Field
                                        id="cpf_cnpj"
                                        name="cpf_cnpj"
                                        className={`
                                        form-control
                                          ${errors &&
                                            errors.cpf_cnpj &&
                                            touched &&
                                            touched.cpf_cnpj &&
                                            'is-invalid'}
                                        `}
                                        validate={validateCNPJ}
                                        render={({ field }) => (
                                          <CNPJFormat
                                            // eslint-disable-next-line react/jsx-props-no-spreading
                                            {...field}
                                            id="cpf_cnpj"
                                            name="cpf_cnpj"
                                            className={`
                                              form-control
                                              ${errors &&
                                                errors.cpf_cnpj &&
                                                touched &&
                                                touched.cpf_cnpj &&
                                                'is-invalid'}
                                            `}
                                            value={values.cnpj}
                                          />
                                        )}
                                      />
                                      {errors &&
                                      errors.cpf_cnpj &&
                                      touched &&
                                      touched.cpf_cnpj ? (
                                        <div className="invalid-feedback">
                                          {errors.cpf_cnpj}
                                        </div>
                                      ) : null}
                                    </FormGroup>
                                  </Col>
                                </Row>
                              )}
                            </>
                          );
                        }
                        return (
                          <>
                            <Row>
                              <Col sm="12" md="12" lg="12" xl="4">
                                <FormGroup>
                                  <Label for="agency">Agência</Label>
                                  <Field
                                    type="number"
                                    id="agency"
                                    name="agency"
                                    disabled
                                    className={`
                                      form-control
                                      ${errors &&
                                        errors.agency &&
                                        touched &&
                                        touched.agency &&
                                        'is-invalid'}
                                    `}
                                  />
                                  {errors &&
                                  errors.agency &&
                                  touched &&
                                  touched.agency ? (
                                    <div className="invalid-feedback">
                                      {errors.agency}
                                    </div>
                                  ) : null}
                                </FormGroup>
                              </Col>
                              <Col sm="12" md="12" lg="12" xl="8">
                                <FormGroup>
                                  <Label for="account_number">Conta</Label>
                                  <Field
                                    type="number"
                                    id="account_number"
                                    name="account_number"
                                    disabled
                                    className={`
                                      form-control
                                      ${errors &&
                                        errors.account_number &&
                                        touched &&
                                        touched.account_number &&
                                        'is-invalid'}
                                    `}
                                  />
                                  {errors &&
                                  errors.account_number &&
                                  touched &&
                                  touched.account_number ? (
                                    <div className="invalid-feedback">
                                      {errors.account_number}
                                    </div>
                                  ) : null}
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col sm="12" md="12" lg="12" xl="12">
                                <FormGroup>
                                  <Label for="favored">Favorecido</Label>
                                  <Field
                                    type="text"
                                    id="favored"
                                    name="favored"
                                    disabled
                                    // value={values.cep}
                                    // disabled={values.bank_account_id !== 'other'}
                                    className={`
                                      form-control
                                      ${errors &&
                                        errors.favored &&
                                        touched &&
                                        touched.favored &&
                                        'is-invalid'}
                                    `}
                                  />
                                  {errors &&
                                  errors.favored &&
                                  touched &&
                                  touched.favored ? (
                                    <div className="invalid-feedback">
                                      {errors.favored}
                                    </div>
                                  ) : null}
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col sm="12" md="12" lg="12" xl="6">
                                <FormGroup>
                                  <Label for="account_type">
                                    Tipo de conta
                                  </Label>
                                  <Field
                                    type="select"
                                    component="select"
                                    id="account_type"
                                    name="account_type"
                                    disabled
                                    className={`
                                      form-control
                                      ${errors &&
                                        errors.account_type &&
                                        touched &&
                                        touched.account_type &&
                                        'is-invalid'}
                                    `}
                                    onChange={handleChange}
                                  >
                                    <option value="" disabled="">
                                      Selecione uma opção
                                    </option>
                                    <option
                                      key="transaction"
                                      value="transaction"
                                    >
                                      Conta corrente
                                    </option>
                                    <option key="saving" value="saving">
                                      Conta poupança
                                    </option>
                                  </Field>
                                  {errors &&
                                  errors.account_type &&
                                  touched &&
                                  touched.account_type ? (
                                    <div className="invalid-feedback">
                                      {errors.account_type}
                                    </div>
                                  ) : null}
                                </FormGroup>
                              </Col>
                              <Col sm="12" md="12" lg="12" xl="6">
                                <FormGroup>
                                  <Label for="favored_type">
                                    Tipo de pessoa
                                  </Label>
                                  <Field
                                    type="select"
                                    component="select"
                                    id="favored_type"
                                    name="favored_type"
                                    disabled
                                    className={`
                                      form-control
                                      ${errors &&
                                        errors.favored_type &&
                                        touched &&
                                        touched.favored_type &&
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
                                    <option key="pf" value="pf">
                                      Física
                                    </option>
                                    <option key="pj" value="pj">
                                      Jurídica
                                    </option>
                                  </Field>
                                  {errors &&
                                  errors.favored_type &&
                                  touched &&
                                  touched.favored_type ? (
                                    <div className="invalid-feedback">
                                      {errors.favored_type}
                                    </div>
                                  ) : null}
                                </FormGroup>
                              </Col>
                            </Row>

                            {values.favored_type === 'pf' && (
                              <Row>
                                <Col sm="12" md="12" lg="12" xl="12">
                                  <FormGroup>
                                    <Label for="cpf_cnpj">CPF</Label>
                                    <Field
                                      id="cpf_cnpj"
                                      name="cpf_cnpj"
                                      disabled
                                      className={`
                                          form-control
                                          ${errors &&
                                            errors.cpf_cnpj &&
                                            touched &&
                                            touched.cpf_cnpj &&
                                            'is-invalid'}
                                        `}
                                      validate={validateCPF}
                                      render={({ field }) => (
                                        <CPFFormat
                                          // eslint-disable-next-line react/jsx-props-no-spreading
                                          {...field}
                                          id="cpf_cnpj"
                                          name="cpf_cnpj"
                                          disabled
                                          className={`
                                              form-control
                                              ${errors &&
                                                errors.cpf_cnpj &&
                                                touched &&
                                                touched.cpf_cnpj &&
                                                'is-invalid'}
                                            `}
                                          value={values.cpf_cnpj}
                                        />
                                      )}
                                    />
                                    {errors &&
                                    errors.cpf_cnpj &&
                                    touched &&
                                    touched.cpf_cnpj ? (
                                      <div className="invalid-feedback">
                                        {errors.cpf_cnpj}
                                      </div>
                                    ) : null}
                                  </FormGroup>
                                </Col>
                              </Row>
                            )}

                            {values.favored_type === 'pj' && (
                              <Row>
                                <Col sm="12" md="12" lg="12" xl="12">
                                  <FormGroup>
                                    <Label for="cpf_cnpj">CNPJ</Label>
                                    <Field
                                      id="cpf_cnpj"
                                      name="cpf_cnpj"
                                      disabled
                                      className={`
                                        form-control
                                          ${errors &&
                                            errors.cpf_cnpj &&
                                            touched &&
                                            touched.cpf_cnpj &&
                                            'is-invalid'}
                                        `}
                                      validate={validateCNPJ}
                                      render={({ field }) => (
                                        <CNPJFormat
                                          // eslint-disable-next-line react/jsx-props-no-spreading
                                          {...field}
                                          id="cpf_cnpj"
                                          name="cpf_cnpj"
                                          disabled
                                          className={`
                                              form-control
                                              ${errors &&
                                                errors.cpf_cnpj &&
                                                touched &&
                                                touched.cpf_cnpj &&
                                                'is-invalid'}
                                            `}
                                          value={values.cnpj}
                                        />
                                      )}
                                    />
                                    {errors &&
                                    errors.cpf_cnpj &&
                                    touched &&
                                    touched.cpf_cnpj ? (
                                      <div className="invalid-feedback">
                                        {errors.cpf_cnpj}
                                      </div>
                                    ) : null}
                                  </FormGroup>
                                </Col>
                              </Row>
                            )}
                          </>
                        );
                      }
                      return '';
                    })()}

                    <div className="form-actions right">
                      <FormGroup>
                        {event_loading ? (
                          <Button disabled color="secondary">
                            <BounceLoader size={23} color="#fff" />
                          </Button>
                        ) : (
                          <Button
                            type="submit"
                            color="success"
                            className="btn-default btn-raised"
                            // disabled={scheduleState[0].date === ''}
                          >
                            Criar treinamento
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

        {/* MODAL ADICIONAR PLANO DE PAGAMENTO */}
        {/* <Modal
          isOpen={modalPaymentPlan}
          toggle={toggleCloseModalPaymentPlan}
          className={className}
          size="lg"
        >
          <ModalHeader toggle={toggleCloseModalPaymentPlan}>
            Adicionar plano de pagamento
          </ModalHeader>
          <Formik
            enableReinitialize
            initialValues={{
              title: '',
              description: '',
              plan_type: '',
              amount: 0,
            }}
            validationSchema={formAddPaymentPlan}
            onSubmit={values => handleAddPaymantPlan(values)}
          >
            {({ errors, touched, setFieldValue, handleChange }) => (
              <Form>
                <ModalBody>
                  <Row>
                    <Col sm="12" md="12" lg="12" className="mb-2">
                      <Label for="title">Título</Label>
                      <Field
                        type="text"
                        id="title"
                        name="title"
                        className={`
                          form-control
                          ${errors.title && touched.title && 'is-invalid'}
                        `}
                      />
                      {errors.title && touched.title ? (
                        <div className="invalid-feedback">{errors.title}</div>
                      ) : null}
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6" md="12" lg="12" className="mb-2">
                      <Label for="description">Descrição</Label>
                      <Field
                        component="textarea"
                        type="textarea"
                        id="description"
                        name="description"
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
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="12" md="12" lg="6" className="mb-2">
                      <Label for="plan_type">Tipo de plano</Label>
                      <Field
                        type="select"
                        component="select"
                        id="plan_type"
                        name="plan_type"
                        onChange={handleChange}
                        className={`
                              form-control
                              ${errors.plan_type &&
                                touched.plan_type &&
                                'is-invalid'}
                            `}
                      >
                        <option value="" defaultValue="" disabled="">
                          Selecione uma opção
                        </option>
                        <option value="individual">Individual</option>
                        <option value="couple">Casal</option>
                      </Field>
                      {errors.plan_type && touched.plan_type ? (
                        <div className="invalid-feedback">
                          {errors.plan_type}
                        </div>
                      ) : null}
                    </Col>
                    <Col sm="12" md="12" lg="6" className="mb-2">
                      <Label for="amount">Valor</Label>
                      <CurrencyFormat
                        id="amount"
                        className="form-control"
                        defaultValue={0}
                        onValueChange={val =>
                          setFieldValue('amount', val.floatValue)
                        }
                      />
                    </Col>
                  </Row>
                </ModalBody>
                <ModalFooter>
                  <Button
                    className="ml-1 my-1"
                    color="warning"
                    onClick={toggleCloseModalPaymentPlan}
                  >
                    Voltar
                  </Button>{' '}
                  <Button color="success" type="submit">
                    Adicionar plano
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </Modal> */}

        {/* MODAL EDITAR PLANO DE PAGAMENTO */}
        {/* <Modal
          isOpen={modalEditPaymentPlan}
          toggle={toggleModalEditPaymentPlan}
          className={className}
          size="lg"
        >
          <ModalHeader toggle={toggleModalEditPaymentPlan}>
            Editar plano de pagamento
          </ModalHeader>
          <Formik
            enableReinitialize
            initialValues={{
              title: editPaymentPlan ? editPaymentPlan.title : '',
              description: editPaymentPlan ? editPaymentPlan.description : '',
              plan_type: editPaymentPlan ? editPaymentPlan.plan_type : '',
              amount: editPaymentPlan ? editPaymentPlan.amount : 0,
            }}
            validationSchema={formAddPaymentPlan}
            onSubmit={values => handleEditPaymantPlan(values)}
          >
            {({ errors, touched, setFieldValue, handleChange }) => (
              <Form>
                <ModalBody>
                  <Row>
                    <Col sm="12" md="12" lg="12" className="mb-2">
                      <Label for="title">Título</Label>
                      <Field
                        type="text"
                        id="title"
                        name="title"
                        className={`
                          form-control
                          ${errors.title && touched.title && 'is-invalid'}
                        `}
                      />
                      {errors.title && touched.title ? (
                        <div className="invalid-feedback">{errors.title}</div>
                      ) : null}
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6" md="12" lg="12" className="mb-2">
                      <Label for="description">Descrição</Label>
                      <Field
                        component="textarea"
                        type="textarea"
                        id="description"
                        name="description"
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
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="12" md="12" lg="6" className="mb-2">
                      <Label for="plan_type">Tipo de plano</Label>
                      <Field
                        type="select"
                        component="select"
                        id="plan_type"
                        name="plan_type"
                        onChange={handleChange}
                        className={`
                              form-control
                              ${errors.plan_type &&
                                touched.plan_type &&
                                'is-invalid'}
                            `}
                      >
                        <option value="" defaultValue="" disabled="">
                          Selecione uma opção
                        </option>
                        <option value="individual">Individual</option>
                        <option value="couple">Casal</option>
                      </Field>
                      {errors.plan_type && touched.plan_type ? (
                        <div className="invalid-feedback">
                          {errors.plan_type}
                        </div>
                      ) : null}
                    </Col>
                    <Col sm="12" md="12" lg="6" className="mb-2">
                      <Label for="amount">Valor</Label>
                      <CurrencyFormat
                        id="amount"
                        name="amount"
                        defaultValue={editPaymentPlan.amount}
                        className="form-control"
                        onValueChange={val =>
                          setFieldValue('amount', val.floatValue)
                        }
                      />
                    </Col>
                  </Row>
                </ModalBody>
                <ModalFooter>
                  <Button
                    className="ml-1 my-1"
                    color="warning"
                    onClick={toggleModalEditPaymentPlan}
                  >
                    Voltar
                  </Button>{' '}
                  <Button color="success" type="submit">
                    Editar plano
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </Modal> */}
      </>
    )
  );
}
