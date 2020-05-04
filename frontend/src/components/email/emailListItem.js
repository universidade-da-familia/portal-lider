import React from "react";
import { Label, Input, Row, Col } from "reactstrap";
import { Star, Pocket } from "react-feather";
import PropTypes from 'prop-types';

const Email = ({ id, active, onClick, onChange, onStar, onImportant, from, emailExcerpt, time, label, starred, important }) => (
    <li className={"list-group-item list-group-item-action no-border " + ((active === id) ? "bg-grey bg-lighten-4" : "")}>
      <Row className="email-list-group-item">
         <Col xs={1}>
            <Label check>
               <Input type="checkbox" onChange={onChange} />{" "}
            </Label>
         </Col>
         <Col xs={1}>
            <Star size={20} color={starred ? "#fdb200" : "#212529"} onClick={onStar} />
            <Pocket size={20} color={important ? "#fdb200" : "#212529"} onClick={onImportant} />
         </Col>
         <Col xs={9} onClick={onClick}>
            <h6 className=" text-bold-500 mb-1 mt-1">{from}</h6>
            <div>
               <p className="list-group-item-text text-truncate w-100">{emailExcerpt}</p>
               <span className="font-small-2 text-muted float-left">{time}</span>
               <span className="float-right primary">
                  <span
                     className={
                        "badge " +
                        (label === "Technology" ? "badge-warning" : "") +
                        (label === "Finance" ? "badge-success" : "") +
                        (label === "Health" ? "badge-danger" : "") +
                        " mr-1"
                     }
                  >
                     {label}
                  </span>
               </span>
            </div>
         </Col>
      </Row>
   </li>
);

Email.propTypes = {
    onClick: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onStar: PropTypes.func.isRequired,
    onImportant: PropTypes.func.isRequired,
    from: PropTypes.string.isRequired,
    emailExcerpt: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    starred: PropTypes.bool.isRequired,
    important: PropTypes.bool.isRequired
}

export default Email;
