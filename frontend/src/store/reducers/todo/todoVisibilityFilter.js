import { todoVisiblityFilter } from "../../actions/todo/todoActions";

const TodoVisiblityFilter = (state = todoVisiblityFilter.SHOW_ALL, action) => {
   switch (action.type) {
      case "SET_TODO_VISIBILITY_FILTER":
         return action.filter;
      default:
         return state;
   }
};

export default TodoVisiblityFilter;
