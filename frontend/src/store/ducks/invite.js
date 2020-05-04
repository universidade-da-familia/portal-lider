/**
 * Action Types
 */
export const Types = {
  ADD_REQUEST: 'ADD_INVITE_REQUEST',
  ADD_SUCCESS: 'ADD_INVITE_SUCCESS',
  ADD_FAILURE: 'ADD_INVITE_FAILURE',

  CONFIRM_REQUEST: 'CONFIRM_INVITE_REQUEST',
  CONFIRM_SUCCESS: 'CONFIRM_INVITE_SUCCESS',
  CONFIRM_FAILURE: 'CONFIRM_INVITE_FAILURE',

  DELETE_REQUEST: 'DELETE_INVITE_REQUEST',
  DELETE_SUCCESS: 'DELETE_INVITE_SUCCESS',
  DELETE_FAILURE: 'DELETE_INVITE_FAILURE',

  CREATE_BY_INVITE_REQUEST: 'CREATE_BY_INVITE_PARTICIPANT_REQUEST',
  CREATE_BY_INVITE_SUCCESS: 'CREATE_BY_INVITE_PARTICIPANT_SUCCESS',
  CREATE_BY_INVITE_FAILURE: 'CREATE_BY_INVITE_PARTICIPANT_FAILURE',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  error: false,
};

export default function invite(state = INITIAL_STATE, action) {
  switch (action.type) {
    // CASE ENVIAR CONVITE
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

    // CASE ACEITAR CONVITE
    case Types.CONFIRM_REQUEST:
      return { ...state, loading: true };
    case Types.CONFIRM_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
      };
    case Types.CONFIRM_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
      };

    // DELETAR INVITE
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

    // CRIAR PARTICIPANTE NOVO POR INVITE
    case Types.CREATE_BY_INVITE_REQUEST:
      return { ...state, loading: true };
    case Types.CREATE_BY_INVITE_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
      };
    case Types.CREATE_BY_INVITE_FAILURE:
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
  //CREATE PARTICIPANT BY INVITE
  createByInviteRequest: (
    invite_id,
    name,
    cpf,
    email,
    sex,
    password,
    event_id
  ) => ({
    type: Types.CREATE_BY_INVITE_REQUEST,
    payload: {
      invite_id,
      name,
      cpf,
      email,
      sex,
      password,
      event_id,
    },
  }),

  createByInviteSuccess: () => ({
    type: Types.CREATE_BY_INVITE_SUCCESS,
  }),

  createByInviteFailure: () => ({
    type: Types.CREATE_BY_INVITE_FAILURE,
  }),

  // INVITE REQUEST
  inviteRequest: (event_id, event_type, name, email) => ({
    type: Types.ADD_REQUEST,
    payload: {
      event_id,
      event_type,
      name,
      email,
    },
  }),
  inviteSuccess: () => ({
    type: Types.ADD_SUCCESS,
  }),
  inviteFailure: () => ({
    type: Types.ADD_FAILURE,
  }),

  // INVITE CONFIRMATION
  confirmInviteRequest: data => ({
    type: Types.CONFIRM_REQUEST,
    payload: {
      data,
    },
  }),
  confirmInviteSuccess: () => ({
    type: Types.CONFIRM_SUCCESS,
  }),
  confirmInviteFailure: () => ({
    type: Types.CONFIRM_FAILURE,
  }),

  // DELETAR CONVITE
  deleteInviteRequest: invite_id => ({
    type: Types.DELETE_REQUEST,
    payload: {
      invite_id,
    },
  }),

  deleteInviteSuccess: () => ({
    type: Types.DELETE_SUCCESS,
  }),

  deleteInviteFailure: () => ({
    type: Types.DELETE_FAILURE,
  }),
};
