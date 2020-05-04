/**
 * Action Types
 */
export const Types = {
  REQUEST: 'SITE_EVENT_REQUEST',
  SUCCESS: 'SITE_EVENT_SUCCESS',
  FAILURE: 'SITE_EVENT_FAILURE',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  error: false,
  data: null,
};

export default function siteEvent(state = INITIAL_STATE, action) {
  switch (action.type) {
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
    default:
      return state;
  }
}

/**
 * Actions Creators
 */
export const Creators = {
  siteEventRequest: id => ({
    type: Types.REQUEST,
    payload: {
      id,
    },
  }),

  siteEventSuccess: data => ({
    type: Types.SUCCESS,
    payload: {
      data,
    },
  }),

  siteEventFailure: () => ({
    type: Types.FAILURE,
  }),
};
