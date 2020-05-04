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
  REQUEST: 'ADMIN_ENTITY_REQUEST',
  SUCCESS: 'ADMIN_ENTITY_SUCCESS',
  FAILURE: 'ADMIN_ENTITY_FAILURE',

  CPF_REQUEST: 'ENTITY_CPF_REQUEST',
  CPF_SUCCESS: 'ENTITY_CPF_SUCCESS',
  CPF_FAILURE: 'ENTITY_CPF_FAILURE',

  ALL_CONSULT_REQUEST: 'ALL_CONSULT_ENTITIES_REQUEST',
  ALL_CONSULT_SUCCESS: 'ALL_CONSULT_ENTITIES_SUCCESS',
  ALL_CONSULT_FAILURE: 'ALL_CONSULT_ENTITIES_FAILURE',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  error: false,
  notFound: false,
  data: {
    orders: [],
  },
  cpfData: null,
  allEntities: {
    data: [],
  },
};

export default function entity(state = INITIAL_STATE, action) {
  switch (action.type) {
    // CASE CARREGAR DADOS DE UMA ENTIDADE
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

    // CASE CARREGAR DADOS DE UMA ENTIDADE POR CPF
    case Types.CPF_REQUEST:
      return { ...state, loading: true };
    case Types.CPF_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        cpfData: action.payload.cpfData,
        notFound: false,
      };
    case Types.CPF_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
        notFound: action.payload.notFound,
      };

    // CASE CARREGAR TODAS AS ENTIDADES PARA CONSULTA
    case Types.ALL_CONSULT_REQUEST:
      return { ...state, loading: true };
    case Types.ALL_CONSULT_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        allEntities: action.payload.allEntities,
      };
    case Types.ALL_CONSULT_FAILURE:
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
  // CREATORS PARA CARREGAR UMA ENTIDADE
  entityRequest: id => ({
    type: Types.REQUEST,
    payload: {
      id,
    },
  }),
  entitySuccess: data => ({
    type: Types.SUCCESS,
    payload: {
      data,
    },
  }),
  entityFailure: () => ({
    type: Types.FAILURE,
  }),

  // CREATORS PARA CARREGAR UMA ENTIDADE POR CPF
  entityCpfRequest: (cpf, profile_id) => ({
    type: Types.CPF_REQUEST,
    payload: {
      cpf,
      profile_id,
    },
  }),
  entityCpfSuccess: cpfData => ({
    type: Types.CPF_SUCCESS,
    payload: {
      cpfData,
    },
  }),
  entityCpfFailure: notFound => ({
    type: Types.CPF_FAILURE,
    payload: {
      notFound,
    },
  }),

  // CREATORS PARA TODAS AS ENTIDADES PARA CONSULTA
  allConsultEntitiesRequest: (page, filterData) => ({
    type: Types.ALL_CONSULT_REQUEST,
    payload: {
      page,
      filterData,
    },
  }),
  allConsultEntitiesSuccess: allEntities => ({
    type: Types.ALL_CONSULT_SUCCESS,
    payload: {
      allEntities,
    },
  }),
  allConsultEntitiesFailure: () => ({
    type: Types.ALL_CONSULT_FAILURE,
  }),
};
