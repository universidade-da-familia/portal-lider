export const Types = {
  ADD_REQUEST: 'ADD_ORDER_REQUEST',
  ADD_SUCCESS: 'ADD_ORDER_SUCCESS',
  ADD_FAILURE: 'ADD_ORDER_FAILURE',

  ALL_REQUEST: 'ALL_ORDER_REQUEST',
  ALL_SUCCESS: 'ALL_ORDER_SUCCESS',
  ALL_FAILURE: 'ALL_ORDER_FAILURE',

  REQUEST: 'ORDER_REQUEST',
  SUCCESS: 'ORDER_SUCCESS',
  FAILURE: 'ORDER_FAILURE',

  EDIT_REQUEST: 'ORDER_EDIT_REQUEST',
  EDIT_SUCCESS: 'ORDER_EDIT_SUCCESS',
  EDIT_FAILURE: 'ORDER_EDIT_FAILURE',

  DELETE_REQUEST: 'ORDER_DELETE_REQUEST',
  DELETE_SUCCESS: 'ORDER_DELETE_SUCCESS',
  DELETE_FAILURE: 'ORDER_DELETE_FAILURE',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  error: false,
  // Listagem de todos os pedidos
  allData: {},
  // Dados de um pedido
  data: null,
};

export default function order(state = INITIAL_STATE, action) {
  switch (action.type) {
    // CASE CARREGAR A TABELA DE TODOS OS PEDIDOS
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

    // CASE CARREGAR UM PEDIDO PELO ID
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

    // CASE EDITAR PEDIDO
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

    // CASE ADICONAR PEDIDO
    case Types.ADD_REQUEST:
      return { ...state, loading: true };
    case Types.ADD_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
      };
    case Types.ADD_FAILURE:
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
  // CREATORS PARA TODOS OS PEDIDOS
  allOrderRequest: () => ({
    type: Types.ALL_REQUEST,
  }),
  allOrderSuccess: allData => ({
    type: Types.ALL_SUCCESS,
    payload: {
      allData,
    },
  }),
  allOrderFailure: () => ({
    type: Types.ALL_FAILURE,
  }),

  // CREATORS PARA CARREGAR UM PEDIDO PELO ID
  orderRequest: id => ({
    type: Types.REQUEST,
    payload: {
      id,
    },
  }),
  orderSuccess: data => ({
    type: Types.SUCCESS,
    payload: {
      data,
    },
  }),
  orderFailure: () => ({
    type: Types.FAILURE,
  }),

  // CREATORS PARA EDITAR UM PEDIDO
  orderEditRequest: id => ({
    type: Types.EDIT_REQUEST,
    payload: {
      id,
    },
  }),
  orderEditSuccess: () => ({
    type: Types.EDIT_SUCCESS,
  }),
  orderEditFailure: () => ({
    type: Types.EDIT_FAILURE,
  }),

  addOrderRequest: data => ({
    type: Types.ADD_REQUEST,
    payload: {
      data,
    },
  }),

  addOrderSuccess: () => ({
    type: Types.ADD_SUCCESS,
  }),

  addOrderFailure: () => ({
    type: Types.ADD_FAILURE,
  }),

  // DELETE ORDER
  deleteOrderRequest: order_id => ({
    type: Types.DELETE_REQUEST,
    payload: {
      order_id,
    },
  }),

  deleteOrderSuccess: () => ({
    type: Types.DELETE_SUCCESS,
  }),

  deleteOrderFailure: () => ({
    type: Types.DELETE_FAILURE,
  }),
};
