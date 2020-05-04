/**
 * Action Types
 */
export const Types = {
  REQUEST: 'RESET_PASSWORD_REQUEST',
  SUCCESS: 'RESET_PASSWORD_SUCCESS',
  FAILURE: 'RESET_PASSWORD_FAILURE',
  CONFIRM_REQUEST: 'CONFIRM_RESET_PASSWORD_REQUEST',
  CONFIRM_SUCCESS: 'CONFIRM_RESET_PASSWORD_SUCCESS',
  CONFIRM_FAILURE: 'CONFIRM_RESET_PASSWORD_FAILURE',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  error: false,
};

export default function resetPassword(state = INITIAL_STATE, action) {
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
    case Types.CONFIRM_REQUEST:
      return { ...state, loading: true };
    case Types.CONFIRM_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
      };
    case Types.CONFIRM_FAILURE:
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
  resetPasswordRequest: (type, email_cpf_cnpj) => ({
    type: Types.REQUEST,
    payload: {
      type,
      email_cpf_cnpj,
    },
  }),

  resetPasswordSuccess: () => ({
    type: Types.SUCCESS,
  }),

  resetPasswordFailure: () => ({
    type: Types.FAILURE,
  }),

  confirmResetPasswordRequest: (type, token, password) => ({
    type: Types.CONFIRM_REQUEST,
    payload: {
      type,
      token,
      password,
    },
  }),

  confirmResetPasswordSuccess: () => ({
    type: Types.CONFIRM_SUCCESS,
  }),

  confirmResetPasswordFailure: () => ({
    type: Types.CONFIRM_FAILURE,
  }),
};
