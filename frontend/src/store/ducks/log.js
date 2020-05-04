/**
 * Action Types
 */
export const Types = {
  REQUEST: 'LOG_REQUEST',
  SUCCESS: 'LOG_SUCCESS',
  FAILURE: 'LOG_FAILURE',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  error: false,
  data: null,
};

export default function logs(state = INITIAL_STATE, action) {
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
  logsRequest: (models, requesting_id) => ({
    type: Types.REQUEST,
    payload: {
      models,
      requesting_id,
    },
  }),

  logsSuccess: data => ({
    type: Types.SUCCESS,
    payload: {
      data,
    },
  }),

  logsFailure: () => ({
    type: Types.FAILURE,
  }),
};
