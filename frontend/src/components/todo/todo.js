import React from "react";
import { Label, Row, Col, CustomInput } from "reactstrap";
import PropTypes from "prop-types";
import { Star, AlertCircle } from "react-feather";

const Todo = ({
   onCheckboxChange,
   onTodoClick,
   onStarredClick,
   onPriorityClick,
   id,
   task,
   completed,
   image,
   project,
   starred,
   priority,
   tag,
   active
}) => (   
   <li className={"list-group-item list-group-item-action no-border " + ((active === id) ? "bg-grey bg-lighten-4" : "")}>
      <Row className="todo-list-group-item">
         <Col xl={1} xs={1}>
            <Label check>
               <CustomInput type="checkbox" onChange={onCheckboxChange} id={"exampleCustomCheckbox-"+id} defaultChecked={completed} />
            </Label>
         </Col>
         <Col xl={1} xs={1}>
            <Star size={20} onClick={onStarredClick} style={{ color: starred ? "#FFC107" : "#495057" }} />            
            <AlertCircle size={20} onClick={onPriorityClick} style={{ color: priority ? "#FF586B" : "#495057" }} />
         </Col>
         <Col xl={10} xs={9} onClick={onTodoClick}>
            <p className="mb-0 text-truncate">
               {completed ? <s>{task}</s> : task}
               <img src={image} className="rounded-circle width-25 float-right d-none d-xl-block" alt={image} />
            </p>
            <p className="mb-0 font-small-3">
               {project}{" "}
               <span
                  className={
                     "float-right badge " +
                     (tag === "uiux" ? "badge-info" : "") +
                     (tag === "frontend" ? "badge-warning" : "") +
                     (tag === "backend" ? "badge-success" : "") +
                     " mr-1"
                  }
               >
                  {tag}
               </span>
            </p>
         </Col>
      </Row>
   </li>
);

Todo.propTypes = {
   task: PropTypes.string.isRequired,
   image: PropTypes.string.isRequired,
   project: PropTypes.string.isRequired,
   starred: PropTypes.bool.isRequired,
   onCheckboxChange: PropTypes.func.isRequired,
   onStarredClick: PropTypes.func.isRequired,
   onPriorityClick: PropTypes.func.isRequired,
   onTodoClick: PropTypes.func.isRequired
};

export default Todo;
