/**
 * Action Types
 */
export const Types = {
  REQUEST: 'CHURCH_REQUEST',
  SUCCESS: 'CHURCH_SUCCESS',
  FAILURE: 'CHURCH_FAILURE',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  error: false,
  data: [],
};

export default function church(state = INITIAL_STATE, action) {
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
  churchRequest: data => ({
    type: Types.REQUEST,
    payload: {
      data,
    },
  }),
  churchSuccess: data => ({
    type: Types.SUCCESS,
    payload: {
      data,
    },
  }),
  churchFailure: () => ({
    type: Types.FAILURE,
  }),
};
