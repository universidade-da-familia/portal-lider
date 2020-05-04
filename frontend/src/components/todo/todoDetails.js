import React, { Fragment } from "react";
import { Row, Col, Media, Button, Input } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import * as Icon from "react-feather";

const TodoDetails = ({ selectedTodo, toggleStarredTodo, togglePriorityTodo, onEditClick, editTodoFlag, onChange }) => (
   <Fragment>
      {selectedTodo ? (
         <div className="todo-app-content-detail">
            <Row>
               <Col className="">
                  <Icon.Star
                     size={20}
                     className="my-2 mx-1"
                     onClick={() => toggleStarredTodo(selectedTodo.id)}
                     style={{ color: selectedTodo.starred ? "#FFC107" : "#495057" }}
                  />
                  <Icon.AlertCircle
                     size={20}
                     className="my-2 mx-1"
                     onClick={() => togglePriorityTodo(selectedTodo.id)}
                     style={{ color: selectedTodo.priority ? "#FF586B" : "#495057" }}
                  />
               </Col>
               <Col className="text-right">
                  <Button className="btn-outline-success mr-1 mt-1" size="sm" onClick={onEditClick}>
                     {editTodoFlag ? <Icon.Check size={14} /> : <Icon.Edit2 size={14} />}
                  </Button>
               </Col>
            </Row>
            <PerfectScrollbar>
               <Row>
                  <Col>
                     {editTodoFlag ? (
                        <Input
                           type="text"
                           name="task"
                           id="task"
                           defaultValue={selectedTodo.task}
                           onChange={e => onChange(selectedTodo.id, "task", e.target.value)}
                        />
                     ) : (
                        <p className="lead">{selectedTodo.completed ? <s>{selectedTodo.task}</s> : selectedTodo.task}</p>
                     )}
                  </Col>
               </Row>
               <Row className="mt-1">
                  <Col>
                     <Row>
                        <Col sm="3">
                           <Media
                              object
                              src={selectedTodo.image}
                              alt="Generic placeholder image"
                              className="img-fluid rounded-circle width-25"
                           />
                        </Col>
                        <Col sm="9" className="text-truncate">
                           {editTodoFlag ? (
                              <Input
                                 type="text"
                                 className="w-80"
                                 name="full_name"
                                 id="full_name"
                                 defaultValue={selectedTodo.full_name}
                                 onChange={e => onChange(selectedTodo.id, "full_name", e.target.value)}
                              />
                           ) : (
                              selectedTodo.full_name
                           )}
                        </Col>
                     </Row>
                  </Col>
                  <Col>
                     <Row>
                        <Col sm="3">
                           <Icon.Calendar size={19} />
                        </Col>
                        <Col sm="9" className="text-truncate">
                           {editTodoFlag ? (
                              <Input
                                 type="text"
                                 className="w-80"
                                 name="due_date"
                                 id="due_date"
                                 defaultValue={selectedTodo.due_date}
                                 onChange={e => onChange(selectedTodo.id, "due_date", e.target.value)}
                              />
                           ) : (
                              selectedTodo.due_date
                           )}
                        </Col>
                     </Row>
                  </Col>
               </Row>
               <hr style={{ border: "1px solid #e6ecf5" }} />
               <Row className="mb-2">
                  <Col>
                     {editTodoFlag ? (
                        <Input
                           type="textarea"
                           rows="4"
                           name="comments"
                           id="comments"
                           defaultValue={selectedTodo.comments}
                           onChange={e => onChange(selectedTodo.id, "comments", e.target.value)}
                        />
                     ) : (
                        selectedTodo.comments
                     )}
                  </Col>
               </Row>
               <Row className="mt-1">
                  <Col sm="1">
                     <Icon.Briefcase size={20} />
                  </Col>
                  <Col sm="5">
                     {editTodoFlag ? (
                        <Input
                           type="select"
                           name="project"
                           id="project"
                           className="w-80"
                           defaultValue={selectedTodo.project}
                           onChange={e => onChange(selectedTodo.id, "project", e.target.value)}
                        >
                           <option value="Project A">Project A</option>
                           <option value="Project B">Project B</option>
                        </Input>
                     ) : (
                        selectedTodo.project
                     )}
                  </Col>
                  <Col sm="1">
                     <Icon.Tag size={20} />
                  </Col>
                  <Col sm="5">
                     {editTodoFlag ? (
                        <Input
                           type="select"
                           name="tag"
                           id="tag"
                           className="w-80"
                           defaultValue={selectedTodo.tag}
                           onChange={e => onChange(selectedTodo.id, "tag", e.target.value)}
                        >
                           <option value="uiux">UI/UX</option>
                           <option value="frontend">Frontend</option>
                           <option value="backend">Backend</option>
                        </Input>
                     ) : (
                        selectedTodo.tag
                     )}
                  </Col>
               </Row>
               <hr style={{ border: "1px solid #e6ecf5" }} />
               <Row>
                  <Col>
                     <p className="font-small-2 mb-0">
                        <span className="text-bold-400">{selectedTodo.full_name}</span> created task on{" "}
                        {selectedTodo.start_date}.
                     </p>
                     <p className="font-small-2 mb-0">
                        <span className="text-bold-400">{selectedTodo.full_name}</span> added to {selectedTodo.project}.
                     </p>
                     <p className="font-small-2 mb-0">
                        <span className="text-bold-400">{selectedTodo.full_name}</span> added to {selectedTodo.tag}.
                     </p>
                  </Col>
               </Row>
            </PerfectScrollbar>
         </div>
      ) : (
         <div className="row h-100">
            <div className="col-sm-12 my-auto">
               <div className="text-center">
                  <Icon.CheckSquare size={84} color="#ccc" className="pb-3" />
                  <h4>Please select a todo to show details.</h4>
               </div>
            </div>
         </div>
      )}
   </Fragment>
);

TodoDetails.prototype = {
   selectedTodo: PropTypes.arrayOf(
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
   starred: PropTypes.bool.isRequired,
   priority: PropTypes.bool.isRequired,
   toggleStarredTodo: PropTypes.func.isRequired,
   togglePriorityTodo: PropTypes.func.isRequired
};
export default TodoDetails;
