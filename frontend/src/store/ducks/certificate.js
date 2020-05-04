/**
 * Action Types
 */
export const Types = {
  ALL_REQUEST: 'ALL_CERTIFICATE_REQUEST',
  ALL_SUCCESS: 'ALL_CERTIFICATE_SUCCESS',
  ALL_FAILURE: 'ALL_CERTIFICATE_FAILURE',

  REQUEST: 'CERTIFICATE_REQUEST',
  SUCCESS: 'CERTIFICATE_SUCCESS',
  FAILURE: 'CERTIFICATE_FAILURE',

  EDIT_REQUEST: 'EDIT_CERTIFICATE_REQUEST',
  EDIT_SUCCESS: 'EDIT_CERTIFICATE_SUCCESS',
  EDIT_FAILURE: 'EDIT_CERTIFICATE_FAILURE',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  error: false,
  allData: [],
  certificateData: null,
};

export default function certificate(state = INITIAL_STATE, action) {
  switch (action.type) {
    // CASE CARREGAR TODOS OS CERTIFICADOS
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

    // CASE CARREGA UM CERTIFICADO SELECIONADO
    case Types.REQUEST:
      return { ...state, loading: true };
    case Types.SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        certificateData: action.payload.certificateData,
      };
    case Types.FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
      };

    // EDITAR UM CERTIFICADO
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
  // CREATORS PARA TODOS OS CERTIFICADOS
  allCertificateRequest: () => ({
    type: Types.ALL_REQUEST,
  }),
  allCertificateSuccess: allData => ({
    type: Types.ALL_SUCCESS,
    payload: {
      allData,
    },
  }),
  allCertificateFailure: () => ({
    type: Types.ALL_FAILURE,
  }),

  // CREATORS UM CERTIFICADO
  certificateRequest: id => ({
    type: Types.REQUEST,
    payload: {
      id,
    },
  }),
  certificateSuccess: certificateData => ({
    type: Types.SUCCESS,
    payload: {
      certificateData,
    },
  }),
  certificateFailure: () => ({
    type: Types.FAILURE,
  }),

  // EDITAR UM CERTIFICADO
  editCertificateRequest: (id, editData) => ({
    type: Types.EDIT_REQUEST,
    payload: {
      id,
      editData,
    },
  }),
  editCertificateSuccess: () => ({
    type: Types.EDIT_SUCCESS,
  }),
  editCertificateFailure: () => ({
    type: Types.EDIT_FAILURE,
  }),
};
