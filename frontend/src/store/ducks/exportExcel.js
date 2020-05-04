/**
 * Action Types
 */
export const Types = {
  EVENT_REQUEST: 'EXPORT_EXCEL_EVENT_REQUEST',
  EVENT_SUCCESS: 'EXPORT_EXCEL_EVENT_SUCCESS',
  EVENT_FAILURE: 'EXPORT_EXCEL_EVENT_FAILURE',
  ENTITY_REQUEST: 'EXPORT_EXCEL_ENTITY_REQUEST',
  ENTITY_SUCCESS: 'EXPORT_EXCEL_ENTITY_SUCCESS',
  ENTITY_FAILURE: 'EXPORT_EXCEL_ENTITY_FAILURE',
  ORGANIZATION_REQUEST: 'EXPORT_EXCEL_ORGANIZATION_REQUEST',
  ORGANIZATION_SUCCESS: 'EXPORT_EXCEL_ORGANIZATION_SUCCESS',
  ORGANIZATION_FAILURE: 'EXPORT_EXCEL_ORGANIZATION_FAILURE',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  error: false,
  eventData: null,
  entityData: null,
  organizationData: null,
};

export default function exportExcel(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.EVENT_REQUEST:
      return { ...state, loading: true };
    case Types.EVENT_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        eventData: action.payload.data,
      };
    case Types.EVENT_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
      };

    case Types.ENTITY_REQUEST:
      return { ...state, loading: true };
    case Types.ENTITY_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        entityData: action.payload.data,
      };
    case Types.ENTITY_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
      };

    case Types.ORGANIZATION_REQUEST:
      return { ...state, loading: true };
    case Types.ORGANIZATION_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        organizationData: action.payload.data,
      };
    case Types.ORGANIZATION_FAILURE:
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
  exportExcelRequest: (lastPage, filterData) => ({
    type: Types.EVENT_REQUEST,
    payload: {
      lastPage,
      filterData,
    },
  }),
  exportExcelSuccess: data => ({
    type: Types.EVENT_SUCCESS,
    payload: {
      data,
    },
  }),
  exportExcelFailure: () => ({
    type: Types.EVENT_FAILURE,
  }),

  exportExcelEntityRequest: (lastPage, filterData) => ({
    type: Types.ENTITY_REQUEST,
    payload: {
      lastPage,
      filterData,
    },
  }),
  exportExcelEntitySuccess: data => ({
    type: Types.ENTITY_SUCCESS,
    payload: {
      data,
    },
  }),
  exportExcelEntityFailure: () => ({
    type: Types.ENTITY_FAILURE,
  }),

  exportExcelOrganizationRequest: (lastPage, filterData) => ({
    type: Types.ORGANIZATION_REQUEST,
    payload: {
      lastPage,
      filterData,
    },
  }),
  exportExcelOrganizationSuccess: data => ({
    type: Types.ORGANIZATION_SUCCESS,
    payload: {
      data,
    },
  }),
  exportExcelOrganizationFailure: () => ({
    type: Types.ORGANIZATION_FAILURE,
  }),
};
