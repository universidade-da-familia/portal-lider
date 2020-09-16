/**
 * Action Types
 */
export const Types = {
  ALL_REQUEST: 'ALL_DEFAULT_EVENT_SCHEDULE_REQUEST',
  ALL_SUCCESS: 'ALL_DEFAULT_EVENT_SCHEDULE_SUCCESS',
  ALL_FAILURE: 'ALL_DEFAULT_EVENT_SCHEDULE_FAILURE',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  error: false,
  data: null,
};

export default function defaultEvent(state = INITIAL_STATE, action) {
  switch (action.type) {
    // CASE CARREGAR A TABELA DE TODOS OS EVENTOS
    case Types.ALL_REQUEST:
      return { ...state, loading: true };
    case Types.ALL_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        data: action.payload.data,
      };
    case Types.ALL_FAILURE:
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
  // CREATORS PARA TODOS OS EVENTOS
  allDefaultEventScheduleRequest: () => ({
    type: Types.ALL_REQUEST,
  }),
  allDefaultEventScheduleSuccess: data => ({
    type: Types.ALL_SUCCESS,
    payload: {
      data,
    },
  }),
  allDefaultEventScheduleFailure: () => ({
    type: Types.ALL_FAILURE,
  }),
};
