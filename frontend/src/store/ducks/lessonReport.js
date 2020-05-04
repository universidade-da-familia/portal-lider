/**
 * Action Types
 */
export const Types = {
  REQUEST: 'LESSON_REPORT_REQUEST',
  SUCCESS: 'LESSON_REPORT_SUCCESS',
  FAILURE: 'LESSON_REPORT_FAILURE',
  EDIT_REQUEST: 'EDIT_LESSON_REPORT_REQUEST',
  EDIT_SUCCESS: 'EDIT_LESSON_REPORT_SUCCESS',
  EDIT_FAILURE: 'EDIT_LESSON_REPORT_FAILURE',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  error: false,
  allData: [],
  data: {
    participants: [],
  },
};

export default function lessonReport(state = INITIAL_STATE, action) {
  switch (action.type) {
    // REQUISIÇÃO DE UMA LIÇÃO
    case Types.REQUEST:
      return { ...state, loading: true, error: false };
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

    case Types.EDIT_REQUEST:
      return { ...state, loading: true, error: false };
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

    default:
      return state;
  }
}

/**
 * Actions Creators
 */
export const Creators = {
  // REQUISIÇÃO DE UMA LIÇÃO
  lessonReportRequest: id => ({
    type: Types.REQUEST,
    payload: {
      id,
    },
  }),
  lessonReportSuccess: data => ({
    type: Types.SUCCESS,
    payload: {
      data,
    },
  }),
  lessonReportFailure: () => ({
    type: Types.FAILURE,
  }),

  editLessonReportRequest: (eventId, data) => ({
    type: Types.EDIT_REQUEST,
    payload: {
      eventId,
      data,
    },
  }),
  editLessonReportSuccess: () => ({
    type: Types.EDIT_SUCCESS,
  }),
  editLessonReportFailure: () => ({
    type: Types.EDIT_FAILURE,
  }),
};
