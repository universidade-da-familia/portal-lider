// import external modules
import React, { Fragment } from "react";
import {
   Badge,
   UncontrolledDropdown,
   DropdownToggle,
   DropdownItem,
   DropdownMenu
} from "reactstrap";

// Styling
import "../../assets/scss/components/dropdown/dropdown.scss";

const Dropdown = props => (
   <Fragment>
      <UncontrolledDropdown setActiveFromChild>
         <DropdownToggle tag="a" className="nav-link text-muted p-0" caret>
            {props.icon}
            {props.withBadge ? (
               <Badge color="danger" pill>
                  {props.badgeNumber}
               </Badge>
            ) : null}
         </DropdownToggle>
         <DropdownMenu>
            <DropdownItem>Header</DropdownItem>
            <DropdownItem>Another Action</DropdownItem>
         </DropdownMenu>
      </UncontrolledDropdown>
   </Fragment>
);

export default Dropdown;
