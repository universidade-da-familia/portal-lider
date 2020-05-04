/**
 * Action Types
 */
export const Types = {
  REQUEST: 'SHIPPING_TAG_REQUEST',
  SUCCESS: 'SHIPPING_TAG_SUCCESS',
  FAILURE: 'SHIPPING_TAG_FAILURE',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  error: false,
  data: [],
};

export default function shippingTag(state = INITIAL_STATE, action) {
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
  shippingTagRequest: data => ({
    type: Types.REQUEST,
    payload: {
      data,
    },
  }),
  shippingTagSuccess: data => ({
    type: Types.SUCCESS,
    payload: {
      data,
    },
  }),
  shippingTagFailure: () => ({
    type: Types.FAILURE,
  }),
};
