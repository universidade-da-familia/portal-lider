/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/prop-types */
// import external modules
import React, { Component, useState, useEffect, useMemo } from 'react';
import { Wizard, Steps, Step, WithWizard } from 'react-albus';
import ReactCard from 'react-credit-cards';
import 'react-credit-cards/lib/styles.scss';
import {
  Map,
  RefreshCw,
  User,
  Users,
  Edit,
  Smartphone,
  Check,
  Star,
  List,
  DollarSign,
  CreditCard,
  FileText,
  Calendar,
  Lock,
  Navigation as NavigationIcon,
} from 'react-feather';
import { Motion, spring } from 'react-motion';
import NumberFormat from 'react-number-format';
import { useSelector, useDispatch } from 'react-redux';
import { BounceLoader } from 'react-spinners';
import {
  Card,
  CardBody,
  Row,
  Col,
  FormGroup,
  Button,
  Label,
  CustomInput,
  UncontrolledTooltip,
  ButtonGroup,
  // Modal,
  // ModalBody,
  // ModalFooter,
} from 'reactstrap';

// eslint-disable-next-line import/no-extraneous-dependencies
import { css } from '@emotion/core';
import classnames from 'classnames';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Formik, Field, Form } from 'formik';
import randomstring from 'randomstring';
import { Line } from 'rc-progress';
import { useDebounce } from 'use-debounce';
import * as Yup from 'yup';

// import history from '~/app/history';
import logo from '~/assets/img/logo-big.png';
import CepFormat from '~/components/fields/CepFormat';
import PhoneFormat from '~/components/fields/PhoneFormat';
import { validateCPF } from '~/services/validateCPF';
import { Creators as CepActions } from '~/store/ducks/cep';
import { Creators as EventActions } from '~/store/ducks/event';
import { Creators as InviteActions } from '~/store/ducks/invite';
import { Creators as ParticipantActions } from '~/store/ducks/participant';
import { Creators as ShippingActions } from '~/store/ducks/shipping';

import {
  formatCreditCardNumber,
  formatCreditCardName,
  formatExpirationDate,
  formatCVC,
} from './utils';

// import Navigation from './navigation';

const formSchema = Yup.object().shape({
  couple_cpf: Yup.string().when('inscription_type', {
    is: 'couple',
    then: Yup.string().required('CPF do conjuge é obrigatório'),
  }),
  couple_name: Yup.string().when('inscription_type', {
    is: 'couple',
    then: Yup.string().required('Nome do conjuge é obrigatório'),
  }),
  couple_email: Yup.string().when('inscription_type', {
    is: 'couple',
    then: Yup.string()
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i,
        'Digite um email válido'
      )
      .required('Email do conjuge é obrigatório'),
  }),
  cpf: Yup.string().required('O CPF é obrigatório'),
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i,
      'Digite um email válido'
    )
    .required('O email é obrigatório'),
  // church_name: Yup.string().required('Nome da igreja é obrigatório'),
  // pastor_name: Yup.string().required('O nome do pastor é obrigatório'),
  // pastor_email: Yup.string()
  //   .matches(
  //     /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i,
  //     'Digite um email válido'
  //   )
  //   .required('O email é obrigatório'),
  type: Yup.string().required('O tipo é obrigatório'),
  address_type: Yup.string().required('O tipo é obrigatório'),
  address_other_type_name: Yup.string().when('address_type', {
    is: 'other',
    then: Yup.string().required('O apelido é obrigatório.'),
  }),
  cep: Yup.string().required('O CEP é obrigatório'),
  uf: Yup.string().required('O estado é obrigatório'),
  city: Yup.string().required('A cidade é obrigatória'),
  street: Yup.string().required('A rua é obrigatória'),
  street_number: Yup.string().required('O número da rua é obrigatório'),
  neighborhood: Yup.string().required('O bairro é obrigatório'),
  complement: Yup.string().max(60, 'Máximo de 60 caracteres'),
  phone: Yup.string().required('O telefone é obrigatório'),
});

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

class CpfFormat extends Component {
  state = {
    value: '',
  };

  render() {
    return (
      <NumberFormat
        inputMode="decimal"
        displayType="input"
        format="###.###.###-##"
        allowNegative={false}
        value={this.state.value}
        onValueChange={vals => {
          this.setState({ value: vals.value });
        }}
        {...this.props}
      />
    );
  }
}

export default function TrainingInviteConfirmation({ match }) {
  // const [modalCaminhosLegadosInvite, setModalCaminhosLegadosInvite] = useState(
  //   false
  // );
  // const [canOpenedModalCaminhosLegadosInvite] = useState(() => {
  //   const caminhoslegados = sessionStorage.getItem(
  //     '@dashboard/caminhoslegados_invite'
  //   );

  //   // eslint-disable-next-line no-unneeded-ternary
  //   return caminhoslegados ? false : true;
  // });

  const [searchEmail, setSearchEmail] = useState('');
  const [emailDebounce] = useDebounce(searchEmail, 800);
  // const [invite, setInvite] = useState(null);
  const [participant, setParticipant] = useState(null);
  const [coupleParticipant, setCoupleParticipant] = useState(null);
  const [errorSex, setErrorSex] = useState(false);
  const [notFoundParticipant, setNotFoundParticipant] = useState(false);
  const [notFoundCoupleParticipant, setNotFoundCoupleParticipant] = useState(
    true
  );
  const [kitProducts, setKitProducts] = useState([]);
  const [shippingSelected, setShippingSelected] = useState(null);
  const [paymentSelected, setPaymentSelected] = useState(null);
  const [shippingOptions, setShippingOptions] = useState(null);
  const [inscriptionType, setInscriptionType] = useState(null);
  const [inscriptionSingle, setInscriptionSingle] = useState(true);
  const [inscriptionCouple, setInscriptionCouple] = useState(true);

  const [addresses, setAddresses] = useState([
    {
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
  const [cepState, setCepState] = useState('');
  const [initialState, setInitialState] = useState({
    inscription_type: '',
    cpf: '',
    name: '',
    email: '',
    sex: '',
    couple_cpf: '',
    couple_name: '',
    couple_email: '',
    couple_sex: '',
    // church_name: '',
    // pastor_name: '',
    // pastor_email: '',
    type: '',
    address_type: '',
    address_other_type_name: '',
    cep: '',
    uf: '',
    city: '',
    street: '',
    street_number: '',
    neighborhood: '',
    complement: '',
    receiver: '',
    phone: '',
    installments: '1',
  });
  const [card, setCard] = useState({
    name_card: '',
    number: '',
    expiry: '',
    cvc: '',
    id: '',
    issuer: '',
    focused: '',
  });
  const [errorProduct, setErrorProduct] = useState(false);
  // const [coupleData, setCoupleData] = useState(null);
  // const [coupleError, setCoupleError] = useState(false);
  const [isCouple, setIsCouple] = useState(false);

  const event = useSelector(state => state.event.data);
  const participantData = useSelector(state => state.participant.data);
  const loading = useSelector(state => state.invite.loading);
  const cepData = useSelector(state => state.cep.data);
  const cepLoading = useSelector(state => state.cep.loading);
  const shippingOptionsData = useSelector(state => state.shipping.data);
  const isValidEmail = useSelector(state => state.participant.isValidEmail);

  const dispatch = useDispatch();

  function handleCallback({ issuer }, isValid) {
    if (isValid) {
      setCard({ ...card, issuer: issuer.toUpperCase() });
    }
  }

  function handleInputFocus(event) {
    const { target } = event;

    setCard({ ...card, focused: target.name, id: '' });
  }

  function handleInputChange(event) {
    const { target } = event;

    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === 'name_card') {
      target.value = formatCreditCardName(target.value);
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value);
    }

    setCard({ ...card, [target.name]: target.value, id: '' });
  }

  function handleSearchCpf(cpf) {
    setParticipant(null);
    setIsCouple(false);
    dispatch(ParticipantActions.searchParticipantByEmailFailure(false));

    const formattedCpf = cpf
      .replace('.', '')
      .replace('.', '')
      .replace('-', '');

    if (formattedCpf.length === 11) {
      dispatch(
        ParticipantActions.searchParticipantRequest(
          formattedCpf,
          event.defaultEvent.id
        )
      );
    }
  }

  function handleSearchCoupleCpf(cpf) {
    setCoupleParticipant(null);
    setIsCouple(true);
    dispatch(ParticipantActions.searchParticipantByEmailFailure(false));

    const formattedCpf = cpf
      .replace('.', '')
      .replace('.', '')
      .replace('-', '');

    if (formattedCpf.length === 11) {
      dispatch(
        ParticipantActions.searchParticipantRequest(
          formattedCpf,
          event.defaultEvent.id
        )
      );
    }
  }

  function handleSearchEmail(event, setFieldValue, couple) {
    const email = event.target.value;

    dispatch(ParticipantActions.searchParticipantByEmailFailure(false));

    if (couple) {
      setFieldValue('couple_email', email);
    } else {
      setFieldValue('email', email);
    }

    setSearchEmail(email);
  }

  function handleManyOrganizators() {
    const last = event.organizators.length - 1;
    const antLast = event.organizators.length - 2;

    const organizators = event.organizators.map((organizator, index) => {
      if (last === index) {
        return organizator.name;
      }
      if (antLast === index) {
        return `${organizator.name} e `;
      }
      return `${organizator.name}, `;
    });

    return `pelos líderes ${organizators.join('')} `;
  }

  function handleChangeChild(e, indexKitProduct) {
    const { checked } = e.target;
    const productsAux = kitProducts;

    productsAux[indexKitProduct].isSelected = checked;
    setKitProducts(productsAux);

    let count = 0;
    kitProducts.forEach(product => {
      if (product.isSelected === true) {
        count += 1;
      }
    });

    if (count === 0) {
      setErrorProduct(true);
    } else {
      setErrorProduct(false);
    }

    if (cepState.length === 8) {
      dispatch(ShippingActions.shippingOptionsRequest(cepState, kitProducts));
    }
  }

  const subTotalPriceCouple = useMemo(() => {
    let total_couple = 0;
    if (kitProducts.length > 0) {
      // eslint-disable-next-line array-callback-return
      kitProducts.map(product => {
        if (product.isSelected === true) {
          total_couple += product.training_price * product.quantity_couple;
        }
      });
    }
    return total_couple;
  }, [kitProducts.length, kitProducts.map(product => product.isSelected)]);

  const totalPriceCouple = useMemo(() => {
    let total = 0;
    if (shippingSelected !== null && shippingSelected.free_shipping) {
      total = subTotalPriceCouple;
    }

    if (shippingSelected !== null && !shippingSelected.free_shipping) {
      total = subTotalPriceCouple + shippingSelected.final_shipping_cost;
    }

    return total;
  }, [subTotalPriceCouple, shippingSelected]);

  const subTotalPrice = useMemo(() => {
    let total = 0;
    if (kitProducts.length > 0) {
      // eslint-disable-next-line array-callback-return
      kitProducts.map(product => {
        if (product.isSelected === true) {
          total += product.training_price * product.quantity;
        }
      });
    }
    return total;
  }, [kitProducts.length, kitProducts.map(product => product.isSelected)]);

  const totalPrice = useMemo(() => {
    let total = 0;
    if (shippingSelected !== null && shippingSelected.free_shipping) {
      total = subTotalPrice;
    }

    if (shippingSelected !== null && !shippingSelected.free_shipping) {
      total = subTotalPrice + shippingSelected.final_shipping_cost;
    }

    return total;
  }, [subTotalPrice, shippingSelected]);

  function handleSubmit(values) {
    const dataProducts = [];

    kitProducts.forEach(product => {
      if (product.isSelected === true) {
        dataProducts.push({
          id: product.id,
          netsuite_id: product.netsuite_id,
          name: product.name,
          cost_of_goods: product.training_price,
          quantity: product.quantity,
          weight: product.weight,
          width: product.width,
          height: product.height,
          length: product.length,
          sku_id: product.sku_id,
          product_category: product.product_category,
        });
      }
    });

    if (notFoundParticipant === true && notFoundCoupleParticipant === false) {
      const password = randomstring.generate(6);
      const formattedCpf = values.cpf
        .replace('.', '')
        .replace('.', '')
        .replace('-', '');

      const createData = {
        // invite_id: match.params.id,
        inscription_type: values.inscription_type,
        event_id: parseInt(match.params.event_id, 10),
        user: {
          id: null,
          name: values.name,
          cpf: formattedCpf,
          email: values.email,
          sex: values.sex,
          phone: values.phone,
          password,
        },
        couple_user: coupleParticipant,
        card: paymentSelected === 1 ? card : null,
        products: dataProducts,
        shipping_address: values,
        shipping_option: shippingSelected,
        order_details: {
          order_type: event.defaultEvent.event_type,
          subtotal:
            inscriptionType === 'single' ? subTotalPrice : subTotalPriceCouple,
          shipping_amount: shippingSelected.free_shipping
            ? 0
            : shippingSelected.final_shipping_cost,
          amount: inscriptionType === 'single' ? totalPrice : totalPriceCouple,
          installments: parseInt(values.installments, 10),
        },
      };

      dispatch(InviteActions.createParticipantTrainingRequest(createData));
    } else if (
      notFoundParticipant === false &&
      notFoundCoupleParticipant === true
    ) {
      const couplePassword = randomstring.generate(6);
      const formattedCoupleCpf = values.couple_cpf
        .replace('.', '')
        .replace('.', '')
        .replace('-', '');

      const createData = {
        // invite_id: parseInt(match.params.id, 10),
        inscription_type: values.inscription_type,
        event_id: parseInt(match.params.event_id, 10),
        user: participant,
        couple_user: {
          id: null,
          name: values.couple_name,
          cpf: formattedCoupleCpf,
          email: values.couple_email,
          sex: values.couple_sex,
          phone: values.couple_phone,
          password: couplePassword,
        },
        card: paymentSelected === 1 ? card : null,
        products: dataProducts,
        shipping_address: values,
        shipping_option: shippingSelected,
        order_details: {
          order_type: 'Curso',
          subtotal:
            inscriptionType === 'single' ? subTotalPrice : subTotalPriceCouple,
          shipping_amount: shippingSelected.free_shipping
            ? 0
            : shippingSelected.final_shipping_cost,
          amount: inscriptionType === 'single' ? totalPrice : totalPriceCouple,
          installments: parseInt(values.installments, 10),
        },
      };

      dispatch(InviteActions.createParticipantTrainingRequest(createData));
    } else if (
      notFoundParticipant === true &&
      notFoundCoupleParticipant === true
    ) {
      const password = randomstring.generate(6);

      const formattedCpf = values.cpf
        .replace('.', '')
        .replace('.', '')
        .replace('-', '');

      const couplePassword = randomstring.generate(6);

      const formattedCoupleCpf = values.couple_cpf
        .replace('.', '')
        .replace('.', '')
        .replace('-', '');

      const createData = {
        inscription_type: values.inscription_type,
        invite_id: match.params.id,
        event_id: parseInt(match.params.event_id, 10),
        user: {
          id: null,
          name: values.name,
          cpf: formattedCpf,
          email: values.email,
          sex: values.sex,
          phone: values.phone,
          password,
        },
        couple_user: {
          id: null,
          name: values.name,
          cpf: formattedCoupleCpf,
          email: values.email,
          sex: values.sex,
          phone: values.phone,
          password: couplePassword,
        },
        card: paymentSelected === 1 ? card : null,
        products: dataProducts,
        shipping_address: values,
        shipping_option: shippingSelected,
        order_details: {
          order_type: 'Curso',
          subtotal:
            inscriptionType === 'single' ? subTotalPrice : subTotalPriceCouple,
          shipping_amount: shippingSelected.free_shipping
            ? 0
            : shippingSelected.final_shipping_cost,
          amount: inscriptionType === 'single' ? totalPrice : totalPriceCouple,
          installments: parseInt(values.installments, 10),
        },
      };

      dispatch(InviteActions.createParticipantTrainingRequest(createData));
    } else if (
      notFoundParticipant === false &&
      notFoundCoupleParticipant === false
    ) {
      const createData = {
        // invite_id: parseInt(match.params.id, 10),
        inscription_type: values.inscription_type,
        event_id: parseInt(match.params.event_id, 10),
        user: participant,
        couple_user: coupleParticipant,
        card: paymentSelected === 1 ? card : null,
        products: dataProducts,
        shipping_address: values,
        shipping_option: shippingSelected,
        order_details: {
          order_type: 'Curso',
          subtotal:
            inscriptionType === 'single' ? subTotalPrice : subTotalPriceCouple,
          shipping_amount: shippingSelected.free_shipping
            ? 0
            : shippingSelected.final_shipping_cost,
          amount: inscriptionType === 'single' ? totalPrice : totalPriceCouple,
          installments: parseInt(values.installments, 10),
        },
      };

      dispatch(InviteActions.createParticipantTrainingRequest(createData));
    }
  }

  function handleChangeAddressType(event, setFieldValue) {
    const { name, value } = event.target;

    setFieldValue(name, value);

    if (value !== 'other' && value !== '') {
      const address = addresses.find(
        addressFind => addressFind.id === parseInt(value, 10)
      );

      setCepState(address.cep);
      setFieldValue('address_type', address.type);
      setFieldValue('address_other_type_name', address.other_type_name || '');
      setFieldValue('cep', address.cep);
      setFieldValue('uf', address.uf);
      setFieldValue('city', address.city);
      setFieldValue('street', address.street);
      setFieldValue('street_number', address.street_number);
      setFieldValue('neighborhood', address.neighborhood);
      setFieldValue('complement', address.complement);
      setFieldValue('receiver', address.receiver);

      if (kitProducts.length > 0) {
        dispatch(
          ShippingActions.shippingOptionsRequest(address.cep, kitProducts)
        );
      }
    } else if (value === '') {
      setFieldValue('type', '');
      setFieldValue('address_type', '');
      setFieldValue('address_other_type_name', '');
      setFieldValue('cep', '');
      setFieldValue('uf', '');
      setFieldValue('city', '');
      setFieldValue('street', '');
      setFieldValue('street_number', '');
      setFieldValue('neighborhood', '');
      setFieldValue('complement', '');
      setFieldValue('receiver', '');
    } else {
      setFieldValue('type', 'other');
      setFieldValue('address_type', '');
      setFieldValue('address_other_type_name', '');
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

  function handleCep(cep, setFieldValue, values) {
    const formattedCep = cep.replace('-', '');
    setCepState(formattedCep);
    setFieldValue('cep', formattedCep);

    if (values.type === 'other') {
      if (cep.length === 8) {
        setInitialState({
          ...initialState,
          cpf: values.cpf,
          name: values.name,
          email: values.email,
          sex: values.sex,
          couple_cpf: values.couple_cpf,
          couple_name: values.couple_name,
          couple_email: values.couple_email,
          couple_sex: values.couple_sex,
          type: 'other',
          address_type: values.address_type,
          address_other_type_name: values.address_other_type_name || '',
          receiver: values.receiver,
        });

        dispatch(CepActions.cepRequest(cep, 0));
      }
    }
  }

  function handleShipppingSelected(selected) {
    setShippingSelected(selected);
  }

  function handlePaymentSelected(selected) {
    setPaymentSelected(selected);
  }

  function handleInscriptionType(selected, setFieldValue) {
    setFieldValue('inscription_type', selected);
    setInscriptionType(selected);
  }

  useEffect(() => {
    if (event !== null) {
      if (event.default_event_id === 66) {
        setInscriptionCouple(true);
        setInscriptionSingle(false);
      }

      // financas crown
      if (event.default_event_id === 53) {
        setInscriptionSingle(true);
        setInscriptionCouple(true);
      }

      // yes
      if (event.default_event_id === 52) {
        setInscriptionSingle(true);
        setInscriptionCouple(true);
      }

      // habitudes
      if (event.default_event_id === 51) {
        setInscriptionSingle(true);
        setInscriptionCouple(true);
      }

      // coragem
      if (event.default_event_id === 69) {
        setInscriptionSingle(true);
        setInscriptionCouple(false);
      }

      // hombridade
      if (event.default_event_id === 56) {
        setInscriptionSingle(true);
        setInscriptionCouple(false);
      }

      // mulher unica
      if (event.default_event_id === 60) {
        setInscriptionSingle(true);
        setInscriptionCouple(false);
      }

      // mulher prospera
      if (event.default_event_id === 58) {
        setInscriptionSingle(true);
        setInscriptionCouple(false);
      }

      // paternidade biblica
      if (event.default_event_id === 65) {
        setInscriptionSingle(true);
        setInscriptionCouple(true);
      }

      const products = [];

      // const invite = event.invites.find(
      //   invite => invite.id === parseInt(match.params.id, 10)
      // );

      // if (invite === undefined) {
      //   history.push(`/evento/${event.id}/convite/expirado`);
      // } else {
      //   setInvite(invite);
      // }

      event.defaultEvent.kit.products.forEach(product => {
        if (
          product.product_category === 'manual' ||
          product.product_category === 'book' ||
          product.product_category === 'guide'
        ) {
          if (product.id === 316 || product.id === 219) {
            product.isSelected = true;
            product.quantity = 1;
            product.quantity_couple = 2;
          } else {
            product.isSelected = true;
            product.quantity = 1;
            product.quantity_couple = 1;
          }

          products.push(product);
        }
      });

      setKitProducts(products);
    }
  }, [event]);

  useEffect(() => {
    if (participantData !== null) {
      if (isCouple) {
        setCoupleParticipant(participantData);
        setNotFoundCoupleParticipant(false);
      } else {
        setParticipant(participantData);
        setNotFoundParticipant(false);
        setAddresses(participantData.addresses);
      }

      setErrorSex(false);

      if (participantData.error !== undefined && participant === null) {
        setAddresses([
          {
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
      }

      if (participantData.error !== undefined) {
        // setAddresses([
        //   {
        //     id: null,
        //     type: '',
        //     other_type_name: '',
        //     cep: '',
        //     country: 'Brasil',
        //     uf: '',
        //     city: '',
        //     street: '',
        //     street_number: '',
        //     neighborhood: '',
        //     complement: '',
        //     receiver: '',
        //   },
        // ]);

        if (participantData.error.type === 'sex_type') {
          setErrorSex(true);
        } else if (participantData.error.type === 'not_found' && isCouple) {
          setNotFoundCoupleParticipant(true);
        } else if (participantData.error.type === 'not_found' && !isCouple) {
          setNotFoundParticipant(true);
        } else {
          setErrorSex(false);
          setNotFoundParticipant(false);
          setNotFoundCoupleParticipant(false);
        }
      }
      // else {
      //   setInitialState({
      //     ...initialState,
      //     cpf: participantData.cpf,
      //     name: participantData.name,
      //     email: participantData.email,
      //     sex: participantData.sex,
      //     phone: participantData.phone,
      //   });
      // }
      else if (isCouple) {
        setInitialState({
          ...initialState,
          inscription_type: 'couple',
          couple_cpf: participantData.cpf,
          couple_name: participantData.name,
          couple_email: participantData.email,
          couple_sex: participantData.sex,
          // phone: participantData.phone,
        });
      } else {
        setInitialState({
          ...initialState,
          inscription_type: 'single',
          cpf: participantData.cpf,
          name: participantData.name,
          email: participantData.email,
          sex: participantData.sex,
          phone: participantData.phone,
        });
      }

      // if (inscriptionType === 'couple') {
      //   const coupleAux = participantData.relationships.find(
      //     relationship =>
      //       relationship.relationship_type === 'Esposa' ||
      //       relationship.relationship_type === 'Marido'
      //   );

      //   if (coupleAux !== undefined) {
      //     setCoupleData(coupleAux.relationshipEntity);
      //     setCoupleError(false);

      //     setInitialState({
      //       ...initialState,
      //       cpf: participantData.cpf,
      //       name: participantData.name,
      //       email: participantData.email,
      //       sex: participantData.sex,
      //       couple_cpf: coupleAux.relationshipEntity.cpf,
      //       couple_name: coupleAux.relationshipEntity.name,
      //       couple_email: coupleAux.relationshipEntity.email,
      //       couple_sex: coupleAux.relationshipEntity.sex,
      //       phone: participantData.phone,
      //     });
      //   } else {
      //     setCoupleError(true);

      //     setInitialState({
      //       ...initialState,
      //       cpf: participantData.cpf,
      //       name: participantData.name,
      //       email: participantData.email,
      //       sex: participantData.sex,
      //       couple_cpf: '',
      //       couple_name: '',
      //       couple_email: '',
      //       couple_sex: '',
      //       phone: participantData.phone,
      //     });
      //   }
      // } else {
      //   setInitialState({
      //     ...initialState,
      //     cpf: participantData.cpf,
      //     name: participantData.name,
      //     email: participantData.email,
      //     sex: participantData.sex,
      //     phone: participantData.phone,
      //   });
      // }
    }
  }, [participantData]);

  useEffect(() => {
    if (cepData.cep) {
      setInitialState({
        ...initialState,
        type: 'other',
        cep: cepData.cep.replace('-', ''),
        uf: cepData.uf,
        city: cepData.localidade,
        street: cepData.logradouro || initialState.street,
        street_number: initialState.street_number,
        neighborhood: cepData.bairro || initialState.neighborhood,
        complement: cepData.complemento || initialState.complement,
        receiver: initialState.receiver,
      });

      if (kitProducts.length > 0) {
        dispatch(ShippingActions.shippingOptionsRequest(cepState, kitProducts));
      }
    }
  }, [cepData]);

  useEffect(() => {
    if (shippingOptionsData && shippingOptionsData.length > 0) {
      const shippingsLowestToBiggestPrice = shippingOptionsData.sort((a, b) => {
        if (a.final_shipping_cost > b.final_shipping_cost) {
          return 1;
        }
        if (a.final_shipping_cost < b.final_shipping_cost) {
          return -1;
        }

        return 0;
      });

      setShippingOptions(shippingsLowestToBiggestPrice);
    }
  }, [shippingOptionsData]);

  useEffect(() => {
    dispatch(
      ParticipantActions.searchParticipantByEmailRequest(
        emailDebounce,
        participant ? participant.email : 'null'
      )
    );
  }, [emailDebounce]);

  useEffect(() => {
    if (inscriptionType === 'single') {
      setInitialState({
        ...initialState,
        couple_cpf: '',
        couple_name: '',
        couple_email: '',
        couple_sex: '',
      });
    }
  }, [inscriptionType]);

  useEffect(() => {
    dispatch(EventActions.eventRequest(match.params.event_id));

    setInitialState({
      inscription_type: '',
      cpf: '',
      name: '',
      email: '',
      sex: '',
      couple_cpf: '',
      couple_name: '',
      couple_email: '',
      couple_sex: '',
      type: '',
      address_type: '',
      address_other_type_name: '',
      cep: '',
      uf: '',
      city: '',
      street: '',
      street_number: '',
      neighborhood: '',
      complement: '',
      receiver: '',
      phone: '',
      installments: '1',
    });

    // if (canOpenedModalCaminhosLegadosInvite) {
    //   setModalCaminhosLegadosInvite(true);
    // }

    // setModalCaminhosLegadosInvite(true);

    // sessionStorage.setItem('@dashboard/caminhoslegados_invite', true);

    return () => {
      // setKitProducts(null);
      // setShippingSelected(null);
      // setShippingOptions(null);
      setInitialState({
        inscription_type: '',
        cpf: '',
        name: '',
        email: '',
        sex: '',
        couple_cpf: '',
        couple_name: '',
        couple_email: '',
        couple_sex: '',
        type: '',
        address_type: '',
        address_other_type_name: '',
        cep: '',
        uf: '',
        city: '',
        street: '',
        street_number: '',
        neighborhood: '',
        complement: '',
        receiver: '',
        phone: '',
        installments: '1',
      });
    };
  }, []);

  return (
    <div className="bg-static-pages-image d-flex flex-column flex-1 p-0 flex-lg-row">
      <div className="fit min-full-height-vh color-overlay" />
      {event !== null && (
        <>
          <div
            className="d-none d-lg-flex flex-column flex-grow-0 text-white width-50-per p-2 p-lg-5"
            style={{ zIndex: 1 }}
          >
            <img
              className="d-none d-lg-block fit width-125 mb-3"
              src={logo}
              alt="Logo UDF"
            />
            <Label className="d-none d-lg-block fit width-800 font-large-3 mb-3 line-height-1">
              {event.defaultEvent.name}
            </Label>
            <Label className="d-none d-lg-block fit width-700 font-medium-1">
              Olá, você foi convidado{' '}
              {event.organizators.length === 1 &&
                `pelo líder ${event.organizators[0].name}`}
              {event.organizators.length > 1 && handleManyOrganizators()} para
              participar do {event.defaultEvent.event_type}{' '}
              {event.defaultEvent.name}. O início do curso será dia{' '}
              <u>
                {format(
                  new Date(event.start_date),
                  "d 'de' MMMM 'de' y',' iiii",
                  {
                    locale: ptBR,
                  }
                )}
              </u>
              .
            </Label>
            <Label className="d-none d-lg-block fit width-700 font-medium-1">
              {event.defaultEvent.description}
            </Label>
            <Label className="d-none d-lg-block fit width-700 font-medium-1">
              Confirme sua inscrição ao lado!
            </Label>
          </div>
          <Motion
            defaultStyle={{ x: +200, opacity: 0 }}
            style={{ x: spring(0), opacity: spring(1) }}
          >
            {style => (
              <Card
                style={{
                  transform: `translateX(${style.x}px)`,
                  opacity: style.opacity,
                }}
                className="fit min-full-height-vh m-2 m-lg-0 min-width-50-per rounded-0"
              >
                <CardBody className="d-flex flex-column justify-content-center">
                  <Label className="font-medium-3 text-dark text-bold-400 text-center text-uppercase">
                    Confirmação de convite
                  </Label>
                  <Formik
                    enableReinitialize
                    initialValues={initialState}
                    validationSchema={formSchema}
                    onSubmit={values => handleSubmit(values)}
                  >
                    {({
                      errors,
                      touched,
                      values,
                      setFieldValue,
                      handleChange,
                    }) => (
                      <Form className="pt-2">
                        <Wizard
                          render={({ step, steps }) => (
                            <div>
                              <Line
                                percent={
                                  ((steps.indexOf(step) + 1) / steps.length) *
                                  100
                                }
                                strokeColor="#A8EB12"
                                className="pad-b"
                              />

                              <Steps>
                                <Step id="type">
                                  <FormGroup className="mb-0">
                                    {console.tron.log(event)}
                                    <ButtonGroup className="d-flex flex-column">
                                      {inscriptionSingle === true && (
                                        <Button
                                          key={1}
                                          outline
                                          className={`shipping-selected ${inscriptionType !==
                                            null &&
                                            inscriptionType === 'single' &&
                                            'shipping-selected-active'}`}
                                          onClick={() =>
                                            handleInscriptionType(
                                              'single',
                                              setFieldValue
                                            )
                                          }
                                          active={
                                            inscriptionType !== null &&
                                            inscriptionType === 'single'
                                          }
                                        >
                                          <Label className="mb-0 black font-medium-2">
                                            {inscriptionType !== null &&
                                              inscriptionType === 'single' && (
                                                <Check
                                                  size={24}
                                                  color="#0cc27e"
                                                />
                                              )}
                                            Individual
                                            <User
                                              size={24}
                                              color="#000"
                                              className="ml-2"
                                            />
                                          </Label>
                                        </Button>
                                      )}

                                      {inscriptionCouple === true && (
                                        <Button
                                          key={2}
                                          outline
                                          className={`shipping-selected ${inscriptionType !==
                                            null &&
                                            inscriptionType === 'couple' &&
                                            'shipping-selected-active'}`}
                                          onClick={() =>
                                            handleInscriptionType(
                                              'couple',
                                              setFieldValue
                                            )
                                          }
                                          active={
                                            inscriptionType !== null &&
                                            inscriptionType === 'couple'
                                          }
                                        >
                                          <Label className="mb-0 black font-medium-2">
                                            {inscriptionType !== null &&
                                              inscriptionType === 'couple' && (
                                                <Check
                                                  size={24}
                                                  color="#0cc27e"
                                                />
                                              )}
                                            Casal
                                            <Users
                                              size={24}
                                              color="#000"
                                              className="ml-2"
                                            />
                                          </Label>
                                        </Button>
                                      )}
                                    </ButtonGroup>
                                  </FormGroup>
                                </Step>
                                <Step id="entity">
                                  {inscriptionType === 'single' && (
                                    <FormGroup>
                                      <Row className="mt-3">
                                        <Label className="pl-3 font-medium-3 text-dark text-bold-400 text-center">
                                          Dados do participante
                                        </Label>
                                        <Col sm="12">
                                          <Label
                                            className="pl-2 mt-2"
                                            for="cpf"
                                          >
                                            CPF
                                          </Label>
                                          <div className="position-relative has-icon-right">
                                            <Field
                                              name="cpf"
                                              id="cpf"
                                              className={`
                                                new-form-padding
                                                form-control
                                                ${errors.cpf &&
                                                  touched.cpf &&
                                                  'is-invalid'}
                                              `}
                                              validate={validateCPF}
                                              render={({ field }) => (
                                                <CpfFormat
                                                  {...field}
                                                  id="cpf"
                                                  name="cpf"
                                                  placeholder="Ex: 423.123.321-12"
                                                  className={`
                                                    new-form-padding
                                                    form-control
                                                    ${errors.cpf &&
                                                      touched.cpf &&
                                                      'is-invalid'}
                                                  `}
                                                  value={values.cpf}
                                                  onValueChange={val =>
                                                    handleSearchCpf(val.value)
                                                  }
                                                />
                                              )}
                                            />
                                            {errors.cpf && touched.cpf ? (
                                              <div className="invalid-feedback">
                                                {errors.cpf}
                                              </div>
                                            ) : null}
                                            {loading && (
                                              <div className="new-form-control-position">
                                                <RefreshCw
                                                  size={16}
                                                  className="spinner"
                                                />
                                              </div>
                                            )}
                                          </div>
                                        </Col>

                                        {!!values.cpf &&
                                          participant !== null &&
                                          participant.error === undefined &&
                                          typeof participant === 'object' && (
                                            <>
                                              <Col sm="12" className="mt-2">
                                                <Label>Nome</Label>
                                                <div className="position-relative has-icon-left">
                                                  <Field
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    className={`
                                                    new-form-padding
                                                    form-control
                                                    ${errors.name &&
                                                      touched.name &&
                                                      'is-invalid'}
                                                  `}
                                                    autoComplete="off"
                                                  />
                                                  {errors.name &&
                                                  touched.name ? (
                                                    <div className="invalid-feedback">
                                                      {errors.name}
                                                    </div>
                                                  ) : null}
                                                  <div className="new-form-control-position">
                                                    <User
                                                      size={14}
                                                      color="#212529"
                                                    />
                                                  </div>
                                                </div>
                                              </Col>
                                              <Col sm="12" className="mt-2">
                                                <Label>Email</Label>
                                                <div className="position-relative has-icon-left">
                                                  <Field
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    onChange={event =>
                                                      handleSearchEmail(
                                                        event,
                                                        setFieldValue,
                                                        false
                                                      )
                                                    }
                                                    className={`
                                                    new-form-padding
                                                    form-control
                                                    ${errors.email &&
                                                      touched.email &&
                                                      'is-invalid'}
                                                  `}
                                                    autoComplete="off"
                                                  />
                                                  {errors.email &&
                                                  touched.email ? (
                                                    <div className="invalid-feedback">
                                                      {errors.email}
                                                    </div>
                                                  ) : null}
                                                  <div className="new-form-control-position">
                                                    <User
                                                      size={14}
                                                      color="#212529"
                                                    />
                                                  </div>
                                                </div>
                                              </Col>
                                            </>
                                          )}

                                        {notFoundParticipant === true && (
                                          <>
                                            <Label className="font-small-3 text-center text-dark text-bold-400 text-uppercase mt-3 mx-auto">
                                              Complete seu cadastro
                                            </Label>
                                            <Col sm="12" className="mt-2">
                                              <Label>Nome</Label>
                                              <div className="position-relative has-icon-left">
                                                <Field
                                                  type="text"
                                                  name="name"
                                                  id="name"
                                                  className={`
                                                    new-form-padding
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
                                                <div className="new-form-control-position">
                                                  <User
                                                    size={14}
                                                    color="#212529"
                                                  />
                                                </div>
                                              </div>
                                            </Col>
                                            <Col sm="12" className="mt-2">
                                              <Label>Email</Label>
                                              <div className="position-relative has-icon-left">
                                                <Field
                                                  type="email"
                                                  name="email"
                                                  id="email"
                                                  className={`
                                                    new-form-padding
                                                    form-control
                                                    ${errors.email &&
                                                      touched.email &&
                                                      'is-invalid'}
                                                  `}
                                                  onChange={event =>
                                                    handleSearchEmail(
                                                      event,
                                                      setFieldValue,
                                                      false
                                                    )
                                                  }
                                                  autoComplete="off"
                                                />
                                                {errors.email &&
                                                touched.email ? (
                                                  <div className="invalid-feedback">
                                                    {errors.email}
                                                  </div>
                                                ) : null}
                                                <div className="new-form-control-position">
                                                  <User
                                                    size={14}
                                                    color="#212529"
                                                  />
                                                </div>
                                              </div>
                                            </Col>
                                            <Col sm="12" className="mt-2">
                                              <RadioButtonGroup
                                                id="radioGroup"
                                                value={values.radioGroup}
                                                error={errors.radioGroup}
                                                touched={touched.radioGroup}
                                                className={`
                                              new-form-padding
                                              form-control
                                              border-0
                                              ${errors.sex &&
                                                touched.sex &&
                                                'is-invalid'}
                                            `}
                                              >
                                                <Row className="d-flex justify-content-around">
                                                  {event.defaultEvent
                                                    .sex_type === 'M' && (
                                                    <Field
                                                      component={RadioButton}
                                                      name="sex"
                                                      id="M"
                                                      label="Masculino"
                                                    />
                                                  )}
                                                  {event.defaultEvent
                                                    .sex_type === 'F' && (
                                                    <Field
                                                      component={RadioButton}
                                                      name="sex"
                                                      id="F"
                                                      label="Feminino"
                                                    />
                                                  )}
                                                  {event.defaultEvent
                                                    .sex_type === 'A' && (
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
                                            </Col>
                                          </>
                                        )}
                                      </Row>
                                    </FormGroup>
                                  )}

                                  {inscriptionType === 'couple' && (
                                    <>
                                      <FormGroup>
                                        <Row className="mt-3">
                                          <Label className="pl-3 font-medium-3 text-dark text-bold-400 text-center">
                                            Dados do participante
                                          </Label>
                                          <Col sm="12">
                                            <Label
                                              className="pl-2 mt-2"
                                              for="cpf"
                                            >
                                              CPF
                                            </Label>
                                            <div className="position-relative has-icon-right">
                                              <Field
                                                name="cpf"
                                                id="cpf"
                                                className={`
                                                new-form-padding
                                                form-control
                                                ${errors.cpf &&
                                                  touched.cpf &&
                                                  'is-invalid'}
                                              `}
                                                validate={validateCPF}
                                                render={({ field }) => (
                                                  <CpfFormat
                                                    {...field}
                                                    id="cpf"
                                                    name="cpf"
                                                    placeholder="Ex: 423.123.321-12"
                                                    className={`
                                                    new-form-padding
                                                    form-control
                                                    ${errors.cpf &&
                                                      touched.cpf &&
                                                      'is-invalid'}
                                                  `}
                                                    value={values.cpf}
                                                    onValueChange={val =>
                                                      handleSearchCpf(val.value)
                                                    }
                                                  />
                                                )}
                                              />
                                              {errors.cpf && touched.cpf ? (
                                                <div className="invalid-feedback">
                                                  {errors.cpf}
                                                </div>
                                              ) : null}
                                              {loading && (
                                                <div className="new-form-control-position">
                                                  <RefreshCw
                                                    size={16}
                                                    className="spinner"
                                                  />
                                                </div>
                                              )}
                                            </div>
                                          </Col>

                                          {!!values.cpf &&
                                            participant !== null &&
                                            participant.error === undefined &&
                                            typeof participant === 'object' && (
                                              <>
                                                <Col sm="12" className="mt-2">
                                                  <Label>Nome</Label>
                                                  <div className="position-relative has-icon-left">
                                                    <Field
                                                      type="text"
                                                      name="name"
                                                      id="name"
                                                      className={`
                                                    new-form-padding
                                                    form-control
                                                    ${errors.name &&
                                                      touched.name &&
                                                      'is-invalid'}
                                                  `}
                                                      autoComplete="off"
                                                    />
                                                    {errors.name &&
                                                    touched.name ? (
                                                      <div className="invalid-feedback">
                                                        {errors.name}
                                                      </div>
                                                    ) : null}
                                                    <div className="new-form-control-position">
                                                      <User
                                                        size={14}
                                                        color="#212529"
                                                      />
                                                    </div>
                                                  </div>
                                                </Col>
                                                <Col sm="12" className="mt-2">
                                                  <Label>Email</Label>
                                                  <div className="position-relative has-icon-left">
                                                    <Field
                                                      type="email"
                                                      name="email"
                                                      id="email"
                                                      onChange={event =>
                                                        handleSearchEmail(
                                                          event,
                                                          setFieldValue,
                                                          true
                                                        )
                                                      }
                                                      className={`
                                                    new-form-padding
                                                    form-control
                                                    ${errors.email &&
                                                      touched.email &&
                                                      'is-invalid'}
                                                  `}
                                                      autoComplete="off"
                                                    />
                                                    {errors.email &&
                                                    touched.email ? (
                                                      <div className="invalid-feedback">
                                                        {errors.email}
                                                      </div>
                                                    ) : null}
                                                    <div className="new-form-control-position">
                                                      <User
                                                        size={14}
                                                        color="#212529"
                                                      />
                                                    </div>
                                                  </div>
                                                </Col>
                                              </>
                                            )}

                                          {notFoundParticipant === true && (
                                            <>
                                              <Label className="font-small-3 text-center text-dark text-bold-400 text-uppercase mt-3 mx-auto">
                                                Complete seu cadastro
                                              </Label>
                                              <Col sm="12" className="mt-2">
                                                <Label>Nome</Label>
                                                <div className="position-relative has-icon-left">
                                                  <Field
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    className={`
                                                    new-form-padding
                                                    form-control
                                                    ${errors.name &&
                                                      touched.name &&
                                                      'is-invalid'}
                                                  `}
                                                    autoComplete="off"
                                                  />
                                                  {errors.name &&
                                                  touched.name ? (
                                                    <div className="invalid-feedback">
                                                      {errors.name}
                                                    </div>
                                                  ) : null}
                                                  <div className="new-form-control-position">
                                                    <User
                                                      size={14}
                                                      color="#212529"
                                                    />
                                                  </div>
                                                </div>
                                              </Col>
                                              <Col sm="12" className="mt-2">
                                                <Label>Email</Label>
                                                <div className="position-relative has-icon-left">
                                                  <Field
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    className={`
                                                    new-form-padding
                                                    form-control
                                                    ${errors.email &&
                                                      touched.email &&
                                                      'is-invalid'}
                                                  `}
                                                    onChange={event =>
                                                      handleSearchEmail(
                                                        event,
                                                        setFieldValue,
                                                        false
                                                      )
                                                    }
                                                    autoComplete="off"
                                                  />
                                                  {errors.email &&
                                                  touched.email ? (
                                                    <div className="invalid-feedback">
                                                      {errors.email}
                                                    </div>
                                                  ) : null}
                                                  <div className="new-form-control-position">
                                                    <User
                                                      size={14}
                                                      color="#212529"
                                                    />
                                                  </div>
                                                </div>
                                              </Col>
                                              <Col sm="12" className="mt-2">
                                                <RadioButtonGroup
                                                  id="radioGroup"
                                                  value={values.radioGroup}
                                                  error={errors.radioGroup}
                                                  touched={touched.radioGroup}
                                                  className={`
                                              new-form-padding
                                              form-control
                                              border-0
                                              ${errors.sex &&
                                                touched.sex &&
                                                'is-invalid'}
                                            `}
                                                >
                                                  <Row className="d-flex justify-content-around">
                                                    {event.defaultEvent
                                                      .sex_type === 'M' && (
                                                      <Field
                                                        component={RadioButton}
                                                        name="sex"
                                                        id="M"
                                                        label="Masculino"
                                                      />
                                                    )}
                                                    {event.defaultEvent
                                                      .sex_type === 'F' && (
                                                      <Field
                                                        component={RadioButton}
                                                        name="sex"
                                                        id="F"
                                                        label="Feminino"
                                                      />
                                                    )}
                                                    {event.defaultEvent
                                                      .sex_type === 'A' && (
                                                      <>
                                                        <Field
                                                          component={
                                                            RadioButton
                                                          }
                                                          name="sex"
                                                          id="M"
                                                          label="Masculino"
                                                        />
                                                        <Field
                                                          component={
                                                            RadioButton
                                                          }
                                                          name="sex"
                                                          id="F"
                                                          label="Feminino"
                                                        />
                                                      </>
                                                    )}
                                                  </Row>
                                                </RadioButtonGroup>
                                              </Col>
                                            </>
                                          )}
                                        </Row>
                                      </FormGroup>

                                      <FormGroup>
                                        <Row className="mt-5">
                                          <Label className="pl-3 font-medium-3 text-dark text-bold-400 text-center">
                                            Dados do cônjuge
                                          </Label>
                                          {/* Checkpoint */}
                                          <Col sm="12">
                                            <Label
                                              className="pl-2 mt-2"
                                              for="couple_cpf"
                                            >
                                              CPF Cônjuge
                                            </Label>
                                            <div className="position-relative has-icon-right">
                                              <Field
                                                name="couple_cpf"
                                                id="couple_cpf"
                                                className={`
                                              new-form-padding
                                              form-control
                                              ${errors.couple_cpf &&
                                                touched.couple_cpf &&
                                                'is-invalid'}
                                            `}
                                                validate={validateCPF}
                                                render={({ field }) => (
                                                  <CpfFormat
                                                    {...field}
                                                    id="couple_cpf"
                                                    name="couple_cpf"
                                                    placeholder="Ex: 423.123.321-12"
                                                    className={`
                                                  new-form-padding
                                                  form-control
                                                  ${errors.couple_cpf &&
                                                    touched.couple_cpf &&
                                                    'is-invalid'}
                                                `}
                                                    value={values.couple_cpf}
                                                    onValueChange={val =>
                                                      handleSearchCoupleCpf(
                                                        val.value
                                                      )
                                                    }
                                                  />
                                                )}
                                              />
                                              {errors.couple_cpf &&
                                              touched.couple_cpf ? (
                                                <div className="invalid-feedback">
                                                  {errors.couple_cpf}
                                                </div>
                                              ) : null}
                                              {loading && (
                                                <div className="new-form-control-position">
                                                  <RefreshCw
                                                    size={16}
                                                    className="spinner"
                                                  />
                                                </div>
                                              )}
                                            </div>
                                          </Col>

                                          {!!values.couple_cpf &&
                                            coupleParticipant !== null &&
                                            coupleParticipant.error ===
                                              undefined &&
                                            typeof coupleParticipant ===
                                              'object' && (
                                              <>
                                                <Col sm="12" className="mt-2">
                                                  <Label>Nome cônjuge</Label>
                                                  <div className="position-relative has-icon-left">
                                                    <Field
                                                      type="text"
                                                      name="couple_name"
                                                      id="couple_name"
                                                      className={`
                                                  new-form-padding
                                                  form-control
                                                  ${errors.couple_name &&
                                                    touched.couple_name &&
                                                    'is-invalid'}
                                                `}
                                                      autoComplete="off"
                                                    />
                                                    {errors.couple_name &&
                                                    touched.couple_name ? (
                                                      <div className="invalid-feedback">
                                                        {errors.couple_name}
                                                      </div>
                                                    ) : null}
                                                    <div className="new-form-control-position">
                                                      <User
                                                        size={14}
                                                        color="#212529"
                                                      />
                                                    </div>
                                                  </div>
                                                </Col>
                                                <Col sm="12" className="mt-2">
                                                  <Label>Email cônjuge</Label>
                                                  <div className="position-relative has-icon-left">
                                                    <Field
                                                      type="couple_email"
                                                      name="couple_email"
                                                      id="couple_email"
                                                      onChange={event =>
                                                        handleSearchEmail(
                                                          event,
                                                          setFieldValue,
                                                          true
                                                        )
                                                      }
                                                      className={`
                                                  new-form-padding
                                                  form-control
                                                  ${errors.couple_email &&
                                                    touched.couple_email &&
                                                    'is-invalid'}
                                                `}
                                                      autoComplete="off"
                                                    />
                                                    {errors.couple_email &&
                                                    touched.couple_email ? (
                                                      <div className="invalid-feedback">
                                                        {errors.couple_email}
                                                      </div>
                                                    ) : null}
                                                    <div className="new-form-control-position">
                                                      <User
                                                        size={14}
                                                        color="#212529"
                                                      />
                                                    </div>
                                                  </div>
                                                </Col>
                                              </>
                                            )}

                                          {notFoundCoupleParticipant ===
                                            true && (
                                            <>
                                              <Label className="font-small-3 text-center text-dark text-bold-400 text-uppercase mt-3 mx-auto">
                                                Complete cadastro cônjuge
                                              </Label>
                                              <Col sm="12" className="mt-2">
                                                <Label>Nome cônjuge</Label>
                                                <div className="position-relative has-icon-left">
                                                  <Field
                                                    type="text"
                                                    name="couple_name"
                                                    id="couple_name"
                                                    className={`
                                                  new-form-padding
                                                  form-control
                                                  ${errors.couple_name &&
                                                    touched.couple_name &&
                                                    'is-invalid'}
                                                `}
                                                    autoComplete="off"
                                                  />
                                                  {errors.couple_name &&
                                                  touched.couple_name ? (
                                                    <div className="invalid-feedback">
                                                      {errors.couple_name}
                                                    </div>
                                                  ) : null}
                                                  <div className="new-form-control-position">
                                                    <User
                                                      size={14}
                                                      color="#212529"
                                                    />
                                                  </div>
                                                </div>
                                              </Col>
                                              <Col sm="12" className="mt-2">
                                                <Label>Email cônjuge</Label>
                                                <div className="position-relative has-icon-left">
                                                  <Field
                                                    type="email"
                                                    name="couple_email"
                                                    id="couple_email"
                                                    className={`
                                                  new-form-padding
                                                  form-control
                                                  ${errors.couple_email &&
                                                    touched.couple_email &&
                                                    'is-invalid'}
                                                `}
                                                    onChange={event =>
                                                      handleSearchEmail(
                                                        event,
                                                        setFieldValue,
                                                        true
                                                      )
                                                    }
                                                    autoComplete="off"
                                                  />
                                                  {errors.couple_email &&
                                                  touched.couple_email ? (
                                                    <div className="invalid-feedback">
                                                      {errors.couple_email}
                                                    </div>
                                                  ) : null}
                                                  <div className="new-form-control-position">
                                                    <User
                                                      size={14}
                                                      color="#212529"
                                                    />
                                                  </div>
                                                </div>
                                              </Col>
                                              <Col sm="12" className="mt-2">
                                                <RadioButtonGroup
                                                  id="radioGroup"
                                                  value={values.radioGroup}
                                                  error={errors.radioGroup}
                                                  touched={touched.radioGroup}
                                                  className={`
                                                    new-form-padding
                                                    form-control
                                                    border-0
                                                    ${errors.couple_sex &&
                                                      touched.couple_sex &&
                                                      'is-invalid'}
                                                  `}
                                                >
                                                  <Row className="d-flex justify-content-around">
                                                    {event.defaultEvent
                                                      .sex_type === 'M' && (
                                                      <Field
                                                        component={RadioButton}
                                                        name="couple_sex"
                                                        id="M"
                                                        label="Masculino"
                                                      />
                                                    )}
                                                    {event.defaultEvent
                                                      .sex_type === 'F' && (
                                                      <Field
                                                        component={RadioButton}
                                                        name="couple_sex"
                                                        id="F"
                                                        label="Feminino"
                                                      />
                                                    )}
                                                    {event.defaultEvent
                                                      .sex_type === 'A' && (
                                                      <>
                                                        <Field
                                                          component={
                                                            RadioButton
                                                          }
                                                          name="couple_sex"
                                                          id="M"
                                                          label="Masculino"
                                                        />
                                                        <Field
                                                          component={
                                                            RadioButton
                                                          }
                                                          name="couple_sex"
                                                          id="F"
                                                          label="Feminino"
                                                        />
                                                      </>
                                                    )}
                                                  </Row>
                                                </RadioButtonGroup>
                                              </Col>
                                            </>
                                          )}
                                        </Row>
                                      </FormGroup>
                                    </>
                                  )}
                                </Step>
                                {/* <Step id="authorization">
                                  <FormGroup>
                                    <Col sm="12" className="mt-2">
                                      <Label>Nome da igreja</Label>
                                      <div className="position-relative">
                                        <Field
                                          type="text"
                                          name="church_name"
                                          id="church_name"
                                          className={`
                                          new-form-padding
                                          form-control
                                          ${errors.church_name &&
                                            touched.church_name &&
                                            'is-invalid'}
                                        `}
                                          autoComplete="off"
                                        />
                                        {errors.church_name &&
                                        touched.church_name ? (
                                          <div className="invalid-feedback">
                                            {errors.church_name}
                                          </div>
                                        ) : null}
                                      </div>
                                    </Col>
                                    <Col sm="12" className="mt-2">
                                      <Label>Nome do pastor</Label>
                                      <div className="position-relative">
                                        <Field
                                          type="text"
                                          name="pastor_name"
                                          id="pastor_name"
                                          className={`
                                          new-form-padding
                                          form-control
                                          ${errors.pastor_name &&
                                            touched.pastor_name &&
                                            'is-invalid'}
                                        `}
                                          autoComplete="off"
                                        />
                                        {errors.pastor_name &&
                                        touched.pastor_name ? (
                                          <div className="invalid-feedback">
                                            {errors.pastor_name}
                                          </div>
                                        ) : null}
                                      </div>
                                    </Col>
                                    <Col sm="12" className="mt-2">
                                      <Label>Email do pastor</Label>
                                      <div className="position-relative">
                                        <Field
                                          type="email"
                                          name="pastor_email"
                                          id="pastor_email"
                                          className={`
                                          new-form-padding
                                          form-control
                                          ${errors.pastor_email &&
                                            touched.pastor_email &&
                                            'is-invalid'}
                                        `}
                                          autoComplete="off"
                                        />
                                        {errors.pastor_email &&
                                        touched.pastor_email ? (
                                          <div className="invalid-feedback">
                                            {errors.pastor_email}
                                          </div>
                                        ) : null}
                                      </div>
                                    </Col>
                                  </FormGroup>
                                </Step> */}
                                <Step id="products">
                                  <Label className="mt-3 pl-2 font-medium-3 text-dark text-bold-400 text-center">
                                    Material didático
                                  </Label>
                                  {kitProducts.map((product, index) => {
                                    if (product.id === 345) {
                                      return (
                                        <Row className="ml-2 mt-2">
                                          <CustomInput
                                            type="checkbox"
                                            id={`product-${product.id}`}
                                            defaultChecked={product.isSelected}
                                            onChange={e =>
                                              handleChangeChild(e, index)
                                            }
                                          />
                                          <Label for={`product-${product.id}`}>
                                            <h6>
                                              <b className="font-medium-2 text-dark text-bold-600">
                                                (OPCIONAL)
                                              </b>{' '}
                                              {`${
                                                inscriptionType === 'couple'
                                                  ? product.quantity_couple
                                                  : product.quantity
                                              } X ${
                                                product.name
                                              } - ${product.training_price.toLocaleString(
                                                'pt-BR',
                                                {
                                                  style: 'currency',
                                                  currency: 'BRL',
                                                }
                                              )}`}
                                            </h6>
                                          </Label>
                                        </Row>
                                      );
                                    }
                                    return (
                                      <Row className="ml-2 mt-2">
                                        <CustomInput
                                          type="checkbox"
                                          id={`product-${product.id}`}
                                          defaultChecked
                                          disabled
                                          onChange={e =>
                                            handleChangeChild(e, index)
                                          }
                                        />
                                        <Label for={`product-${product.id}`}>
                                          <h6>{`${
                                            inscriptionType === 'couple'
                                              ? product.quantity_couple
                                              : product.quantity
                                          } X ${
                                            product.name
                                          } - ${product.training_price.toLocaleString(
                                            'pt-BR',
                                            {
                                              style: 'currency',
                                              currency: 'BRL',
                                            }
                                          )}`}</h6>
                                        </Label>
                                      </Row>
                                    );
                                  })}
                                </Step>
                                <Step id="address">
                                  <FormGroup>
                                    <Label className="mt-3 pl-2 font-medium-3 text-dark text-bold-400 text-center">
                                      Endereço para entrega
                                    </Label>
                                    <Row>
                                      <Col sm="6">
                                        <FormGroup>
                                          <Label for="type">
                                            Tipo endereço
                                          </Label>
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
                                              onChange={event =>
                                                handleChangeAddressType(
                                                  event,
                                                  setFieldValue
                                                )
                                              }
                                            >
                                              <option
                                                value=""
                                                defaultValue=""
                                                disabled=""
                                              >
                                                Selecione uma opção
                                              </option>
                                              {addresses.length > 0 &&
                                                addresses[0].id !== null &&
                                                addresses.map(address => (
                                                  <option
                                                    key={address.id}
                                                    value={address.id}
                                                  >
                                                    {address.type === 'home' &&
                                                      'Casa'}
                                                    {address.type === 'work' &&
                                                      'Trabalho'}
                                                    {address.type === 'other' &&
                                                      address.other_type_name}
                                                    {`: ${address.cep}, ${address.street}, ${address.street_number}`}
                                                  </option>
                                                ))}
                                              <option key="other" value="other">
                                                Novo endereço
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
                                    </Row>

                                    {!!values.type && (
                                      <>
                                        {values.type === 'other' && (
                                          <Row>
                                            <Col sm="12" md="12" lg="12" xl="4">
                                              <FormGroup>
                                                <Label for="address_type">
                                                  Tipo endereço
                                                </Label>
                                                <div className="position-relative has-icon-left">
                                                  <Field
                                                    type="select"
                                                    component="select"
                                                    id="address_type"
                                                    name="address_type"
                                                    className={`
                                                  form-control
                                                  ${errors &&
                                                    errors.address_type &&
                                                    touched &&
                                                    touched.address_type &&
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
                                                    <option
                                                      key="home"
                                                      value="home"
                                                    >
                                                      Casa
                                                    </option>
                                                    <option
                                                      key="work"
                                                      value="work"
                                                    >
                                                      Trabalho
                                                    </option>
                                                    <option
                                                      key="other"
                                                      value="other"
                                                    >
                                                      Outro
                                                    </option>
                                                  </Field>
                                                  {errors &&
                                                  errors.address_type &&
                                                  touched &&
                                                  touched.address_type ? (
                                                    <div className="invalid-feedback">
                                                      {errors.address_type}
                                                    </div>
                                                  ) : null}
                                                  <div className="form-control-position">
                                                    <Map
                                                      size={14}
                                                      color="#212529"
                                                    />
                                                  </div>
                                                </div>
                                              </FormGroup>
                                            </Col>
                                            {values.address_type ===
                                              'other' && (
                                              <Col
                                                sm="12"
                                                md="12"
                                                lg="12"
                                                xl="8"
                                              >
                                                <FormGroup>
                                                  <Label for="address_other_type_name">
                                                    Apelido do endereço
                                                  </Label>
                                                  <Field
                                                    type="text"
                                                    id="address_other_type_name"
                                                    name="address_other_type_name"
                                                    placeholder="Ex: Casa da minha mãe"
                                                    className={`
                                                  form-control
                                                  ${errors &&
                                                    errors.address_other_type_name &&
                                                    touched &&
                                                    touched.address_other_type_name &&
                                                    'is-invalid'}
                                                `}
                                                  />
                                                  {errors &&
                                                  errors.address_other_type_name &&
                                                  touched &&
                                                  touched.address_other_type_name ? (
                                                    <div className="invalid-feedback">
                                                      {
                                                        errors.address_other_type_name
                                                      }
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
                                                  disabled={
                                                    values.type !== 'other'
                                                  }
                                                  className={`
                                                form-control
                                                ${errors &&
                                                  errors.cep &&
                                                  touched &&
                                                  touched.cep &&
                                                  'is-invalid'}
                                              `}
                                                  onValueChange={val =>
                                                    handleCep(
                                                      val.value,
                                                      setFieldValue,
                                                      values
                                                    )
                                                  }
                                                />
                                                {errors &&
                                                errors.cep &&
                                                touched &&
                                                touched.cep ? (
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
                                          <Col sm="12" md="3" lg="3" xl="3">
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
                                          <Col sm="12" md="12" lg="6" xl="6">
                                            <FormGroup>
                                              <Label for="city">Cidade</Label>
                                              <Field
                                                readOnly
                                                type="text"
                                                id="city"
                                                name="city"
                                                disabled={
                                                  values.type !== 'other' ||
                                                  cepLoading
                                                }
                                                className="form-control"
                                              />
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
                                                  disabled={
                                                    values.type !== 'other'
                                                  }
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
                                              <Label for="street_number">
                                                Número
                                              </Label>
                                              <div className="position-relative has-icon-left">
                                                <Field
                                                  type="text"
                                                  id="street_number"
                                                  name="street_number"
                                                  disabled={
                                                    values.type !== 'other'
                                                  }
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
                                                  <NavigationIcon
                                                    size={14}
                                                    color="#212529"
                                                  />
                                                </div>
                                              </div>
                                            </FormGroup>
                                          </Col>
                                          <Col sm="12" md="12" lg="12" xl="4">
                                            <FormGroup>
                                              <Label for="neighborhood">
                                                Bairro
                                              </Label>
                                              <div className="position-relative has-icon-left">
                                                <Field
                                                  type="text"
                                                  id="neighborhood"
                                                  name="neighborhood"
                                                  disabled={
                                                    values.type !== 'other'
                                                  }
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
                                              <Label for="complement">
                                                Complemento
                                              </Label>
                                              <div className="position-relative has-icon-left">
                                                <Field
                                                  type="text"
                                                  id="complement"
                                                  name="complement"
                                                  disabled={
                                                    values.type !== 'other'
                                                  }
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
                                                  <Edit
                                                    size={14}
                                                    color="#212529"
                                                  />
                                                </div>
                                              </div>
                                            </FormGroup>
                                          </Col>
                                          <Col sm="12" md="6" lg="6" xl="6">
                                            <FormGroup>
                                              <Label for="receiver">
                                                Recebedor
                                              </Label>
                                              <div className="position-relative has-icon-left">
                                                <Field
                                                  type="text"
                                                  id="receiver"
                                                  name="receiver"
                                                  disabled={
                                                    values.type !== 'other'
                                                  }
                                                  className="form-control"
                                                />
                                                <div className="form-control-position">
                                                  <Edit
                                                    size={14}
                                                    color="#212529"
                                                  />
                                                </div>
                                              </div>
                                            </FormGroup>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col sm="12" md="6" lg="6" xl="6">
                                            <FormGroup>
                                              <span className="red font-weight-bold mb-2">
                                                Confirme o seu telefone
                                                principal para contato
                                              </span>
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
                                                {errors.phone &&
                                                touched.phone ? (
                                                  <div className="invalid-feedback">
                                                    {errors.phone}
                                                  </div>
                                                ) : null}
                                                <div className="form-control-position">
                                                  <Smartphone
                                                    size={14}
                                                    color="#212529"
                                                  />
                                                </div>
                                              </div>
                                            </FormGroup>
                                          </Col>
                                        </Row>
                                      </>
                                    )}
                                  </FormGroup>
                                </Step>
                                <Step id="shipping_options">
                                  <Label className="mt-3 pl-2 font-medium-3 text-dark text-bold-400 text-center">
                                    Selecione a opção de envio
                                  </Label>
                                  {kitProducts.length > 0 &&
                                    shippingOptions !== null &&
                                    !!values.type && (
                                      <FormGroup className="mb-0">
                                        <ButtonGroup className="d-flex flex-column">
                                          {shippingOptions.map(
                                            shippingOption => (
                                              <Button
                                                key={
                                                  shippingOption.delivery_method_id
                                                }
                                                outline
                                                className={`height-100 shipping-selected ${shippingSelected !==
                                                  null &&
                                                  shippingSelected.delivery_method_id ===
                                                    shippingOption.delivery_method_id &&
                                                  'shipping-selected-active'}`}
                                                onClick={() =>
                                                  handleShipppingSelected(
                                                    shippingOption
                                                  )
                                                }
                                                active={
                                                  shippingSelected !== null &&
                                                  shippingSelected.delivery_method_id ===
                                                    shippingOption.delivery_method_id
                                                }
                                              >
                                                <div className="d-flex align-items-center flex-column flex-sm-column flex-md-column flex-lg-row flex-xl-row">
                                                  <Col className="text-lg-left text-xl-left pl-lg-5 pl-xl-5">
                                                    <Label className="mb-0 black font-medium-2">
                                                      {shippingSelected !==
                                                        null &&
                                                        shippingSelected.delivery_method_id ===
                                                          shippingOption.delivery_method_id && (
                                                          <Check
                                                            size={24}
                                                            color="#0cc27e"
                                                          />
                                                        )}
                                                      {
                                                        shippingOption.delivery_method_name
                                                      }
                                                      {shippingOption.free_shipping && (
                                                        <>
                                                          <Star
                                                            id="bestchoice"
                                                            size={24}
                                                            color="#fc0"
                                                            fill="#fc0"
                                                            className="ml-2"
                                                          />
                                                          <UncontrolledTooltip
                                                            placement="right"
                                                            target="bestchoice"
                                                          >
                                                            frete sugerido
                                                          </UncontrolledTooltip>
                                                        </>
                                                      )}
                                                    </Label>
                                                  </Col>
                                                  <Col>
                                                    <Label className="mb-0 black">
                                                      Entre{' '}
                                                      {
                                                        shippingOption.delivery_estimate_business_days
                                                      }{' '}
                                                      a{' '}
                                                      {shippingOption.delivery_estimate_business_days +
                                                        3}{' '}
                                                      dias úteis
                                                    </Label>
                                                  </Col>
                                                  <Col className="text-lg-right text-xl-right pr-lg-5 pr-xl-5">
                                                    {shippingOption.free_shipping ? (
                                                      <Label className="mb-0 text-success font-medium-2">
                                                        FRETE GRÁTIS
                                                      </Label>
                                                    ) : (
                                                      <Label className="mb-0 black font-medium-2">
                                                        {shippingOption.final_shipping_cost.toLocaleString(
                                                          'pt-BR',
                                                          {
                                                            style: 'currency',
                                                            currency: 'BRL',
                                                          }
                                                        )}
                                                      </Label>
                                                    )}
                                                  </Col>
                                                </div>
                                              </Button>
                                            )
                                          )}
                                          <Button
                                            outline
                                            className={`height-100 shipping-selected ${shippingSelected !==
                                              null &&
                                              shippingSelected.delivery_method_id ===
                                                34058500 &&
                                              'shipping-selected-active'}`}
                                            onClick={() =>
                                              handleShipppingSelected({
                                                delivery_method_id: 34058500,
                                                delivery_method_name:
                                                  'Retirar na UDF',
                                                free_shipping: true,
                                                final_shipping_cost: 0,
                                                delivery_estimate_business_days: 0,
                                              })
                                            }
                                            active={
                                              shippingSelected !== null &&
                                              shippingSelected.delivery_method_id ===
                                                34058500
                                            }
                                          >
                                            <div className="d-flex flex-column flex-sm-column flex-md-column flex-lg-row flex-xl-row">
                                              <Col className="text-lg-left text-xl-left pl-lg-5 pl-xl-5">
                                                <Label className="mb-0 black font-medium-2">
                                                  {shippingSelected !== null &&
                                                    shippingSelected.delivery_method_id ===
                                                      34058500 && (
                                                      <Check
                                                        size={24}
                                                        color="#0cc27e"
                                                      />
                                                    )}
                                                  Retirar na UDF
                                                </Label>
                                              </Col>
                                              <Col>
                                                <Label className="mb-0 black">
                                                  Rua José Candido Prisão, 543 -
                                                  Vila Paulina - Pompéia-SP -
                                                  CEP: 17580-000
                                                </Label>
                                              </Col>
                                            </div>
                                          </Button>
                                        </ButtonGroup>
                                      </FormGroup>
                                    )}
                                </Step>
                                <Step id="confirmation">
                                  {shippingSelected !== null && (
                                    <>
                                      <h4 className="form-section mt-3">
                                        <List size={20} color="#212529" />{' '}
                                        Resumo do pedido
                                      </h4>
                                      {kitProducts.map(product => {
                                        if (product.isSelected === true) {
                                          return (
                                            <p
                                              key={product.id}
                                              className="font-medium-2"
                                            >
                                              <span className="black font-weight-bold">
                                                $
                                                {inscriptionType === 'couple'
                                                  ? product.quantity_couple
                                                  : product.quantity}{' '}
                                                x{' '}
                                              </span>
                                              <span className="black">
                                                {product.name} por{' '}
                                              </span>
                                              <span className="black font-weight-bold">
                                                {product.training_price.toLocaleString(
                                                  'pt-BR',
                                                  {
                                                    style: 'currency',
                                                    currency: 'BRL',
                                                  }
                                                )}
                                                /unidade
                                              </span>
                                            </p>
                                          );
                                        }
                                        return false;
                                      })}

                                      {shippingSelected.free_shipping ? (
                                        <p className="font-medium-2">
                                          {shippingSelected.delivery_method_id ===
                                          34058500 ? (
                                            <>
                                              <span className="black font-weight-bold">
                                                Envio:{' '}
                                              </span>
                                              <span className="text-danger">
                                                Retirar na UDF após 24h
                                              </span>{' '}
                                            </>
                                          ) : (
                                            <>
                                              <span className="black font-weight-bold">
                                                Envio:{' '}
                                              </span>
                                              <span className="black">
                                                {shippingSelected.description}{' '}
                                                com o{' '}
                                              </span>
                                              <span className="text-success font-weight-bold">
                                                FRETE GRÁTIS
                                              </span>{' '}
                                              <span className="black font-weight-bold" />
                                            </>
                                          )}
                                        </p>
                                      ) : (
                                        <p className="font-medium-2">
                                          <span className="black font-weight-bold">
                                            Envio:{' '}
                                          </span>
                                          <span className="black">
                                            {shippingSelected.description} por{' '}
                                          </span>
                                          <span className="text-success font-weight-bold">
                                            {shippingSelected.final_shipping_cost.toLocaleString(
                                              'pt-BR',
                                              {
                                                style: 'currency',
                                                currency: 'BRL',
                                              }
                                            )}
                                          </span>{' '}
                                          <span className="black font-weight-bold">
                                            {`(entrega entre ${
                                              shippingSelected.delivery_estimate_business_days
                                            } a ${shippingSelected.delivery_estimate_business_days +
                                              3}
                                        dias úteis)`}
                                          </span>
                                        </p>
                                      )}
                                      <Label className="mt-3 mb-0 black font-medium-5">
                                        Total:{' '}
                                        {inscriptionType === 'single'
                                          ? totalPrice.toLocaleString('pt-BR', {
                                              style: 'currency',
                                              currency: 'BRL',
                                            })
                                          : totalPriceCouple.toLocaleString(
                                              'pt-BR',
                                              {
                                                style: 'currency',
                                                currency: 'BRL',
                                              }
                                            )}
                                      </Label>

                                      <h4 className="form-section mt-3">
                                        <DollarSign size={20} color="#212529" />{' '}
                                        Pagamento (selecione uma opção):
                                      </h4>
                                      <FormGroup className="mb-0">
                                        <ButtonGroup className="d-flex flex-column">
                                          <Button
                                            key={1}
                                            outline
                                            className={`shipping-selected ${paymentSelected !==
                                              null &&
                                              paymentSelected === 1 &&
                                              'shipping-selected-active'}`}
                                            onClick={() =>
                                              handlePaymentSelected(1)
                                            }
                                            active={
                                              paymentSelected !== null &&
                                              paymentSelected === 1
                                            }
                                          >
                                            <Label className="mb-0 black font-medium-2">
                                              {paymentSelected !== null &&
                                                paymentSelected === 1 && (
                                                  <Check
                                                    size={24}
                                                    color="#0cc27e"
                                                  />
                                                )}
                                              Cartão de crédito
                                              <CreditCard
                                                size={24}
                                                color="#000"
                                                className="ml-2"
                                              />
                                            </Label>
                                          </Button>

                                          <Button
                                            key={2}
                                            outline
                                            className={`shipping-selected ${paymentSelected !==
                                              null &&
                                              paymentSelected === 2 &&
                                              'shipping-selected-active'}`}
                                            onClick={() =>
                                              handlePaymentSelected(2)
                                            }
                                            active={
                                              paymentSelected !== null &&
                                              paymentSelected === 2
                                            }
                                          >
                                            <Label className="mb-0 black font-medium-2">
                                              {paymentSelected !== null &&
                                                paymentSelected === 2 && (
                                                  <Check
                                                    size={24}
                                                    color="#0cc27e"
                                                  />
                                                )}
                                              Boleto à vista
                                              <FileText
                                                size={24}
                                                color="#000"
                                                className="ml-2"
                                              />
                                            </Label>
                                          </Button>
                                        </ButtonGroup>
                                      </FormGroup>
                                    </>
                                  )}

                                  {paymentSelected === 1 && (
                                    <Row className="mt-3">
                                      <Col sm="12" md="12" lg="6" xl="6">
                                        <ReactCard
                                          number={card.number}
                                          name={card.name_card}
                                          expiry={card.expiry}
                                          cvc={card.cvc}
                                          focused={card.focused}
                                          callback={handleCallback}
                                          locale={{
                                            valid: 'Valido até',
                                          }}
                                          placeholders={{
                                            name: 'Seu nome aqui',
                                          }}
                                        />
                                      </Col>
                                      <Col sm="12" md="12" lg="6" xl="6">
                                        <FormGroup>
                                          <Row>
                                            <Col
                                              sm="12"
                                              md="12"
                                              lg="12"
                                              xl="12"
                                            >
                                              <Label className="pl-2">
                                                Número do cartão
                                              </Label>
                                              <Col
                                                sm="12"
                                                md="12"
                                                lg="12"
                                                xl="12"
                                                className="has-icon-left"
                                              >
                                                <Field
                                                  type="tel"
                                                  name="number"
                                                  className="form-control new-form-padding"
                                                  placeholder="insira aqui o número do cartão"
                                                  pattern="[\d| ]{16,22}"
                                                  required
                                                  onChange={handleInputChange}
                                                  onFocus={handleInputFocus}
                                                />
                                                <div className="new-form-control-position">
                                                  <CreditCard
                                                    size={14}
                                                    color="#212529"
                                                  />
                                                </div>
                                              </Col>
                                            </Col>
                                            <Col
                                              sm="12"
                                              md="12"
                                              lg="12"
                                              xl="12"
                                            >
                                              <Label className="pl-2">
                                                Nome no cartão
                                              </Label>
                                              <Col
                                                sm="12"
                                                md="12"
                                                lg="12"
                                                xl="12"
                                                className="has-icon-left"
                                              >
                                                <Field
                                                  type="text"
                                                  name="name_card"
                                                  className="form-control new-form-padding"
                                                  placeholder="insira aqui o nome do proprietário"
                                                  required
                                                  onChange={handleInputChange}
                                                  onFocus={handleInputFocus}
                                                />
                                                <div className="new-form-control-position">
                                                  <User
                                                    size={14}
                                                    color="#212529"
                                                  />
                                                </div>
                                              </Col>
                                            </Col>
                                          </Row>
                                        </FormGroup>
                                        <FormGroup>
                                          <Row>
                                            <Col sm="12" md="12" lg="6" xl="6">
                                              <Label className="pl-2">
                                                Vcto. do cartão
                                              </Label>
                                              <Col
                                                md="12"
                                                className="has-icon-left"
                                              >
                                                <Field
                                                  type="tel"
                                                  name="expiry"
                                                  className="form-control new-form-padding mb-2"
                                                  placeholder="ex: 04/21"
                                                  pattern="\d\d/\d\d"
                                                  required
                                                  onChange={handleInputChange}
                                                  onFocus={handleInputFocus}
                                                />
                                                <div className="new-form-control-position">
                                                  <Calendar
                                                    size={14}
                                                    color="#212529"
                                                  />
                                                </div>
                                              </Col>
                                            </Col>
                                            <Col sm="12" md="12" lg="6" xl="6">
                                              <Label className="pl-2">
                                                Digite o CVV
                                              </Label>
                                              <Col
                                                md="12"
                                                className="has-icon-left"
                                              >
                                                <Field
                                                  type="tel"
                                                  name="cvc"
                                                  className="form-control new-form-padding"
                                                  placeholder="ex: 311"
                                                  pattern="\d{3,4}"
                                                  required
                                                  onChange={handleInputChange}
                                                  onFocus={handleInputFocus}
                                                />
                                                <div className="new-form-control-position">
                                                  <Lock
                                                    size={14}
                                                    color="#212529"
                                                  />
                                                </div>
                                              </Col>
                                            </Col>
                                          </Row>
                                        </FormGroup>
                                      </Col>
                                      <Col>
                                        <FormGroup>
                                          <Row className="justify-content-end">
                                            <Col sm="12" md="12" lg="6" xl="6">
                                              <Label className="pl-2">
                                                Quantidade de parcelas (até
                                                R$250,00 em duas vezes e acima
                                                de R$250,00 em três vezes.)
                                              </Label>
                                              <Col
                                                sm="12"
                                                md="12"
                                                lg="12"
                                                xl="12"
                                                className="has-icon-left"
                                              >
                                                <Field
                                                  type="select"
                                                  component="select"
                                                  name="installments"
                                                  id="installments"
                                                  className="form-control"
                                                >
                                                  {inscriptionType ===
                                                  'single' ? (
                                                    <>
                                                      <option value="1">
                                                        Parcelar em 1x de{' '}
                                                        {totalPrice.toLocaleString(
                                                          'pt-BR',
                                                          {
                                                            style: 'currency',
                                                            currency: 'BRL',
                                                          }
                                                        )}
                                                      </option>
                                                      <option value="2">
                                                        Parcelar em 2x de{' '}
                                                        {(
                                                          totalPrice / 2
                                                        ).toLocaleString(
                                                          'pt-BR',
                                                          {
                                                            style: 'currency',
                                                            currency: 'BRL',
                                                          }
                                                        )}
                                                      </option>
                                                      {totalPrice >= 250 && (
                                                        <option value="3">
                                                          Parcelar em 3x de{' '}
                                                          {(
                                                            totalPrice / 3
                                                          ).toLocaleString(
                                                            'pt-BR',
                                                            {
                                                              style: 'currency',
                                                              currency: 'BRL',
                                                            }
                                                          )}
                                                        </option>
                                                      )}
                                                    </>
                                                  ) : (
                                                    <>
                                                      <option value="1">
                                                        Parcelar em 1x de{' '}
                                                        {totalPriceCouple.toLocaleString(
                                                          'pt-BR',
                                                          {
                                                            style: 'currency',
                                                            currency: 'BRL',
                                                          }
                                                        )}
                                                      </option>
                                                      <option value="2">
                                                        Parcelar em 2x de{' '}
                                                        {(
                                                          totalPriceCouple / 2
                                                        ).toLocaleString(
                                                          'pt-BR',
                                                          {
                                                            style: 'currency',
                                                            currency: 'BRL',
                                                          }
                                                        )}
                                                      </option>
                                                      {totalPriceCouple >=
                                                        250 && (
                                                        <option value="3">
                                                          Parcelar em 3x de{' '}
                                                          {(
                                                            totalPriceCouple / 3
                                                          ).toLocaleString(
                                                            'pt-BR',
                                                            {
                                                              style: 'currency',
                                                              currency: 'BRL',
                                                            }
                                                          )}
                                                        </option>
                                                      )}
                                                    </>
                                                  )}
                                                </Field>
                                                <div className="form-control-position">
                                                  <DollarSign
                                                    size={14}
                                                    color="#212529"
                                                  />
                                                </div>
                                              </Col>
                                            </Col>
                                          </Row>
                                        </FormGroup>
                                      </Col>
                                    </Row>
                                  )}

                                  <Row>
                                    <Col md="12">
                                      <Button
                                        disabled={
                                          !(
                                            !!values.cpf && errorSex === false
                                          ) || paymentSelected === null
                                        }
                                        type="submit"
                                        block
                                        className={
                                          values.cpf
                                            ? 'btn-default btn-raised'
                                            : 'btn-secondary btn-raised'
                                        }
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
                                          'Quero participar!'
                                        )}
                                      </Button>
                                    </Col>
                                  </Row>
                                </Step>
                              </Steps>
                              {/* <Navigation /> */}
                              <WithWizard
                                render={({ next, previous, step, steps }) => {
                                  let error = true;
                                  // checkpoint

                                  if (
                                    step.id === 'shipping_options' &&
                                    shippingSelected === null
                                  ) {
                                    errors = true;
                                  } else if (
                                    step.id === 'address' &&
                                    (values.type === '' ||
                                      errors.cep ||
                                      values.cep === '' ||
                                      (values.type === 'other' &&
                                        values.address_type === ''))
                                  ) {
                                    error = true;
                                  } else if (step.id === 'products') {
                                    if (errorProduct === true) {
                                      error = true;
                                    } else {
                                      error = false;
                                    }
                                  }
                                  // else if (step.id === 'authorization') {
                                  //   if (
                                  //     errors.church_name ||
                                  //     errors.pastor_email ||
                                  //     errors.pastor_name
                                  //   ) {
                                  //     error = true;
                                  //   } else {
                                  //     error = false;
                                  //   }
                                  // }
                                  else if (step.id === 'entity') {
                                    if (values.cpf === '' || errors.cpf) {
                                      error = true;
                                    } else if (!isValidEmail) {
                                      error = true;
                                    } else if (errors.email || errors.name) {
                                      error = true;
                                    } else {
                                      error = false;
                                    }
                                  } else if (inscriptionType !== null) {
                                    error = false;
                                  } else {
                                    error = true;
                                  }

                                  // } else if (values.cpf === '' || errors.cpf) {
                                  //   error = true;
                                  // } else if (!isValidEmail) {
                                  //   error = true;
                                  // } else if (errors.email || errors.name) {
                                  //   error = true;
                                  // } else {
                                  //   error = false;
                                  // }

                                  return (
                                    <div className="example-buttons ">
                                      {steps.indexOf(step) <
                                        steps.length - 1 && (
                                        <Button
                                          color="success"
                                          block
                                          className="btn-fluid"
                                          disabled={error}
                                          onClick={next}
                                        >
                                          Próximo
                                        </Button>
                                      )}
                                      {steps.indexOf(step) > 0 && (
                                        <Button
                                          color="danger"
                                          block
                                          className="btn-fluid"
                                          onClick={previous}
                                        >
                                          Voltar
                                        </Button>
                                      )}
                                    </div>
                                  );
                                }}
                              />
                            </div>
                          )}
                        />
                      </Form>
                    )}
                  </Formik>
                </CardBody>
              </Card>
            )}
          </Motion>

          {/* <Modal
            size="lg"
            isOpen={modalCaminhosLegadosInvite}
            toggle={() => setModalCaminhosLegadosInvite(false)}
          >
            <ModalBody>
              <img
                src="https://i.imgur.com/tsfW6t5.png"
                alt="Caminhos e Legados"
                width="100%"
                height="auto"
              />
            </ModalBody>
            <ModalFooter>
              <Button
                className="ml-1 my-1 btn-default"
                color="primary"
                onClick={() => window.open('https://seriefamilias.udf.org.br/')}
              >
                Quero saber mais!
              </Button>
              <Button
                className="ml-1 my-1"
                color="success"
                onClick={() => setModalCaminhosLegadosInvite(false)}
              >
                Entendi
              </Button>
            </ModalFooter>
          </Modal> */}
        </>
      )}
    </div>
  );
}
