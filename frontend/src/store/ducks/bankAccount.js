/**
 * Action Types
 */
export const Types = {
  REQUEST: 'BANK_ACCOUNT_REQUEST',
  SUCCESS: 'BANK_ACCOUNT_SUCCESS',
  FAILURE: 'BANK_ACCOUNT_FAILURE',
  DELETE_REQUEST: 'DELETE_BANK_ACCOUNT_REQUEST',
  DELETE_SUCCESS: 'DELETE_BANK_ACCOUNT_SUCCESS',
  DELETE_FAILURE: 'DELETE_BANK_ACCOUNT_FAILURE',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  error: false,
};

export default function bankAccount(state = INITIAL_STATE, action) {
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

    // DELETANDO ENDEREÇO
    case Types.DELETE_REQUEST:
      return { ...state, loading: true };
    case Types.DELETE_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
      };
    case Types.DELETE_FAILURE:
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
  bankAccountRequest: (
    netsuite_id,
    user_type,
    bankAccountsPost,
    bankAccountsPut
  ) => ({
    type: Types.REQUEST,
    payload: {
      netsuite_id,
      user_type,
      bankAccountsPost,
      bankAccountsPut,
    },
  }),
  bankAccountSuccess: () => ({
    type: Types.SUCCESS,
  }),
  bankAccountFailure: () => ({
    type: Types.FAILURE,
  }),

  // DELETANDO
  deleteBankAccountRequest: id => ({
    type: Types.DELETE_REQUEST,
    payload: {
      id,
    },
  }),
  deleteBankAccountSuccess: () => ({
    type: Types.DELETE_SUCCESS,
  }),
  deleteBankAccountFailure: () => ({
    type: Types.DELETE_FAILURE,
  }),
};
