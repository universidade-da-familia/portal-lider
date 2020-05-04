/**
 * Action Types
 *
 * GROUPS_REQUEST 3x
 *
 * GROUP_EDIT_REQUEST 3x
 *
 * GROUP_ADD_REQUEST 3x
 */
export const Types = {
  REQUEST: "GROUP_EDIT_REQUEST",
  SUCCESS: "GROUP_EDIT_SUCCESS",
  FAILURE: "GROUP_EDIT_FAILURE"
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  error: false
};

export default function groupEdit(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.REQUEST:
      return { ...state, loading: true };
    case Types.SUCCESS:
      return {
        ...state,
        error: false,
        loading: false
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
  groupEditRequest: id => ({
    type: Types.REQUEST,
    payload: {
      id
    }
  }),

  groupEditSuccess: () => ({
    type: Types.SUCCESS
  }),

  groupEditFailure: () => ({
    type: Types.FAILURE
  })
};
