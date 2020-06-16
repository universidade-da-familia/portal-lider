/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import Avatar from 'react-avatar';
import {
  Map,
  Flag,
  Clock,
  User,
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
  Users,
  Eye,
  EyeOff,
  Search,
  Globe,
} from 'react-feather';
import { Datepicker } from 'react-formik-ui';
import { FaChurch } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from 'reactstrap';

// eslint-disable-next-line import/no-extraneous-dependencies
import { css } from '@emotion/core';
import classnames from 'classnames';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Formik, Field, Form, FieldArray, getIn } from 'formik';
import * as Yup from 'yup';

import UFsAndCities from '~/assets/data/statesCities';
import CepFormat from '~/components/fields/CepFormat';
import CNPJFormat from '~/components/fields/CNPJFormat';
import CPFFormat from '~/components/fields/CPFFormat';
import PhoneFormat from '~/components/fields/PhoneFormat';
// import CustomTabs from '~/components/tabs/default';
import { validateCNPJ } from '~/services/validateCNPJ';
import { validateCPF } from '~/services/validateCPF';
import { Creators as AddressActions } from '~/store/ducks/address';
import { Creators as AvatarActions } from '~/store/ducks/avatar';
import { Creators as BankActions } from '~/store/ducks/bank';
import { Creators as BankAccountActions } from '~/store/ducks/bankAccount';
import { Creators as CepActions } from '~/store/ducks/cep';
import { Creators as ChurchActions } from '~/store/ducks/church';
import { Creators as LogActions } from '~/store/ducks/log';
import { Creators as ProfileActions } from '~/store/ducks/profile';

import ChurchsTable from './churchsTable';
import HistoryTable from './historyTable';
import RelationshipTable from './relationshipTable';

// import TableExtended from './table';

const fileSchema = Yup.object().shape({
  file: Yup.mixed(),
});

const formSchema = Yup.object().shape({
  name: Yup.string()
    .required('O nome é obrigatório')
    .matches(/(\w.+\s).+/i, 'Nome e sobrenome obrigatório')
    .max(35, 'Nome muito grande (máximo 35 caracteres)'),
  email: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      'Digite um email válido'
    )
    .required('O email é obrigatório'),
  personalState: Yup.string().required('O estado civil é obrigatório'),
  sex: Yup.string().required('O sexo é obrigatório'),
  phone: Yup.string().required('O telefone é obrigatório'),
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
      complement: Yup.string().max(60, 'Máximo de 60 caracteres'),
    })
  ),
});

const bankAccountsSchema = Yup.object().shape({
  bankAccounts: Yup.array().of(
    Yup.object().shape({
      bank_id: Yup.string().required('Banco é obrigatório.'),
      agency: Yup.string().required('A agência é obrigatório.'),
      account_number: Yup.string().required('Número da conta é obrigatório.'),
      favored: Yup.string().required('Favorecido é obrigatória.'),
      account_type: Yup.string().required('Tipo de conta é obrigatório.'),
      favored_type: Yup.string().required('Tipo de pessoa é obrigatório.'),
      cpf_cnpj: Yup.string().required('Este campo é obrigatório.'),
    })
  ),
});

const formChurchSchema = Yup.object().shape({
  uf: Yup.string().required('O estado é obrigatório.'),
  city: Yup.string().required('A cidade é obrigatória.'),
});

export default function TabsBorderBottom() {
  const userId = localStorage.getItem('@dashboard/user');
  const [activeTab, setActiveTab] = useState('1');
  const [src, setSrc] = useState(null);
  const [firstAndLastName, setFirstAndLastName] = useState(null);
  const [modalLogs, setModalLogs] = useState(false);
  const [modalChurch, setModalChurch] = useState(false);
  const [modalChurchData, setModalChurchData] = useState({
    uf: '',
    city: '',
    name: '',
  });
  const [selectedChurch, setSelectedChurch] = useState({
    id: null,
    corporate_name: '',
  });
  const [addresses, setAddresses] = useState([
    {
      id: null,
      entity_id: parseInt(userId, 10),
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
  const [loadCep, setLoadCep] = useState(false);
  const [socialNetwork, setSocialNetwork] = useState({
    facebook: '',
    instagram: '',
    linkedin: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [allEvents, setAllEvents] = useState([]);

  const dispatch = useDispatch();

  const loading = useSelector(state => state.profile.loading);
  const addressLoading = useSelector(state => state.address.loading);
  const bankAccountLoading = useSelector(state => state.bankAccount.loading);
  const data = useSelector(state => state.profile.data);
  const bankData = useSelector(state => state.bank.allData);
  const cepData = useSelector(state => state.cep.data);
  const cepLoading = useSelector(state => state.cep.loading);
  const churchs = useSelector(state => state.church.data);
  const loadingChurchs = useSelector(state => state.church.loading);
  const logs_data = useSelector(state => state.log.data);

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
      localStorage.setItem('@dashboard/profileActiveTab', tab);
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

  function toggleModalLogs() {
    setModalLogs(!modalLogs);
  }

  function toggleModalChurch() {
    setModalChurch(!modalChurch);
    setModalChurchData({
      uf: '',
      city: '',
      name: '',
    });
  }

  function handleSearchChurchs(values) {
    dispatch(ChurchActions.churchRequest(values));
  }

  function handleCep(cep, setFieldValue, values, index) {
    setFieldValue(`addresses.${index}.cep`, cep);

    if (loadCep && cep.length === 8) {
      setAddresses(values.addresses);

      dispatch(CepActions.cepRequest(cep, index));
    }
  }

  function handleUpdateProfile(values) {
    const formattedCpf = values.cpf
      .replace('.', '')
      .replace('.', '')
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
      name: values.name,
      personal_state_id: values.personalState,
      birthday: values.birthday,
      sex: values.sex,
      phone: formattedPhone,
      alt_phone: formattedAltPhone,
      organization_id: selectedChurch.id || values.churchId,
    };

    if (values.email !== data.email) {
      toSend.email = values.email;
    }
    if (formattedCpf !== data.cpf) {
      toSend.cpf = formattedCpf;
    }

    dispatch(ProfileActions.editProfileRequest(toSend));
  }

  // function handleUpdateMinisteries(values) {
  //   Object.keys(values).forEach(
  //     ministery => values[ministery] === '' && delete values[ministery]
  //   );

  //   dispatch(ProfileActions.editProfileRequest(values));
  // }

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

    const user_type = 'entity';

    dispatch(
      AddressActions.addressRequest(
        data.netsuite_id,
        user_type,
        addressesPost,
        addressesPut
      )
    );
  }

  function handleUpdateBankAccounts(values) {
    let bankAccountsToUpdate = values.bankAccounts;

    bankAccountsToUpdate.map(bank => {
      if (bank.favored_type === 'pf') {
        bank.cpf_cnpj = bank.cpf_cnpj
          .replace('.', '')
          .replace('.', '')
          .replace('-', '');
      }
      if (bank.favored_type === 'pj') {
        bank.cpf_cnpj = bank.cpf_cnpj
          .replace('.', '')
          .replace('.', '')
          .replace('/', '')
          .replace('-', '');
      }
    });

    const bankAccountsPut = bankAccountsToUpdate.filter(
      bankAccountFind => bankAccountFind.id !== null
    );

    bankAccountsToUpdate = values.bankAccounts;

    const bankAccountsPost = bankAccountsToUpdate.filter(bankAccountFind => {
      if (bankAccountFind.id === null) {
        delete bankAccountFind.id;

        return bankAccountFind;
      }
    });

    const user_type = 'entity';

    dispatch(
      BankAccountActions.bankAccountRequest(
        data.netsuite_id,
        user_type,
        bankAccountsPost,
        bankAccountsPut
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

  function handleDeleteBankAccount(id, remove, index) {
    toastr.confirm('Deseja realmente remover essa conta bancária?', {
      onOk: () => {
        dispatch(BankAccountActions.deleteBankAccountRequest(id));
        remove(index);
      },
      onCancel: () => {},
    });
  }

  function handleUpdateSocialNetwork(values) {
    const toSend = {
      facebook: values.facebook,
      instagram: values.instagram,
      linkedin: values.linkedin,
    };

    dispatch(ProfileActions.editProfileRequest(toSend));
  }

  function handleUpdatePassword(values) {
    const user_type = 'entity';

    const toSend = {
      user_type,
      password: values.password,
      newPassword: values.newPassword,
    };

    dispatch(ProfileActions.passwordProfileRequest(toSend));
  }

  function handleLoadLogs(event) {
    event.preventDefault();

    toggleModalLogs();

    dispatch(
      LogActions.logsRequest(['entity', 'address', 'relatioship'], data.id)
    );
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

    if (data.bankAccounts && data.bankAccounts.length > 0) {
      setBankAccounts(data.bankAccounts);
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

    if (data.name) {
      const fullname = data.name.split(' ');
      const firstname = fullname[0];
      const lastname = fullname[fullname.length - 1];

      setFirstAndLastName(`${firstname} ${lastname}`);
    }

    if (data.organizators && data.organizators.length > 0) {
      const events = data.organizators.map(event => {
        event.history_type = 'Organizador';
        return event;
      });

      setAllEvents(oldEvents => oldEvents.concat(events));
    }

    if (data.participants && data.participants.length > 0) {
      const events = data.participants.map(event => {
        if (event.pivot.assistant) {
          event.history_type = 'Assistente';
        } else {
          event.history_type = 'Participante';
        }
        return event;
      });

      setAllEvents(oldEvents => oldEvents.concat(events));
    }
  }, [data]);

  useEffect(() => {
    const storageTab = localStorage.getItem('@dashboard/profileActiveTab');

    dispatch(BankActions.bankRequest());

    if (storageTab) {
      setActiveTab(storageTab);
    }
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
                Meus Dados
                <User size={18} color="#212529" />
              </NavLink>
            </NavItem>
            <NavItem className="width-300">
              <NavLink
                className={`
                  ${classnames({
                    active: activeTab === '2',
                  })}
                  d-flex
                  justify-content-between
                  align-items-center
                `}
                onClick={() => {
                  toggle('2');
                }}
              >
                Dados ministeriais
                <Flag size={18} color="#212529" />
              </NavLink>
            </NavItem>
            <NavItem className="width-300">
              <NavLink
                className={`
                  ${classnames({
                    active: activeTab === '3',
                  })}
                  d-flex
                  justify-content-between
                  align-items-center
                `}
                onClick={() => {
                  toggle('3');
                }}
              >
                Familiares
                <Users size={18} color="#212529" />
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
                Histórico
                <Clock size={18} color="#212529" />
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
                Redes Sociais
                <Share2 size={18} color="#212529" />
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
                Segurança
                <Lock size={18} color="#212529" />
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
                Contas bancárias
                <Share2 size={18} color="#212529" />
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
                Meus Dados
                <User size={18} color="#212529" />
              </NavLink>
            </NavItem>
            <NavItem className="width-200">
              <NavLink
                className={`
                  ${classnames({
                    active: activeTab === '2',
                  })}
                  d-flex
                  justify-content-between
                  align-items-center
                `}
                onClick={() => {
                  toggle('2');
                }}
              >
                Dados Ministeriais
                <Flag size={18} color="#212529" />
              </NavLink>
            </NavItem>
            <NavItem className="width-200">
              <NavLink
                className={`
                  ${classnames({
                    active: activeTab === '3',
                  })}
                  d-flex
                  justify-content-between
                  align-items-center
                `}
                onClick={() => {
                  toggle('3');
                }}
              >
                Familiares
                <Users size={18} color="#212529" />
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
                Histórico
                <Clock size={18} color="#212529" />
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
                Redes Sociais
                <Share2 size={18} color="#212529" />
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
                Segurança
                <Lock size={18} color="#212529" />
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
                Contas bancárias
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
                  name: data.name ? data.name : '',
                  email: data.email ? data.email : '',
                  personalState: data.personal_state_id
                    ? data.personal_state_id
                    : '',
                  cpf: data.cpf ? data.cpf : '',
                  birthday: data.birthday ? data.birthday : new Date(),
                  sex: data.sex ? data.sex : '',
                  phone: data.phone ? data.phone : '',
                  altPhone: data.alt_phone ? data.alt_phone : '',
                  churchName: data.church ? data.church.corporate_name : '',
                  churchId: data.church ? data.church.id : '',
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
                      {/* Nome e sobrenome */}
                      <Row className="mt-3">
                        <Col
                          sm="12"
                          md="12"
                          lg="12"
                          xl="5"
                          className="has-icon-left"
                        >
                          <Label>Nome</Label>
                          <div className="position-relative has-icon-left">
                            <Field
                              type="text"
                              name="name"
                              id="name"
                              className={`
                                      form-control
                                      ${errors.name &&
                                        touched.name &&
                                        'is-invalid'}
                                    `}
                              autoComplete="off"
                            />
                            {errors.name && touched.name ? (
                              <div className="invalid-feedback">
                                {errors.name}
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
                        <Col sm="12" md="6" lg="12" xl="3">
                          <Label>Estado civil</Label>
                          <Field
                            type="select"
                            component="select"
                            name="personalState"
                            id="personalState"
                            className={`
                                    form-control
                                    ${errors.personalState &&
                                      touched.personalState &&
                                      'is-invalid'}
                                  `}
                          >
                            <option value="" disabled="">
                              Selecione uma opção
                            </option>
                            <option value="3">Solteiro(a)</option>
                            <option value="1">Casado(a)</option>
                            <option value="5">Viúvo(a)</option>
                            <option value="2">Divorciado(a)</option>
                            <option value="4">Segundo casamento</option>
                          </Field>
                          {errors.personalState && touched.personalState ? (
                            <div className="invalid-feedback">
                              {errors.personalState}
                            </div>
                          ) : null}
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup className="mb-0">
                      {/* CPF e Nascimento e genero */}
                      <Row>
                        <Col
                          sm="12"
                          md="12"
                          lg="12"
                          xl="4"
                          className="has-icon-left"
                        >
                          <FormGroup>
                            <Label for="cpf">CPF</Label>
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
                          </FormGroup>
                        </Col>
                        <Col sm="12" md="6" lg="6" xl="4">
                          <FormGroup>
                            <Label for="birthday">Nascimento</Label>
                            <div className="position-relative has-icon-left">
                              <Datepicker
                                name="birthday"
                                id="birthday"
                                locale={pt}
                                selected={values.birthday}
                                onChange={date =>
                                  setFieldValue('birthday', date)
                                }
                                customInput={<DatepickerButton />}
                                isClearable
                                withPortal
                                fixedHeight
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                className={`
                                  form-control
                                  ${errors.birthday &&
                                    touched.birthday &&
                                    'is-invalid'}
                                `}
                              />
                              {errors.birthday && touched.birthday ? (
                                <div className="invalid-feedback">
                                  {errors.birthday}
                                </div>
                              ) : null}
                              <div className="form-control-position">
                                <Calendar size={14} color="#212529" />
                              </div>
                            </div>
                          </FormGroup>
                        </Col>
                        <Col sm="12" md="6" lg="6" xl="4">
                          <Label>Sexo</Label>
                          <Field
                            type="select"
                            component="select"
                            name="sex"
                            id="sex"
                            className={`
                                      form-control
                                      ${errors.sex &&
                                        touched.sex &&
                                        'is-invalid'}
                                    `}
                          >
                            <option value="" disabled="">
                              Selecione uma opção
                            </option>
                            <option value="M">Masculino</option>
                            <option value="F">Feminino</option>
                          </Field>
                          {errors.sex && touched.sex ? (
                            <div className="invalid-feedback">{errors.sex}</div>
                          ) : null}
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup>
                      {/* Celular e telefone */}
                      <Row>
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
                              className={`
                                    form-control
                                    ${errors.phone &&
                                      touched.phone &&
                                      'is-invalid'}
                                  `}
                              render={({ field }) => (
                                <PhoneFormat
                                  // eslint-disable-next-line react/jsx-props-no-spreading
                                  {...field}
                                  id="phone"
                                  name="phone"
                                  className={`
                                        form-control
                                        ${errors.phone &&
                                          touched.phone &&
                                          'is-invalid'}
                                      `}
                                  value={values.phone}
                                />
                              )}
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
                        <Col sm="12" md="6" lg="12" xl="4">
                          <Label>Tel. Alternativo</Label>
                          <div className="position-relative has-icon-left">
                            <Field
                              name="altPhone"
                              id="altPhone"
                              className={`
                                    form-control
                                    ${errors.altPhone &&
                                      touched.altPhone &&
                                      'is-invalid'}
                                  `}
                              render={({ field }) => (
                                <PhoneFormat
                                  // eslint-disable-next-line react/jsx-props-no-spreading
                                  {...field}
                                  id="altPhone"
                                  name="altPhone"
                                  className={`
                                        form-control
                                        ${errors.altPhone &&
                                          touched.altPhone &&
                                          'is-invalid'}
                                      `}
                                  value={values.altPhone}
                                />
                              )}
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
                      {/* Igreja */}
                      <Row>
                        <Col
                          sm="12"
                          md="12"
                          lg="12"
                          xl="12"
                          className="has-icon-left"
                        >
                          <Label for="churchName">Igreja</Label>
                          <div className="position-relative has-icon-left">
                            <InputGroup>
                              <Field
                                name="churchName"
                                id="churchName"
                                className="form-control"
                                disabled
                                value={
                                  selectedChurch.corporate_name ||
                                  values.churchName
                                }
                              />
                              <div className="form-control-position">
                                <FaChurch size={18} color="#212529" />
                              </div>
                              <InputGroupAddon addonType="append">
                                <NavLink
                                  className="btn bg-info"
                                  onClick={toggleModalChurch}
                                >
                                  <Search size={18} color="#fff" />
                                </NavLink>
                              </InputGroupAddon>
                            </InputGroup>
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup>
                      <Button
                        color="info"
                        outline
                        className="btn-raised mr-2"
                        onClick={event => handleLoadLogs(event)}
                      >
                        <Eye size={23} className="mr-2" />
                        Verificar logs
                      </Button>
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

        {/* ---------------ABA DE DADOS MINISTERIAIS--------------- */}
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <Formik
                enableReinitialize
                initialValues={{
                  cmn_hierarchy_id: data.cmn_hierarchy_id
                    ? data.cmn_hierarchy_id
                    : '',
                  mu_hierarchy_id: data.mu_hierarchy_id
                    ? data.mu_hierarchy_id
                    : '',
                  crown_hierarchy_id: data.crown_hierarchy_id
                    ? data.crown_hierarchy_id
                    : '',
                  mp_hierarchy_id: data.mp_hierarchy_id
                    ? data.mp_hierarchy_id
                    : '',
                  ffi_hierarchy_id: data.ffi_hierarchy_id
                    ? data.ffi_hierarchy_id
                    : '',
                  gfi_hierarchy_id: data.gfi_hierarchy_id
                    ? data.gfi_hierarchy_id
                    : '',
                  pg_hab_hierarchy_id: data.pg_hab_hierarchy_id
                    ? data.pg_hab_hierarchy_id
                    : '',
                  pg_yes_hierarchy_id: data.pg_yes_hierarchy_id
                    ? data.pg_yes_hierarchy_id
                    : '',
                }}
                // validationSchema={formSchema}
                // onSubmit={values => handleUpdateMinisteries(values)}
              >
                {(/* { errors, touched, setFieldValue, values } */) => (
                  <Form>
                    <FormGroup>
                      {/* CMN e MU */}
                      <Row>
                        <Col sm="12" md="6" lg="6" xl="6">
                          <Label>CMN - Hombridade</Label>
                          <Field
                            type="select"
                            component="select"
                            name="cmn_hierarchy_id"
                            id="cmn_hierarchy_id"
                            className="form-control"
                            disabled
                          >
                            <option value={0}>Selecione uma opção</option>
                            <option value={1}>Participante</option>
                            <option value={2}>Líder em treinamento</option>
                            <option value={3}>Facilitador</option>
                            <option value={4}>Líder</option>
                            <option value={5}>Treinador</option>
                            <option value={6}>Coordenador</option>
                            <option value={7}>Funcionário</option>
                          </Field>
                        </Col>
                        <Col sm="12" md="6" lg="6" xl="6">
                          <Label>CMN - Mulher Única</Label>
                          <Field
                            type="select"
                            component="select"
                            name="mu_hierarchy_id"
                            id="mu_hierarchy_id"
                            className="form-control"
                            disabled
                          >
                            <option value={0}>Selecione uma opção</option>
                            <option value={1}>Participante</option>
                            <option value={2}>Líder em treinamento</option>
                            <option value={3}>Facilitador</option>
                            <option value={4}>Líder</option>
                            <option value={5}>Treinador</option>
                            <option value={6}>Coordenador</option>
                            <option value={7}>Funcionário</option>
                          </Field>
                        </Col>
                      </Row>

                      {/* CROWN e MP */}
                      <Row className="mt-3">
                        <Col sm="12" md="6" lg="6" xl="6">
                          <Label>Crown Finanças</Label>
                          <Field
                            type="select"
                            component="select"
                            name="crown_hierarchy_id"
                            id="crown_hierarchy_id"
                            className="form-control"
                            disabled
                          >
                            <option value={0}>Selecione uma opção</option>
                            <option value={1}>Participante</option>
                            <option value={2}>Líder em treinamento</option>
                            <option value={3}>Facilitador</option>
                            <option value={4}>Líder</option>
                            <option value={5}>Treinador</option>
                            <option value={6}>Coordenador</option>
                            <option value={7}>Funcionário</option>
                          </Field>
                        </Col>
                        <Col sm="12" md="6" lg="6" xl="6">
                          <Label>A Mulher que prospera</Label>
                          <Field
                            type="select"
                            component="select"
                            name="mp_hierarchy_id"
                            id="mp_hierarchy_id"
                            className="form-control"
                            disabled
                          >
                            <option value={0}>Selecione uma opção</option>
                            <option value={1}>Participante</option>
                            <option value={2}>Líder em treinamento</option>
                            <option value={3}>Facilitador</option>
                            <option value={4}>Líder</option>
                            <option value={5}>Treinador</option>
                            <option value={6}>Coordenador</option>
                            <option value={7}>Funcionário</option>
                          </Field>
                        </Col>
                      </Row>

                      {/* FFI e GFI */}
                      <Row className="mt-3">
                        <Col sm="12" md="6" lg="6" xl="6">
                          <Label>FFI</Label>
                          <Field
                            type="select"
                            component="select"
                            name="ffi_hierarchy_id"
                            id="ffi_hierarchy_id"
                            className="form-control"
                            disabled
                          >
                            <option value={0}>Selecione uma opção</option>
                            <option value={1}>Participante</option>
                            <option value={2}>Líder em treinamento</option>
                            <option value={3}>Facilitador</option>
                            <option value={4}>Líder</option>
                            <option value={5}>Treinador</option>
                            <option value={6}>Coordenador</option>
                            <option value={7}>Funcionário</option>
                          </Field>
                        </Col>
                        <Col sm="12" md="6" lg="6" xl="6">
                          <Label>GFI</Label>
                          <Field
                            type="select"
                            component="select"
                            name="gfi_hierarchy_id"
                            id="gfi_hierarchy_id"
                            className="form-control"
                            disabled
                          >
                            <option value={0}>Selecione uma opção</option>
                            <option value={1}>Participante</option>
                            <option value={2}>Líder em treinamento</option>
                            <option value={3}>Facilitador</option>
                            <option value={4}>Líder</option>
                            <option value={5}>Treinador</option>
                            <option value={6}>Coordenador</option>
                            <option value={7}>Funcionário</option>
                          </Field>
                        </Col>
                      </Row>

                      {/* HAB e YES */}
                      <Row className="mt-3">
                        <Col sm="12" md="6" lg="6" xl="6">
                          <Label>PG - Habitudes</Label>
                          <Field
                            type="select"
                            component="select"
                            name="pg_hab_hierarchy_id"
                            id="pg_hab_hierarchy_id"
                            className="form-control"
                            disabled
                          >
                            <option value={0}>Selecione uma opção</option>
                            <option value={1}>Participante</option>
                            <option value={2}>Líder em treinamento</option>
                            <option value={3}>Facilitador</option>
                            <option value={4}>Líder</option>
                            <option value={5}>Treinador</option>
                            <option value={6}>Coordenador</option>
                            <option value={7}>Funcionário</option>
                          </Field>
                        </Col>
                        <Col sm="12" md="6" lg="6" xl="6">
                          <Label>PG - Yes!</Label>
                          <Field
                            type="select"
                            component="select"
                            name="pg_yes_hierarchy_id"
                            id="pg_yes_hierarchy_id"
                            className="form-control"
                            disabled
                          >
                            <option value={0}>Selecione uma opção</option>
                            <option value={1}>Participante</option>
                            <option value={2}>Líder em treinamento</option>
                            <option value={3}>Facilitador</option>
                            <option value={4}>Líder</option>
                            <option value={5}>Treinador</option>
                            <option value={6}>Coordenador</option>
                            <option value={7}>Funcionário</option>
                          </Field>
                        </Col>
                      </Row>
                    </FormGroup>
                    {/* <FormGroup className="mt-3">
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
                          disabled
                        >
                          Atualizar hierarquias
                        </Button>
                      )}
                    </FormGroup> */}
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </TabPane>

        {/* ---------------- ABA DE FAMILIARES ----------------- */}
        <TabPane tabId="3">
          <RelationshipTable relationships={data.relationships} />
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
                                entity_id: parseInt(userId, 10),
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

        {/* ---------------- ABA DE HISTÓRICO ----------------- */}
        <TabPane tabId="5">
          <HistoryTable events={allEvents} />
        </TabPane>

        {/* ---------------------ABA DE REDES SOCIAIS ------------------------ */}
        <TabPane tabId="6">
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

                {loading ? (
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

        {/* ---------------- ABA DE SEGURANÇA ------------------ */}
        <TabPane tabId="7">
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

                {loading ? (
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

        {/* ---------------- ABA DE CONTAS BANCÁRIAS ----------- */}
        <TabPane tabId="8">
          <Formik
            enableReinitialize
            initialValues={{
              bankAccounts,
            }}
            validationSchema={bankAccountsSchema}
            onSubmit={values => handleUpdateBankAccounts(values)}
          >
            {({ errors, touched, values, handleChange }) => (
              <Form>
                <FieldArray
                  name="bankAccounts"
                  render={({ remove, push }) => (
                    <>
                      {values.bankAccounts.length > 0 &&
                        values.bankAccounts.map((bankAccount, index) => {
                          const bank_id = `bankAccounts[${index}].bank_id`;
                          const errorBank = getIn(errors, bank_id);
                          const touchedBank = getIn(touched, bank_id);

                          const agency = `bankAccounts[${index}].agency`;
                          const account_number = `bankAccounts[${index}].account_number`;

                          const account_type = `bankAccounts[${index}].account_type`;
                          const error_account_type = getIn(
                            errors,
                            account_type
                          );
                          const touched_account_type = getIn(
                            touched,
                            account_type
                          );

                          const favored_type = `bankAccounts[${index}].favored_type`;
                          const error_favored_type = getIn(
                            errors,
                            favored_type
                          );
                          const touched_favored_type = getIn(
                            touched,
                            favored_type
                          );

                          const favored = `bankAccounts[${index}].favored`;

                          const cpf_cnpj = `bankAccounts[${index}].cpf_cnpj`;
                          const errorCpfCnpj = getIn(errors, cpf_cnpj);
                          const touchedCpfCnpj = getIn(touched, cpf_cnpj);

                          return (
                            // eslint-disable-next-line react/no-array-index-key
                            <div key={index}>
                              <Row className="justify-content-between ml-0 mr-0">
                                <h3>Conta bancária {index + 1}</h3>
                                {values.bankAccounts.length > 1 && (
                                  <Button
                                    color="danger"
                                    onClick={() =>
                                      bankAccount.id !== null
                                        ? handleDeleteBankAccount(
                                            bankAccount.id,
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
                                <Col sm="12" md="12" lg="12" xl="6">
                                  <FormGroup>
                                    <Label for={bank_id}>Banco</Label>
                                    <Field
                                      type="select"
                                      component="select"
                                      id={bank_id}
                                      name={bank_id}
                                      className={`
                                              form-control
                                              ${errorBank &&
                                                touchedBank &&
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
                                    {errorBank && touchedBank ? (
                                      <div className="invalid-feedback">
                                        {errorBank}
                                      </div>
                                    ) : null}
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col sm="12" md="12" lg="12" xl="4">
                                  <FormGroup>
                                    <Label for={agency}>Agência</Label>
                                    <Field
                                      type="number"
                                      id={agency}
                                      name={agency}
                                      className="form-control"
                                    />
                                  </FormGroup>
                                </Col>
                                <Col sm="12" md="12" lg="12" xl="8">
                                  <FormGroup>
                                    <Label for={account_number}>Conta</Label>
                                    <Field
                                      type="number"
                                      id={account_number}
                                      name={account_number}
                                      className="form-control"
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col sm="12" md="12" lg="12" xl="12">
                                  <FormGroup>
                                    <Label for={favored}>Favorecido</Label>
                                    <Field
                                      type="text"
                                      id={favored}
                                      name={favored}
                                      className="form-control"
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col sm="12" md="12" lg="12" xl="6">
                                  <FormGroup>
                                    <Label for={account_type}>
                                      Tipo de conta
                                    </Label>
                                    <Field
                                      type="select"
                                      component="select"
                                      id={account_type}
                                      name={account_type}
                                      className={`
                                              form-control
                                              ${error_account_type &&
                                                touched_account_type &&
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
                                    {error_account_type &&
                                    touched_account_type ? (
                                      <div className="invalid-feedback">
                                        {error_account_type}
                                      </div>
                                    ) : null}
                                  </FormGroup>
                                </Col>
                                <Col sm="12" md="12" lg="12" xl="6">
                                  <FormGroup>
                                    <Label for={favored_type}>
                                      Tipo de pessoa
                                    </Label>
                                    <Field
                                      type="select"
                                      component="select"
                                      id={favored_type}
                                      name={favored_type}
                                      className={`
                                              form-control
                                              ${error_favored_type &&
                                                touched_favored_type &&
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
                                    {error_favored_type &&
                                    touched_favored_type ? (
                                      <div className="invalid-feedback">
                                        {error_favored_type}
                                      </div>
                                    ) : null}
                                  </FormGroup>
                                </Col>
                              </Row>
                              {values.bankAccounts[index].favored_type ===
                                'pf' && (
                                <Row>
                                  <Col sm="12" md="12" lg="12" xl="12">
                                    <FormGroup>
                                      <Label for={cpf_cnpj}>CPF</Label>
                                      <Field
                                        id={cpf_cnpj}
                                        name={cpf_cnpj}
                                        className={`
                                              form-control
                                              ${errorCpfCnpj &&
                                                touchedCpfCnpj &&
                                                'is-invalid'}
                                            `}
                                        validate={validateCPF}
                                        render={({ field }) => (
                                          <CPFFormat
                                            // eslint-disable-next-line react/jsx-props-no-spreading
                                            {...field}
                                            id={cpf_cnpj}
                                            name={cpf_cnpj}
                                            className={`
                                              form-control
                                              ${errorCpfCnpj &&
                                                touchedCpfCnpj &&
                                                'is-invalid'}
                                            `}
                                            value={
                                              values.bankAccounts[index]
                                                .cpf_cnpj
                                            }
                                          />
                                        )}
                                      />
                                      {errorCpfCnpj && touchedCpfCnpj ? (
                                        <div className="invalid-feedback">
                                          {errorCpfCnpj}
                                        </div>
                                      ) : null}
                                    </FormGroup>
                                  </Col>
                                </Row>
                              )}

                              {values.bankAccounts[index].favored_type ===
                                'pj' && (
                                <Row>
                                  <Col sm="12" md="12" lg="12" xl="12">
                                    <FormGroup>
                                      <Label for={cpf_cnpj}>CNPJ</Label>
                                      <Field
                                        id={cpf_cnpj}
                                        name={cpf_cnpj}
                                        className={`
                                              form-control
                                              ${errorCpfCnpj &&
                                                touchedCpfCnpj &&
                                                'is-invalid'}
                                            `}
                                        validate={validateCNPJ}
                                        render={({ field }) => (
                                          <CNPJFormat
                                            // eslint-disable-next-line react/jsx-props-no-spreading
                                            {...field}
                                            id={cpf_cnpj}
                                            name={cpf_cnpj}
                                            className={`
                                              form-control
                                              ${errorCpfCnpj &&
                                                touchedCpfCnpj &&
                                                'is-invalid'}
                                            `}
                                            value={values.cnpj}
                                          />
                                        )}
                                      />
                                      {errorCpfCnpj && touchedCpfCnpj ? (
                                        <div className="invalid-feedback">
                                          {errorCpfCnpj}
                                        </div>
                                      ) : null}
                                    </FormGroup>
                                  </Col>
                                </Row>
                              )}

                              <div className="form-actions right" />
                            </div>
                          );
                        })}

                      <FormGroup>
                        <Row className="pl-1">
                          {bankAccountLoading ? (
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
                              Atualizar contas bancárias
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
                                entity_id: parseInt(userId, 10),
                                bank_id: '',
                                agency: '',
                                account_number: '',
                                favored: '',
                                account_type: '',
                                favored_type: '',
                                cpf_cnpj: '',
                              })
                            }
                          >
                            <Plus size={16} color="#0cc27e" /> Adicionar outra
                            conta bancária
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
      </TabContent>

      {/* --------------- MODAL PESQUISAR IGREJA --------------- */}
      <Modal isOpen={modalChurch} toggle={toggleModalChurch} size="lg">
        <ModalHeader toggle={toggleModalChurch}>
          Pesquise por sua igreja
        </ModalHeader>
        <Formik
          enableReinitialize
          initialValues={modalChurchData}
          validationSchema={formChurchSchema}
          onSubmit={values => handleSearchChurchs(values)}
        >
          {({ values, errors, touched }) => (
            <Form>
              <ModalBody>
                <Row>
                  <Col lg="2" md="5" sm="12">
                    <Label>Estado</Label>
                    <Field
                      type="select"
                      component="select"
                      name="uf"
                      id="uf"
                      className={`
                        form-control
                        ${errors.uf && touched.uf && 'is-invalid'}
                      `}
                    >
                      <option value="">Sem f...</option>
                      {UFsAndCities.map(uf => (
                        <option key={uf.sigla} value={uf.sigla}>
                          {uf.sigla}
                        </option>
                      ))}
                    </Field>
                    {errors.uf && touched.uf ? (
                      <div className="invalid-feedback">{errors.uf}</div>
                    ) : null}
                  </Col>
                  <Col lg="4" md="7" sm="12">
                    <Label>Cidade</Label>
                    <Field
                      type="select"
                      component="select"
                      name="city"
                      id="city"
                      className={`
                        form-control
                        ${errors.city && touched.city && 'is-invalid'}
                      `}
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
                    {errors.city && touched.city ? (
                      <div className="invalid-feedback">{errors.city}</div>
                    ) : null}
                  </Col>
                  <Col lg="6" md="12" sm="12">
                    <Label>Nome ou parte do nome</Label>
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      className="form-control"
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    {loadingChurchs ? (
                      <Button color="success" type="submit" block disabled>
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
                      <Button color="success" type="submit" block>
                        <Search size={18} color="#fff" /> Pesquisar
                      </Button>
                    )}
                  </Col>
                </Row>
                {churchs && churchs.length > 0 && (
                  <Row className="mt-3">
                    <Col>
                      <ChurchsTable
                        churchs={churchs}
                        value={value => setSelectedChurch(value)}
                        modalChurch={modalChurch => setModalChurch(modalChurch)}
                      />
                    </Col>
                  </Row>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={toggleModalChurch}>
                  Cancelar busca
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </Modal>

      {/* MODAL VISUALIZAR LOGS */}
      <Modal isOpen={modalLogs} toggle={toggleModalLogs} size="xl">
        <ModalHeader toggle={toggleModalLogs}>Visualização de logs</ModalHeader>
        <ModalBody>
          {logs_data && logs_data.length > 0 && (
            <Table hover bordered>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Criado por</th>
                  <th>Ação</th>
                  <th>Valores</th>
                </tr>
              </thead>
              <tbody>
                {logs_data.map(log => (
                  <tr>
                    <td>
                      {format(new Date(log.created_at), 'dd/MM/yyyy hh:mm:ss', {
                        locale: pt,
                      })}
                    </td>
                    {log.entity.id ? (
                      <td>
                        {log.entity.name
                          .split(' ')
                          .slice(0, 2)
                          .join(' ')}
                      </td>
                    ) : (
                      <td>{log.organization.corportate_name}</td>
                    )}
                    <td>{log.description}</td>
                    <td>{log.new_data || 'Sem valores'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
}
