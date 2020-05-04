import React from "react";
import FilterSearch from "../../containers/todo/todoFilterSearch";

class TodoSearch extends React.Component {
   render() {
      return (
         <div className="todo-search-box w-100 bg-white pt-4 px-2 pb-2">
            <div className="media">
               <span className="todo-app-sidebar-toggle ft-align-justify font-large-1 mr-2 d-xl-none" />
               <div className="media-body">
                  <FilterSearch />
               </div>
            </div>
         </div>
      );
   }
}

export default TodoSearch;
