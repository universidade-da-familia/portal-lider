import { reducer as toastrReducer } from 'react-redux-toastr';

import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import history from '~/app/history';

import address from './address';
import avatar from './avatar';
import bankAccount from './bankAccount';
import calender from './calender';
import cep from './cep';
import certificate from './certificate';
import chat from './chat';
import checkout from './checkout';
import church from './church';
import contacts from './contacts';
import customizer from './customizer';
import defaultEvent from './defaultEvent';
import entity from './entity';
import event from './event';
import expired_titles from './expired_titles';
import exportExcel from './exportExcel';
import groupEdit from './groupEdit';
import invite from './invite';
import lesson from './lesson';
import lessonReport from './lessonReport';
import log from './log';
import login from './login';
import ministery from './ministery';
import order from './order';
import organization from './organization';
import organizator from './organizator';
import participant from './participant';
import paymentPlan from './paymentPlan';
import profile from './profile';
import relationship from './relationship';
import resetPassword from './resetPassword';
import searchChurch from './searchChurch';
import shipping from './shipping';
import shippingTag from './shippingTag';
import signup from './signup';
import siteEvent from './siteEvent';
import todo from './todo';
import types from './types';

export default combineReducers({
  toastr: toastrReducer,
  bankAccount,
  customizer,
  calender,
  chat,
  church,
  contacts,
  todo,
  types,
  signup,
  log,
  login,
  profile,
  address,
  relationship,
  resetPassword,
  entity,
  event,
  invite,
  groupEdit,
  searchChurch,
  cep,
  certificate,
  checkout,
  lesson,
  lessonReport,
  siteEvent,
  defaultEvent,
  organization,
  avatar,
  organizator,
  participant,
  order,
  shipping,
  ministery,
  expired_titles,
  shippingTag,
  exportExcel,
  paymentPlan,
  router: connectRouter(history),
});
