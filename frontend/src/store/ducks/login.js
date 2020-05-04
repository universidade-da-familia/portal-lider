/**
 * Action Types
 */
export const Types = {
  REQUEST: 'LOGIN_REQUEST',
  SUCCESS: 'LOGIN_SUCCESS',
  FAILURE: 'LOGIN_FAILURE',
  LOGOUT_REQUEST: 'LOGOUT_REQUEST',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_FAILURE: 'LOGOUT_FAILURE',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  error: false,
  data: {},
  username: null,
};

export default function login(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.REQUEST:
      return { ...state, loading: true };
    case Types.SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        data: action.payload.data,
      };
    case Types.FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
        username: action.payload.username,
      };
    case Types.LOGOUT_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        data: {},
      };
    default:
      return state;
  }
}

/**
 * Actions Creators
 */
export const Creators = {
  loginRequest: (type, email_cpf_cnpj, password, remember) => ({
    type: Types.REQUEST,
    payload: {
      type,
      email_cpf_cnpj,
      password,
      remember,
    },
  }),

  loginSuccess: data => ({
    type: Types.SUCCESS,
    payload: {
      data,
    },
  }),

  loginFailure: username => ({
    type: Types.FAILURE,
    payload: {
      username,
    },
  }),

  logoutRequest: () => ({
    type: Types.LOGOUT_REQUEST,
  }),

  logoutSuccess: () => ({
    type: Types.LOGOUT_SUCCESS,
  }),

  logoutFailure: () => ({
    type: Types.LOGOUT_FAILURE,
  }),
};
