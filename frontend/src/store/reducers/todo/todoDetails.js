const TodoDetails = (state = '', action) => {
   switch (action.type) {
      case "TODO_DETAILS":
         return action.id;      
      default:
         return state;
   }
};

export default TodoDetails;
