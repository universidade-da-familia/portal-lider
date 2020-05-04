/**
 * Action Types
 */
export const Types = {
  REQUEST: 'ADDRESS_REQUEST',
  SUCCESS: 'ADDRESS_SUCCESS',
  FAILURE: 'ADDRESS_FAILURE',
  DELETE_REQUEST: 'DELETE_ADDRESS_REQUEST',
  DELETE_SUCCESS: 'DELETE_ADDRESS_SUCCESS',
  DELETE_FAILURE: 'DELETE_ADDRESS_FAILURE',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  error: false,
};

export default function address(state = INITIAL_STATE, action) {
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

    // DELETANDO ENDEREÇO
    case Types.DELETE_REQUEST:
      return { ...state, loading: true };
    case Types.DELETE_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
      };
    case Types.DELETE_FAILURE:
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
  addressRequest: (netsuite_id, user_type, addressesPost, addressesPut) => ({
    type: Types.REQUEST,
    payload: {
      netsuite_id,
      user_type,
      addressesPost,
      addressesPut,
    },
  }),
  addressSuccess: () => ({
    type: Types.SUCCESS,
  }),
  addressFailure: () => ({
    type: Types.FAILURE,
  }),

  // DELETANDO
  deleteAddressRequest: (id, index, netsuite_id) => ({
    type: Types.DELETE_REQUEST,
    payload: {
      id,
      index,
      netsuite_id,
    },
  }),
  deleteAddressSuccess: () => ({
    type: Types.DELETE_SUCCESS,
  }),
  deleteAddressFailure: () => ({
    type: Types.DELETE_FAILURE,
  }),
};
