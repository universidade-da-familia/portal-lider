import todoList from "./todoData";

const todo = (state = todoList, action) => {
   switch (action.type) {
      case "ADD_TODO":
         return [
            ...state,
            {
               id: action.id,
               full_name: action.full_name,
               image: action.image,
               task: action.task,
               start_date: action.start_date,
               due_date: action.due_date,
               project: action.project,
               priority: action.priority,
               tag: action.tag,
               comments: action.comments,
               completed: false,
               starred: false,
               deleted: false
            }
         ];
      
      case "UPDATE_TODO":         
         return state.map(todo => (todo.id === action.id ? { ...todo, [action.field]: action.value } : todo));
      
      case "TOGGLE_TODO":
         return state.map(todo => (todo.id === action.id ? { ...todo, completed: !todo.completed } : todo));

      case "TOGGLE_STARRED_TODO":
         return state.map(todo => (todo.id === action.id ? { ...todo, starred: !todo.starred } : todo));

      case "TOGGLE_PRIORITY_TODO":
         return state.map(todo => (todo.id === action.id ? { ...todo, priority: !todo.priority } : todo));

      case "DELETE_TODO":
         return state.map(todo => (todo.id === action.id ? { ...todo, deleted: !todo.deleted } : todo));

      default:
         return state;
   }
};

export default todo;
