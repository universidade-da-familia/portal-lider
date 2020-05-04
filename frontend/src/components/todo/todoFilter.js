import React from "react";
import { Modal, ModalHeader } from "reactstrap";
import FilterLink from "../../containers/todo/todoFilterLink";
import { todoVisiblityFilter } from "../../redux/actions/todo/todoActions";
import AddTodo from "../../containers/todo/addTodo";
import PerfectScrollbar from "react-perfect-scrollbar";
import * as Icon from "react-feather";

class TodoFilter extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         modal: false
      };

      this.toggle = this.toggle.bind(this);
   }

   toggle() {
      this.setState({
         modal: !this.state.modal
      });
   }
   render() {
      return (
         <div className="todo-app-sidebar float-left d-none d-xl-block">
            <PerfectScrollbar>
               <div className="todo-app-sidebar-content">
                  <div className="todo-app-menu">
                     <div className="form-group form-group-compose text-center">
                        <button
                           type="button"
                           className="btn btn-raised btn-danger btn-block my-2 shadow-z-2"
                           onClick={this.toggle}
                        >
                           <Icon.Plus size={18} className="mr-1" /> Add Task
                        </button>
                     </div>
                     <ul className="list-group list-group-messages">
                     <FilterLink filter={todoVisiblityFilter.SHOW_ALL}>
                        <Icon.Users size={18} className="mr-1" /> All
                     </FilterLink>
                     </ul>
                     <h6 className="text-muted font-small-3 text-bold-600 text-uppercase my-3">Projects</h6>
                     <ul className="list-group list-group-messages">
                        <FilterLink filter={todoVisiblityFilter.PROJECT_A_TODO}>
                           <Icon.Briefcase size={18} className="mr-1" /> Project A
                        </FilterLink>
                        <FilterLink filter={todoVisiblityFilter.PROJECT_B_TODO}>
                           <Icon.Briefcase size={18} className="mr-1" /> Project B
                        </FilterLink>
                     </ul>
                     <h6 className="text-muted font-small-3 text-bold-600 text-uppercase my-3">Filters</h6>
                     <ul className="list-group list-group-messages">
                        <FilterLink filter={todoVisiblityFilter.STARRED_TODO}>
                           <Icon.Star size={18} className="mr-1" /> Starred
                        </FilterLink>
                        <FilterLink filter={todoVisiblityFilter.PRIORITY_TODO}>
                           <Icon.AlertCircle size={18} className="mr-1" /> Priority
                        </FilterLink>
                        <FilterLink filter={todoVisiblityFilter.COMPLETED_TODO}>
                           <Icon.Check size={18} className="mr-1" /> Done
                        </FilterLink>
                     </ul>
                     <h6 className="text-muted font-small-3 text-bold-600 text-uppercase my-3">Tags</h6>
                     <ul className="list-group list-group-messages">
                        <FilterLink filter={todoVisiblityFilter.UIUX_TODO} departmentValue="UIUX">
                           <Icon.Tag size={18} className="mr-1 info" />
                           UI/UX
                        </FilterLink>
                        <FilterLink filter={todoVisiblityFilter.FRONTEND_TODO} departmentValue="Frontend">
                           <Icon.Tag size={18} className="mr-1 warning" />
                           Frontend
                        </FilterLink>
                        <FilterLink filter={todoVisiblityFilter.BACKEND_TODO} departmentValue="Backend">
                           <Icon.Tag size={18} className="mr-1 success" />
                           Backend
                        </FilterLink>
                     </ul>
                  </div>
               </div>
               <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} size="md">
                  <ModalHeader toggle={this.toggle}>Add Task</ModalHeader>
                  <AddTodo />
               </Modal>
            </PerfectScrollbar>
         </div>
      );
   }
}

export default TodoFilter;
