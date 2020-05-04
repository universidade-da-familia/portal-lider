/**
 * Action Types
 */
export const Types = {
  ADD_REQUEST: 'ADD_ORGANIZATOR_REQUEST',
  ADD_SUCCESS: 'ADD_ORGANIZATOR_SUCCESS',
  ADD_FAILURE: 'ADD_ORGANIZATOR_FAILURE',
  CHANGE_REQUEST: 'CHANGE_ORGANIZATOR_REQUEST',
  CHANGE_SUCCESS: 'CHANGE_ORGANIZATOR_SUCCESS',
  CHANGE_FAILURE: 'CHANGE_ORGANIZATOR_FAILURE',
  DELETE_REQUEST: 'DELETE_ORGANIZATOR_REQUEST',
  DELETE_SUCCESS: 'DELETE_ORGANIZATOR_SUCCESS',
  DELETE_FAILURE: 'DELETE_ORGANIZATOR_FAILURE',
  SEARCH_REQUEST: 'SEARCH_ORGANIZATOR_REQUEST',
  SEARCH_SUCCESS: 'SEARCH_ORGANIZATOR_SUCCESS',
  SEARCH_FAILURE: 'SEARCH_ORGANIZATOR_FAILURE',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  loadingSearch: false,
  error: false,
  data: null,
};

export default function organizator(state = INITIAL_STATE, action) {
  switch (action.type) {
    // ADICIONAR ORGANIZADOR
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

    // DELETAR ORGANIZADOR
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

    // SEARCH ORGANIZATOR
    case Types.SEARCH_REQUEST:
      return { ...state, loadingSearch: true, error: false };
    case Types.SEARCH_SUCCESS:
      return {
        ...state,
        error: false,
        loadingSearch: false,
        data: action.payload.data,
      };
    case Types.SEARCH_FAILURE:
      return {
        ...state,
        error: true,
        loadingSearch: false,
        data: action.payload.data,
      };

    default:
      return state;
  }
}

/**
 * Actions Creators
 */
export const Creators = {
  // ADD ORGANIZATOR
  addOrganizatorRequest: (event_id, entity_id) => ({
    type: Types.ADD_REQUEST,
    payload: {
      event_id,
      entity_id,
    },
  }),

  addOrganizatorSuccess: () => ({
    type: Types.ADD_SUCCESS,
  }),

  addOrganizatorFailure: () => ({
    type: Types.ADD_FAILURE,
  }),

  // CHANGE ORGANIZATOR
  changeOrganizatorRequest: (organizator_id, event_id, entity_id, is_same) => ({
    type: Types.CHANGE_REQUEST,
    payload: {
      organizator_id,
      event_id,
      entity_id,
      is_same,
    },
  }),

  changeOrganizatorSuccess: () => ({
    type: Types.CHANGE_SUCCESS,
  }),

  changeOrganizatorFailure: () => ({
    type: Types.CHANGE_FAILURE,
  }),

  // DELETE ORGANIZATOR
  deleteOrganizatorRequest: (event_id, entity_id) => ({
    type: Types.DELETE_REQUEST,
    payload: {
      event_id,
      entity_id,
    },
  }),

  deleteOrganizatorSuccess: () => ({
    type: Types.DELETE_SUCCESS,
  }),

  deleteOrganizatorFailure: () => ({
    type: Types.DELETE_FAILURE,
  }),

  // SEarch organizator
  searchOrganizatorRequest: (
    organizator_type,
    cpf_email,
    default_event_id
  ) => ({
    type: Types.SEARCH_REQUEST,
    payload: {
      organizator_type,
      cpf_email,
      default_event_id,
    },
  }),

  searchOrganizatorSuccess: data => ({
    type: Types.SEARCH_SUCCESS,
    payload: {
      data,
    },
  }),

  searchOrganizatorFailure: data => ({
    type: Types.SEARCH_FAILURE,
    payload: {
      data,
    },
  }),
};
