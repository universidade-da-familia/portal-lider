/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react';
import ReactCard from 'react-credit-cards';
import {
  Map,
  MapPin,
  RefreshCw,
  Edit,
  Navigation,
  X,
  Check,
  Box,
  Truck,
  DollarSign,
  List,
  Star,
  CreditCard,
  FileText,
  User,
  Calendar,
  Lock,
  Smartphone,
  Bookmark,
} from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import {
  Row,
  Col,
  Button,
  FormGroup,
  Card,
  CardBody,
  Label,
  ModalFooter,
  Modal,
  ModalHeader,
  ModalBody,
  Table,
  ButtonGroup,
  UncontrolledTooltip,
  // Progress,
} from 'reactstrap';

import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import 'react-table/react-table.css';
import 'react-credit-cards/lib/styles.scss';

import history from '~/app/history';
import ContentHeader from '~/components/contentHead/contentHeader';
import CepFormat from '~/components/fields/CepFormat';
import PhoneFormat from '~/components/fields/PhoneFormat';
import QuantityFormat from '~/components/fields/QuantityFormat';
import { validateCPF } from '~/services/validateCPF';
import { Creators as CepActions } from '~/store/ducks/cep';
import { Creators as DefaultEventActions } from '~/store/ducks/defaultEvent';
// import { Creators as ExpiredTitlesActions } from '~/store/ducks/expired_titles';
import { Creators as OrderActions } from '~/store/ducks/order';
import { Creators as ProfileActions } from '~/store/ducks/profile';
import { Creators as ShippingActions } from '~/store/ducks/shipping';

import {
  formatCreditCardNumber,
  formatCreditCardName,
  formatExpirationDate,
  formatCVC,
} from './utils';

const formOrder = Yup.object().shape({
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

export default function OrderCreate() {
  // const [modalCaminhosLegadosOrder, setModalCaminhosLegadosOrder] = useState(
  //   false
  // );
  // const [canOpenedModalCaminhosLegadosOrder] = useState(() => {
  //   const caminhoslegados = sessionStorage.getItem(
  //     '@dashboard/caminhoslegados_order'
  //   );

  //   // eslint-disable-next-line no-unneeded-ternary
  //   return caminhoslegados ? false : true;
  // });

  const userId = localStorage.getItem('@dashboard/user');

  const [orderTypeOptions, setOrderTypeOptions] = useState([]);
  const [orderType, setOrderType] = useState(null);
  const [verifyCPF, setVerifyCPF] = useState(false);
  const [subTotalPriceError, setSubTotalPriceError] = useState(0);
  const [shippingSelected, setShippingSelected] = useState(null);
  const [paymentSelected, setPaymentSelected] = useState(null);
  const [shippingOptions, setShippingOptions] = useState(null);
  const [dataProducts, setDataProducts] = useState([]);
  const [kit, setKit] = useState({
    default_event_id: '',
    products: [],
  });
  const [modalExpiredTitles, setModalExpiredTitles] = useState(false);
  const [modalAddMaterial, setModalAddMaterial] = useState(false);
  const [initialState, setInitialState] = useState({
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
  const [cepState, setCepState] = useState('');
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
  const [card, setCard] = useState({
    name: '',
    number: '',
    expiry: '',
    cvc: '',
    id: '',
    issuer: '',
    focused: '',
  });

  const data = useSelector(state => state.profile.data);
  const defaultData = useSelector(state => state.defaultEvent.data);
  // const expired_titles = useSelector(state => state.expired_titles.data);
  const loading = useSelector(state => state.order.loading);
  const cepData = useSelector(state => state.cep.data);
  const cepLoading = useSelector(state => state.cep.loading);
  const shippingOptionsData = useSelector(state => state.shipping.data);

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
    } else if (target.name === 'name') {
      target.value = formatCreditCardName(target.value);
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value);
    }

    setCard({ ...card, [target.name]: target.value, id: '' });
  }

  function toggleModalExpiredTitles() {
    setModalExpiredTitles(!modalExpiredTitles);

    setPaymentSelected(null);
  }

  function toggleModalExpiredTitlesClose() {
    setModalExpiredTitles(false);

    setPaymentSelected(null);
  }

  function toggleModalAddMaterial() {
    setModalAddMaterial(!modalAddMaterial);
  }

  function toggleModalAddMaterialClose() {
    setModalAddMaterial(false);
  }

  function handleOrderType(type) {
    setOrderType(type);
    setDataProducts([]);
    setShippingSelected(null);
    setShippingOptions(null);
  }

  function handleSelectedDefaultEvent(event) {
    const { value } = event.target;

    if (value === '') {
      setKit({ default_event_id: value, products: [] });
    } else {
      const eventData = defaultData.find(
        eventFind => eventFind.id === parseInt(value, 10)
      );

      setKit({
        default_event_id: value,
        products: eventData.kit.products.map(product => {
          const prod = dataProducts.find(
            productFind => productFind.id === product.id
          );

          if (
            orderType === 'Treinamento de treinadores' ||
            orderType === 'Capacitação de líderes'
          ) {
            product.price = product.training_price;
          } else if (orderType === 'Seminário') {
            product.price = product.seminary_price;
          } else {
            product.price = product.group_price;
          }

          return {
            id: product.id,
            netsuite_id: product.netsuite_id,
            name: product.name,
            cost_of_goods: product.price,
            quantity: prod !== undefined ? prod.quantity : '',
            weight: product.weight,
            width: product.width,
            height: product.height,
            length: product.length,
            sku_id: 1,
            product_category: product.product_category,
          };
        }),
      });
    }
  }

  function handleAddMaterial(values) {
    const products = values.products.filter(product => product.quantity > 0);
    const auxDataProducts = dataProducts;
    let verify = false;

    if (auxDataProducts.length > 0) {
      // eslint-disable-next-line array-callback-return
      products.map(product => {
        auxDataProducts.forEach((dataProduct, index) => {
          if (product.id === dataProduct.id) {
            verify = true;
            auxDataProducts[index] = product;
          }
        });

        if (!verify) {
          auxDataProducts.push(product);
        }

        verify = false;
      });

      setDataProducts(auxDataProducts);

      if (cepState.length === 8) {
        dispatch(
          ShippingActions.shippingOptionsRequest(cepState, auxDataProducts)
        );
      }
    } else {
      setDataProducts([...dataProducts, ...products]);

      if (cepState.length === 8) {
        dispatch(ShippingActions.shippingOptionsRequest(cepState, products));
      }
    }

    setModalAddMaterial(false);
    setKit({
      default_event_id: '',
      products: [],
    });
  }

  function handleRemoveMaterial(id) {
    const auxDataProducts = dataProducts.filter(product => product.id !== id);

    setDataProducts(auxDataProducts);

    if (cepState.length === 8) {
      dispatch(
        ShippingActions.shippingOptionsRequest(cepState, auxDataProducts)
      );
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
          type: 'other',
          address_type: values.address_type,
          address_other_type_name: values.address_other_type_name || '',
          receiver: values.receiver,
        });

        dispatch(CepActions.cepRequest(cep, 0));
      }
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
      setFieldValue('address_other_type_name', address.other_type_name);
      setFieldValue('cep', address.cep);
      setFieldValue('uf', address.uf);
      setFieldValue('city', address.city);
      setFieldValue('street', address.street);
      setFieldValue('street_number', address.street_number);
      setFieldValue('neighborhood', address.neighborhood);
      setFieldValue('complement', address.complement);
      setFieldValue('receiver', address.receiver);

      if (dataProducts.length > 0) {
        dispatch(
          ShippingActions.shippingOptionsRequest(address.cep, dataProducts)
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

  function handleShipppingSelected(selected) {
    setShippingSelected(selected);
  }

  function handlePaymentSelected(selected) {
    setPaymentSelected(selected);
  }

  const manualCountToFreeShipping = useMemo(() => {
    let total = 0;

    if (dataProducts.length > 0) {
      // eslint-disable-next-line array-callback-return
      dataProducts.map(product => {
        if (product.product_category === 'manual') {
          total += parseInt(product.quantity, 10);
        }
      });
    }

    return total;
  }, [dataProducts.length, dataProducts.map(product => product.quantity)]);

  const subTotalPrice = useMemo(() => {
    let total = 0;
    if (dataProducts.length > 0) {
      // eslint-disable-next-line array-callback-return
      dataProducts.map(product => {
        total += product.cost_of_goods * product.quantity;
      });
    }
    return total;
  }, [dataProducts.length, dataProducts.map(product => product.quantity)]);

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

  useEffect(() => {
    setSubTotalPriceError(subTotalPrice);
  }, [subTotalPrice]);

  function handleAddOrder(values) {
    const toSend = {
      user: data,
      card: paymentSelected === 1 ? card : null,
      products: dataProducts,
      shipping_address: values,
      shipping_option: shippingSelected,
      order_details: {
        order_type: orderType,
        subtotal: subTotalPrice,
        shipping_amount: shippingSelected.free_shipping
          ? 0
          : shippingSelected.final_shipping_cost,
        amount: totalPrice,
        installments: parseInt(values.installments, 10),
      },
    };

    dispatch(OrderActions.addOrderRequest(toSend));
  }

  function handleCancelOrder() {
    toastr.confirm('As informações não serão salvas ao voltar.', {
      onOk: () => history.push('/pedidos'),
      onCancel: () => {},
    });
  }

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

      if (dataProducts.length > 0) {
        dispatch(
          ShippingActions.shippingOptionsRequest(cepState, dataProducts)
        );
      }
    }
  }, [cepData]);

  useEffect(() => {
    if (data.id) {
      const userData = {
        sex: data.sex,
        cmn_hierarchy_id: data.cmn_hierarchy_id || 0,
        mu_hierarchy_id: data.mu_hierarchy_id || 0,
        crown_hierarchy_id: data.crown_hierarchy_id || 0,
        mp_hierarchy_id: data.mp_hierarchy_id || 0,
        ffi_hierarchy_id: data.ffi_hierarchy_id || 0,
        gfi_hierarchy_id: data.gfi_hierarchy_id || 0,
        pg_hab_hierarchy_id: data.pg_hab_hierarchy_id || 0,
        pg_yes_hierarchy_id: data.pg_yes_hierarchy_id || 0,
      };

      dispatch(DefaultEventActions.organizatorEventRequest(userData));

      const options = [];

      Object.values(userData).map(value => {
        // if (value >= 7) {
        //   options.push('1-Treinamento de treinadores');
        // }
        if (value >= 6) {
          options.push('3-Seminário');
        }
        // if (value >= 5) {
        //   options.push('2-Capacitação de líderes');
        // }
        if (value >= 4) {
          options.push('4-Curso');
        }

        return '';
      });

      setOrderTypeOptions([...new Set(options)].sort());
    }

    if (data.cpf) {
      // dispatch(ExpiredTitlesActions.expiredTitlesRequest(data.cpf));

      let aux = validateCPF(data.cpf);
      if (aux !== undefined) {
        aux = true;
      } else {
        aux = false;
      }
      setVerifyCPF(aux);
    }

    if (data.addresses && data.addresses.length > 0) {
      setAddresses(data.addresses);
    }

    if (data.phone) {
      setInitialState({
        ...initialState,
        phone: data.phone,
      });
    }
  }, [data]);

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

      // if (manualCountToFreeShipping >= 4) {
      //   shippingsLowestToBiggestPrice[0].free_shipping = true;
      // }

      setShippingOptions(shippingsLowestToBiggestPrice);
    }
  }, [shippingOptionsData, manualCountToFreeShipping]);

  useEffect(() => {
    dispatch(ProfileActions.profileRequest());
    setInitialState({
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

    // if (canOpenedModalCaminhosLegadosOrder) {
    //   setModalCaminhosLegadosOrder(true);
    // }

    // setModalCaminhosLegadosOrder(true);

    // sessionStorage.setItem('@dashboard/caminhoslegados_order', true);

    return () => {
      setDataProducts(null);
      setShippingSelected(null);
      setShippingOptions(null);
      setInitialState({
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
        installments: '1',
      });
    };
  }, []);

  return (
    <>
      {verifyCPF === true && (
        <Modal isOpen>
          <ModalHeader>CPF inválido</ModalHeader>
          <ModalBody>
            O seu CPF parece estar inválido. Para solicitar material, por favor
            ajustar o cpf no seu perfil
          </ModalBody>
          <ModalFooter>
            <Button color="warning" outline onClick={() => history.goBack()}>
              Cancelar
            </Button>
            <Button color="success" onClick={() => history.push('/perfil')}>
              Ajustar CPF
            </Button>{' '}
          </ModalFooter>
        </Modal>
      )}
      <ContentHeader>Solicitação de materiais</ContentHeader>
      <Card>
        <CardBody className="d-flex flex-column justify-content-center">
          <Formik
            enableReinitialize
            initialValues={initialState}
            validationSchema={formOrder}
            onSubmit={values => handleAddOrder(values)}
          >
            {({ errors, touched, values, setFieldValue, handleChange }) => (
              <Form>
                <h4 className="form-section">
                  <Bookmark size={20} color="#212529" /> Tipo de pedido
                </h4>
                {orderTypeOptions && orderTypeOptions.length > 0 && (
                  <Field
                    type="select"
                    component="select"
                    id="orderType"
                    name="orderType"
                    className="form-control"
                    onChange={event => handleOrderType(event.target.value)}
                  >
                    <option value="" defaultValue="" disabled="">
                      Selecione uma opção
                    </option>
                    {orderTypeOptions.map(option => (
                      <option
                        key={option.split('-')[0]}
                        value={option.split('-')[1]}
                      >
                        {option.split('-')[1]}
                      </option>
                    ))}
                  </Field>
                )}

                {orderType && (
                  <>
                    <h4 className="form-section">
                      <Box size={20} color="#212529" /> Materiais
                    </h4>
                    <Button
                      className="mb-2"
                      color="success"
                      onClick={toggleModalAddMaterial}
                    >
                      Adicionar material
                    </Button>

                    <Table striped responsive className="text-center">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Nome produto</th>
                          <th>Valor unitário</th>
                          <th>Quantidade</th>
                          <th>Total</th>
                          <th>Remover</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataProducts.map(product => (
                          <tr key={product.id}>
                            <th scope="row">{product.id}</th>
                            <td>{product.name}</td>
                            <td>
                              {product.cost_of_goods.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                              })}
                            </td>
                            <td>{product.quantity} UN</td>
                            <td>
                              {(
                                product.quantity * product.cost_of_goods
                              ).toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                              })}
                            </td>
                            <td>
                              <Button
                                outline
                                color="danger"
                                onClick={() => handleRemoveMaterial(product.id)}
                              >
                                <X className="fonticon-unit height-25 width-25" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                        {dataProducts.length > 0 && (
                          <tr>
                            <th aria-label="th-blank" />
                            <td />
                            <td />
                            <th scope="row">Subtotal</th>
                            <th>
                              {subTotalPrice.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                              })}
                            </th>
                            <th aria-label="th-blank" />
                          </tr>
                        )}
                      </tbody>
                    </Table>

                    {subTotalPriceError < 11 && (
                      <span className="red font-weight-bold">
                        Valor total do pedido precisa ser maior que 11 reais
                      </span>
                    )}

                    <h4 className="form-section mt-3">
                      <MapPin size={20} color="#212529" /> Endereço de entrega
                    </h4>
                    <Row>
                      <Col sm="6">
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
                              onChange={event =>
                                handleChangeAddressType(event, setFieldValue)
                              }
                            >
                              <option value="" defaultValue="" disabled="">
                                Selecione uma opção
                              </option>
                              {addresses.length > 0 &&
                                addresses[0].id !== null &&
                                addresses.map(address => (
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
                                <Label for="address_type">Tipo endereço</Label>
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
                                  errors.address_type &&
                                  touched &&
                                  touched.address_type ? (
                                    <div className="invalid-feedback">
                                      {errors.address_type}
                                    </div>
                                  ) : null}
                                  <div className="form-control-position">
                                    <Map size={14} color="#212529" />
                                  </div>
                                </div>
                              </FormGroup>
                            </Col>
                            {values.address_type === 'other' && (
                              <Col sm="12" md="12" lg="12" xl="8">
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
                                      {errors.address_other_type_name}
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
                                  disabled={values.type !== 'other'}
                                  className={`
                                  form-control
                                  ${errors &&
                                    errors.cep &&
                                    touched &&
                                    touched.cep &&
                                    'is-invalid'}
                                `}
                                  onValueChange={val =>
                                    handleCep(val.value, setFieldValue, values)
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
                                disabled={values.type !== 'other' || cepLoading}
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
                                  disabled={values.type !== 'other'}
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
                                  disabled={values.type !== 'other'}
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
                                  disabled={values.type !== 'other'}
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
                                  disabled={values.type !== 'other'}
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
                                  disabled={values.type !== 'other'}
                                  className="form-control"
                                />
                                <div className="form-control-position">
                                  <Edit size={14} color="#212529" />
                                </div>
                              </div>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="12" md="6" lg="6" xl="6">
                            <FormGroup>
                              <span className="red font-weight-bold mb-2">
                                Confirme o seu telefone principal para contato
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
                                {errors.phone && touched.phone ? (
                                  <div className="invalid-feedback">
                                    {errors.phone}
                                  </div>
                                ) : null}
                                <div className="form-control-position">
                                  <Smartphone size={14} color="#212529" />
                                </div>
                              </div>
                            </FormGroup>
                          </Col>
                        </Row>
                      </>
                    )}

                    {dataProducts.length > 0 &&
                      shippingOptions !== null &&
                      !!values.type && (
                        <>
                          <h4 className="form-section mt-3">
                            <Truck size={20} color="#212529" /> Opções de envio
                            (escolha uma das opções abaixo):
                          </h4>
                          {/* <div className="text-center font-medium-1 font-weight-bold">
                            {manualCountToFreeShipping < 4
                              ? `Compre mais ${4 -
                                  manualCountToFreeShipping} manuais para conseguir frete grátis (${manualCountToFreeShipping *
                                  25}%)`
                              : `Parabéns, você conseguiu o frete grátis.`}
                          </div> */}
                          {/* <Progress
                            value={manualCountToFreeShipping * 25}
                            color="success"
                            className="height-40 font-medium-2 font-weight-bold"
                          >
                            {`${manualCountToFreeShipping}/4 manuais`}
                          </Progress> */}
                          <FormGroup className="mb-0">
                            <ButtonGroup className="d-flex flex-column">
                              {shippingOptions.map(shippingOption => (
                                <Button
                                  key={shippingOption.delivery_method_id}
                                  outline
                                  className={`height-100 shipping-selected ${shippingSelected !==
                                    null &&
                                    shippingSelected.delivery_method_id ===
                                      shippingOption.delivery_method_id &&
                                    'shipping-selected-active'}`}
                                  onClick={() =>
                                    handleShipppingSelected(shippingOption)
                                  }
                                  active={
                                    shippingSelected !== null &&
                                    shippingSelected.delivery_method_id ===
                                      shippingOption.delivery_method_id
                                  }
                                >
                                  <div className="d-flex flex-column flex-sm-column flex-md-column flex-lg-row flex-xl-row">
                                    <Col className="text-lg-left text-xl-left pl-lg-5 pl-xl-5">
                                      <Label className="mb-0 black font-medium-2">
                                        {shippingSelected !== null &&
                                          shippingSelected.delivery_method_id ===
                                            shippingOption.delivery_method_id && (
                                            <Check size={24} color="#0cc27e" />
                                          )}
                                        {shippingOption.delivery_method_name}
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
                              ))}
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
                                    delivery_method_name: 'Retirar na UDF',
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
                                          <Check size={24} color="#0cc27e" />
                                        )}
                                      Retirar na UDF
                                    </Label>
                                  </Col>
                                  <Col>
                                    <Label className="mb-0 black">
                                      Rua José Candido Prisão, 543 - Vila
                                      Paulina - Pompéia-SP - CEP: 17580-000
                                    </Label>
                                  </Col>
                                </div>
                              </Button>
                            </ButtonGroup>
                          </FormGroup>
                        </>
                      )}

                    {shippingSelected !== null && (
                      <>
                        <h4 className="form-section mt-3">
                          <List size={20} color="#212529" /> Resumo do pedido
                        </h4>
                        {dataProducts.map(product => (
                          <p key={product.id} className="font-medium-2">
                            <span className="black font-weight-bold">
                              {product.quantity} x{' '}
                            </span>
                            <span className="black">{product.name} por </span>
                            <span className="black font-weight-bold">
                              {product.cost_of_goods.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                              })}
                              /unidade
                            </span>
                          </p>
                        ))}

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
                                  {shippingSelected.description} com o{' '}
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
                          {totalPrice.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </Label>

                        {subTotalPriceError < 11 && (
                          <p>
                            <span className="red font-weight-bold">
                              Valor total do pedido precisa ser maior que 11
                              reais
                            </span>
                          </p>
                        )}

                        <h4 className="form-section mt-3">
                          <DollarSign size={20} color="#212529" /> Pagamento
                          (selecione uma opção):
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
                              onClick={() => handlePaymentSelected(1)}
                              active={
                                paymentSelected !== null &&
                                paymentSelected === 1
                              }
                            >
                              <Label className="mb-0 black font-medium-2">
                                {paymentSelected !== null &&
                                  paymentSelected === 1 && (
                                    <Check size={24} color="#0cc27e" />
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
                              onClick={() => handlePaymentSelected(2)}
                              active={
                                paymentSelected !== null &&
                                paymentSelected === 2
                              }
                            >
                              <Label className="mb-0 black font-medium-2">
                                {paymentSelected !== null &&
                                  paymentSelected === 2 && (
                                    <Check size={24} color="#0cc27e" />
                                  )}
                                {totalPrice > 1100 && orderType !== 'Curso'
                                  ? 'Boleto para 30 dias'
                                  : 'Boleto à vista'}
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
                        <Col sm="12" md="12" lg="4" xl="4">
                          <ReactCard
                            number={card.number}
                            name={card.name}
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
                        <Col sm="12" md="12" lg="8" xl="8">
                          <FormGroup>
                            <Row>
                              <Col sm="12" md="12" lg="6" xl="6">
                                <Label className="pl-2">Número do cartão</Label>
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
                                    <CreditCard size={14} color="#212529" />
                                  </div>
                                </Col>
                              </Col>
                              <Col sm="12" md="12" lg="6" xl="6">
                                <Label className="pl-2">Nome no cartão</Label>
                                <Col
                                  sm="12"
                                  md="12"
                                  lg="12"
                                  xl="12"
                                  className="has-icon-left"
                                >
                                  <Field
                                    type="text"
                                    name="name"
                                    className="form-control new-form-padding"
                                    placeholder="insira aqui o nome do proprietário"
                                    required
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                  />
                                  <div className="new-form-control-position">
                                    <User size={14} color="#212529" />
                                  </div>
                                </Col>
                              </Col>
                            </Row>
                          </FormGroup>
                          <FormGroup>
                            <Row>
                              <Col sm="12" md="12" lg="6" xl="6">
                                <Label className="pl-2">
                                  Validade do cartão
                                </Label>
                                <Col md="12" className="has-icon-left">
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
                                    <Calendar size={14} color="#212529" />
                                  </div>
                                </Col>
                              </Col>
                              <Col sm="12" md="12" lg="6" xl="6">
                                <Label className="pl-2">Digite o CVV</Label>
                                <Col md="12" className="has-icon-left">
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
                                    <Lock size={14} color="#212529" />
                                  </div>
                                </Col>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Row className="justify-content-end">
                              <Col sm="12" md="12" lg="8" xl="8">
                                <Label className="pl-2">
                                  Quantidade de parcelas (até R$250,00 em duas
                                  vezes e acima de R$250,00 em três vezes.)
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
                                    <option value="1">
                                      Parcelar em 1x de{' '}
                                      {totalPrice.toLocaleString('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                      })}
                                    </option>
                                    <option value="2">
                                      Parcelar em 2x de{' '}
                                      {(totalPrice / 2).toLocaleString(
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
                                        {(totalPrice / 3).toLocaleString(
                                          'pt-BR',
                                          {
                                            style: 'currency',
                                            currency: 'BRL',
                                          }
                                        )}
                                      </option>
                                    )}
                                  </Field>
                                  <div className="form-control-position">
                                    <DollarSign size={14} color="#212529" />
                                  </div>
                                </Col>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                      </Row>
                    )}

                    {/* {paymentSelected === 2 &&
                      expired_titles &&
                      setModalExpiredTitles(true)} */}

                    <ModalFooter>
                      <Button
                        outline
                        color="warning"
                        onClick={handleCancelOrder}
                      >
                        Voltar
                      </Button>
                      {loading ? (
                        <Button disabled className="btn-secondary">
                          Criando pedido, aguarde...
                        </Button>
                      ) : (
                        <Button
                          disabled={
                            subTotalPriceError < 11 ||
                            paymentSelected === null ||
                            verifyCPF === true
                          }
                          type="submit"
                          className={
                            paymentSelected === null
                              ? 'btn-secondary'
                              : 'btn-success'
                          }
                        >
                          Finalizar pedido
                        </Button>
                        // <Button type="submit" disabled>
                        //   Finalizar pedido
                        // </Button>
                      )}
                    </ModalFooter>
                  </>
                )}
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>

      <Modal
        isOpen={modalAddMaterial}
        toggle={toggleModalAddMaterialClose}
        size="lg"
      >
        <ModalHeader toggle={toggleModalAddMaterialClose}>
          {(() => {
            if (orderType === 'Curso') {
              return 'Escolha o curso desejado';
            }
            if (orderType === 'Treinamento de treinadores') {
              return 'Escolha o treinamento desejado';
            }
            if (orderType === 'Capacitação de líderes') {
              return 'Escolha a capacitação desejada';
            }
            if (orderType === 'Seminário') {
              return 'Escolha o seminário desejado';
            }

            return '';
          })()}
        </ModalHeader>
        <Formik
          enableReinitialize
          initialValues={kit}
          // validationSchema={formItemSchema}
          onSubmit={values => {
            handleAddMaterial(values);
          }}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <Form className="pt-2">
              <ModalBody>
                <Row>
                  <Col>
                    <FormGroup>
                      <Field
                        type="select"
                        component="select"
                        id="default_event_id"
                        name="default_event_id"
                        onChange={event =>
                          handleSelectedDefaultEvent(event, setFieldValue)
                        }
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

                        {!!defaultData && (
                          <>
                            <optgroup label={orderType}>
                              {defaultData.map(
                                eventData =>
                                  eventData.event_type === orderType && (
                                    <option
                                      key={eventData.id}
                                      value={eventData.id}
                                    >
                                      {eventData.event_type}: {eventData.name}
                                    </option>
                                  )
                              )}
                            </optgroup>
                          </>
                        )}
                      </Field>
                    </FormGroup>
                  </Col>
                </Row>

                {values.products && values.products.length > 0 && (
                  <Table bordered responsive hover>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Valor</th>
                        <th>Quantidade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {values.products.map((product, index) => (
                        <tr>
                          <td>
                            <Label>{product.name}</Label>
                          </td>
                          <td>
                            <Label>
                              {product.cost_of_goods.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                              })}
                            </Label>
                          </td>
                          <td width="12%">
                            <Field
                              // type="number"
                              name={`products[${index}].quantity`}
                              id={`products[${index}].quantity`}
                              className="form-control"
                              render={({ field }) => (
                                <QuantityFormat
                                  // eslint-disable-next-line react/jsx-props-no-spreading
                                  {...field}
                                  id={`products[${index}].quantity`}
                                  name={`products[${index}].quantity`}
                                  className="form-control"
                                  value={values.products[index].quantity}
                                />
                              )}
                            />
                          </td>
                        </tr>
                        // <Row
                        //   key={product.id}
                        //   className="justify-content-between pt-2"
                        // >
                        //   <Col sm="6" md="6" lg="6">
                        //     <Label>{product.name}</Label>
                        //   </Col>
                        //   <Col sm="6" md="6" lg="4">
                        //     <Label>
                        //       {product.cost_of_goods.toLocaleString('pt-BR', {
                        //         style: 'currency',
                        //         currency: 'BRL',
                        //       })}
                        //     </Label>
                        //   </Col>
                        //   <Col sm="12" md="12" lg="2">
                        //     <Field
                        //       // type="number"
                        //       name={`products[${index}].quantity`}
                        //       id={`products[${index}].quantity`}
                        //       className="form-control"
                        //       render={({ field }) => (
                        //         <QuantityFormat
                        //           // eslint-disable-next-line react/jsx-props-no-spreading
                        //           {...field}
                        //           id={`products[${index}].quantity`}
                        //           name={`products[${index}].quantity`}
                        //           className="form-control"
                        //           value={values.products[index].quantity}
                        //         />
                        //       )}
                        //     />
                        //   </Col>
                        // </Row>
                      ))}
                    </tbody>
                  </Table>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={toggleModalAddMaterialClose}>
                  Cancelar
                </Button>{' '}
                <Button color="primary" type="submit">
                  Adicionar Item
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </Modal>

      <Modal
        isOpen={modalExpiredTitles}
        toggle={toggleModalExpiredTitles}
        size="md"
      >
        <ModalHeader toggle={toggleModalExpiredTitlesClose}>
          Aviso importante
        </ModalHeader>
        <ModalBody>
          <div className="text-danger">
            <p>
              Há outro boleto pendente em seu nome. Escolha outra forma de
              pagamento para finalizar o pedido ou entre em contato conosco para
              maiores informações.
            </p>
            <p>Telefone: (14) 3405-8500</p>
            <p>Email: financeiro@udf.org.br</p>
          </div>

          <Button
            className="mt-2"
            color="success"
            onClick={() =>
              window.open(
                'https://api.whatsapp.com/send?phone=5514981630291&text=Aviso importante de pedido',
                '_blank'
              )
            }
          >
            Chamar no whats
          </Button>
          <Button
            className="mt-2 ml-2"
            color="primary"
            onClick={() => window.open('tel:+551434058500')}
          >
            Ligar para UDF
          </Button>
        </ModalBody>
      </Modal>

      {/* <Modal size="lg" isOpen={modalCaminhosLegadosOrder}>
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
            onClick={() => window.history.back()}
          >
            Voltar
          </Button>
        </ModalFooter>
      </Modal> */}
    </>
  );
}
