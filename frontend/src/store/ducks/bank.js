/**
 * Action Types
 */
export const Types = {
  REQUEST: 'BANK_REQUEST',
  SUCCESS: 'BANK_SUCCESS',
  FAILURE: 'BANK_FAILURE',
  DELETE_REQUEST: 'DELETE_BANK_REQUEST',
  DELETE_SUCCESS: 'DELETE_BANK_SUCCESS',
  DELETE_FAILURE: 'DELETE_BANK_FAILURE',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  error: false,
  allData: [],
};

export default function bank(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.REQUEST:
      return { ...state, loading: true };
    case Types.SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        allData: action.payload.allData,
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
  bankRequest: () => ({
    type: Types.REQUEST,
  }),
  bankSuccess: allData => ({
    type: Types.SUCCESS,
    payload: {
      allData,
    },
  }),
  bankFailure: () => ({
    type: Types.FAILURE,
  }),
};
