const EditTodo = (state = false, action) => {
   switch (action.type) {
      case "EDIT_TODO":
         return !state ? true : false;
      case "TODO_DETAILS":
         return state = false;
      default:
         return state;
   }
};

export default EditTodo;
