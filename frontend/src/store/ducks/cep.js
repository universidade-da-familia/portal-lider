/**
 * Action Types
 */
export const Types = {
  REQUEST: 'CEP_REQUEST',
  SUCCESS: 'CEP_SUCCESS',
  FAILURE: 'CEP_FAILURE',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  error: false,
  data: {},
};

export default function cep(state = INITIAL_STATE, action) {
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
      };
    default:
      return state;
  }
}

/**
 * Actions Creators
 */
export const Creators = {
  cepRequest: (cep, index) => ({
    type: Types.REQUEST,
    payload: {
      cep,
      index,
    },
  }),
  cepSuccess: data => ({
    type: Types.SUCCESS,
    payload: {
      data,
    },
  }),
  cepFailure: () => ({
    type: Types.FAILURE,
  }),
};
