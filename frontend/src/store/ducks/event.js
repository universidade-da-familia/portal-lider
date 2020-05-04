/**
 * Action Types
 *
 * GROUPS_REQUEST 3x
 *
 * GROUP_EDIT_REQUEST 3x
 *
 * GROUP_ADD_INVITE_REQUEST 3x
 */
export const Types = {
  ADD_REQUEST: 'ADD_REQUEST',
  ADD_SUCCESS: 'ADD_SUCCESS',
  ADD_FAILURE: 'ADD_FAILURE',

  ALL_REQUEST: 'ALL_EVENT_REQUEST',
  ALL_SUCCESS: 'ALL_EVENT_SUCCESS',
  ALL_FAILURE: 'ALL_EVENT_FAILURE',

  REQUEST: 'EVENT_REQUEST',
  SUCCESS: 'EVENT_SUCCESS',
  FAILURE: 'EVENT_FAILURE',

  EDIT_REQUEST: 'EVENT_EDIT_REQUEST',
  EDIT_SUCCESS: 'EVENT_EDIT_SUCCESS',
  EDIT_FAILURE: 'EVENT_EDIT_FAILURE',

  DELETE_REQUEST: 'EVENT_DELETE_REQUEST',
  DELETE_SUCCESS: 'EVENT_DELETE_SUCCESS',
  DELETE_FAILURE: 'EVENT_DELETE_FAILURE',

  ALL_CONSULT_REQUEST: 'ALL_CONSULT_EVENT_REQUEST',
  ALL_CONSULT_SUCCESS: 'ALL_CONSULT_EVENT_SUCCESS',
  ALL_CONSULT_FAILURE: 'ALL_CONSULT_EVENT_FAILURE',

  ALL_CONSULT_PRINT_REQUEST: 'ALL_CONSULT_EVENT_PRINT_REQUEST',
  ALL_CONSULT_PRINT_SUCCESS: 'ALL_CONSULT_EVENT_PRINT_SUCCESS',
  ALL_CONSULT_PRINT_FAILURE: 'ALL_CONSULT_EVENT_PRINT_FAILURE',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  error: false,
  // Listagem de todos os eventos
  allData: {
    organizators: [],
    participant: [],
    leader: [],
    trainer: [],
    myTrainers: [],
    facilitate: [],
    coordinate: [],
  },
  // Dados de um evento
  data: null,
  allEvents: {
    data: [],
  },
  allEventsForPrint: {
    data: [],
  },
};

export default function event(state = INITIAL_STATE, action) {
  switch (action.type) {
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

    // CASE CARREGAR UM EVENTO PELO ID
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

    // CASE EDITAR EVENTO
    case Types.EDIT_REQUEST:
      return { ...state, loading: true };
    case Types.EDIT_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
      };
    case Types.EDIT_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
      };

    // CASE CONFIRMAR CONVITE
    case Types.ADD_REQUEST:
      return { ...state, loading: true };
    case Types.ADD_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
      };
    case Types.ADD_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
      };

    // DELETAR UM EVENTO
    case Types.DELETE_REQUEST:
      return { ...state, loading: true };
    case Types.DELETE_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
      };
    case Types.DELETE_FAILURE:
      return { ...state, error: true, loading: false };

    // CASE CARREGAR TODOS OS EVENTOS PARA CONSULTA
    case Types.ALL_CONSULT_REQUEST:
      return { ...state, loading: true };
    case Types.ALL_CONSULT_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        allEvents: action.payload.allEvents,
      };
    case Types.ALL_CONSULT_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
      };

    // CASE CARREGAR EVENTOS EVENTOS PARA IMPRESSAO
    case Types.ALL_CONSULT_PRINT_REQUEST:
      return { ...state, loading: true };
    case Types.ALL_CONSULT_PRINT_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        allEventsForPrint: action.payload.allEventsForPrint,
      };
    case Types.ALL_CONSULT_PRINT_FAILURE:
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
  allEventRequest: () => ({
    type: Types.ALL_REQUEST,
  }),
  allEventSuccess: allData => ({
    type: Types.ALL_SUCCESS,
    payload: {
      allData,
    },
  }),
  allEventFailure: () => ({
    type: Types.ALL_FAILURE,
  }),

  // CREATORS PARA CARREGAR UM EVENTO PELO ID
  eventRequest: id => ({
    type: Types.REQUEST,
    payload: {
      id,
    },
  }),
  eventSuccess: data => ({
    type: Types.SUCCESS,
    payload: {
      data,
    },
  }),
  eventFailure: () => ({
    type: Types.FAILURE,
  }),

  // CREATORS PARA EDITAR UM EVENTO
  eventEditRequest: (id, eventData) => ({
    type: Types.EDIT_REQUEST,
    payload: {
      id,
      eventData,
    },
  }),
  eventEditSuccess: () => ({
    type: Types.EDIT_SUCCESS,
  }),
  eventEditFailure: () => ({
    type: Types.EDIT_FAILURE,
  }),

  addEventRequest: data => ({
    type: Types.ADD_REQUEST,
    payload: {
      data,
    },
  }),
  addEventSuccess: () => ({
    type: Types.ADD_SUCCESS,
  }),
  addEventFailure: () => ({
    type: Types.ADD_FAILURE,
  }),

  // DELETE EVENT
  deleteEventRequest: event_id => ({
    type: Types.DELETE_REQUEST,
    payload: {
      event_id,
    },
  }),

  deleteEventSuccess: () => ({
    type: Types.DELETE_SUCCESS,
  }),

  deleteEventFailure: () => ({
    type: Types.DELETE_FAILURE,
  }),

  // CREATORS PARA TODOS OS EVENTOS PARA CONSULTA
  allConsultEventRequest: (page, filterData) => ({
    type: Types.ALL_CONSULT_REQUEST,
    payload: {
      page,
      filterData,
    },
  }),
  allConsultEventSuccess: allEvents => ({
    type: Types.ALL_CONSULT_SUCCESS,
    payload: {
      allEvents,
    },
  }),
  allConsultEventFailure: () => ({
    type: Types.ALL_CONSULT_FAILURE,
  }),

  // CREATORS PARA TODOS OS EVENTOS PARA IMPRESSAO
  allConsultEventForPrintCertificateRequest: (page, filterPrintData) => ({
    type: Types.ALL_CONSULT_PRINT_REQUEST,
    payload: {
      page,
      filterPrintData,
    },
  }),

  allConsultEventForPrintCertificateSuccess: allEventsForPrint => ({
    type: Types.ALL_CONSULT_PRINT_SUCCESS,
    payload: {
      allEventsForPrint,
    },
  }),

  allConsultEventForPrintCertificateFailure: () => ({
    type: Types.ALL_CONSULT_PRINT_FAILURE,
  }),
};
