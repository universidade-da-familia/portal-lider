import { combineReducers } from "redux";
import todo from "./todo";
import todoDetails from "./todoDetails";
import todoVisibilityFilter from "./todoVisibilityFilter";
import todoSearch from "./todoSearch";
import editTodo from "./editTodo";

export default combineReducers({
   todo,
   todoDetails,
   todoVisibilityFilter,
   todoSearch,
   editTodo
});
