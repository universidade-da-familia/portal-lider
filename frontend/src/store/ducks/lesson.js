/**
 * Action Types
 */
export const Types = {
  ALL_REQUEST: 'ALL_LESSON_REQUEST',
  ALL_SUCCESS: 'ALL_LESSON_SUCCESS',
  ALL_FAILURE: 'ALL_LESSON_FAILURE',

  REQUEST: 'LESSON_REQUEST',
  SUCCESS: 'LESSON_SUCCESS',
  FAILURE: 'LESSON_FAILURE',

  EDIT_REQUEST: 'EDIT_LESSON_REQUEST',
  EDIT_SUCCESS: 'EDIT_LESSON_SUCCESS',
  EDIT_FAILURE: 'EDIT_LESSON_FAILURE',

  ADD_REQUEST: 'ADD_LESSON_REQUEST',
  ADD_SUCCESS: 'ADD_LESSON_SUCCESS',
  ADD_FAILURE: 'ADD_LESSON_FAILURE',

  DELETE_REQUEST: 'DELETE_LESSON_REQUEST',
  DELETE_SUCCESS: 'DELETE_LESSON_SUCCESS',
  DELETE_FAILURE: 'DELETE_LESSON_FAILURE',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  error: false,
  allData: [],
  lessonData: null,
};

export default function lesson(state = INITIAL_STATE, action) {
  switch (action.type) {
    // CASE CARREGAR A TABELA DE TODOS OS EVENTOS
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

    // CASE CARREGA UM LIÇÃO SELECIONADO
    case Types.REQUEST:
      return { ...state, loading: true };
    case Types.SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        lessonData: action.payload.lessonData,
      };
    case Types.FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
      };

    // EDITAR UMA LIÇÃO
    case Types.EDIT_REQUEST:
      return { ...state, loading: true };
    case Types.EDIT_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
      };
    case Types.EDIT_FAILURE:
      return { ...state, error: true, loading: false };

    // ADICIONAR UMA LIÇÃO
    case Types.ADD_REQUEST:
      return { ...state, loading: true };
    case Types.ADD_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
      };
    case Types.ADD_FAILURE:
      return { ...state, error: true, loading: false };

    // DELETAR UMA LIÇÃO
    case Types.DELETE_REQUEST:
      return { ...state, loading: true };
    case Types.DELETE_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
      };
    case Types.DELETE_FAILURE:
      return { ...state, error: true, loading: false };

    default:
      return state;
  }
}

/**
 * Actions Creators
 */
export const Creators = {
  // CREATORS PARA TODOS OS EVENTOS
  allLessonRequest: () => ({
    type: Types.ALL_REQUEST,
  }),
  allLessonSuccess: allData => ({
    type: Types.ALL_SUCCESS,
    payload: {
      allData,
    },
  }),
  allLessonFailure: () => ({
    type: Types.ALL_FAILURE,
  }),

  // CREATORS UM LIÇÃO
  lessonRequest: id => ({
    type: Types.REQUEST,
    payload: {
      id,
    },
  }),
  lessonSuccess: lessonData => ({
    type: Types.SUCCESS,
    payload: {
      lessonData,
    },
  }),
  lessonFailure: () => ({
    type: Types.FAILURE,
  }),

  // EDITAR UM LIÇÃO
  editLessonRequest: (id, editData) => ({
    type: Types.EDIT_REQUEST,
    payload: {
      id,
      editData,
    },
  }),
  editLessonSuccess: () => ({
    type: Types.EDIT_SUCCESS,
  }),
  editLessonFailure: () => ({
    type: Types.EDIT_FAILURE,
  }),

  // ADICIONAR NOVA LIÇÃO
  addLessonRequest: data => ({
    type: Types.ADD_REQUEST,
    payload: {
      data,
    },
  }),
  addLessonSuccess: () => ({
    type: Types.ADD_SUCCESS,
  }),
  addLessonFailure: () => ({
    type: Types.ADD_FAILURE,
  }),

  // DELETAR LIÇÃO
  deleteLessonRequest: lesson_id => ({
    type: Types.DELETE_REQUEST,
    payload: {
      lesson_id,
    },
  }),

  deleteLessonSuccess: () => ({
    type: Types.DELETE_SUCCESS,
  }),

  deleteLessonFailure: () => ({
    type: Types.DELETE_FAILURE,
  }),
};
