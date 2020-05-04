/**
 * Action Types
 */
export const Types = {
  ALL_REQUEST: 'ALL_MINISTERY_REQUEST',
  ALL_SUCCESS: 'ALL_MINISTERY_SUCCESS',
  ALL_FAILURE: 'ALL_MINISTERY_FAILURE',

  REQUEST: 'MINISTERY_REQUEST',
  SUCCESS: 'MINISTERY_SUCCESS',
  FAILURE: 'MINISTERY_FAILURE',

  EDIT_REQUEST: 'EDIT_MINISTERY_REQUEST',
  EDIT_SUCCESS: 'EDIT_MINISTERY_SUCCESS',
  EDIT_FAILURE: 'EDIT_MINISTERY_FAILURE',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  error: false,
  allData: [],
  ministeryData: null,
};

export default function ministery(state = INITIAL_STATE, action) {
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

    // CASE CARREGA UM MINISTERIO SELECIONADO
    case Types.REQUEST:
      return { ...state, loading: true };
    case Types.SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        ministeryData: action.payload.ministeryData,
      };
    case Types.FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
      };

    // EDITAR UM CLIENTE
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

    default:
      return state;
  }
}

/**
 * Actions Creators
 */
export const Creators = {
  // CREATORS PARA TODOS OS EVENTOS
  allMinisteryRequest: () => ({
    type: Types.ALL_REQUEST,
  }),
  allMinisterySuccess: allData => ({
    type: Types.ALL_SUCCESS,
    payload: {
      allData,
    },
  }),
  allMinisteryFailure: () => ({
    type: Types.ALL_FAILURE,
  }),

  // CREATORS UM MINISTERIO
  ministeryRequest: id => ({
    type: Types.REQUEST,
    payload: {
      id,
    },
  }),
  ministerySuccess: ministeryData => ({
    type: Types.SUCCESS,
    payload: {
      ministeryData,
    },
  }),
  ministeryFailure: () => ({
    type: Types.FAILURE,
  }),

  // EDITAR UM MINISTERIO
  editMinisteryRequest: (id, editData) => ({
    type: Types.EDIT_REQUEST,
    payload: {
      id,
      editData,
    },
  }),
  editMinisterySuccess: () => ({
    type: Types.EDIT_SUCCESS,
  }),
  editMinisteryFailure: () => ({
    type: Types.EDIT_FAILURE,
  }),
};
