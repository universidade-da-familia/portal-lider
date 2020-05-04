// import internal(own) modules

const initState = {
   startDate: new Date(),
   endDate: new Date(),
   eventTitle: "",
   events: []
};

const calenderReducer = (state = initState, { type, payload }) => {
   switch (type) {
      case 'ADD_EVENT':
         return {
            ...initState,
            events: [...initState.events, ...payload.events]
         };
      default:
         return initState;
   }
};

export default calenderReducer;
