import React from "react";
import PropTypes from "prop-types";
import Todo from "./todo";
import PerfectScrollbar from "react-perfect-scrollbar";

const TodoList = ({ todo, active, toggleTodo, toggleStarredTodo, togglePriorityTodo, deleteTodo, todoDetails }) => (
   <div className="todo-app-list">
      <PerfectScrollbar>
         <div id="users-list">
            <ul className="list-group">
               {todo.map(todo => (
                  <Todo
                     key={todo.id}
                     active={active}
                     {...todo}
                     onCheckboxChange={() => toggleTodo(todo.id)}
                     onStarredClick={() => toggleStarredTodo(todo.id)}
                     onPriorityClick={() => togglePriorityTodo(todo.id)}
                     onDeleteClick={() => deleteTodo(todo.id)}
                     onTodoClick={() => todoDetails(todo.id)}
                  />
               ))}
            </ul>
         </div>
      </PerfectScrollbar>
   </div>
);

TodoList.prototype = {
   todo: PropTypes.arrayOf(
      PropTypes.shape({
         id: PropTypes.number.isRequired,
         full_name: PropTypes.string.isRequired,
         image: PropTypes.string,
         task: PropTypes.string,
         start_date: PropTypes.number.isRequired,
         due_date: PropTypes.number.isRequired,
         project: PropTypes.string,
         priority: PropTypes.bool.isRequired,
         tag: PropTypes.bool.isRequired,
         comments: PropTypes.string,
         completed: PropTypes.bool.isRequired,
         starred: PropTypes.bool.isRequired,
         deleted: PropTypes.bool.isRequired
      }).isRequired
   ).isRequired,
   toggleStarredTodo: PropTypes.func.isRequired,
   deleteTodo: PropTypes.func.isRequired,
   todoDetails: PropTypes.func.isRequired
};
export default TodoList;
