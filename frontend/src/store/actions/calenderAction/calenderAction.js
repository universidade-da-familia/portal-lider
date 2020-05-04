const handleAddEvent = ({ start, end, eventTitle }, events) => {
   return {
      type: 'ADD_EVENT',
      payload: { start, end, eventTitle, events }
   };
};

export { handleAddEvent };
