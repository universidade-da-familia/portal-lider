/**
 * Action Types
 */
export const Types = {
  CREATE_REQUEST: 'CREATE_PARTICIPANT_REQUEST',
  CREATE_SUCCESS: 'CREATE_PARTICIPANT_SUCCESS',
  CREATE_FAILURE: 'CREATE_PARTICIPANT_FAILURE',

  ADD_REQUEST: 'ADD_PARTICIPANT_REQUEST',
  ADD_SUCCESS: 'ADD_PARTICIPANT_SUCCESS',
  ADD_FAILURE: 'ADD_PARTICIPANT_FAILURE',

  DELETE_REQUEST: 'DELETE_PARTICIPANT_REQUEST',
  DELETE_SUCCESS: 'DELETE_PARTICIPANT_SUCCESS',
  DELETE_FAILURE: 'DELETE_PARTICIPANT_FAILURE',

  SEARCH_REQUEST: 'SEARCH_PARTICIPANT_REQUEST',
  SEARCH_SUCCESS: 'SEARCH_PARTICIPANT_SUCCESS',
  SEARCH_FAILURE: 'SEARCH_PARTICIPANT_FAILURE',

  EDIT_PRINT_DATE_REQUEST: 'EDIT_PRINT_DATE_REQUEST',
  EDIT_PRINT_DATE_SUCCESS: 'EDIT_PRINT_DATE_SUCCESS',
  EDIT_PRINT_DATE_FAILURE: 'EDIT_PRINT_DATE_FAILURE',

  SET_QUITTER_REQUEST: 'SET_QUITTER_REQUEST',
  SET_QUITTER_SUCCESS: 'SET_QUITTER_SUCCESS',
  SET_QUITTER_FAILURE: 'SET_QUITTER_FAILURE',

  EDIT_REQUEST: 'EDIT_PARTICIPANT_REQUEST',
  EDIT_SUCCESS: 'EDIT_PARTICIPANT_SUCCESS',
  EDIT_FAILURE: 'EDIT_PARTICIPANT_FAILURE',

  EDIT_HIERARCHY_REQUEST: 'EDIT_PARTICIPANT_HIERARCHY_REQUEST',
  EDIT_HIERARCHY_SUCCESS: 'EDIT_PARTICIPANT_HIERARCHY_SUCCESS',
  EDIT_HIERARCHY_FAILURE: 'EDIT_PARTICIPANT_HIERARCHY_FAILURE',

  CHANGE_PARTICIPANT_LEADER_REQUEST: 'CHANGE_PARTICIPANT_LEADER_REQUEST',
  CHANGE_PARTICIPANT_LEADER_SUCCESS: 'CHANGE_PARTICIPANT_LEADER_SUCCESS',
  CHANGE_PARTICIPANT_LEADER_FAILURE: 'CHANGE_PARTICIPANT_LEADER_FAILURE',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  loadingSearch: false,
  error: false,
  data: null,
  createdParticipant: null,
};

export default function participant(state = INITIAL_STATE, action) {
  switch (action.type) {
    // CRIAR PARTICIPANTE NOVO
    case Types.CREATE_REQUEST:
      return { ...state, loading: true };
    case Types.CREATE_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        createdParticipant: action.payload.data,
      };
    case Types.CREATE_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
      };

    // ADICIONAR PARTICIPANTE
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

    // DELETAR PARTICIPANTE
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

    // SEARCH PARTICIPANT
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

    // SEARCH PARTICIPANT
    case Types.EDIT_PRINT_DATE_REQUEST:
      return { ...state, loadingSearch: true, error: false };
    case Types.EDIT_PRINT_DATE_SUCCESS:
      return {
        ...state,
        error: false,
      };
    case Types.EDIT_PRINT_DATE_FAILURE:
      return {
        ...state,
        error: true,
      };

    // MUDAR PARTICIPANTE DESISTENTE / NAO DESISTENTE
    case Types.SET_QUITTER_REQUEST:
      return { ...state, loading: true };
    case Types.SET_QUITTER_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
      };
    case Types.SET_QUITTER_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
      };

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

    case Types.EDIT_HIERARCHY_REQUEST:
      return { ...state, loading: true };
    case Types.EDIT_HIERARCHY_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
      };
    case Types.EDIT_HIERARCHY_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
      };

    // MUDAR PARTICIPANTE PARA LEADER
    case Types.CHANGE_PARTICIPANT_LEADER_REQUEST:
      return { ...state, loading: true };
    case Types.CHANGE_PARTICIPANT_LEADER_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
      };
    case Types.CHANGE_PARTICIPANT_LEADER_FAILURE:
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
  // CREATE PARTICIPANT
  createParticipantRequest: (
    name,
    cpf,
    email,
    sex,
    password,
    event_id,
    assistant
  ) => ({
    type: Types.CREATE_REQUEST,
    payload: {
      name,
      cpf,
      email,
      sex,
      password,
      event_id,
      assistant,
    },
  }),

  createParticipantSuccess: data => ({
    type: Types.CREATE_SUCCESS,
    payload: {
      data,
    },
  }),

  createParticipantFailure: () => ({
    type: Types.CREATE_FAILURE,
  }),

  // ADD PARTICIPANTE
  addParticipantRequest: (entity_id, event_id, assistant) => ({
    type: Types.ADD_REQUEST,
    payload: {
      entity_id,
      event_id,
      assistant,
    },
  }),

  addParticipantSuccess: () => ({
    type: Types.ADD_SUCCESS,
  }),

  addParticipantFailure: () => ({
    type: Types.ADD_FAILURE,
  }),

  // DELETE PARTICIPANTE
  deleteParticipantRequest: (entity_id, participant_id) => ({
    type: Types.DELETE_REQUEST,
    payload: {
      entity_id,
      participant_id,
    },
  }),

  deleteParticipantSuccess: () => ({
    type: Types.DELETE_SUCCESS,
  }),

  deleteParticipantFailure: () => ({
    type: Types.DELETE_FAILURE,
  }),

  // Search organizator
  searchParticipantRequest: (cpf_email, default_event_id) => ({
    type: Types.SEARCH_REQUEST,
    payload: {
      cpf_email,
      default_event_id,
    },
  }),

  searchParticipantSuccess: data => ({
    type: Types.SEARCH_SUCCESS,
    payload: {
      data,
    },
  }),

  searchParticipantFailure: data => ({
    type: Types.SEARCH_FAILURE,
    payload: {
      data,
    },
  }),

  // SET PARTICIPANTE DESISTENTE/NAO DESISTENTE
  setQuitterParticipantRequest: (participant_id, is_quitter, assistant) => ({
    type: Types.SET_QUITTER_REQUEST,
    payload: {
      participant_id,
      is_quitter,
      assistant,
    },
  }),

  setQuitterParticipantSuccess: () => ({
    type: Types.SET_QUITTER_SUCCESS,
  }),

  setQuitterParticipantFailure: () => ({
    type: Types.SET_QUITTER_FAILURE,
  }),

  // SET PARTICIPANTE DESISTENTE/NAO DESISTENTE
  editPrintDateRequest: (organizators_id, participants_id, event_id) => ({
    type: Types.EDIT_PRINT_DATE_REQUEST,
    payload: {
      organizators_id,
      participants_id,
      event_id,
    },
  }),

  editPrintDateSuccess: () => ({
    type: Types.EDIT_PRINT_DATE_SUCCESS,
  }),

  editPrintDateFailure: () => ({
    type: Types.EDIT_PRINT_DATE_FAILURE,
  }),

  editParticipantRequest: data => ({
    type: Types.EDIT_REQUEST,
    payload: {
      data,
    },
  }),
  editParticipantSuccess: () => ({
    type: Types.EDIT_SUCCESS,
  }),
  editParticipantFailure: () => ({
    type: Types.EDIT_FAILURE,
  }),

  editParticipantHierarchyRequest: (
    data,
    eventId,
    participantsId,
    assistantsId,
    hierarchyName,
    participantWillBecome,
    assistantWillBecome
  ) => ({
    type: Types.EDIT_HIERARCHY_REQUEST,
    payload: {
      data,
      eventId,
      participantsId,
      assistantsId,
      hierarchyName,
      participantWillBecome,
      assistantWillBecome,
    },
  }),
  editParticipantHierarchySuccess: () => ({
    type: Types.EDIT_HIERARCHY_SUCCESS,
  }),
  editParticipantHierarchyFailure: () => ({
    type: Types.EDIT_HIERARCHY_FAILURE,
  }),

  // CHANGE PARTICIPANTE TO LEADER
  changeParticipantLeaderRequest: (participant_id, entity_id, event_id) => ({
    type: Types.CHANGE_PARTICIPANT_LEADER_REQUEST,
    payload: {
      participant_id,
      entity_id,
      event_id,
    },
  }),

  changeParticipantLeaderSuccess: () => ({
    type: Types.CHANGE_PARTICIPANT_LEADER_SUCCESS,
  }),

  changeParticipantLeaderFailure: () => ({
    type: Types.CHANGE_PARTICIPANT_LEADER_FAILURE,
  }),
};
