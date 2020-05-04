export const Types = {
  ADD_EVENT: "calender/ADD_EVENT"
};

const INITIAL_STATE = {
  startDate: new Date(),
  endDate: new Date(),
  eventTitle: "",
  events: []
};

export default function calenderReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_EVENT:
      return {
        ...state,
        events: [...state.events, ...action.payload.events]
      };
    default:
      return state;
  }
}

export const Creators = {
  handleAddEvent: ({ start, end, eventTitle }, events) => ({
    type: Types.ADD_EVENT,
    payload: {
      start,
      end,
      eventTitle,
      events
    }
  })
};
