/**
 * Action Types
 */
export const Types = {
  REQUEST: 'AVATAR_REQUEST',
  SUCCESS: 'AVATAR_SUCCESS',
  FAILURE: 'AVATAR_FAILURE',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  error: false,
};

export default function avatar(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.REQUEST:
      return { ...state, loading: true };
    case Types.SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
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
  avatarRequest: (file, name, size, type, entity_id, user_type) => ({
    type: Types.REQUEST,
    payload: {
      file,
      name,
      size,
      type,
      entity_id,
      user_type,
    },
  }),

  avatarSuccess: () => ({
    type: Types.SUCCESS,
  }),

  avatarFailure: () => ({
    type: Types.FAILURE,
  }),
};
