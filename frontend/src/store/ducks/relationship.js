/**
 * Action Types
 */
export const Types = {
  REQUEST: 'RELATIONSHIP_REQUEST',
  SUCCESS: 'RELATIONSHIP_SUCCESS',
  FAILURE: 'RELATIONSHIP_FAILURE',

  EDIT_REQUEST: 'EDIT_RELATIONSHIP_REQUEST',
  EDIT_SUCCESS: 'EDIT_RELATIONSHIP_SUCCESS',
  EDIT_FAILURE: 'EDIT_RELATIONSHIP_FAILURE',

  ADD_REQUEST: 'ADD_RELATIONSHIP_REQUEST',
  ADD_SUCCESS: 'ADD_RELATIONSHIP_SUCCESS',
  ADD_FAILURE: 'ADD_RELATIONSHIP_FAILURE',

  DELETE_REQUEST: 'DELETE_RELATIONSHIP_REQUEST',
  DELETE_SUCCESS: 'DELETE_RELATIONSHIP_SUCCESS',
  DELETE_FAILURE: 'DELETE_RELATIONSHIP_FAILURE',

  CREATE_REQUEST: 'CREATE_RELATIONSHIP_REQUEST',
  CREATE_SUCCESS: 'CREATE_RELATIONSHIP_SUCCESS',
  CREATE_FAILURE: 'CREATE_RELATIONSHIP_FAILURE',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  error: false,
  relationshipData: null,
};

export default function relationship(state = INITIAL_STATE, action) {
  switch (action.type) {
    // CASE CARREGA UM RELACIONAMENTO SELECIONADO
    case Types.REQUEST:
      return { ...state, loading: true };
    case Types.SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        relationshipData: action.payload.relationshipData,
      };
    case Types.FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
      };

    // EDITAR UMA RELACIONAMENTO
    case Types.EDIT_REQUEST:
      return { ...state, loading: true };
    case Types.EDIT_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
      };
    case Types.EDIT_FAILURE:
      return { ...state, error: true, loading: false };

    // ADICIONAR UMA RELACIONAMENTO
    case Types.ADD_REQUEST:
      return { ...state, loading: true };
    case Types.ADD_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
      };
    case Types.ADD_FAILURE:
      return { ...state, error: true, loading: false };

    // DELETAR UMA RELACIONAMENTO
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

    // CRIAR UM RELACIONAMENTO
    case Types.CREATE_REQUEST:
      return { ...state, loading: true };
    case Types.CREATE_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
      };
    case Types.CREATE_FAILURE:
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
  // CREATORS UM RELACIONAMENTO
  relationshipRequest: entity_id => ({
    type: Types.REQUEST,
    payload: {
      entity_id,
    },
  }),
  relationshipSuccess: relationshipData => ({
    type: Types.SUCCESS,
    payload: {
      relationshipData,
    },
  }),
  relationshipFailure: () => ({
    type: Types.FAILURE,
  }),

  // EDITAR UM RELACIONAMENTO
  editRelationshipRequest: (id, editData) => ({
    type: Types.EDIT_REQUEST,
    payload: {
      id,
      editData,
    },
  }),
  editRelationshipSuccess: () => ({
    type: Types.EDIT_SUCCESS,
  }),
  editRelationshipFailure: () => ({
    type: Types.EDIT_FAILURE,
  }),

  // ADICIONAR NOVA RELACIONAMENTO
  addRelationshipRequest: (
    entity_id,
    relationship_id,
    relationship_type,
    relationship_sex
  ) => ({
    type: Types.ADD_REQUEST,
    payload: {
      entity_id,
      relationship_id,
      relationship_type,
      relationship_sex,
    },
  }),
  addRelationshipSuccess: () => ({
    type: Types.ADD_SUCCESS,
  }),
  addRelationshipFailure: () => ({
    type: Types.ADD_FAILURE,
  }),

  // DELETAR RELACIONAMENTO
  deleteRelationshipRequest: relationship_id => ({
    type: Types.DELETE_REQUEST,
    payload: {
      relationship_id,
    },
  }),

  deleteRelationshipSuccess: () => ({
    type: Types.DELETE_SUCCESS,
  }),

  deleteRelationshipFailure: () => ({
    type: Types.DELETE_FAILURE,
  }),

  // CREATE RELATIONSHIP
  createRelationshipRequest: (
    entity_id,
    name,
    cpf,
    email,
    sex,
    password,
    relationship_type
  ) => ({
    type: Types.CREATE_REQUEST,
    payload: {
      entity_id,
      name,
      cpf,
      email,
      sex,
      password,
      relationship_type,
    },
  }),

  createRelationshipSuccess: () => ({
    type: Types.CREATE_SUCCESS,
  }),

  createRelationshipFailure: () => ({
    type: Types.CREATE_FAILURE,
  }),
};
