/**
 * Action Types
 */
export const Types = {
  ALL_REQUEST: 'ALL_DEFAULT_EVENT_REQUEST',
  ALL_SUCCESS: 'ALL_DEFAULT_EVENT_SUCCESS',
  ALL_FAILURE: 'ALL_DEFAULT_EVENT_FAILURE',

  ORGANIZATOR_EVENT_REQUEST: 'ORGANIZATOR_EVENT_REQUEST',
  ORGANIZATOR_EVENT_SUCCESS: 'ORGANIZATOR_EVENT_SUCCESS',
  ORGANIZATOR_EVENT_FAILURE: 'ORGANIZATOR_EVENT_FAILURE',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  error: false,
  data: null,
  allData: [],
};

export default function defaultEvent(state = INITIAL_STATE, action) {
  switch (action.type) {
    // CASE CARREGAR A TABELA DE TODOS OS EVENTOS
    case Types.ORGANIZATOR_EVENT_REQUEST:
      return { ...state, loading: true };
    case Types.ORGANIZATOR_EVENT_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        data: action.payload.data,
      };
    case Types.ORGANIZATOR_EVENT_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
      };

    // CASE CARREGAR A TABELA DE TODOS OS EVENTOS
    case Types.ALL_REQUEST:
      return { ...state, loading: true };
    case Types.ALL_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        allData: action.payload.allData,
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
  organizatorEventRequest: data => ({
    type: Types.ORGANIZATOR_EVENT_REQUEST,
    payload: {
      data,
    },
  }),

  organizatorEventSuccess: data => ({
    type: Types.ORGANIZATOR_EVENT_SUCCESS,
    payload: {
      data,
    },
  }),

  organizatorEventFailure: () => ({
    type: Types.ORGANIZATOR_EVENT_FAILURE,
  }),

  // CREATORS PARA TODOS OS EVENTOS
  allDefaultEventRequest: () => ({
    type: Types.ALL_REQUEST,
  }),
  allDefaultEventSuccess: allData => ({
    type: Types.ALL_SUCCESS,
    payload: {
      allData,
    },
  }),
  allDefaultEventFailure: () => ({
    type: Types.ALL_FAILURE,
  }),
};
