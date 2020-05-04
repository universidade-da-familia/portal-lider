/**
 * Action Types
 */
export const Types = {
  CHECKOUT_REQUEST: 'CHECKOUT_REQUEST',
  CHECKOUT_SUCCESS: 'CHECKOUT_SUCCESS',
  CHECKOUT_FAILURE: 'CHECKOUT_FAILURE',

  CHECKOUT_LOGIN_REQUEST: 'CHECKOUT_LOGIN_REQUEST',
  CHECKOUT_LOGIN_SUCCESS: 'CHECKOUT_LOGIN_SUCCESS',
  CHECKOUT_LOGIN_FAILURE: 'CHECKOUT_LOGIN_FAILURE',

  CHECKOUT_SIGNUP_REQUEST: 'CHECKOUT_SIGNUP_REQUEST',
  CHECKOUT_SIGNUP_SUCCESS: 'CHECKOUT_SIGNUP_SUCCESS',
  CHECKOUT_SIGNUP_FAILURE: 'CHECKOUT_SIGNUP_FAILURE',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  error: false,
  user_data: {},
  payment_data: {},
};

export default function checkout(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.CHECKOUT_REQUEST:
      return { ...state, loading: true };
    case Types.CHECKOUT_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        payment_data: action.payload.data,
      };
    case Types.CHECKOUT_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
      };

    case Types.CHECKOUT_LOGIN_REQUEST:
      return { ...state, loading: true };
    case Types.CHECKOUT_LOGIN_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        user_data: action.payload.data,
      };
    case Types.CHECKOUT_LOGIN_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
      };

    case Types.CHECKOUT_SIGNUP_REQUEST:
      return { ...state, loading: true };
    case Types.CHECKOUT_SIGNUP_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        user_data: action.payload.data,
      };
    case Types.CHECKOUT_SIGNUP_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
      };
    default:
      return state;
  }
}

/**
 * Actions Creators
 */
export const Creators = {
  checkoutRequest: (user, cardForm) => ({
    type: Types.CHECKOUT_REQUEST,
    payload: {
      user,
      cardForm,
    },
  }),
  checkoutSuccess: data => ({
    type: Types.CHECKOUT_SUCCESS,
    payload: {
      data,
    },
  }),
  checkoutFailure: () => ({
    type: Types.CHECKOUT_FAILURE,
  }),

  checkoutLoginRequest: (email_cpf_cnpj, password, event_id, invite_id) => ({
    type: Types.CHECKOUT_LOGIN_REQUEST,
    payload: {
      email_cpf_cnpj,
      password,
      event_id,
      invite_id,
    },
  }),
  checkoutLoginSuccess: data => ({
    type: Types.CHECKOUT_LOGIN_SUCCESS,
    payload: {
      data,
    },
  }),
  checkoutLoginFailure: () => ({
    type: Types.CHECKOUT_LOGIN_FAILURE,
  }),

  checkoutSignupRequest: (firstname, lastname, email, cpf_cnpj, password) => ({
    type: Types.CHECKOUT_SIGNUP_REQUEST,
    payload: {
      firstname,
      lastname,
      email,
      cpf_cnpj,
      password,
    },
  }),
  checkoutSignupSuccess: data => ({
    type: Types.CHECKOUT_SIGNUP_SUCCESS,
    payload: {
      data,
    },
  }),
  checkoutSignupFailure: () => ({
    type: Types.CHECKOUT_SIGNUP_FAILURE,
  }),
};
