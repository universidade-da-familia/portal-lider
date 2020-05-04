/**
 * Action Types
 */
export const Types = {
  SHIPPING_REQUEST: 'SHIPPING_OPTIONS_REQUEST',
  SHIPPING_SUCCESS: 'SHIPPING_OPTIONS_SUCCESS',
  SHIPPING_FAILURE: 'SHIPPING_OPTIONS_FAILURE',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  error: false,
  data: null,
};

export default function shipping(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SHIPPING_REQUEST:
      return { ...state, loading: true };
    case Types.SHIPPING_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        data: action.payload.data,
      };
    case Types.SHIPPING_FAILURE:
      return {
        ...state,
        data: null,
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
  shippingOptionsRequest: (cep, products) => ({
    type: Types.SHIPPING_REQUEST,
    payload: {
      cep,
      products,
    },
  }),
  shippingOptionsSuccess: data => ({
    type: Types.SHIPPING_SUCCESS,
    payload: {
      data,
    },
  }),
  shippingOptionsFailure: () => ({
    type: Types.SHIPPING_FAILURE,
  }),
};
