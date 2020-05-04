/**
 * Action Types
 */
export const Types = {
  REQUEST: "SEARCH_CHURCH_REQUEST",
  SUCCESS: "SEARCH_CHURCH_SUCCESS",
  FAILURE: "SEARCH_CHURCH_FAILURE"
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  error: false,
  data: {}
};

export default function searchChurch(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.REQUEST:
      return { ...state, loading: true, error: false };
    case Types.SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        data: action.payload.data
      };
    case Types.FAILURE:
      return {
        ...state,
        error: true,
        loading: false
      };
    default:
      return state;
  }
}

/**
 * Actions Creators
 */
export const Creators = {
  searchChurchRequest: (church_uf, church_city, church_name) => ({
    type: Types.REQUEST,
    payload: {
      church_uf,
      church_city,
      church_name
    }
  }),

  searchChurchSuccess: data => ({
    type: Types.SUCCESS,
    payload: {
      data
    }
  }),

  searchChurchFailure: () => ({
    type: Types.FAILURE
  })
};
