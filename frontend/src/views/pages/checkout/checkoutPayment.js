// // import external modules
// import pagarme from 'pagarme';
// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { Motion, spring } from 'react-motion';
// import { Card, CardBody, Row, Col, FormGroup, Button, Label } from 'reactstrap';
// import { CreditCard, User, Calendar, Lock } from 'react-feather';

// import { useDispatch, useSelector } from 'react-redux';
// import { Creators as CheckoutActions } from '../../../store/ducks/checkout';

// import api from '../../../services/api';
// import { toastr } from 'react-redux-toastr';

// import ReactCard from 'react-credit-cards';
// import 'react-credit-cards/lib/styles.scss';
// import {
//   formatCreditCardNumber,
//   formatCreditCardName,
//   formatExpirationDate,
//   formatCVC,
//   // formatFormData,
// } from './utils';

// import { css } from '@emotion/core';
// import { BounceLoader } from 'react-spinners';

// import logo from '../../../assets/img/logo-big.png';

// export default function ConfirmInvite({ form }) {
//   const userData = useSelector(state => state.checkout.user_data);

//   const [loading, setLoading] = useState(false);
//   const [card, setCard] = useState({
//     name: '',
//     number: '',
//     expiry: '',
//     cvc: '',
//     id: '',
//     issuer: '',
//     focused: '',
//   });
//   const [card_formData, setCardFormData] = useState(null);

//   function handleInputFocus(event) {
//     const { target } = event;

//     setCard({ ...card, focused: target.name, id: '' });
//   }

//   function handleInputChange(event) {
//     const { target } = event;

//     if (target.name === 'number') {
//       target.value = formatCreditCardNumber(target.value);
//     } else if (target.name === 'name') {
//       target.value = formatCreditCardName(target.value);
//     } else if (target.name === 'expiry') {
//       target.value = formatExpirationDate(target.value);
//     } else if (target.name === 'cvc') {
//       target.value = formatCVC(target.value);
//     }

//     setCard({ ...card, [target.name]: target.value, id: '' });
//   }

//   async function handleSubmit(event) {
//     event.preventDefault();

//     setLoading(true);

//     const { user } = userData;

//     const formData = [...event.target.elements]
//       .filter(d => d.name)
//       .reduce((acc, d) => {
//         acc[d.name] = d.value;
//         return acc;
//       }, {});

//     let cardForm = {};

//     cardForm.card_holder_name = formData.name;
//     cardForm.card_expiration_date = String(formData.expiry).replace('/', '');
//     cardForm.card_number = String(formData.number).replace(/\s/g, '');
//     cardForm.card_cvv = formData.cvc;

//     try {
//       let cardData;

//       const cardValidations = pagarme.validate({ card: cardForm });

//       if (!cardValidations.card.card_number)
//         toastr.error('Oops!', 'Número do cartão incorreto.');

//       if (!cardValidations.card.card_holder_name)
//         toastr.error('Oops!', 'Nome no cartão incorreto.');

//       if (!cardValidations.card.card_expiration_date)
//         toastr.error('Oops!', 'Data de validade do cartão incorreta.');

//       if (!cardValidations.card.card_cvv)
//         toastr.error('Oops!', 'CVV do cartão incorreto.');

//       const client = await pagarme.client.connect({
//         encryption_key: process.env.REACT_APP_PAGARME_ENCRYPTION_KEY,
//       });

//       cardData = await client.security.encrypt(cardForm);

//       const response = await api.post('checkouts', {
//         amount: 5,
//         customer: {
//           external_id: user.id,
//           name: user.name,
//           type: !user.is_business ? 'individual' : 'corporation',
//           country: user.country === 'Brasil' ? 'br' : 'us',
//           email: user.email,
//           documents: [
//             {
//               type: !user.is_business ? 'cpf' : 'cnpj',
//               number: user.cpf_cnpj,
//             },
//           ],
//           //phone_numbers: []
//           birthday: !user.birthday ? String(user.birthday).slice(0, 10) : null,
//         },
//         billing: {
//           name: user.name,
//           address: {
//             country: user.country === 'Brasil' ? 'br' : 'us',
//             state: user.uf,
//             city: user.city,
//             neighborhood: user.neighborhood,
//             street: user.street,
//             street_number: user.street_number,
//             zipcode: user.cep,
//           },
//         },
//         items: [
//           {
//             id: 'igshm',
//             title: 'Incrição grupo semanal homem ao máximo',
//             unit_price: 5,
//             quantity: 1,
//             tangible: false,
//             venue: 'Primeira Igreja Batista de Pompéia',
//             date: '2019-10-20',
//           },
//         ],
//         card_hash: cardData,
//       });
//     } catch (err) {
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="bg-static-pages-image-6 d-flex flex-column flex-1 p-0 flex-lg-row">
//       <div className="d-flex flex-column flex-grow-0 text-white width-75-per p-2 p-lg-5">
//         <img className="fit width-125 mb-3" src={logo} />
//         <Label className="d-none d-lg-block fit width-800 font-large-3 mb-3 line-height-1">
//           Grupo semanal Homem ao máximo
//         </Label>
//         <Label className="d-block d-lg-none fit width-800 font-large-1 mb-3">
//           Grupo semanal Homem ao máximo
//         </Label>
//         <Label className="fit width-700 font-medium-1">
//           Inscrição para participar do Grupo semanal homem ao máximo com o{' '}
//           <u>líder Lucas Alves</u> com a data de início marcada para{' '}
//           <u>21/12/2019</u>, ocorrendo uma vez por semana durante doze semanas
//           na <u>Primeira Igreja Batista de Pompéia</u>.
//         </Label>
//       </div>

//       <Motion
//         defaultStyle={{ x: +200, opacity: 0 }}
//         style={{ x: spring(0), opacity: spring(1) }}
//       >
//         {style => (
//           <Card
//             style={{
//               transform: `translateX(${style.x}px)`,
//               opacity: style.opacity,
//             }}
//             className="fit min-full-height-vh m-2 m-lg-0 min-width-25-per rounded-0"
//           >
//             <CardBody className="d-flex flex-column justify-content-center">
//               <Label className="font-medium-3 text-dark text-bold-400 text-center text-uppercase mb-4">
//                 Informe os dados de pagamento
//               </Label>
//               <ReactCard
//                 number={card.number}
//                 name={card.name}
//                 expiry={card.expiry}
//                 cvc={card.cvc}
//                 focused={card.focused}
//                 locale={{
//                   valid: 'Valido até',
//                 }}
//                 placeholders={{
//                   name: 'Seu nome aqui',
//                 }}
//               />
//               <form ref={c => (form = c)} onSubmit={handleSubmit}>
//                 <FormGroup>
//                   <Label className="pl-2">Número do cartão</Label>
//                   <Col md="12" className="has-icon-left">
//                     <input
//                       type="tel"
//                       name="number"
//                       className="form-control new-form-padding"
//                       placeholder="insira aqui o número do cartão"
//                       pattern="[\d| ]{16,22}"
//                       required
//                       onChange={handleInputChange}
//                       onFocus={handleInputFocus}
//                     />
//                     <div className="new-form-control-position">
//                       <CreditCard size={14} color="#212529" />
//                     </div>
//                   </Col>
//                 </FormGroup>
//                 <FormGroup>
//                   <Label className="pl-2">Nome no cartão</Label>
//                   <Col md="12" className="has-icon-left">
//                     <input
//                       type="text"
//                       name="name"
//                       className="form-control new-form-padding"
//                       placeholder="insira aqui o nome do proprietário"
//                       required
//                       onChange={handleInputChange}
//                       onFocus={handleInputFocus}
//                     />
//                     <div className="new-form-control-position">
//                       <User size={14} color="#212529" />
//                     </div>
//                   </Col>
//                 </FormGroup>
//                 <FormGroup>
//                   <Row>
//                     <Col sm="12" md="12" lg="12" xl="6">
//                       <Label className="pl-2">Validade do cartão</Label>
//                       <Col md="12" className="has-icon-left">
//                         <input
//                           type="tel"
//                           name="expiry"
//                           className="form-control new-form-padding mb-2"
//                           placeholder="ex: 04/21"
//                           pattern="\d\d/\d\d"
//                           required
//                           onChange={handleInputChange}
//                           onFocus={handleInputFocus}
//                         />
//                         <div className="new-form-control-position">
//                           <Calendar size={14} color="#212529" />
//                         </div>
//                       </Col>
//                     </Col>
//                     <Col sm="12" md="12" lg="12" xl="6">
//                       <Label className="pl-2">Digite o CVV</Label>
//                       <Col md="12" className="has-icon-left">
//                         <input
//                           type="tel"
//                           name="cvc"
//                           className="form-control new-form-padding"
//                           placeholder="ex: 311"
//                           pattern="\d{3,4}"
//                           required
//                           onChange={handleInputChange}
//                           onFocus={handleInputFocus}
//                         />
//                         <div className="new-form-control-position">
//                           <Lock size={14} color="#212529" />
//                         </div>
//                       </Col>
//                     </Col>
//                   </Row>
//                 </FormGroup>
//                 <FormGroup>
//                   <Col md="12">
//                     <Button
//                       type="submit"
//                       color="default"
//                       block
//                       className="btn-default btn-raised"
//                     >
//                       {loading ? (
//                         <BounceLoader
//                           size={23}
//                           color={'#fff'}
//                           css={css`
//                             display: block;
//                             margin: 0 auto;
//                           `}
//                         />
//                       ) : (
//                         'Realizar pagamento'
//                       )}
//                     </Button>
//                   </Col>
//                 </FormGroup>
//               </form>
//               <Row className="justify-content-center">
//                 <Label className="black">Não possui cartão?</Label>
//               </Row>
//               <Row className="justify-content-center">
//                 <NavLink to="/recuperar-senha" className="blue text-bold-400">
//                   <u>Pague com boleto</u>
//                 </NavLink>
//               </Row>
//             </CardBody>
//           </Card>
//         )}
//       </Motion>
//     </div>
//   );
// }

// const mapStateToProps = state => ({
//   userData: state.checkout.user_data,
// });
