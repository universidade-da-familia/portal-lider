/**
 * Action Types
 */
export const Types = {
  REQUEST: 'EXPIRED_TITLES_REQUEST',
  SUCCESS: 'EXPIRED_TITLES_SUCCESS',
  FAILURE: 'EXPIRED_TITLES_FAILURE',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  error: false,
  data: null,
};

export default function expired_titles(state = INITIAL_STATE, action) {
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
  expiredTitlesRequest: cpf => ({
    type: Types.REQUEST,
    payload: {
      cpf,
    },
  }),
  expiredTitlesSuccess: data => ({
    type: Types.SUCCESS,
    payload: {
      data,
    },
  }),
  expiredTitlesFailure: () => ({
    type: Types.FAILURE,
  }),
};
