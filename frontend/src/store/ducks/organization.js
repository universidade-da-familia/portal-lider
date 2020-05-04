/**
 * Action Types
 */
export const Types = {
  REQUEST: 'ORGANIZATION_REQUEST',
  SUCCESS: 'ORGANIZATION_SUCCESS',
  FAILURE: 'ORGANIZATION_FAILURE',

  EDIT_REQUEST: 'EDIT_ORGANIZATION_REQUEST',
  EDIT_SUCCESS: 'EDIT_ORGANIZATION_SUCCESS',
  EDIT_FAILURE: 'EDIT_ORGANIZATION_FAILURE',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  error: false,
  data: {
    orders: [],
  },
};

export default function organization(state = INITIAL_STATE, action) {
  switch (action.type) {
    // CASE CARREGAR UMA ORGANIZACAO
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
        data: null,
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

    default:
      return state;
  }
}

/**
 * Actions Creators
 */
export const Creators = {
  // CREATORS PARA CARREGAR ORGANIZACAO
  organizationRequest: id => ({
    type: Types.REQUEST,
    payload: {
      id,
    },
  }),

  organizationSuccess: data => ({
    type: Types.SUCCESS,
    payload: {
      data,
    },
  }),

  organizationFailure: () => ({
    type: Types.FAILURE,
  }),

  editOrganizationRequest: data => ({
    type: Types.EDIT_REQUEST,
    payload: {
      data,
    },
  }),

  editOrganizationSuccess: () => ({
    type: Types.EDIT_SUCCESS,
  }),

  editOrganizationFailure: () => ({
    type: Types.EDIT_FAILURE,
  }),
};
