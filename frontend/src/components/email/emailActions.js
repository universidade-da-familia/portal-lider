import React from "react";
import { Row, Col, FormGroup, Label, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Trash, Folder, Tag } from "react-feather";
import { Link } from "react-router-dom";

class EmailActions extends React.Component {
   state = {
      folderDpOpen: false,
      labelDpOpen: false
   };

   folderDptoggle = () => {
      this.setState(prevState => ({
         folderDpOpen: !prevState.folderDpOpen
      }));
   };

   labelDptoggle = () => {
      this.setState(prevState => ({
         labelDpOpen: !prevState.labelDpOpen
      }));
   };
   render() {
      return (
         <div>
            <Row>
               <Col xs="2">
                  <FormGroup check>
                     <Label check>
                        <Input type="checkbox" />{" "}
                     </Label>
                  </FormGroup>
               </Col>
               <Col xs="8">
                  <Link to="/email" className="float-left email-action-icon">
                     <Trash size={18} color="#212529" onClick={() => this.props.trashEmail(this.props.id)} />
                  </Link>
                  <Dropdown isOpen={this.state.folderDpOpen} toggle={this.folderDptoggle} className="float-left email-action-icon">
                     <DropdownToggle className="bg-transparent border-0">
                        <Folder size={18} color="#212529" />
                     </DropdownToggle>
                     <DropdownMenu>
                        <DropdownItem onClick={e => this.props.assignFolder(this.props.id, "inbox")}>Inbox</DropdownItem>
                        <DropdownItem onClick={e => this.props.assignFolder(this.props.id, "sent")}>Sent</DropdownItem>
                        <DropdownItem onClick={e => this.props.assignFolder(this.props.id, "draft")}>Draft</DropdownItem>
                        <DropdownItem onClick={e => this.props.assignFolder(this.props.id, "spam")}>Spam</DropdownItem>
                        <DropdownItem onClick={e => this.props.assignFolder(this.props.id, "trash")}>Trash</DropdownItem>
                     </DropdownMenu>
                  </Dropdown>
                  <Dropdown isOpen={this.state.labelDpOpen} toggle={this.labelDptoggle} className="float-left email-action-icon">
                     <DropdownToggle className="bg-transparent border-0">
                        <Tag size={18} color="#212529" />
                     </DropdownToggle>
                     <DropdownMenu>
                        <DropdownItem onClick={e => this.props.assignLabel(this.props.id, "Technology")}>
                           Technology
                        </DropdownItem>
                        <DropdownItem onClick={e => this.props.assignLabel(this.props.id, "Finance")}>Finance</DropdownItem>
                        <DropdownItem onClick={e => this.props.assignLabel(this.props.id, "Health")}>Health</DropdownItem>
                     </DropdownMenu>
                  </Dropdown>
               </Col>
            </Row>
         </div>
      );
   }
}

export default EmailActions;
