/* eslint-disable react/no-unescaped-entities */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import {
  ChevronDown,
  CheckSquare,
  Calendar,
  Search,
  X,
  Eye,
  CreditCard,
  RefreshCw,
  Mail,
  Phone,
  ArrowRightCircle,
  Map,
  Navigation,
  Edit,
  Plus,
} from 'react-feather';
import { Datepicker } from 'react-formik-ui';
import { FaChurch } from 'react-icons/fa';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { BounceLoader } from 'react-spinners';
import {
  TabContent,
  TabPane,
  NavLink,
  Row,
  Col,
  Button,
  FormGroup,
  Card,
  CardTitle,
  CardText,
  CardHeader,
  CardBody,
  Label,
  Input,
  Form as ReactForm,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Badge,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';

// eslint-disable-next-line import/no-extraneous-dependencies
import { css } from '@emotion/core';
import { BlobProvider } from '@react-pdf/renderer';
import classnames from 'classnames';
import CountryStateCity from 'country-state-city';
import { format, subMonths } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Formik, Field, Form } from 'formik';
import moment from 'moment';
import randomstring from 'randomstring';
import * as Yup from 'yup';

import history from '~/app/history';
import UFsAndCities from '~/assets/data/statesCities';
import CepFormat from '~/components/fields/CepFormat';
import CPFFormat from '~/components/fields/CPFFormat';
import PhoneFormat from '~/components/fields/PhoneFormat';
import QuantityFormat from '~/components/fields/QuantityFormat';
import { validateCPF } from '~/services/validateCPF';
import { Creators as AddressActions } from '~/store/ducks/address';
import { Creators as CepActions } from '~/store/ducks/cep';
import { Creators as ChurchActions } from '~/store/ducks/church';
import { Creators as EventActions } from '~/store/ducks/event';
import { Creators as InviteActions } from '~/store/ducks/invite';
import { Creators as LogActions } from '~/store/ducks/log';
import { Creators as OrganizatorActions } from '~/store/ducks/organizator';
import { Creators as ParticipantActions } from '~/store/ducks/participant';
import Certificate from '~/views/certificate/index';

import CustomTabs from '../../../../components/tabs/default';
import ChurchsTable from './churchsTable';
import { formatName } from './formatName';
import InvitedTable from './invitedTable';
import ParticipantTable from './participantTable';
import QuitterTable from './quitterTable';

const options = [
  {
    value: 'leader',
    label: 'Líder',
  },
  {
    value: 'training_leader',
    label: 'Líder em Treinamento',
  },
];

const formDetails = Yup.object().shape({
  church: Yup.string().required('O sobrenome é obrigatório'),
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
  initialDate: Yup.string().required('A data inicial é obrigatória'),
});

const formOrganizator = Yup.object().shape({
  organizator_type: Yup.string().required('Tipo do organizador obrigatório'),
  country: Yup.string(),
  cpf: Yup.string().when('country', {
    is: 'BRASIL',
    then: Yup.string().required('O CPF é obrigatório.'),
  }),
  email: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      'Digite um email válido'
    )
    .when('country', {
      is: country => country !== 'BRASIL',
      then: Yup.string().required('O email é obrigatório.'),
    }),
});

const formParticipant = Yup.object().shape({
  country: Yup.string(),
  cpf: Yup.string().when('country', {
    is: 'BRASIL',
    then: Yup.string().required('O CPF é obrigatório.'),
  }),
  email: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      'Digite um email válido'
    )
    .when('country', {
      is: country => country !== 'BRASIL',
      then: Yup.string().required('O email é obrigatório.'),
    }),
});

const formAddParticipant = Yup.object().shape({
  admin: Yup.boolean().required(),
  name: Yup.string()
    .max(35, 'Nome muito grande (máximo 35 caracteres)')
    .matches(/(\w.+\s).+/i, 'Nome e sobrenome obrigatório')
    .required('O nome é obrigatório'),
  country: Yup.string(),
  cpf: Yup.string().when(['admin', 'country'], {
    is: (admin, country) => {
      if (admin === false && country === 'BRASIL') {
        return true;
      }
      return false;
    },
    then: Yup.string().required('O CPF é obrigatório.'),
  }),
  email: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      'Digite um email válido'
    )
    .when('country', {
      is: country => country !== 'BRASIL',
      then: Yup.string().required('O email é obrigatório.'),
    }),
  sex: Yup.string().required('O sexo do participante é obrigatório'),
});

const formParticipantInvite = Yup.object().shape({
  invite_name: Yup.string().required('Nome é obrigatório'),
  invite_email: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      'Digite um email válido'
    )
    .required('O email é obrigatório'),
});

const formRegisterNewAddress = Yup.object().shape({
  id: Yup.string().required('O tipo é obrigatório'),
  type: Yup.string().required('O tipo é obrigatório'),
  other_type_name: Yup.string().when('type', {
    is: 'other',
    then: Yup.string().required('O apelido é obrigatório.'),
  }),
  cep: Yup.string()
    .required('O CEP é obrigatório')
    .min(8, 'Um CEP válido contém 8 dígitos.'),
  uf: Yup.string().required('O estado é obrigatório'),
  city: Yup.string().required('A cidade é obrigatória'),
  street: Yup.string().required('A rua é obrigatória'),
  street_number: Yup.string().required('O número da rua é obrigatório'),
  neighborhood: Yup.string().required('O bairro é obrigatório'),
  complement: Yup.string().max(60, 'Máximo de 60 caracteres'),
  receiver: Yup.string().required('O recebedor é obrigatório'),
});

const formChurchSchema = Yup.object().shape({
  uf: Yup.string().required('O estado é obrigatório.'),
  city: Yup.string().required('A cidade é obrigatória.'),
});

export default function UserProfile({ match, className }) {
  const [activeTab, setActiveTab] = useState('1');
  const [modalOrganizator, setModalOrganizator] = useState(false);
  const [modalChangeOrganizator, setModalChangeOrganizator] = useState(false);
  const [modalParticipant, setModalParticipant] = useState(false);
  const [modalSearchParticipant, setModalSearchParticipant] = useState(false);
  const [modalAddTrainingLeader, setModalAddTrainingLeader] = useState(false);
  const [modalAddParticipant, setModalAddParticipant] = useState(false);
  const [modalInvite, setModalInvite] = useState(false);
  const [modalCertificate, setModalCertificate] = useState(false);
  const [modalCertificatePrint, setModalCertificatePrint] = useState(false);
  const [modalViewLeader, setModalViewLeader] = useState(false);
  const [modalRegisterNewAddress, setModalRegisterNewAddress] = useState(false);
  const [modalLogs, setModalLogs] = useState(false);

  const userId = localStorage.getItem('@dashboard/user');
  const [profileAddresses, setProfileAddresses] = useState([
    {
      entity_id: parseInt(userId, 10),
      id: null,
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
  const [newAddress, setNewAddress] = useState({
    entity_id: parseInt(userId, 10),
    id: '',
    type: '',
    other_type_name: '',
    cep: '',
    country: 'BRASIL',
    uf: '',
    city: '',
    street: '',
    street_number: '',
    neighborhood: '',
    complement: '',
    receiver: '',
    main_address: true,
  });
  const [eventDetails, setEventDetails] = useState({
    id: '',
    church: 'Sem igreja',
    extra_participants: 0,
    cep: '',
    country: '',
    apiUf: '',
    apiCity: '',
    uf: '',
    city: '',
    initialDate: '',
    endDate: '',
    modality: '',
    isAdminPrinted: false,
  });
  const [loadCep, setLoadCep] = useState(false);

  const [checkBackground, setCheckBackground] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const [certificateDate, setCertificateDate] = useState(new Date());
  const [cpfNotFound, setCpfNotFound] = useState('');

  const [invites, setInvites] = useState([]);
  const [certificateParticipants, setCertificateParticipants] = useState([]);
  const [certificateParticipantsAux, setCertificateParticipantsAux] = useState(
    []
  );
  // eslint-disable-next-line no-unused-vars
  const [productsKit, setProductsKit] = useState([]);
  const [assistants, setAssistants] = useState([]);
  const [organizatorType, setOrganizatorType] = useState(null);
  const [leaderData, setLeaderData] = useState(null);
  const [participantData, setParticipantData] = useState(false);
  const [leaderViewData, setLeaderViewData] = useState(null);
  const [trainingLeaderError, setTrainingLeaderError] = useState(null);
  const [participantError, setParticipantError] = useState(null);
  const [pdfButton, setPdfButton] = useState(null);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [participantsIds, setParticipantsIds] = useState([]);
  const [organizatorsIds, setOrganizatorsIds] = useState([]);
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
  const [isBuyer, setIsBuyer] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [sendCertificateAdmin, setSendCertificateAdmin] = useState(null);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const profile_data = useSelector(state => state.profile.data);
  const loading = useSelector(state => state.organizator.loadingSearch);
  const participant_loading_search = useSelector(
    state => state.participant.loadingSearch
  );
  const participant_loading = useSelector(state => state.participant.loading);
  const organizator_data = useSelector(state => state.organizator.data);
  const organizator_error = useSelector(state => state.organizator.error);
  const loadingOrganizator = useSelector(
    state => state.organizator.loadingSearch
  );
  const participant_data = useSelector(state => state.participant.data);
  const participant_error = useSelector(state => state.participant.error);
  const event_data = useSelector(state => state.event.data);
  const cep_loading = useSelector(state => state.cep.loading);
  const cep_data = useSelector(state => state.cep.data);
  const logs_data = useSelector(state => state.log.data);
  const churchs = useSelector(state => state.church.data);
  const loadingChurchs = useSelector(state => state.church.loading);

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

  const InputFeedback = ({ error }) =>
    error ? <div className={classnames('input-feedback')}>{error}</div> : null;

  const RadioButton = ({
    field: { name, value, onChange, onBlur },
    id,
    label,
    className,
    ...props
  }) => {
    return (
      <div>
        <input
          name={name}
          id={id}
          type="radio"
          value={id} // could be something else for output?
          checked={id === value}
          onChange={onChange}
          onBlur={onBlur}
          className={`${classnames('radio-button')} mr-1`}
          {...props}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    );
  };

  // Radio group
  const RadioButtonGroup = ({
    value,
    error,
    touched,
    label,
    className,
    children,
  }) => {
    const classes = classnames(
      'input-field',
      {
        'is-success': value || (!error && touched), // handle prefilled or user-filled
        'is-error': !!error && touched,
      },
      className
    );

    return (
      <div className={classes}>
        <fieldset>
          <legend>{label}</legend>
          {children}
          {touched && <InputFeedback error={error} />}
        </fieldset>
      </div>
    );
  };

  const msgMinInscription = useMemo(() => {
    if (event_data !== null) {
      const missingParticipants =
        event_data.defaultEvent.min_participants -
        event_data.noQuitterParticipants.length;

      if (missingParticipants === 1) {
        return `Falta ${missingParticipants} participante para o minimo de inscritos`;
      }

      return `Faltam ${missingParticipants} participantes para o minimo de inscritos`;
    }
  }, [event_data]);

  const finishedLessons = useMemo(() => {
    if (event_data !== null) {
      return event_data.lessonReports.filter(lesson => lesson.is_finished);
    }
    return ['event_data nao carregado'];
  }, [event_data]);

  const totalParticipants = useMemo(() => {
    if (event_data !== null) {
      return event_data.noQuitterParticipants.length;
    }
  }, [event_data]);

  const totalQuitters = useMemo(() => {
    if (event_data !== null) {
      return event_data.participants.filter(
        participant => participant.pivot.is_quitter === true
      ).length;
    }
  }, [event_data]);

  function handleGoToAddOrder() {
    history.push('/pedidos/criar');
  }

  // useEffect(() => {
  //   if (cep_data.cep) {
  //     setCity(cep_data.localidade);
  //     setUf(cep_data.uf);
  //   }
  // }, [cep_data]);

  useEffect(() => {
    if (organizator_data !== null && organizator_data.id) {
      setLeaderData(organizator_data);
    }
  }, [organizator_data]);

  useEffect(() => {
    if (participant_data !== null && participant_data.id) {
      setParticipantData(participant_data);
    }
  }, [participant_data]);

  useEffect(() => {
    setTrainingLeaderError(organizator_error);
    if (organizator_error) {
      setLeaderData(null);
    }
  }, [organizator_error]);

  useEffect(() => {
    setParticipantError(participant_error);
  }, [participant_error]);

  useEffect(() => {
    if (event_data) {
      let countryData = '30';
      if (event_data.country === 'BRASIL' || event_data.country === null) {
        countryData = '30';
      } else {
        countryData = event_data.country;
      }

      setStates(CountryStateCity.getStatesOfCountry(countryData));

      if (event_data.uf !== '' && event_data.country !== '30') {
        setCities(CountryStateCity.getCitiesOfState(event_data.uf));
      }

      if (event_data.responsible_organization_id) {
        setSelectedChurch({
          id: event_data.organization.id,
          corporate_name: event_data.organization.corporate_name,
        });
      } else {
        setSelectedChurch({
          id: null,
          corporate_name: 'Sem igreja',
        });
      }

      setEventDetails({
        ...eventDetails,
        id: event_data.id,
        church: event_data.organization
          ? event_data.organization.corporate_name
          : 'Sem igreja',
        extra_participants: event_data.extra_participants,
        cep: event_data.cep || '',
        country: countryData,
        uf: event_data.uf || '',
        city: event_data.city || '',
        apiUf: event_data.uf || '',
        apiCity: event_data.city || '',
        initialDate: event_data.start_date,
        endDate: event_data.end_date,
        modality: event_data.modality,
        isAdminPrinted: event_data.is_admin_printed,
      });
    }
  }, [event_data]);

  const dispatch = useDispatch();
  const store = useStore();

  function toggleModalChurch() {
    setModalChurch(!modalChurch);
    setModalChurchData({
      uf: '',
      city: '',
      name: '',
    });
  }

  function toggleModalOrganizator() {
    setLeaderData(null);
    setModalOrganizator(!modalOrganizator);
  }

  function toggleModalParticipant() {
    setParticipantData(null);
    setParticipantError(false);
    setModalParticipant(!modalParticipant);
  }

  function toggleModalSearchParticipant() {
    setModalParticipant(false);
    setModalSearchParticipant(!modalSearchParticipant);
  }

  function toggleModalAddParticipant() {
    setModalParticipant(false);
    setModalSearchParticipant(false);
    setModalAddParticipant(!modalAddParticipant);
  }

  function toggleModalAddTrainingLeader() {
    setModalOrganizator(false);
    setModalAddTrainingLeader(!modalAddTrainingLeader);
  }

  function toggleModalInvite() {
    setModalParticipant(false);
    setModalSearchParticipant(false);
    setModalInvite(!modalInvite);
  }

  function toggleModalChangeOrganizator() {
    setLeaderData(null);
    setModalChangeOrganizator(!modalChangeOrganizator);
  }

  function toggleModalCertificate() {
    setPdfButton(null);
    setCheckAll(false);
    setCheckBackground(false);
    setCertificateParticipantsAux(
      certificateParticipants.map(participant => {
        return {
          id: participant.id,
          name: formatName(participant.name),
          checked: participant.checked,
          participant_id: participant.participant_id,
          organizator_id: participant.organizator_id,
          print_date: participant.print_date,
        };
      })
    );

    setModalCertificate(!modalCertificate);
  }

  function toggleCloseModalCertificatePrint() {
    setModalCertificatePrint(false);
    toastr.confirm('Certificado impresso para ser enviado?', {
      onOk: () => {
        dispatch(
          ParticipantActions.editPrintDateRequest(
            organizatorsIds,
            participantsIds,
            event_data.id
          )
        );
      },
      okText: 'Sim',
      onCancel: () => {
        toggleModalCertificate();
      },
      cancelText: 'Não',
    });
  }

  function toggleCloseModalViewLeader() {
    setModalViewLeader(false);
    setLeaderViewData(null);
  }

  function toggleOpenModalViewLeader(leader) {
    setModalViewLeader(!modalViewLeader);
    setLeaderViewData(leader);
  }

  function toggleModalRegisterNewAddress() {
    setModalRegisterNewAddress(!modalRegisterNewAddress);
    store.getState().cep.data = {};

    setNewAddress({
      entity_id: parseInt(userId, 10),
      id: '',
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
      main_address: true,
    });
  }

  function toggleModalLogs() {
    setModalLogs(!modalLogs);
  }

  function confirmModalOrganizator() {
    if (organizatorType === 'leader') {
      dispatch(
        OrganizatorActions.addOrganizatorRequest(
          parseInt(match.params.event_id, 10),
          leaderData.id
        )
      );
    } else {
      dispatch(
        ParticipantActions.addParticipantRequest(
          leaderData.id,
          parseInt(match.params.event_id, 10),
          true
        )
      );
    }

    setModalOrganizator(false);
    setLeaderData(null);
  }

  function confirmModalChangeOrganizator() {
    const userId = localStorage.getItem('@dashboard/user');

    if (event_data.organizators[0].id === parseInt(userId, 10)) {
      toastr.confirm(
        'Ao substituir-se, você não terá mais acesso a esse grupo',
        {
          onOk: () =>
            dispatch(
              OrganizatorActions.changeOrganizatorRequest(
                event_data.organizators[0].id,
                parseInt(match.params.event_id, 10),
                leaderData.id,
                true
              )
            ),
          onCancel: () => {},
        }
      );
    } else {
      dispatch(
        OrganizatorActions.changeOrganizatorRequest(
          event_data.organizators[0].id,
          parseInt(match.params.event_id, 10),
          leaderData.id,
          false
        )
      );
    }

    setModalOrganizator(false);
    setLeaderData(null);
  }

  function confirmModalSearchParticipant() {
    dispatch(
      ParticipantActions.addParticipantRequest(
        participantData.id,
        parseInt(match.params.event_id, 10),
        false
      )
    );

    setModalParticipant(false);
  }

  function confirmModalAddParticipant(values) {
    const { name, cpf, email, sex } = values;
    const password = randomstring.generate(6);

    const formattedCpf = cpf
      .replace('.', '')
      .replace('.', '')
      .replace('-', '');

    dispatch(
      ParticipantActions.createParticipantRequest(
        name,
        formattedCpf,
        email,
        sex,
        password,
        parseInt(match.params.event_id, 10),
        false
      )
    );
  }

  function confirmModalAddTrainingLeader(values) {
    const { name, cpf, email, sex } = values;
    const password = randomstring.generate(6);

    const assistant = true;

    const formattedCpf = cpf
      .replace('.', '')
      .replace('.', '')
      .replace('-', '');

    dispatch(
      ParticipantActions.createParticipantRequest(
        name,
        formattedCpf,
        email,
        sex,
        password,
        parseInt(match.params.event_id, 10),
        assistant
      )
    );
  }

  function handleSearchChurchs(values) {
    dispatch(ChurchActions.churchRequest(values));
  }

  // USEEFFECT PARA FECHAR O MODAL DA FUNCAO confirmModalAddParticipant
  useEffect(() => {
    if (!participant_error) {
      setModalAddParticipant(false);
    }
  }, [participant_error]);

  function handleSearchOrganizator(cpf, email, setFieldValue, values) {
    const { organizator_type } = values;
    const { default_event_id } = event_data;

    if (email === null) {
      const formattedCpf = cpf
        .replace('.', '')
        .replace('.', '')
        .replace('-', '');

      setCpfNotFound(cpf);
      setFieldValue('cpf', formattedCpf);

      if (formattedCpf.length === 11) {
        dispatch(
          OrganizatorActions.searchOrganizatorRequest(
            organizator_type,
            formattedCpf,
            default_event_id
          )
        );
      }
    } else {
      dispatch(
        OrganizatorActions.searchOrganizatorRequest(
          organizator_type,
          email,
          default_event_id
        )
      );
    }
  }

  function handleOrganizatorType(event, setFieldValue) {
    setFieldValue('organizator_type', event.target.value);
    setFieldValue('cpf', '');

    setOrganizatorType(event.target.value);
    setLeaderData(null);
  }

  function handleSearchParticipant(cpf, email) {
    const { default_event_id } = event_data;
    if (email === null) {
      setCpfNotFound(cpf);
      setParticipantData(null);
      const formattedCpf = cpf
        .replace('.', '')
        .replace('.', '')
        .replace('-', '');

      if (formattedCpf.length === 11) {
        dispatch(
          ParticipantActions.searchParticipantRequest(
            formattedCpf,
            default_event_id
          )
        );
      }
    } else {
      dispatch(
        ParticipantActions.searchParticipantRequest(email, default_event_id)
      );
    }
  }

  function handleDeleteOrganizator(entity_id) {
    toastr.confirm('Deseja deletar o líder', {
      onOk: () =>
        dispatch(
          OrganizatorActions.deleteOrganizatorRequest(
            parseInt(match.params.event_id, 10),
            entity_id
          )
        ),
      onCancel: () => {},
      okText: 'Sim',
      cancelText: 'Não',
    });
  }

  function handleDeleteParticipant(entity_id, participant_id) {
    toastr.confirm('Deseja remover o líder em treinamento?', {
      onOk: () =>
        dispatch(
          ParticipantActions.deleteParticipantRequest(entity_id, participant_id)
        ),
      onCancel: () => {},
      okText: 'Sim',
      cancelText: 'Não',
    });
  }

  function handleSetTrainingLeaderQuitter(name, participant_id) {
    toastr.confirm(`Deseja tornar ${name} em desistente?`, {
      onOk: () =>
        dispatch(
          ParticipantActions.setQuitterParticipantRequest(participant_id, true)
        ),
      onCancel: () => {},
      okText: 'Sim',
      cancelText: 'Não',
    });
  }

  // function handleChangeOrganizator(entity_id) {
  //   setLeaderData(null);
  // }

  function toggle(tab) {
    if (activeTab !== tab) {
      setActiveTab(tab);
      localStorage.setItem('@dashboard/editGroupActiveTab', tab);
    }
  }

  function sendMailParticipant(values) {
    const { invite_name, invite_email } = values;
    const invite = {
      event_id: match.params.event_id,
      name: invite_name,
      email: invite_email,
    };

    dispatch(
      InviteActions.inviteRequest(
        match.params.event_id,
        'Grupo',
        invite_name,
        invite_email,
        isBuyer
      )
    );

    setInvites([...invites, invite]);

    setModalParticipant(false);
    setModalInvite(false);
  }

  function handleCheckAll(e) {
    const { checked } = e.target;
    const participantsAux = [];

    setPdfButton(null);
    setCheckAll(checked);

    if (checked === true) {
      certificateParticipantsAux.map((participant, index) => {
        participantsAux.push({
          id: participant.id,
          name: participant.name,
          checked: true,
          participant_id: participant.participant_id,
          organizator_id: participant.organizator_id,
          print_date: participant.print_date,
        });

        document.getElementsByClassName('childCheck')[index].checked = true;
      });
      setCertificateParticipantsAux(participantsAux);
    }

    if (checked === false) {
      certificateParticipantsAux.map((participant, index) => {
        participantsAux.push({
          id: participant.id,
          name: participant.name,
          checked: false,
          participant_id: participant.participant_id,
          organizator_id: participant.organizator_id,
          print_date: participant.print_date,
        });

        document.getElementsByClassName('childCheck')[index].checked = false;
      });
      setCertificateParticipantsAux(participantsAux);
    }
  }

  function handleChangeChild(e, indexParticipant) {
    const { checked } = e.target;
    const participantAux = certificateParticipantsAux;

    setPdfButton(null);

    participantAux[indexParticipant].checked = checked;
    setCertificateParticipantsAux(participantAux);
  }

  function handleChangeParticipantName(e, indexParticipant) {
    const { value } = e.target;
    const participantAux = certificateParticipantsAux;

    setPdfButton(null);

    participantAux[indexParticipant].name = value;
    setCertificateParticipantsAux(participantAux);
  }

  function handleCreateDownloadLink() {
    setLoadingPdf(true);

    const toSend = {
      event_id: event_data.id,
      date: format(certificateDate, "dd 'de' MMMM 'de' yyyy", { locale: pt }),
      city: 'Pompéia',
      uf: 'SP',
      layout_certificado: event_data.defaultEvent.layoutCertificate,
      checkBackground,
      imgBackground: event_data.defaultEvent.img_certificate_url,
    };

    const participants = [];
    const participantsId = [];
    const organizatorsId = [];

    certificateParticipantsAux.map(participant => {
      if (participant.checked === true && !!participant.name) {
        participants.push(participant.name);
        if (participant.participant_id && participant.print_date === null) {
          participantsId.push(participant.participant_id);
        }
        if (participant.organizator_id && participant.print_date === null) {
          organizatorsId.push(participant.organizator_id);
        }
      }
    });

    setParticipantsIds(participantsId);
    setOrganizatorsIds(organizatorsId);

    if (participants.length === 0) {
      toastr.warning('Aviso!', 'Mínimo de um nome para impressão');
      setPdfButton(null);
      setLoadingPdf(false);
    } else {
      setModalCertificatePrint(true);
      toSend.participants = participants;
      setPdfButton(toSend);

      setLoadingPdf(false);
    }
  }

  function finishInscriptions(digital_certificate = false) {
    const eventData = {
      is_inscription_finished: true,
      digital_certificate,
    };

    dispatch(EventActions.eventEditRequest(match.params.event_id, eventData));
  }

  function sendDigitalCertificates() {
    const all_organizators = event_data.organizators.map(
      organizator => organizator.pivot.entity_id
    );
    const all_participants = event_data.participants.map(
      participant => participant.pivot.id
    );

    const reload = false;

    dispatch(
      ParticipantActions.editPrintDateRequest(
        all_organizators,
        all_participants,
        event_data.id,
        reload
      )
    );

    const digital_certificate = true;

    finishInscriptions(digital_certificate);
  }

  function reopenInscriptions() {
    const eventData = {
      is_inscription_finished: false,
    };

    dispatch(EventActions.eventEditRequest(match.params.event_id, eventData));
  }

  function handleRegisterNewAddress(values) {
    const addressesPost = [];
    const addressesPut = [];

    if (values.id === 'other') {
      delete values.id;

      profileAddresses.map(address => {
        address.main_address = false;
        delete address.created_at;
        delete address.updated_at;

        addressesPut.push(address);
      });

      addressesPost.push(values);
    } else {
      profileAddresses.map(address => {
        if (
          address.id !== parseInt(values.id, 10) &&
          address.main_address === true
        ) {
          address.main_address = false;
          delete address.created_at;
          delete address.updated_at;

          addressesPut.push(address);
        }
        if (parseInt(values.id, 10) === address.id) {
          address.main_address = true;
          delete address.created_at;
          delete address.updated_at;

          addressesPut.push(address);
        }
      });
    }

    const user_type = 'entity';

    dispatch(
      AddressActions.addressRequest(
        profile_data.netsuite_id,
        user_type,
        addressesPost,
        addressesPut
      )
    );

    store.getState().cep.data = {};

    setModalRegisterNewAddress(false);

    toastr.confirm(
      <>
        <h5>Tem certeza que deseja finalizar as inscrições?</h5>
        <br />
        <div>
          Os certificados impressos serão enviados e eventuais participantes
          adicionados após a finalização das inscrições somente poderão receber
          a via digital
        </div>
      </>,
      {
        onOk: () => finishInscriptions(),
        onCancel: () => {
          window.location.reload();
        },
      }
    );

    toastr.confirm(
      <>
        <h5>Tem certeza que deseja finalizar as inscrições?</h5>
        <br />
        <div>
          Os certificados impressos serão enviados e eventuais participantes
          adicionados após a finalização das inscrições somente poderão receber
          a via digital
        </div>
      </>,
      {
        onOk: () => finishInscriptions(),
        onCancel: () => {
          window.location.reload();
        },
      }
    );
  }

  function handleChangeAddressType(event, setFieldValue) {
    const { name, value } = event.target;

    setFieldValue(name, value);

    if (value !== 'other' && value !== '') {
      const address = profileAddresses.find(
        addressFind => addressFind.id === parseInt(value, 10)
      );

      // setCepState(address.cep);
      setFieldValue('type', address.type);
      setFieldValue('other_type_name', address.other_type_name);
      setFieldValue('cep', address.cep);
      setFieldValue('uf', address.uf);
      setFieldValue('city', address.city);
      setFieldValue('street', address.street);
      setFieldValue('street_number', address.street_number);
      setFieldValue('neighborhood', address.neighborhood);
      setFieldValue('complement', address.complement);
      setFieldValue('receiver', address.receiver);
    } else if (value === '') {
      setFieldValue('id', '');
      setFieldValue('type', '');
      setFieldValue('other_type_name', '');
      setFieldValue('cep', '');
      setFieldValue('uf', '');
      setFieldValue('city', '');
      setFieldValue('street', '');
      setFieldValue('street_number', '');
      setFieldValue('neighborhood', '');
      setFieldValue('complement', '');
      setFieldValue('receiver', '');
    } else {
      setFieldValue('id', 'other');
      setFieldValue('type', '');
      setFieldValue('other_type_name', '');
      setFieldValue('cep', '');
      setFieldValue('uf', '');
      setFieldValue('city', '');
      setFieldValue('street', '');
      setFieldValue('street_number', '');
      setFieldValue('neighborhood', '');
      setFieldValue('complement', '');
      setFieldValue('receiver', '');
    }
  }

  function verifyInscriptionsFinished(e) {
    if (event_data.is_inscription_finished === false) {
      e.preventDefault();
      toastr.confirm('Finalize as inscrições primeiro!', {
        onOk: () => {},
        disableCancel: true,
      });
    }
  }

  function handleSubmitDetails(values) {
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
      extra_participants: values.extra_participants || 0,
      cep: values.cep,
      country: values.country,
      uf: values.uf,
      city: values.city,
      start_date: values.initialDate,
      end_date: values.endDate,
      modality: values.modality,
      is_admin_printed: values.isAdminPrinted,
      admin_print_date:
        values.isAdminPrinted && profile_data.admin ? new Date() : null,
      admin_print_id: profile_data.id,
      responsible_organization_id: selectedChurch.id,
    };

    if (!profile_data.admin || event_data.is_admin_printed) {
      delete data.admin_print_date;
      delete data.admin_print_id;
    }

    dispatch(EventActions.eventEditRequest(values.id, data));
  }

  const maxGlobalInscriptions = useMemo(() => {
    if (event_data !== null) {
      const amountOrganizators = event_data.organizators.length;
      const amountTrainingOrganizators = assistants.length;
      const amountParticipants =
        event_data.noQuitterParticipants.length + event_data.invites.length;

      const amount =
        amountOrganizators + amountTrainingOrganizators + amountParticipants;

      return amount;
    }
  }, [assistants.length, event_data]);

  // eslint-disable-next-line consistent-return
  function handleEnableAddParticipantButton() {
    if (event_data !== null) {
      if (event_data.is_finished) return false;

      if (
        event_data.defaultEvent.max_participants +
          event_data.extra_participants <=
          event_data.noQuitterParticipants.length + event_data.invites.length ||
        event_data.defaultEvent.max_global_inscriptions +
          event_data.extra_participants <=
          maxGlobalInscriptions
      ) {
        return false;
      }

      return true;
    }
  }

  function handleEnableAddOrganizatorButton() {
    if (event_data !== null) {
      if (event_data.is_finished) return false;

      if (
        event_data.defaultEvent.max_global_inscriptions <= maxGlobalInscriptions
      )
        return false;

      if (
        event_data.defaultEvent.max_organizators <=
          event_data.organizators.length &&
        event_data.defaultEvent.max_assistants <= assistants.length
      ) {
        return false;
      }

      return true;
    }
  }

  function handleEnableFinishInscriptions() {
    if (event_data !== null) {
      if (event_data.is_inscription_finished) return false;

      if (profile_data.id) {
        if (profile_data[event_data.defaultEvent.ministery.tag] >= 7)
          return true;
      }

      if (
        event_data.noQuitterParticipants.length >=
          event_data.defaultEvent.min_participants &&
        !event_data.is_inscription_finished
      ) {
        return true;
      }
    }
  }

  function handleEnableNotFinishInscriptions() {
    if (event_data !== null) {
      if (event_data.is_inscription_finished) return false;

      if (profile_data.id) {
        if (
          profile_data[event_data.defaultEvent.ministery.tag] < 7 &&
          event_data.noQuitterParticipants.length <
            event_data.defaultEvent.min_participants &&
          !event_data.is_inscription_finished
        ) {
          return true;
        }
      }
    }
  }

  function handleCep(cep, setFieldValue, values) {
    const formattedCep = cep.replace('-', '');
    setFieldValue('cep', formattedCep);

    if (loadCep && cep.length === 8) {
      setNewAddress({
        ...newAddress,
        id: values.id,
        type: values.type,
        other_type_name: values.other_type_name || '',
        receiver: values.receiver,
      });

      setEventDetails({
        ...eventDetails,
        country: '30',
        extra_participants: values.extra_participants
          ? values.extra_participants
          : eventDetails.extra_participants,
        initialDate: values.initialDate
          ? values.initialDate
          : eventDetails.initialDate,
        endDate: values.endDate ? values.endDate : eventDetails.endDate,
      });

      dispatch(CepActions.cepRequest(cep, 0));
    }
  }

  function handleModalityChange(event, setFieldValue) {
    const modality = event.target.value;

    setFieldValue('modality', modality);
  }

  function handleCountryChange(event, setFieldValue) {
    const countryId = event.target.value;

    setStates(CountryStateCity.getStatesOfCountry(countryId));

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

  function handleLoadLogs(event) {
    event.preventDefault();

    toggleModalLogs();

    dispatch(
      LogActions.logsRequest(
        ['event', 'organizator', 'participant', 'lesson_report'],
        event_data.id
      )
    );
  }

  useEffect(() => {
    const storageTab = localStorage.getItem('@dashboard/editGroupActiveTab');

    dispatch(EventActions.eventRequest(match.params.event_id));

    setCountries(CountryStateCity.getAllCountries());

    if (storageTab) {
      setActiveTab(storageTab);
    }
  }, []);

  useEffect(() => {
    const participants = [];
    const assistantsData = [];
    const products = [];
    let verify_user = false;

    if (profile_data.addresses && profile_data.addresses.length > 0) {
      setProfileAddresses(profile_data.addresses);
    }

    if (event_data && profile_data.id) {
      let auxVerify = 0;
      verify_user = true;

      if (profile_data.admin === true) {
        verify_user = true;
        setSendCertificateAdmin(profile_data.is_admin_printed);
      } else {
        event_data.organizators.map(organizator => {
          if (organizator.id === profile_data.id) {
            auxVerify += 1;
          }
        });

        event_data.participants.map(participant => {
          if (
            participant.id === profile_data.id &&
            participant.pivot.assistant
          ) {
            auxVerify += 1;
          }
        });

        verify_user = auxVerify > 0;
      }

      if (!verify_user) {
        verify_user = true;
        history.push('/eventos/grupos');
        toastr.confirm('Sem permissão para editar o evento.', {
          onOk: () => {
            window.location.reload();
          },
          disableCancel: true,
        });
      }

      // CRIAR LISTA DE PARTICIPANTES PARA MOSTRAR NO MODAL DO CERTIFICADO
      if (
        event_data.participants &&
        event_data.participants.length > 0 &&
        event_data.organizators &&
        event_data.organizators.length > 0
      ) {
        // event_data.organizators.map(organizator => {
        //   participants.push({
        //     id: organizator.id,
        //     name: organizator.name,
        //     checked: false,
        //   });
        // });

        event_data.organizators.map(organizator => {
          participants.push({
            id: organizator.id,
            name: organizator.name,
            checked: false,
            participant_id: null,
            organizator_id: organizator.pivot.entity_id,
            print_date: organizator.pivot.print_date,
          });
        });

        event_data.participants.map(participant => {
          if (participant.pivot.is_quitter === false) {
            if (participant.pivot.assistant) {
              assistantsData.push(participant);
              participants.push({
                id: participant.id,
                name: participant.name,
                checked: false,
                participant_id: participant.pivot.id,
                organizator_id: null,
                print_date: participant.pivot.print_date,
              });
            } else {
              participants.push({
                id: participant.id,
                name: participant.name,
                checked: false,
                participant_id: participant.pivot.id,
                organizator_id: null,
                print_date: participant.pivot.print_date,
              });
            }
          }
        });

        setCertificateParticipants(participants);
        setCertificateParticipantsAux(participants);

        setAssistants(assistantsData);
      }

      // CRIAR LISTA DE PRODUTO PARA MOSTRAR NO MODAL DO SOLICITAR MATERIAL
      if (
        event_data.defaultEvent.kit.products &&
        event_data.defaultEvent.kit.products.length > 0
      ) {
        event_data.defaultEvent.kit.products.map(product => {
          products.push({
            id: product.netsuite_id,
            name: product.name,
            group_price: product.group_price,
            training_price: product.training_price,
            seminary_price: product.seminary_price,
            quantity: 0,
          });
        });

        setProductsKit(products);
      }

      setInvites(event_data.invites);
    }
  }, [event_data, profile_data]);

  useEffect(() => {
    if (cep_data.cep) {
      setNewAddress({
        ...newAddress,
        cep: cep_data.cep.replace('-', ''),
        uf: cep_data.uf,
        city: cep_data.localidade,
        street: cep_data.logradouro || newAddress.street,
        street_number: newAddress.street_number,
        neighborhood: cep_data.bairro || newAddress.neighborhood,
        complement: cep_data.complemento || newAddress.complement,
        receiver: newAddress.receiver,
        main_address: newAddress.main_address,
      });

      if (!modalRegisterNewAddress) {
        setEventDetails({
          ...eventDetails,
          cep: cep_data.cep.replace('-', ''),
          uf: cep_data.uf,
          city: cep_data.localidade,
        });
      }
    }
  }, [cep_data]);

  return (
    event_data !== null && (
      <>
        <Row>
          <Col xs="12" id="user-profile">
            <Card className="profile-with-cover">
              <div
                className="d-flex flex-column flex-sm-row flex-md-column flex-lg-row justify-content-between card-img-top img-fluid bg-cover height-300"
                style={{
                  background: `url("${event_data.defaultEvent.img_banner_dash_url}") 50%`,
                }}
              >
                <div className="mt-2 mr-2 align-self-end">
                  <UncontrolledDropdown className="pr-1 d-lg-none">
                    <DropdownToggle color="success">
                      <ChevronDown size={24} />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem onClick={() => handleGoToAddOrder()}>
                        <i className="fa fa-plus mr-2" /> Solicitar material
                      </DropdownItem>

                      {/* BOTAO QUE MOSTRA QUANDO QUANTIDADE MINIMA DE PARTICIPANTES NAO FOR ATINGIDA */}
                      {handleEnableNotFinishInscriptions() && (
                        <DropdownItem
                          color="secondary"
                          className="btn-raised mr-3"
                          onClick={() =>
                            toastr.warning('Aviso!', msgMinInscription)
                          }
                        >
                          <CheckSquare size={15} /> Finalizar inscrições
                        </DropdownItem>
                      )}

                      {/* BOTAO MOSTRA PARA FINALIZAR AS INSCRIÇÕES */}
                      {handleEnableFinishInscriptions() && (
                        <DropdownItem
                          color="success"
                          className="btn-raised mr-3"
                          onClick={() => {
                            toastr.confirm(
                              <>
                                <h5>
                                  Tem certeza que deseja finalizar as
                                  inscrições?
                                </h5>
                                <br />
                                <div>
                                  De qual forma você prefere receber os
                                  certificados?
                                </div>
                                <br />
                                <div>
                                  <b>Impresso:</b> enviaremos os certificados
                                  para o endereço que você informar no próximo
                                  passo.
                                </div>
                                <br />

                                <div>
                                  <b>Digital:</b> Você poderá "Emitir
                                  certificados" no próximo passo, clicando no
                                  botão "Emitir certificados" abaixo do botão
                                  "finalizar inscrições"
                                </div>
                              </>,
                              {
                                onOk: () => sendDigitalCertificates(),
                                okText: 'Digital',
                                onCancel: () => {},
                                buttons: [
                                  {
                                    text: 'Impresso',
                                    handler: () =>
                                      toggleModalRegisterNewAddress(),
                                  },
                                  {
                                    cancel: true,
                                  },
                                ],
                              }
                            );

                            // toastr.confirm(
                            //   <>
                            //     <h5>
                            //       Tem certeza que deseja finalizar as
                            //       inscrições?
                            //     </h5>
                            //     <br />
                            //     <div>
                            //       Os certificados impressos serão enviados e
                            //       eventuais participantes adicionados após a
                            //       finalização das inscrições somente poderão
                            //       receber a via digital
                            //     </div>
                            //   </>,
                            //   {
                            //     onOk: () => finishInscriptions(),
                            //     onCancel: () => {},
                            //   }
                            // );
                          }}
                        >
                          <CheckSquare size={15} /> Finalizar inscrições
                        </DropdownItem>
                      )}

                      {(() => {
                        if (event_data.is_inscription_finished === true) {
                          if (
                            profile_data[
                              event_data.defaultEvent.ministery.tag
                            ] === 7
                          ) {
                            return (
                              <DropdownItem
                                color="success"
                                className="btn-raised mr-3"
                                onClick={() => {
                                  toastr.confirm(
                                    'Tem certeza de que deseja reabrir as inscrições?',
                                    {
                                      onOk: () => reopenInscriptions(),
                                      onCancel: () => {},
                                    }
                                  );
                                }}
                              >
                                <CheckSquare size={15} /> Reabrir inscrições
                              </DropdownItem>
                            );
                          }
                          return (
                            <DropdownItem
                              color="success"
                              className="btn-raised mr-3"
                              disabled
                            >
                              <CheckSquare size={15} /> Inscrições finalizadas
                            </DropdownItem>
                          );
                        }
                      })()}

                      {(profile_data.admin ||
                        event_data.is_inscription_finished) && (
                        <DropdownItem onClick={toggleModalCertificate}>
                          <i className="fa fa-graduation-cap mr-2" /> Emitir
                          certificados
                        </DropdownItem>
                      )}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
                <div className="align-self-start col-md-1 d-none d-sm-none d-md-none d-lg-block" />
                <div className="align-self-center col-md-7">
                  <h1 className="text-center font-medium-5 font-weight-bold text-white text-uppercase text-wrap">
                    {event_data.defaultEvent.event_type}:{' '}
                    {event_data.defaultEvent.name}
                  </h1>
                  <h4 className="text-center font-medium-4 text-white text-uppercase text-wrap">
                    Inicio do grupo:{' '}
                    {moment(event_data.start_date).format('DD/MM/YYYY')}
                  </h4>
                </div>
                <div className="align-self-start mr-2">
                  <Row className="master">
                    <div className="profile-cover-buttons">
                      <div className="media-body halfway-fab align-self-end">
                        <div className="d-none d-sm-none d-md-none d-lg-block mt-3 ml-4">
                          <div className="d-flex flex-column">
                            <Button
                              onClick={() => handleGoToAddOrder()}
                              color="success"
                              className="btn-raised mr-3"
                            >
                              <i className="fa fa-plus" /> Solicitar material
                            </Button>

                            {/* BOTAO QUE MOSTRA QUANDO QUANTIDADE MINIMA DE PARTICIPANTES NAO FOR ATINGIDA */}
                            {handleEnableNotFinishInscriptions() && (
                              <Button
                                color="secondary"
                                className="btn-raised mr-3"
                                onClick={() =>
                                  toastr.warning('Aviso!', msgMinInscription)
                                }
                              >
                                <CheckSquare size={15} /> Finalizar inscrições
                              </Button>
                            )}

                            {/* BOTAO MOSTRA PARA FINALIZAR AS INSCRIÇÕES */}
                            {handleEnableFinishInscriptions() && (
                              <Button
                                color="success"
                                className="btn-raised mr-3"
                                onClick={() => {
                                  toastr.confirm(
                                    <>
                                      <h5>
                                        Tem certeza que deseja finalizar as
                                        inscrições?
                                      </h5>
                                      <br />
                                      <div>
                                        De qual forma você prefere receber os
                                        certificados?
                                      </div>
                                      <br />
                                      <div>
                                        <b>Impresso:</b> enviaremos os
                                        certificados para o endereço que você
                                        informar no próximo passo.
                                      </div>
                                      <br />

                                      <div>
                                        <b>Digital:</b> Você poderá "Emitir
                                        certificados" no próximo passo, clicando
                                        no botão "Emitir certificados" abaixo do
                                        botão "finalizar inscrições"
                                      </div>
                                    </>,
                                    {
                                      onOk: () => sendDigitalCertificates(),
                                      okText: 'Digital',
                                      onCancel: () => {},
                                      buttons: [
                                        {
                                          text: 'Impresso',
                                          handler: () =>
                                            toggleModalRegisterNewAddress(),
                                        },
                                        {
                                          cancel: true,
                                        },
                                      ],
                                    }
                                  );

                                  // toastr.confirm(
                                  //   <>
                                  //     <h5>
                                  //       Tem certeza que deseja finalizar as
                                  //       inscrições?
                                  //     </h5>
                                  //     <br />
                                  //     <div>
                                  //       Os certificados impressos serão enviados
                                  //       e eventuais participantes adicionados
                                  //       após a finalização das inscrições
                                  //       somente poderão receber a via digital
                                  //     </div>
                                  //   </>,
                                  //   {
                                  //     onOk: () => finishInscriptions(),
                                  //     onCancel: () => {},
                                  //   }
                                  // );
                                }}
                              >
                                <CheckSquare size={15} /> Finalizar inscrições
                              </Button>
                            )}

                            {/* BOTÃO MOSTRA QUANDO INSCRIÇÕES JÁ ESTÃO FINALIZADAS */}
                            {(() => {
                              if (event_data.is_inscription_finished === true) {
                                if (
                                  profile_data[
                                    event_data.defaultEvent.ministery.tag
                                  ] === 7
                                ) {
                                  return (
                                    <Button
                                      color="success"
                                      className="btn-raised mr-3"
                                      onClick={() => {
                                        toastr.confirm(
                                          'Tem certeza de que deseja reabrir as inscrições?',
                                          {
                                            onOk: () => reopenInscriptions(),
                                            onCancel: () => {},
                                          }
                                        );
                                      }}
                                    >
                                      <CheckSquare size={15} /> Reabrir
                                      inscrições
                                    </Button>
                                  );
                                }
                                return (
                                  <Button
                                    color="success"
                                    className="btn-raised mr-3"
                                    disabled
                                  >
                                    <CheckSquare size={15} /> Inscrições
                                    finalizadas
                                  </Button>
                                );
                              }
                            })()}

                            {/* {(event_data.is_finished || profile_data.admin) && ( */}
                            {(profile_data.admin ||
                              event_data.is_inscription_finished) && (
                              <Button
                                color="success"
                                className="btn-raised mr-3"
                                onClick={toggleModalCertificate}
                              >
                                <i className="fa fa-graduation-cap" /> Emitir
                                certificados
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Row>
                </div>
              </div>

              <div className="profile-section">
                <Row>
                  <Col lg="6" md="6" sm="6">
                    <ul className="profile-menu no-list-style top-0 mb-0">
                      <li className="text-center">
                        <NavLink
                          className={classnames(
                            'font-medium-2 font-weight-600',
                            {
                              active: activeTab === '1',
                            }
                          )}
                          onClick={() => toggle('1')}
                        >
                          Detalhes
                        </NavLink>
                      </li>
                      <li className="text-center">
                        <NavLink
                          className={classnames(
                            'font-medium-2 font-weight-600',
                            {
                              active: activeTab === '2',
                            }
                          )}
                          onClick={() => toggle('2')}
                        >
                          Líderes
                        </NavLink>
                      </li>
                    </ul>
                  </Col>
                  <Col lg="6" md="6" sm="6">
                    <ul className="profile-menu no-list-style top-0 mb-0 pr-2">
                      <li className="text-center">
                        <NavLink
                          className={classnames(
                            'font-medium-2 font-weight-600',
                            {
                              active: activeTab === '3',
                            }
                          )}
                          onClick={() => toggle('3')}
                        >
                          Participantes
                        </NavLink>
                      </li>
                      <li className="text-center">
                        <NavLink
                          className={classnames(
                            'font-medium-2 font-weight-600',
                            {
                              active: activeTab === '4',
                            }
                          )}
                          onClick={() => toggle('4')}
                        >
                          Aulas
                        </NavLink>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>

        {event_data.is_finished && (
          <Badge color="success" className="text-wrap mr-2">
            Evento finalizado
          </Badge>
        )}

        {event_data.is_inscription_finished && (
          <Badge color="success" className="text-wrap mr-2 mb-2">
            Inscrições finalizadas
          </Badge>
        )}

        {event_data.defaultEvent.max_global_inscriptions +
          event_data.extra_participants <=
          maxGlobalInscriptions && (
          <Badge color="warning" className="text-wrap mr-2 mb-2">
            Quantidade total de pessoas atingida
          </Badge>
        )}

        {event_data.defaultEvent.max_participants +
          event_data.extra_participants <=
          event_data.noQuitterParticipants.length +
            event_data.invites.length && (
          <Badge color="warning" className="text-wrap mr-2 mb-2">
            Quantidade máxima de participantes atingida
          </Badge>
        )}

        {event_data.defaultEvent.max_assistants <= assistants.length && (
          <Badge color="warning" className="text-wrap mr-2 mb-2">
            Quantidade máxima de líderes em treinamento atingida
          </Badge>
        )}

        {event_data.defaultEvent.max_organizators <=
          event_data.organizators.length && (
          <Badge color="warning" className="text-wrap mr-2 mb-2">
            Quantidade máxima de líderes atingida
          </Badge>
        )}

        {event_data.is_inscription_finished &&
          event_data.digital_certificate === true && (
            <Badge color="warning" className="text-wrap mr-2 mb-2">
              Certificado digital
            </Badge>
          )}

        {event_data.is_inscription_finished &&
          event_data.digital_certificate === false && (
            <Badge color="warning" className="text-wrap mr-2 mb-2">
              Certificado impresso
            </Badge>
          )}

        <TabContent className="px-0" activeTab={activeTab}>
          {/* Dados do Grupo */}
          <TabPane tabId="1">
            <Card>
              <CardBody>
                <div className="px-3">
                  <Formik
                    enableReinitialize
                    initialValues={eventDetails}
                    validationSchema={formDetails}
                    // CRIAR FUNÇÃO PARA SALVAR DADOS DA EDIÇÃO DO GRUPO
                    onSubmit={values => handleSubmitDetails(values)}
                  >
                    {({
                      errors,
                      touched,
                      values,
                      setFieldValue,
                      handleChange,
                    }) => (
                      <Form>
                        {/* <input type="hidden" value="something" /> */}
                        <div className="form-body">
                          <Row>
                            <Col sm="12" md="4" lg="4" xl="2">
                              <FormGroup>
                                <Label for="id">Id do evento</Label>
                                <div className="position-relative">
                                  <Field
                                    type="text"
                                    id="id"
                                    name="id"
                                    className="form-control"
                                    readOnly
                                  />
                                </div>
                              </FormGroup>
                            </Col>

                            <Col
                              sm="12"
                              md="8"
                              lg="7"
                              xl="7"
                              className="has-icon-left"
                            >
                              <Label for="church">Igreja</Label>
                              <div className="position-relative has-icon-left">
                                <InputGroup>
                                  <Field
                                    name="church"
                                    id="church"
                                    className="form-control"
                                    disabled
                                    value={
                                      selectedChurch.corporate_name ||
                                      values.church
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

                            {profile_data.admin && (
                              <Col sm="12" md="12" lg="3" xl="3">
                                <FormGroup>
                                  <Label for="extra_participants">
                                    Participantes extras
                                  </Label>
                                  <div className="position-relative">
                                    <Field
                                      // type="number"
                                      name="extra_participants"
                                      id="extra_participants"
                                      className="form-control"
                                      render={({ field }) => (
                                        <QuantityFormat
                                          // eslint-disable-next-line react/jsx-props-no-spreading
                                          {...field}
                                          id="extra_participants"
                                          name="extra_participants"
                                          className="form-control"
                                          value={values.extra_participants || 0}
                                        />
                                      )}
                                    />
                                  </div>
                                </FormGroup>
                              </Col>
                            )}
                          </Row>

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
                                        selected={
                                          eventDetails.country === country.id
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
                                      <option value="">
                                        Selecione uma opção
                                      </option>

                                      {states.map(state => {
                                        return (
                                          <option
                                            key={state.id}
                                            value={state.id}
                                            selected={
                                              eventDetails.apiUf === state.id
                                            }
                                          >
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
                                      <option value="">
                                        Selecione uma opção
                                      </option>
                                      {cities.map(city => {
                                        return (
                                          <option
                                            key={city.id}
                                            value={city.id}
                                            selected={
                                              eventDetails.apiCity === city.id
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
                                    onChange={handleChange}
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

                          {/*
                          <Row>
                            <Col sm="12" md="8" lg="8">
                              <FormGroup>
                                <Label for="street">Rua</Label>
                                <div className="position-relative has-icon-left">
                                  <Field
                                    type="text"
                                    placeholder="Rua"
                                    autoComplete="street"
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
                            <Col sm="12" md="4" lg="4">
                              <FormGroup>
                                <Label for="streetNumber">Número</Label>
                                <div className="position-relative has-icon-left">
                                  <Field
                                    type="text"
                                    placeholder="Número"
                                    autoComplete="number"
                                    name="number"
                                    id="number"
                                    className={`
                                  form-control
                                  ${errors.number &&
                                    touched.number &&
                                    'is-invalid'}
                                `}
                                  />
                                  {errors.number && touched.number ? (
                                    <div className="invalid-feedback">
                                      {errors.number}
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
                            <Col sm="12" md="6" lg="4">
                              <FormGroup>
                                <Label for="neighborhood">Bairro</Label>
                                <div className="position-relative has-icon-left">
                                  <Field
                                    type="text"
                                    placeholder="Bairro"
                                    autoComplete="neighborhood"
                                    name="neighborhood"
                                    id="neighborhood"
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
                            <Col sm="12" md="6" lg="8">
                              <FormGroup>
                                <Label for="complement">Complemento</Label>
                                <div className="position-relative has-icon-left">
                                  <Field
                                    type="text"
                                    autoComplete="complement"
                                    id="complement"
                                    name="complement"
                                    placeholder="Ex: Apartamento 1"
                                    className="form-control"
                                  />
                                  <div className="form-control-position">
                                    <Edit size={14} color="#212529" />
                                  </div>
                                </div>
                              </FormGroup>
                            </Col>
                          </Row>
                           */}

                          <Row>
                            <Col xl="3" lg="4" md="5" sm="12">
                              <FormGroup>
                                <Label for="initialDate">Inicio</Label>
                                <div className="position-relative has-icon-left">
                                  <Datepicker
                                    name="initialDate"
                                    id="initialDate"
                                    locale={pt}
                                    selected={event_data.start_date}
                                    onChange={date =>
                                      setFieldValue('initialDate', date)
                                    }
                                    customInput={<DatepickerButton />}
                                    minDate={subMonths(new Date(), 12)}
                                    dateFormat="dd/MM/yyyy"
                                    // showTimeSelect
                                    // timeFormat="HH:mm"
                                    // timeIntervals={5}
                                    // timeCaption="Horário"
                                    withPortal
                                    fixedHeight
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    className={`
                                      form-control
                                      ${errors.initialDate &&
                                        touched.initialDate &&
                                        'is-invalid'}
                                    `}
                                  />
                                  {errors.initialDate && touched.initialDate ? (
                                    <div className="invalid-feedback">
                                      {errors.initialDate}
                                    </div>
                                  ) : null}
                                  <div className="form-control-position">
                                    <Calendar size={14} color="#212529" />
                                  </div>
                                </div>
                              </FormGroup>
                            </Col>
                            <Col xl="3" lg="3" md="5" sm="12">
                              <FormGroup>
                                <Label for="endDate">Formatura</Label>
                                <div className="position-relative has-icon-left">
                                  <Datepicker
                                    name="endDate"
                                    id="endDate"
                                    locale={pt}
                                    selected={values.endDate}
                                    onChange={date =>
                                      setFieldValue('endDate', date)
                                    }
                                    minDate={values.initialDate}
                                    customInput={<DatepickerButton />}
                                    dateFormat="dd/MM/yyyy"
                                    // showTimeSelect
                                    // timeFormat="HH:mm"
                                    // timeIntervals={5}
                                    // timeCaption="Horário"
                                    withPortal
                                    fixedHeight
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    className="form-control"
                                  />
                                  <div className="form-control-position">
                                    <Calendar size={14} color="#212529" />
                                  </div>
                                </div>
                              </FormGroup>
                            </Col>
                          </Row>

                          <Row>
                            <Col sm="4">
                              <FormGroup>
                                <Label>Modalidade</Label>
                                <Input
                                  type="select"
                                  id="modality"
                                  name="modality"
                                  onChange={e => {
                                    handleModalityChange(e, setFieldValue);
                                  }}
                                >
                                  <option
                                    key="presencial"
                                    value="Presencial"
                                    selected={
                                      eventDetails.modality === 'Presencial'
                                    }
                                  >
                                    Presencial
                                  </option>
                                  <option
                                    key="online"
                                    value="Online"
                                    selected={
                                      eventDetails.modality === 'Online'
                                    }
                                  >
                                    Online
                                  </option>
                                  <option
                                    key="misto"
                                    value="Misto"
                                    selected={eventDetails.modality === 'Misto'}
                                  >
                                    Misto
                                  </option>
                                </Input>
                              </FormGroup>
                            </Col>
                          </Row>

                          {/* {profile_data.admin && (
                            <Row>
                              <Col>
                                <Field
                                  type="checkbox"
                                  disabled={event_data.is_admin_printed}
                                  id="isAdminPrinted"
                                  name="isAdminPrinted"
                                />
                                <Label for="isAdminPrinted" className="pl-3">
                                  Certificado enviado
                                </Label>
                              </Col>
                            </Row>
                          )} */}
                        </div>
                        <div className="form-actions right">
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
                                Atualizar dados
                              </Button>
                            )}
                          </FormGroup>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </CardBody>
            </Card>
          </TabPane>

          {/* Organizadores */}
          <TabPane tabId="2">
            <Row>
              {/* BOTAO PARA ADICIONAR ORGANIZADOR */}
              {handleEnableAddOrganizatorButton() ? (
                <Col xs="12" md="6" lg="4" className="align-self-center">
                  {/* <Card className="height-375 justify-content-center"> */}
                  <div className="d-flex justify-content-center align-items-center">
                    <Button
                      className="rounded-circle width-150 height-150"
                      outline
                      color="success"
                      onClick={toggleModalOrganizator}
                    >
                      <i className="fa fa-plus" />
                    </Button>
                  </div>
                  {/* </Card> */}
                </Col>
              ) : (
                <Col xs="12" md="6" lg="4" className="align-self-center">
                  {/* <Card className="height-375 justify-content-center"> */}
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <Button
                      className="rounded-circle width-150 height-150"
                      outline
                      color="secondary"
                      disabled
                    >
                      <i className="fa fa-plus" />
                    </Button>
                    {(() => {
                      if (
                        event_data.defaultEvent.max_global_inscriptions >
                          maxGlobalInscriptions &&
                        event_data.is_finished === false
                      ) {
                        return (
                          <h6 className="p-2 text-danger text-center">
                            A quantidade máxima de líderes e líderes em
                            treinamento foi atingida
                          </h6>
                        );
                      }
                      if (event_data.is_finished) {
                        return (
                          <h6 className="p-2 text-danger text-center">
                            Evento finalizado
                          </h6>
                        );
                      }
                      return (
                        <h6 className="p-2 text-danger text-center">
                          A quantidade máxima de participantes, líderes em
                          treinamento ou líderes foi atingida
                        </h6>
                      );
                    })()}

                    {/* {event_data.defaultEvent.max_global_inscriptions >
                    maxGlobalInscriptions ? (
                      <h6 className="p-2 text-danger text-center">
                        A quantidade máxima de líderes e líderes em treinamento
                        foi atingida
                      </h6>
                    ) : (
                      <h6 className="p-2 text-danger text-center">
                        A quantidade máxima de participantes, líderes em
                        treinamento ou líderes foi atingida
                      </h6>
                    )} */}
                  </div>
                  {/* </Card> */}
                </Col>
              )}
              {/* fim do botao */}

              {/* ORGANIZADORES */}
              {event_data.organizators.map(organizator => {
                return (
                  <Col sm="12" md="4">
                    <Card className="text-left" key={organizator.id}>
                      <div className="card-img">
                        <img
                          className="rounded-top"
                          width="100%"
                          src={
                            organizator.file
                              ? organizator.file.url
                              : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                          }
                          alt="Card cap 14"
                        />
                        <CardTitle>
                          <Badge
                            style={{
                              background: 'rgba(0, 0, 0, 0.4)',
                              color: '#fff',
                              whiteSpace: 'normal',
                            }}
                            className="float-right width-100-per"
                            color="light"
                          >
                            {organizator.name}
                          </Badge>
                        </CardTitle>

                        {(() => {
                          if (!event_data.is_finished) {
                            if (event_data.organizators.length > 1) {
                              return (
                                <NavLink
                                  onClick={() => {
                                    handleDeleteOrganizator(organizator.id);
                                  }}
                                  className="btn btn-floating halfway-fab bg-danger"
                                  id={`remove-leader-${organizator.id}`}
                                >
                                  <X size={25} color="#FFF" />
                                  <UncontrolledTooltip
                                    placement="right"
                                    target={`remove-leader-${organizator.id}`}
                                  >
                                    Remover líder
                                  </UncontrolledTooltip>
                                </NavLink>
                              );
                            }
                            return (
                              <NavLink
                                onClick={toggleModalChangeOrganizator}
                                className="btn btn-floating halfway-fab bg-warning"
                                id="change_leader"
                              >
                                <RefreshCw size={25} color="#FFF" />
                                <UncontrolledTooltip
                                  placement="right"
                                  target="change_leader"
                                >
                                  Substituir-se
                                </UncontrolledTooltip>
                              </NavLink>
                            );
                          }
                        })()}

                        <NavLink
                          onClick={() => {
                            toggleOpenModalViewLeader(organizator);
                          }}
                          className={`btn btn-floating bg-info ${
                            event_data.is_finished
                              ? 'halfway-fab'
                              : 'halfway-fab-2'
                          }`}
                          id={`view-leader-${organizator.id}`}
                        >
                          <Eye size={25} color="#FFF" />
                          <UncontrolledTooltip
                            placement="right"
                            target={`view-leader-${organizator.id}`}
                          >
                            Ver detalhes
                          </UncontrolledTooltip>
                        </NavLink>
                      </div>
                      <CardBody className="mt-2">
                        <CardText>
                          <Row className="mb-1 flex-column">
                            <Col>
                              <Phone size={18} color="#212529" />
                              {organizator.phone ? (
                                <NumberFormat
                                  className="ml-2"
                                  displayType="text"
                                  format="(##)#########"
                                  value={organizator.phone}
                                />
                              ) : (
                                <span className="ml-2">Sem telefone</span>
                              )}
                            </Col>
                            <Col>
                              <Mail size={18} color="#212529" />
                              {organizator.email ? (
                                <span className="ml-2">
                                  {organizator.email}
                                </span>
                              ) : (
                                <span className="ml-2">Sem email</span>
                              )}
                            </Col>
                            <Col>
                              <CreditCard size={18} color="#212529" />
                              {organizator.cpf ? (
                                <NumberFormat
                                  className="ml-2"
                                  displayType="text"
                                  format="###.###.###-##"
                                  value={organizator.cpf}
                                />
                              ) : (
                                <span className="ml-2">Sem CPF</span>
                              )}
                            </Col>
                          </Row>
                        </CardText>
                        <Badge className="float-right mr-1" color="success">
                          Líder
                        </Badge>
                      </CardBody>
                    </Card>
                  </Col>
                );
              })}

              {/* ASSISTENTES */}
              {event_data.participants.map(participant => {
                if (
                  participant.pivot.assistant &&
                  !participant.pivot.is_quitter
                ) {
                  return (
                    <Col xs="12" md="6" lg="4">
                      <Card className="text-left" key={participant.id}>
                        <div className="card-img">
                          <img
                            className="rounded-top"
                            width="100%"
                            src={
                              participant.file
                                ? participant.file.url
                                : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                            }
                            alt="Card cap 14"
                          />
                          <CardTitle>
                            <Badge
                              style={{
                                background: 'rgba(0, 0, 0, 0.4)',
                                color: '#fff',
                                whiteSpace: 'normal',
                              }}
                              className="float-right width-100-per"
                              color="light"
                            >
                              {participant.name}
                            </Badge>
                          </CardTitle>
                          {!event_data.is_finished && (
                            <NavLink
                              onClick={() => {
                                if (finishedLessons.length === 0) {
                                  handleDeleteParticipant(
                                    participant.id,
                                    participant.pivot.id
                                  );
                                } else {
                                  handleSetTrainingLeaderQuitter(
                                    participant.name,
                                    participant.pivot.id
                                  );
                                }
                              }}
                              className="btn btn-floating halfway-fab bg-danger"
                              id={`remove-training-leader-${participant.id}`}
                            >
                              <X size={25} color="#FFF" />
                              <UncontrolledTooltip
                                placement="right"
                                target={`remove-training-leader-${participant.id}`}
                              >
                                {finishedLessons.length === 0
                                  ? 'Remover líder em treinamento'
                                  : 'Tornar líder em treinamento em desistente'}
                              </UncontrolledTooltip>
                            </NavLink>
                          )}
                          <NavLink
                            onClick={() => {
                              toggleOpenModalViewLeader(participant);
                            }}
                            className={`btn btn-floating bg-info ${
                              event_data.is_finished
                                ? 'halfway-fab'
                                : 'halfway-fab-2'
                            }`}
                            id={`view-training-leader-${participant.id}`}
                          >
                            <Eye size={25} color="#FFF" />
                            <UncontrolledTooltip
                              placement="right"
                              target={`view-training-leader-${participant.id}`}
                            >
                              Ver detalhes
                            </UncontrolledTooltip>
                          </NavLink>
                        </div>
                        <CardBody className="mt-2">
                          <CardText>
                            <Row className="mb-1 flex-column">
                              <Col>
                                <Phone size={18} color="#212529" />
                                {participant.phone ? (
                                  <NumberFormat
                                    className="ml-2"
                                    displayType="text"
                                    format="(##)#########"
                                    value={participant.phone}
                                  />
                                ) : (
                                  <span className="ml-2">Sem telefone</span>
                                )}
                              </Col>
                              <Col>
                                <Mail size={18} color="#212529" />
                                {participant.email ? (
                                  <span className="ml-2">
                                    {participant.email}
                                  </span>
                                ) : (
                                  <span className="ml-2">Sem email</span>
                                )}
                              </Col>
                              <Col>
                                <CreditCard size={18} color="#212529" />
                                {participant.cpf ? (
                                  <NumberFormat
                                    className="ml-2"
                                    displayType="text"
                                    format="###.###.###-##"
                                    value={participant.cpf}
                                  />
                                ) : (
                                  <span className="ml-2">Sem CPF</span>
                                )}
                              </Col>
                            </Row>
                          </CardText>
                          <Badge className="float-right" color="warning">
                            Líder em treinamento
                          </Badge>
                        </CardBody>
                      </Card>
                    </Col>
                  );
                }
                return null;
              })}
            </Row>
          </TabPane>

          <Modal isOpen={modalViewLeader} toggle={toggleCloseModalViewLeader}>
            <ModalHeader>Visualizar dados do líder</ModalHeader>
            <Formik enableReinitialize initialValues={leaderViewData}>
              {() => (
                <Form>
                  <ModalBody>
                    <FormGroup>
                      <Row className="mb-2 px-2">
                        <Col sm="6" md="6" lg="6">
                          <Label for="leader_id">ID</Label>
                          <Input
                            readOnly
                            type="text"
                            name="leader_id"
                            id="leader_id"
                            value={leaderViewData ? leaderViewData.id : ''}
                            className="form-control"
                          />
                        </Col>
                        <Col sm="6" md="6" lg="6">
                          <Label for="netsuite_id">Netsuite ID</Label>
                          <Input
                            readOnly
                            type="text"
                            name="netsuite_id"
                            id="netsuite_id"
                            value={
                              leaderViewData ? leaderViewData.netsuite_id : ''
                            }
                            className="form-control"
                          />
                        </Col>
                      </Row>
                      <Col sm="12" md="12" lg="12" className="mb-2">
                        <Label for="name">Nome</Label>
                        <Input
                          readOnly
                          type="text"
                          name="name"
                          id="name"
                          value={leaderViewData ? leaderViewData.name : ''}
                          className="form-control"
                        />
                      </Col>
                      <Col sm="12" md="12" lg="12" className="mb-2">
                        <Label for="cpf">CPF</Label>
                        <CPFFormat
                          id="cpf"
                          name="cpf"
                          readOnly
                          value={leaderViewData ? leaderViewData.cpf : ''}
                          className="form-control"
                        />
                      </Col>
                      <Col sm="12" md="12" lg="12" className="mb-2">
                        <Label for="email">Email</Label>
                        <Input
                          readOnly
                          type="text"
                          name="email"
                          id="email"
                          value={leaderViewData ? leaderViewData.email : ''}
                          className="form-control"
                        />
                      </Col>
                      <Col sm="12" md="12" lg="12" className="mb-2">
                        <Label for="phone">Telefone principal (NF)</Label>
                        <PhoneFormat
                          id="phone"
                          name="phone"
                          readOnly
                          value={leaderViewData ? leaderViewData.phone : ''}
                          className="form-control"
                        />
                      </Col>
                      <Col sm="12" md="12" lg="12" className="mb-2">
                        <Label for="altPhone">Telefone</Label>
                        <PhoneFormat
                          id="altPhone"
                          name="altPhone"
                          readOnly
                          value={leaderViewData ? leaderViewData.alt_phone : ''}
                          className="form-control"
                        />
                      </Col>
                    </FormGroup>
                  </ModalBody>
                </Form>
              )}
            </Formik>
          </Modal>

          {/* Participantes */}
          <TabPane tabId="3">
            <>
              <Row className="row-eq-height">
                <Col sm="12">
                  <Card>
                    <CardBody>
                      <div className="d-flex justify-content-between">
                        <Badge color="success" className="align-self-center">
                          Participantes inscritos: {totalParticipants}
                        </Badge>
                        <Row className="master">
                          <div className="profile-cover-buttons">
                            <div className="media-body halfway-fab">
                              {handleEnableAddParticipantButton() ? (
                                <>
                                  <div className="d-none d-sm-none d-md-none d-lg-block ml-auto">
                                    <Button
                                      color="success"
                                      className="btn-raised mr-2 mb-0 font-small-3"
                                      onClick={toggleModalParticipant}
                                    >
                                      <i className="fa fa-user fa-xs" /> Inserir
                                      participante
                                    </Button>
                                  </div>

                                  <div className="ml-2">
                                    <Button
                                      color="success"
                                      className="btn-raised mr-3 d-lg-none"
                                      onClick={toggleModalParticipant}
                                    >
                                      <i className="fa fa-plus" />
                                    </Button>
                                  </div>
                                </>
                              ) : (
                                <div />
                              )}
                            </div>
                          </div>
                        </Row>
                      </div>
                      <CustomTabs
                        TabContent={
                          <ParticipantTable
                            data={event_data.participants.filter(
                              participant => {
                                return (
                                  participant.pivot.assistant === false &&
                                  participant.pivot.is_quitter === false
                                );
                              }
                            )}
                            eventData={event_data}
                            finishedLessons={finishedLessons}
                            isAdmin={profile_data.admin}
                          />
                        }
                      />
                    </CardBody>
                  </Card>
                  <Card>
                    <CardBody>
                      <div className="d-flex justify-content-between">
                        <Badge color="danger" className="align-self-center">
                          Desistentes: {totalQuitters}
                        </Badge>
                      </div>
                      <CustomTabs
                        TabContent={
                          <QuitterTable
                            data={event_data.participants.filter(
                              participant => {
                                return participant.pivot.is_quitter === true;
                              }
                            )}
                            totalParticipant={handleEnableAddParticipantButton()}
                            eventData={event_data}
                          />
                        }
                      />
                    </CardBody>
                  </Card>
                  <Card>
                    <CardBody>
                      <div className="d-flex justify-content-between">
                        <Badge color="warning" className="align-self-center">
                          Convites pendentes: {invites.length}
                        </Badge>
                      </div>
                      <CustomTabs
                        TabContent={<InvitedTable data={invites} />}
                      />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </>
          </TabPane>

          {/* AULAS */}
          <TabPane tabId="4">
            <Row>
              <Col xs="12">
                <Card>
                  <CardBody>
                    <div className="grid-hover p-0 py-4">
                      <Row className="justify-content-around align-items-center">
                        {event_data.lessonReports.map(lessonReport => {
                          return (
                            <div
                              className="lesson-container"
                              key={lessonReport.id}
                            >
                              <figure
                                className={`${
                                  lessonReport.is_finished
                                    ? 'effect-finished'
                                    : 'effect-chico'
                                }`}
                              >
                                <img
                                  src={lessonReport.lesson.img_url}
                                  alt="img1"
                                />
                                <figcaption>
                                  <div>
                                    <h2>
                                      <span>{lessonReport.lesson.title}</span>
                                    </h2>
                                    {lessonReport.is_finished && (
                                      <h6 className="font-weight-bold">
                                        <em>(Aula concluida)</em>
                                      </h6>
                                    )}
                                    <p className="white">
                                      {lessonReport.lesson.description}
                                    </p>
                                  </div>
                                  <Link
                                    onClick={e => verifyInscriptionsFinished(e)}
                                    to={`/eventos/grupo/${event_data.id}/editar/aula/${lessonReport.id}`}
                                  />
                                </figcaption>
                              </figure>
                            </div>
                          );
                        })}
                      </Row>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </TabContent>

        <Modal isOpen={modalOrganizator} toggle={toggleModalOrganizator}>
          <ModalHeader>Pequisar líder/líder em treinamento</ModalHeader>
          <Formik
            initialValues={{
              organizator_type: '',
              country: event_data.country || 'BRASIL',
              cpf: '',
              email: '',
            }}
            validationSchema={formOrganizator}
          >
            {({ errors, touched, values, setFieldValue }) => (
              <Form>
                <ModalBody>
                  <div className="form-body">
                    <Row className="d-flex flex-row">
                      <Col sm="12" md="12" lg="5" className="mb-2">
                        <Field
                          type="select"
                          component="select"
                          id="organizator_type"
                          name="organizator_type"
                          className={`
                          form-control
                          ${errors.organizator_type &&
                            touched.organizator_type &&
                            'is-invalid'}
                        `}
                          onChange={event =>
                            handleOrganizatorType(event, setFieldValue)
                          }
                        >
                          <option value="" disabled="">
                            Selecione uma opção
                          </option>
                          {event_data.defaultEvent.max_organizators >
                            event_data.organizators.length && (
                            <option value={options[0].value}>
                              {options[0].label}
                            </option>
                          )}

                          {event_data.defaultEvent.max_assistants >
                            assistants.length && (
                            <option value={options[1].value}>
                              {options[1].label}
                            </option>
                          )}
                        </Field>
                        {errors.organizator_type && touched.organizator_type ? (
                          <div className="invalid-feedback">
                            {errors.organizator_type}
                          </div>
                        ) : null}
                      </Col>
                      {(() => {
                        if (values.organizator_type !== '') {
                          if (event_data.country === 'BRASIL') {
                            return (
                              <Col lg="7" md="12" sm="12">
                                <FormGroup>
                                  <div className="position-relative has-icon-right">
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
                                          {...field}
                                          id="cpf"
                                          name="cpf"
                                          placeholder="digite aqui o CPF"
                                          className={`
                                    form-control
                                    ${errors.cpf && touched.cpf && 'is-invalid'}
                                  `}
                                          value={values.cpf}
                                          onValueChange={val =>
                                            handleSearchOrganizator(
                                              val.value,
                                              null,
                                              setFieldValue,
                                              values
                                            )
                                          }
                                        />
                                      )}
                                    />
                                    {errors.cpf && touched.cpf ? (
                                      <div className="invalid-feedback">
                                        {errors.cpf}
                                      </div>
                                    ) : null}
                                    {loadingOrganizator && (
                                      <div className="form-control-position">
                                        <RefreshCw
                                          size={16}
                                          className="spinner"
                                        />
                                      </div>
                                    )}
                                  </div>
                                </FormGroup>
                              </Col>
                            );
                          }
                          return (
                            <Col lg="7" md="12" sm="12">
                              <FormGroup>
                                <div className="position-relative has-icon-right">
                                  <InputGroup>
                                    <Field
                                      type="text"
                                      name="email"
                                      id="email"
                                      placeholder="digite aqui o email"
                                      className={`
                                form-control
                                ${errors.email && touched.email && 'is-invalid'}
                              `}
                                    />
                                    {loadingOrganizator && (
                                      <div className="form-control-position">
                                        <RefreshCw
                                          size={16}
                                          className="spinner"
                                        />
                                      </div>
                                    )}
                                    <InputGroupAddon addonType="append">
                                      <NavLink
                                        className="btn bg-info"
                                        disabled={!values.email}
                                        onClick={e => {
                                          e.preventDefault();
                                          handleSearchOrganizator(
                                            null,
                                            values.email,
                                            setFieldValue,
                                            values
                                          );
                                        }}
                                      >
                                        <Search size={18} color="#fff" />
                                      </NavLink>
                                    </InputGroupAddon>
                                    {errors.email && touched.email ? (
                                      <div className="invalid-feedback">
                                        {errors.email}
                                      </div>
                                    ) : null}
                                  </InputGroup>
                                </div>
                              </FormGroup>
                            </Col>
                          );
                        }
                      })()}
                    </Row>
                  </div>

                  <div>
                    {leaderData !== null && leaderData.id && (
                      <Col>
                        <Card>
                          <CardHeader className="text-center">
                            <img
                              src={
                                leaderData.file
                                  ? leaderData.file.url
                                  : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                              }
                              alt={leaderData.name}
                              width="150"
                              height="150"
                              className="rounded-circle gradient-mint"
                            />
                          </CardHeader>
                          <CardBody>
                            <h4 className="card-title text-center">
                              {leaderData.name}
                            </h4>
                            <p className="category text-gray text-center font-small-4">
                              {leaderData.cpf}
                            </p>
                            <hr className="grey" />
                            <Row className="mb-1">
                              <Col xs="6" className="text-center text-truncate">
                                <Phone size={18} color="#212529" />
                                {leaderData.phone ? (
                                  <span className="ml-2">
                                    {leaderData.phone}
                                  </span>
                                ) : (
                                  <span className="ml-2">Sem telefone</span>
                                )}
                              </Col>
                              <Col xs="6" className="text-center text-truncate">
                                <Mail size={18} color="#212529" />
                                {leaderData.email ? (
                                  <span className="ml-2">
                                    {leaderData.email}
                                  </span>
                                ) : (
                                  <span className="ml-2">Sem email</span>
                                )}
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                    )}
                  </div>
                  <div>
                    {trainingLeaderError &&
                      organizatorType === 'training_leader' &&
                      event_data.defaultEvent.assistant_hierarchy_id === 0 && (
                        <>
                          <p className="text-danger p-3">
                            {organizator_data !== null &&
                            !!organizator_data?.error
                              ? organizator_data.error.message
                              : ''}
                          </p>
                          <Row className="justify-content-between p-3">
                            <Button
                              color="success"
                              onClick={toggleModalAddTrainingLeader}
                            >
                              <i className="fa fa-plus" /> Cadastrar novo líder
                              em treinamento
                            </Button>
                          </Row>
                        </>
                      )}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    className="ml-1 my-1"
                    color="danger"
                    onClick={toggleModalOrganizator}
                  >
                    Cancelar
                  </Button>{' '}
                  <Button
                    className={`${
                      leaderData !== null
                        ? 'ml-1 my-1 btn-success'
                        : 'ml-1 my-1 btn-secondary'
                    }`}
                    onClick={confirmModalOrganizator}
                    disabled={leaderData === null}
                  >
                    {loading ? (
                      <BounceLoader
                        size={23}
                        color="#fff"
                        css={css`
                          display: block;
                          margin: 0 auto;
                        `}
                      />
                    ) : (
                      'Adicionar organizador'
                    )}
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </Modal>

        <Modal
          isOpen={modalChangeOrganizator}
          toggle={toggleModalChangeOrganizator}
        >
          <ModalHeader>Pesquisar líder para substitui-lo</ModalHeader>
          <Formik
            initialValues={{
              organizator_type: 'leader',
              cpf: '',
            }}
            validationSchema={formOrganizator}
          >
            {({ values, setFieldValue, errors, touched }) => (
              <Form>
                <ModalBody>
                  <div className="form-body">
                    <Row className="d-flex flex-row">
                      <Col sm="12" md="12" lg="12" className="mb-2">
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
                              {...field}
                              id="cpf"
                              name="cpf"
                              placeholder="digite aqui o CPF"
                              className={`
                                      form-control
                                      ${errors.cpf &&
                                        touched.cpf &&
                                        'is-invalid'}
                                    `}
                              value={values.cpf}
                              onValueChange={val =>
                                handleSearchOrganizator(
                                  val.value,
                                  null,
                                  setFieldValue,
                                  values
                                )
                              }
                            />
                          )}
                        />
                        {errors.cpf && touched.cpf ? (
                          <div className="invalid-feedback">{errors.cpf}</div>
                        ) : null}
                      </Col>
                    </Row>
                  </div>

                  <div>
                    {leaderData !== null && leaderData.id && (
                      <Col>
                        <Card>
                          <CardHeader className="text-center">
                            <img
                              src={
                                leaderData.file
                                  ? leaderData.file.url
                                  : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                              }
                              alt={leaderData.name}
                              width="150"
                              height="150"
                              className="rounded-circle gradient-mint"
                            />
                          </CardHeader>
                          <CardBody>
                            <h4 className="card-title text-center">
                              {leaderData.name}
                            </h4>
                            <p className="category text-gray text-center font-small-4">
                              {leaderData.cpf}
                            </p>
                            <hr className="grey" />
                            <Row className="mb-1">
                              <Col xs="6" className="text-center text-truncate">
                                <Phone size={18} color="#212529" />
                                {leaderData.phone ? (
                                  <span className="ml-2">
                                    {leaderData.phone}
                                  </span>
                                ) : (
                                  <span className="ml-2">Sem telefone</span>
                                )}
                              </Col>
                              <Col xs="6" className="text-center text-truncate">
                                <Mail size={18} color="#212529" />
                                {leaderData.email ? (
                                  <span className="ml-2">
                                    {leaderData.email}
                                  </span>
                                ) : (
                                  <span className="ml-2">Sem email</span>
                                )}
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                    )}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    className="ml-1 my-1"
                    color="danger"
                    onClick={toggleModalChangeOrganizator}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className={`${
                      leaderData !== null
                        ? 'ml-1 my-1 btn-success'
                        : 'btn-secundary ml-1 my-1'
                    }`}
                    // color="success"
                    onClick={confirmModalChangeOrganizator}
                    disabled={leaderData === null}
                  >
                    {loading ? (
                      <BounceLoader
                        size={23}
                        color="#fff"
                        css={css`
                          display: block;
                          margin: 0 auto;
                        `}
                      />
                    ) : (
                      'Trocar líder principal'
                    )}
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </Modal>

        <Modal isOpen={modalParticipant} toggle={toggleModalParticipant}>
          <ModalHeader>Inserir participante</ModalHeader>
          <ModalBody>
            <CardBody className="d-flex flex-column justify-content-center">
              <Button
                outline
                type="submit"
                color="default"
                className="btn-default height-100 icon-light-hover font-medium-2"
                onClick={toggleModalSearchParticipant}
              >
                <div className="d-flex justify-content-around align-items-center">
                  <Search size={24} color="#000" className="mr-2" />
                  <div>
                    <h5 className="mb-0">
                      {event_data.country === 'BRASIL'
                        ? 'Inserir participante com CPF'
                        : 'Inserir participante com email'}
                    </h5>
                  </div>
                  <ArrowRightCircle size={24} color="#000" className="mr-2" />
                </div>
              </Button>

              {profile_data.admin && (
                <Button
                  outline
                  type="submit"
                  color="default"
                  className="btn-default height-100 icon-light-hover font-medium-2"
                  onClick={toggleModalAddParticipant}
                >
                  <div className="d-flex justify-content-around align-items-center">
                    <Plus size={24} color="#000" className="mr-2" />
                    <div>
                      <h5 className="mb-0">
                        Cadastrar participante manualmente
                      </h5>
                    </div>
                    <ArrowRightCircle size={24} color="#000" className="mr-2" />
                  </div>
                </Button>
              )}

              <Button
                outline
                type="submit"
                color="default"
                className="btn-default height-100 icon-light-hover font-medium-2"
                onClick={() => {
                  toggleModalInvite();
                  setIsBuyer(false);
                }}
              >
                <div className="d-flex justify-content-around align-items-center">
                  <Mail size={24} color="#000" className="mr-2" />
                  <div>
                    <h5 className="mb-0">Convidar participante por email</h5>
                  </div>
                  <ArrowRightCircle size={24} color="#000" className="mr-2" />
                </div>
              </Button>

              <Button
                outline
                type="submit"
                color="default"
                className="btn-default height-100 icon-light-hover font-medium-2"
                onClick={() => {
                  toggleModalInvite();
                  setIsBuyer(true);
                }}
              >
                <div className="d-flex justify-content-around align-items-center">
                  <Mail size={24} color="#000" className="mr-2" />
                  <div>
                    <h5 className="mb-0">
                      Convidar participante para se inscrever e comprar
                    </h5>
                  </div>
                  <ArrowRightCircle size={24} color="#000" className="mr-2" />
                </div>
              </Button>
            </CardBody>
          </ModalBody>
        </Modal>

        <Modal
          isOpen={modalSearchParticipant}
          toggle={toggleModalSearchParticipant}
        >
          <ModalHeader>
            {event_data.country === 'BRASIL'
              ? 'Pesquisar participante por CPF'
              : 'Pesquisar participante por email'}
          </ModalHeader>
          <Formik
            initialValues={{
              country: event_data.country || 'BRASIL',
              cpf: '',
              email: '',
            }}
            validationSchema={formParticipant}
          >
            {({ errors, touched, values }) => (
              <Form>
                <ModalBody>
                  <div className="form-body">
                    <Row className="d-flex flex-row">
                      <Col lg="12" md="12" sm="12">
                        <FormGroup>
                          {event_data.country === 'BRASIL' ? (
                            <div className="position-relative has-icon-right">
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
                                    {...field}
                                    id="cpf"
                                    name="cpf"
                                    placeholder="digite aqui o CPF"
                                    className={`
                                      form-control
                                      ${errors.cpf &&
                                        touched.cpf &&
                                        'is-invalid'}
                                    `}
                                    value={values.cpf}
                                    onValueChange={val =>
                                      handleSearchParticipant(val.value, null)
                                    }
                                  />
                                )}
                              />
                              {errors.cpf && touched.cpf ? (
                                <div className="invalid-feedback">
                                  {errors.cpf}
                                </div>
                              ) : null}
                              {loadingOrganizator && (
                                <div className="form-control-position">
                                  <RefreshCw size={16} className="spinner" />
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="position-relative has-icon-right">
                              <InputGroup>
                                <Field
                                  type="text"
                                  name="email"
                                  id="email"
                                  placeholder="digite aqui o email"
                                  className={`
                                  form-control
                                  ${errors.email &&
                                    touched.email &&
                                    'is-invalid'}
                                `}
                                />
                                {loadingOrganizator && (
                                  <div className="form-control-position">
                                    <RefreshCw size={16} className="spinner" />
                                  </div>
                                )}
                                <InputGroupAddon addonType="append">
                                  <NavLink
                                    className="btn bg-info"
                                    onClick={e => {
                                      e.preventDefault();
                                      handleSearchParticipant(
                                        null,
                                        values.email
                                      );
                                    }}
                                  >
                                    <Search size={18} color="#fff" />
                                  </NavLink>
                                </InputGroupAddon>
                                {errors.email && touched.email ? (
                                  <div className="invalid-feedback">
                                    {errors.email}
                                  </div>
                                ) : null}
                              </InputGroup>
                            </div>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>

                  <div>
                    {participantData !== null && participant_data.id && (
                      <Col>
                        <Card>
                          <CardHeader className="text-center">
                            <img
                              src={
                                participantData.file
                                  ? participantData.file.url
                                  : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                              }
                              alt={participantData.name}
                              width="150"
                              height="150"
                              className="rounded-circle gradient-mint"
                            />
                          </CardHeader>
                          <CardBody>
                            <h4 className="card-title text-center">
                              {participantData.name}
                            </h4>
                            <p className="category text-gray text-center font-small-4">
                              {participantData.cpf}
                            </p>
                            <hr className="grey" />
                            <Row className="mb-1">
                              <Col xs="6" className="text-center text-truncate">
                                <Phone size={18} color="#212529" />
                                {participantData.phone ? (
                                  <span className="ml-2">
                                    {participantData.phone}
                                  </span>
                                ) : (
                                  <span className="ml-2">Sem telefone</span>
                                )}
                              </Col>
                              <Col xs="6" className="text-center text-truncate">
                                <Mail size={18} color="#212529" />
                                {participantData.email ? (
                                  <span className="ml-2">
                                    {participantData.email}
                                  </span>
                                ) : (
                                  <span className="ml-2">Sem email</span>
                                )}
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                    )}
                  </div>
                  <div>
                    {participantError && (
                      <>
                        <p className="text-danger p-3">
                          {participant_data !== null && !!participant_data.error
                            ? participant_data.error.message
                            : ''}
                        </p>
                        <Row className="justify-content-between p-3">
                          <Button
                            color="success"
                            onClick={toggleModalAddParticipant}
                          >
                            <i className="fa fa-plus" /> Cadastrar novo
                            participante
                          </Button>
                          <Button
                            color="warning"
                            className="text-white"
                            onClick={toggleModalInvite}
                          >
                            <i className="fa fa-paper-plane fa-xs" /> Convidar
                            por email
                          </Button>
                        </Row>
                      </>
                    )}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    className="ml-1 my-1"
                    color="danger"
                    onClick={toggleModalSearchParticipant}
                  >
                    Cancelar
                  </Button>{' '}
                  <Button
                    className={`${
                      participantData !== null
                        ? 'ml-1 my-1 btn-success'
                        : 'btn-secundary ml-1 my-1'
                    }`}
                    onClick={confirmModalSearchParticipant}
                    disabled={participantData === null}
                  >
                    {participant_loading_search ? (
                      <BounceLoader
                        size={23}
                        color="#fff"
                        css={css`
                          display: block;
                          margin: 0 auto;
                        `}
                      />
                    ) : (
                      'Adicionar participante'
                    )}
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </Modal>

        <Modal
          isOpen={modalAddTrainingLeader}
          toggle={toggleModalAddTrainingLeader}
        >
          <ModalHeader>Cadastrar líder em treinamento2</ModalHeader>
          <Formik
            initialValues={{
              admin: profile_data.admin || false,
              name: '',
              email: '',
              cpf: cpfNotFound || '',
              sex: '',
              country: event_data.country || '30',
            }}
            enableReinitialize
            validationSchema={formAddParticipant}
            onSubmit={values => confirmModalAddTrainingLeader(values)}
          >
            {({ errors, touched, values }) => (
              <Form>
                <ModalBody>
                  <div className="form-body">
                    <Row className="d-flex flex-row">
                      <Col sm="12" md="12" lg="12">
                        <FormGroup>
                          <Field
                            type="text"
                            placeholder="Digite o nome do líder em treinamento"
                            name="name"
                            id="name"
                            className={`
                                    form-control
                                    ${errors.name &&
                                      touched.name &&
                                      'is-invalid'}
                                  `}
                          />
                          {errors.name && touched.name ? (
                            <div className="invalid-feedback">
                              {errors.name}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col lg="12" md="12" sm="12">
                        <FormGroup>
                          <div className="position-relative has-icon-right">
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
                                  {...field}
                                  id="cpf"
                                  name="cpf"
                                  placeholder="Digite aqui o CPF"
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
                            {loadingOrganizator && (
                              <div className="form-control-position">
                                <RefreshCw size={16} className="spinner" />
                              </div>
                            )}
                          </div>
                        </FormGroup>
                      </Col>
                      <Col sm="12" md="12" lg="12">
                        <FormGroup>
                          <Field
                            type="text"
                            placeholder="Email, ex: nomedolider@gmail.com"
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
                        </FormGroup>
                      </Col>
                      <Col sm="12" md="12" lg="12" className="mb-2">
                        <RadioButtonGroup
                          id="radioGroup"
                          value={values.radioGroup}
                          error={errors.radioGroup}
                          touched={touched.radioGroup}
                          className={`
                                    new-form-padding
                                    form-control
                                    border-0
                                    ${errors.sex && touched.sex && 'is-invalid'}
                                  `}
                        >
                          <Row className="d-flex justify-content-around">
                            {event_data.defaultEvent.sex_type === 'M' && (
                              <Field
                                component={RadioButton}
                                name="sex"
                                id="M"
                                label="Masculino"
                              />
                            )}
                            {event_data.defaultEvent.sex_type === 'F' && (
                              <Field
                                component={RadioButton}
                                name="sex"
                                id="F"
                                label="Feminino"
                              />
                            )}
                            {event_data.defaultEvent.sex_type === 'A' && (
                              <>
                                <Field
                                  component={RadioButton}
                                  name="sex"
                                  id="M"
                                  label="Masculino"
                                />
                                <Field
                                  component={RadioButton}
                                  name="sex"
                                  id="F"
                                  label="Feminino"
                                />
                              </>
                            )}
                          </Row>
                        </RadioButtonGroup>
                        {errors.sex && touched.sex ? (
                          <div className="text-center invalid-feedback">
                            {errors.sex}
                          </div>
                        ) : null}
                      </Col>
                    </Row>
                    <Row>
                      <Button
                        className="ml-1 my-1"
                        color="danger"
                        onClick={toggleModalAddTrainingLeader}
                      >
                        Cancelar
                      </Button>{' '}
                      <Button className="ml-1 my-1 btn-success" type="submit">
                        {loading ? (
                          <BounceLoader
                            size={23}
                            color="#fff"
                            css={css`
                              display: block;
                              margin: 0 auto;
                            `}
                          />
                        ) : (
                          'Cadastrar líder em treinamento'
                        )}
                      </Button>
                    </Row>
                  </div>
                </ModalBody>
              </Form>
            )}
          </Formik>
        </Modal>

        {/* MODAL PARA CADASTRAR PARTICIPANTE MANUALMENTE */}
        <Modal
          isOpen={modalAddParticipant}
          toggle={toggleModalAddParticipant}
          className={className}
        >
          <Formik
            initialValues={{
              admin: profile_data.admin || false,
              name: '',
              email: '',
              cpf: cpfNotFound || '',
              sex: '',
              country: event_data.country || '30',
            }}
            enableReinitialize
            validationSchema={formAddParticipant}
            onSubmit={values => confirmModalAddParticipant(values)}
          >
            {({ errors, touched, values }) => (
              <Form>
                <ModalHeader toggle={toggleModalAddParticipant}>
                  Cadastrar participante
                </ModalHeader>
                <ModalBody>
                  <div className="form-body">
                    <Row className="d-flex flex-row">
                      <Col sm="12" md="12" lg="12">
                        <FormGroup>
                          <Field
                            type="text"
                            placeholder="Digite o nome do participante"
                            name="name"
                            id="name"
                            className={`
                                    form-control
                                    ${errors.name &&
                                      touched.name &&
                                      'is-invalid'}
                                  `}
                          />
                          {errors.name && touched.name ? (
                            <div className="invalid-feedback">
                              {errors.name}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col lg="12" md="12" sm="12">
                        <FormGroup>
                          <div className="position-relative has-icon-right">
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
                                  {...field}
                                  id="cpf"
                                  name="cpf"
                                  placeholder="digite aqui o CPF"
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
                            {loadingOrganizator && (
                              <div className="form-control-position">
                                <RefreshCw size={16} className="spinner" />
                              </div>
                            )}
                          </div>
                        </FormGroup>
                      </Col>
                      <Col sm="12" md="12" lg="12">
                        <FormGroup>
                          <Field
                            type="text"
                            placeholder="Digite o email"
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
                        </FormGroup>
                      </Col>
                      <Col sm="12" md="12" lg="12" className="mb-2">
                        <RadioButtonGroup
                          id="radioGroup"
                          value={values.radioGroup}
                          error={errors.radioGroup}
                          touched={touched.radioGroup}
                          className={`
                                    new-form-padding
                                    form-control
                                    border-0
                                    ${errors.sex && touched.sex && 'is-invalid'}
                                  `}
                        >
                          <Row className="d-flex justify-content-around">
                            {event_data.defaultEvent.sex_type === 'M' && (
                              <Field
                                component={RadioButton}
                                name="sex"
                                id="M"
                                label="Masculino"
                              />
                            )}
                            {event_data.defaultEvent.sex_type === 'F' && (
                              <Field
                                component={RadioButton}
                                name="sex"
                                id="F"
                                label="Feminino"
                              />
                            )}
                            {event_data.defaultEvent.sex_type === 'A' && (
                              <>
                                <Field
                                  component={RadioButton}
                                  name="sex"
                                  id="M"
                                  label="Masculino"
                                />
                                <Field
                                  component={RadioButton}
                                  name="sex"
                                  id="F"
                                  label="Feminino"
                                />
                              </>
                            )}
                          </Row>
                        </RadioButtonGroup>
                        {errors.sex && touched.sex ? (
                          <div className="text-center invalid-feedback">
                            {errors.sex}
                          </div>
                        ) : null}
                      </Col>
                    </Row>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    className="ml-1 my-1"
                    color="danger"
                    onClick={toggleModalAddParticipant}
                  >
                    Cancelar
                  </Button>{' '}
                  <Button
                    className="ml-1 my-1 btn-success"
                    type="submit"
                    disabled={
                      errors.name ||
                      errors.cpf ||
                      errors.sex ||
                      participant_loading
                    }
                  >
                    {participant_loading ? (
                      <BounceLoader
                        size={23}
                        color="#fff"
                        css={css`
                          display: block;
                          margin: 0 auto;
                        `}
                      />
                    ) : (
                      'Cadastrar participante'
                    )}
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </Modal>

        {/* MODAL PARA CONVIDAR PARTICIPANTE */}
        <Modal
          isOpen={modalInvite}
          toggle={toggleModalInvite}
          className={className}
          size="lg"
        >
          <ModalHeader toggle={toggleModalInvite}>
            Convidar participante por email
          </ModalHeader>
          <Formik
            initialValues={{
              invite_name: '',
              invite_email: '',
            }}
            validationSchema={formParticipantInvite}
            onSubmit={(values, { resetForm }) => {
              sendMailParticipant(values);
              resetForm();
            }}
          >
            {({ errors, touched, values }) => (
              <Form>
                <ModalBody>
                  <div className="form-body">
                    <Row className="d-flex flex-row">
                      <Col lg="6" md="6" sm="12">
                        <FormGroup>
                          <Label for="invite_name">Nome</Label>
                          <Field
                            type="text"
                            placeholder="Digite o nome do participante"
                            name="invite_name"
                            id="invite_name"
                            className={`
                                    form-control
                                    ${errors.invite_name &&
                                      touched.invite_name &&
                                      'is-invalid'}
                                  `}
                          />
                          {errors.invite_name && touched.invite_name ? (
                            <div className="invalid-feedback">
                              {errors.invite_name}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col lg="6" md="6" sm="12">
                        <FormGroup>
                          <Label for="invite_email">Email</Label>
                          <Field
                            type="text"
                            placeholder="Digite o email do participante"
                            name="invite_email"
                            id="invite_email"
                            className={`
                                    form-control
                                    ${errors.invite_email &&
                                      touched.invite_email &&
                                      'is-invalid'}
                                  `}
                          />
                          {errors.invite_email && touched.invite_email ? (
                            <div className="invalid-feedback">
                              {errors.invite_email}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    className="ml-1 my-1"
                    color="danger"
                    onClick={toggleModalInvite}
                  >
                    Cancelar
                  </Button>{' '}
                  <Button
                    className={`${
                      values.invite_name !== '' && values.invite_email !== ''
                        ? 'ml-1 my-1 btn-success'
                        : 'btn-secundary ml-1 my-1'
                    }`}
                    type="submit"
                  >
                    {loading ? (
                      <BounceLoader
                        size={23}
                        color="#fff"
                        css={css`
                          display: block;
                          margin: 0 auto;
                        `}
                      />
                    ) : (
                      'Enviar convite'
                    )}
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </Modal>

        <Modal
          isOpen={modalCertificate}
          toggle={toggleModalCertificate}
          size="lg"
        >
          <ModalHeader>Emissão de certificados</ModalHeader>
          <ModalBody>
            <ReactForm>
              <Row className="mb-2 px-2">
                <Col sm="12" md="6" lg="4">
                  <Label>Data da formatura</Label>
                  <div className="position-relative has-icon-left">
                    <DatePicker
                      locale={pt}
                      dateFormat="dd/MM/yyyy"
                      selected={certificateDate}
                      onChange={date => {
                        setCertificateDate(date);
                        setPdfButton(null);
                      }}
                      minDate={subMonths(new Date(), 12)}
                      withPortal
                      fixedHeight
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      className="form-control"
                    />
                    <div className="form-control-position">
                      <Calendar size={14} color="#212529" />
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="mt-2 px-2">
                <Col>
                  <Input
                    id="checkBackground"
                    name="checkBackground"
                    onChange={e => {
                      setCheckBackground(e.target.checked);
                      setPdfButton(null);
                    }}
                    type="checkbox"
                    className="ml-0"
                  />
                  <Label for="checkBackground" className="pl-3">
                    Certificado com imagem de fundo
                  </Label>
                </Col>
              </Row>
              <Row className="px-2">
                <Col>
                  <Input
                    type="checkbox"
                    className="ml-0"
                    id="checkAll"
                    name="checkAll"
                    defaultChecked={checkAll}
                    onChange={e => handleCheckAll(e)}
                  />
                  <Label for="checkAll" className="pl-3">
                    Selecionar todos nomes
                  </Label>
                </Col>
              </Row>
            </ReactForm>
            <Table responsive>
              <thead>
                <tr>
                  <th />
                  <th>Nome para impressão</th>
                  <th>Primeira impressão</th>
                </tr>
              </thead>
              <tbody>
                {certificateParticipantsAux.map((selected, index) => {
                  return (
                    <tr key={selected.id}>
                      <td>
                        <Input
                          type="checkbox"
                          className="ml-0 childCheck"
                          defaultChecked={
                            certificateParticipantsAux[index].checked
                          }
                          id={`selected.${index}.checked`}
                          name={`selected.${index}.checked`}
                          onChange={e => handleChangeChild(e, index)}
                        />
                      </td>
                      <td width="70%">
                        <Input
                          type="text"
                          disabled={!profile_data.admin}
                          id={`selected.${index}.name`}
                          name={`selected.${index}.name`}
                          defaultValue={selected.name}
                          className="form-control"
                          onChange={e => handleChangeParticipantName(e, index)}
                        />
                      </td>
                      <td>
                        <Input
                          readOnly
                          type="text"
                          id={`selected.${index}.name`}
                          name={`selected.${index}.name`}
                          value={(() => {
                            if (selected.participant_id === undefined) {
                              return 'Líder';
                            }
                            if (selected.print_date) {
                              return moment(selected.print_date).format(
                                'DD/MM/YYYY'
                              );
                            }
                            return 'Não impresso';
                          })()}
                          className="form-control"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={handleCreateDownloadLink}
              className="mr-2"
            >
              {loadingPdf ? (
                <BounceLoader
                  size={23}
                  color="#fff"
                  css={css`
                    display: block;
                    margin: 0 auto;
                  `}
                />
              ) : (
                'Gerar certificados'
              )}
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={modalCertificatePrint}
          toggle={toggleCloseModalCertificatePrint}
          size="lg"
        >
          <ModalHeader toggle={toggleCloseModalCertificatePrint}>
            Impressão de certificados
          </ModalHeader>
          <ModalBody>
            {pdfButton !== null && (
              <BlobProvider document={<Certificate certificates={pdfButton} />}>
                {({ url }) => {
                  return (
                    <iframe
                      title="print_certificate"
                      src={url}
                      style={{ width: '100%', height: '700px' }}
                    />
                  );
                }}
              </BlobProvider>
            )}
          </ModalBody>
        </Modal>

        {/* ---- CADASTRAR UM ENDEREÇO CASO NAO EXISTA */}
        <Modal
          isOpen={modalRegisterNewAddress}
          toggle={toggleModalRegisterNewAddress}
          size="lg"
        >
          <ModalHeader toggle={toggleModalRegisterNewAddress}>
            Confirmar endereço de entrega do certificado
          </ModalHeader>
          <Formik
            enableReinitialize
            initialValues={newAddress}
            validationSchema={formRegisterNewAddress}
            onSubmit={values => handleRegisterNewAddress(values)}
          >
            {({ errors, touched, values, setFieldValue, handleChange }) => (
              <Form>
                <ModalBody>
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <Label for="id">Endereço</Label>
                        <div className="position-relative has-icon-left">
                          <Field
                            type="select"
                            component="select"
                            id="id"
                            name="id"
                            className={`
                              form-control
                              ${errors &&
                                errors.id &&
                                touched &&
                                touched.id &&
                                'is-invalid'}
                            `}
                            onChange={event =>
                              handleChangeAddressType(event, setFieldValue)
                            }
                          >
                            <option value="" defaultValue="" disabled="">
                              Selecione uma opção
                            </option>
                            {profileAddresses.length > 0 &&
                              profileAddresses[0].id !== null &&
                              profileAddresses.map(address => (
                                <option key={address.id} value={address.id}>
                                  {address.type === 'home' && 'Casa'}
                                  {address.type === 'work' && 'Trabalho'}
                                  {address.type === 'other' &&
                                    address.other_type_name}
                                  {`: ${address.cep}, ${address.street}, ${address.street_number}`}
                                </option>
                              ))}
                            <option key="other" value="other">
                              Novo endereço
                            </option>
                          </Field>
                          {errors && errors.type && touched && touched.type ? (
                            <div className="invalid-feedback">
                              {errors.type}
                            </div>
                          ) : null}
                          <div className="form-control-position">
                            <Map size={14} color="#212529" />
                          </div>
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>

                  {!!values.id && (
                    <>
                      {values.id === 'other' && (
                        <Row>
                          <Col sm="12" md="12" lg="12" xl="4">
                            <FormGroup>
                              <Label for="type">Tipo endereço</Label>
                              <div className="position-relative has-icon-left">
                                <Field
                                  type="select"
                                  component="select"
                                  id="type"
                                  name="type"
                                  className={`
                              form-control
                              ${errors &&
                                errors.type &&
                                touched &&
                                touched.type &&
                                'is-invalid'}
                            `}
                                  onChange={handleChange}
                                >
                                  <option value="" defaultValue="" disabled="">
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
                                {errors &&
                                errors.type &&
                                touched &&
                                touched.type ? (
                                  <div className="invalid-feedback">
                                    {errors.type}
                                  </div>
                                ) : null}
                                <div className="form-control-position">
                                  <Map size={14} color="#212529" />
                                </div>
                              </div>
                            </FormGroup>
                          </Col>
                          {values.type === 'other' && (
                            <Col sm="12" md="12" lg="12" xl="8">
                              <FormGroup>
                                <Label for="other_type_name">
                                  Apelido do endereço
                                </Label>
                                <Field
                                  type="text"
                                  id="other_type_name"
                                  name="other_type_name"
                                  placeholder="Ex: Casa da minha mãe"
                                  className={`
                              form-control
                              ${errors &&
                                errors.other_type_name &&
                                touched &&
                                touched.other_type_name &&
                                'is-invalid'}
                            `}
                                />
                                {errors &&
                                errors.other_type_name &&
                                touched &&
                                touched.other_type_name ? (
                                  <div className="invalid-feedback">
                                    {errors.other_type_name}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </Col>
                          )}
                        </Row>
                      )}

                      <Row>
                        <Col sm="12" md="3" lg="3" xl="3">
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
                              {errors &&
                              errors.cep &&
                              touched &&
                              touched.cep ? (
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
                        <Col sm="12" md="3" lg="3" xl="3">
                          <FormGroup>
                            <Label for="uf">Estado</Label>
                            <Field
                              readOnly
                              type="text"
                              id="uf"
                              name="uf"
                              className={`
                                  form-control
                                  ${errors &&
                                    errors.uf &&
                                    touched &&
                                    touched.uf &&
                                    'is-invalid'}
                                `}
                            />
                            {errors && errors.uf && touched && touched.uf ? (
                              <div className="invalid-feedback">
                                {errors.uf}
                              </div>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col sm="12" md="12" lg="6" xl="6">
                          <FormGroup>
                            <Label for="city">Cidade</Label>
                            <Field
                              readOnly
                              type="text"
                              id="city"
                              name="city"
                              disabled={values.id !== 'other' || cep_loading}
                              className={`
                                  form-control
                                  ${errors &&
                                    errors.city &&
                                    touched &&
                                    touched.city &&
                                    'is-invalid'}
                                `}
                            />
                            {errors &&
                            errors.city &&
                            touched &&
                            touched.city ? (
                              <div className="invalid-feedback">
                                {errors.city}
                              </div>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm="12" md="12" lg="8" xl="6">
                          <FormGroup>
                            <Label for="street">Rua</Label>
                            <div className="position-relative has-icon-left">
                              <Field
                                type="text"
                                id="street"
                                name="street"
                                className={`
                                  form-control
                                  ${errors &&
                                    errors.street &&
                                    touched &&
                                    touched.street &&
                                    'is-invalid'}
                                `}
                              />
                              {errors &&
                              errors.street &&
                              touched &&
                              touched.street ? (
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
                        <Col sm="12" md="12" lg="4" xl="2">
                          <FormGroup>
                            <Label for="street_number">Número</Label>
                            <div className="position-relative has-icon-left">
                              <Field
                                type="text"
                                id="street_number"
                                name="street_number"
                                className={`
                                  form-control
                                  ${errors &&
                                    errors.street_number &&
                                    touched &&
                                    touched.street_number &&
                                    'is-invalid'}
                                `}
                              />
                              {errors &&
                              errors.street_number &&
                              touched &&
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
                        <Col sm="12" md="12" lg="12" xl="4">
                          <FormGroup>
                            <Label for="neighborhood">Bairro</Label>
                            <div className="position-relative has-icon-left">
                              <Field
                                type="text"
                                id="neighborhood"
                                name="neighborhood"
                                className={`
                                  form-control
                                  ${errors &&
                                    errors.neighborhood &&
                                    touched &&
                                    touched.neighborhood &&
                                    'is-invalid'}
                                `}
                              />
                              {errors &&
                              errors.neighborhood &&
                              touched &&
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
                      </Row>
                      <Row>
                        <Col sm="12" md="6" lg="6" xl="6">
                          <FormGroup>
                            <Label for="complement">Complemento</Label>
                            <div className="position-relative has-icon-left">
                              <Field
                                type="text"
                                id="complement"
                                name="complement"
                                className={`
                                  form-control
                                  ${errors &&
                                    errors.complement &&
                                    touched &&
                                    touched.complement &&
                                    'is-invalid'}
                                `}
                              />
                              {errors &&
                              errors.complement &&
                              touched &&
                              touched.complement ? (
                                <div className="invalid-feedback">
                                  {errors.complement}
                                </div>
                              ) : null}
                              <div className="form-control-position">
                                <Edit size={14} color="#212529" />
                              </div>
                            </div>
                          </FormGroup>
                        </Col>
                        <Col sm="12" md="6" lg="6" xl="6">
                          <FormGroup>
                            <Label for="receiver">Recebedor</Label>
                            <div className="position-relative has-icon-left">
                              <Field
                                type="text"
                                id="receiver"
                                name="receiver"
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
                </ModalBody>
                <ModalFooter>
                  <Button
                    outline
                    color="warning"
                    onClick={() => setModalRegisterNewAddress(false)}
                  >
                    Voltar
                  </Button>
                  <Button type="submit" className="btn-success">
                    {profileAddresses[0].id !== null
                      ? 'Confirmar endereço'
                      : 'Cadastrar endereço'}
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </Modal>

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
                          modalChurch={modalChurch =>
                            setModalChurch(modalChurch)
                          }
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
        <Modal
          isOpen={modalLogs}
          toggle={toggleModalLogs}
          className={className}
          size="xl"
        >
          <ModalHeader toggle={toggleModalLogs}>
            Visualização de logs
          </ModalHeader>
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
                        {format(
                          new Date(log.created_at),
                          'dd/MM/yyyy hh:mm:ss',
                          {
                            locale: pt,
                          }
                        )}
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
      </>
    )
  );
}
