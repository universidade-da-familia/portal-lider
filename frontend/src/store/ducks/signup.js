/**
 * Action Types
 */
export const Types = {
  REQUEST: 'SIGNUP_REQUEST',
  SUCCESS: 'SIGNUP_SUCCESS',
  FAILURE: 'SIGNUP_FAILURE',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  error: false,
};

export default function signup(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.REQUEST:
      return { ...state, loading: true };
    case Types.SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
      };
    case Types.FAILURE:
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
  signupRequest: (entity_company, name, email, cpf_cnpj, password) => ({
    type: Types.REQUEST,
    payload: {
      entity_company,
      name,
      email,
      cpf_cnpj,
      password,
    },
  }),

  signupSuccess: () => ({
    type: Types.SUCCESS,
  }),

  signupFailure: () => ({
    type: Types.FAILURE,
  }),
};
