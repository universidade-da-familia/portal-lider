import React from "react";
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter,Form, FormGroup, Label, Input } from 'reactstrap';
import { Mail, Inbox, Send,  File, Star, Trash, AlertCircle, Pocket, Tag } from "react-feather";
import { Editor } from "react-draft-wysiwyg";
import FilterEmail from '../../containers/email/filterEmails';
import { VisibilityFilters } from '../../redux/actions/email/emailActions';
import PerfectScrollbar from "react-perfect-scrollbar";

import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../assets/scss/views/components/extra/editor.scss";

class EmailSidebar extends React.Component {

  state = {
    composeModal: false
  };

  toggle = () => {
    this.setState({
      composeModal: !this.state.composeModal
    });
  }

  render() {
    return (
      <div className="email-app-sidebar float-left d-none d-xl-block">
        <PerfectScrollbar>
          <div className="email-app-sidebar-content">
              <div className="email-app-menu">
                <div className="form-group form-group-compose text-center">
                  <Button className="my-2 btn-raised shadow-z-2" color="danger" onClick={this.toggle} block> <Mail size={18} color="#FFFFFF" className="mr-1" /> Compose</Button>
                  <Modal isOpen={this.state.composeModal} toggle={this.toggle} size="lg">
                    <ModalHeader toggle={this.toggle}>Compose New Message</ModalHeader>
                    <ModalBody>
                      <Form>
                        <div className="form-body">
                            <Row>
                              <Col md="6" sm="12">
                                  <FormGroup>
                                    <Label for="to">To</Label>
                                    <Input type="text" id="to" name="to" />
                                  </FormGroup>
                              </Col>
                              <Col md="6" sm="12">
                                  <FormGroup>
                                    <Label for="cc">CC</Label>
                                    <Input type="text" id="cc" name="cc" />
                                  </FormGroup>
                              </Col>
                              <Col sm="12">
                                  <FormGroup>
                                    <Label for="subject">Subject</Label>
                                    <Input type="text" id="subject" name="subject" />
                                  </FormGroup>
                              </Col>
                              <Col sm="12">
                                <Editor editorClassName="demo-editor" />
                              </Col>
                            </Row>

                            <FormGroup>
                              <Label>Attachment</Label>
                              <Input type="file" className="form-control-file" id="projectinput8"/>
                            </FormGroup>
                        </div>
                      </Form>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={this.toggle}>Send</Button>{' '}
                      <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                  </Modal>
                </div>
                <div className="list-group list-group-messages">
                  <h6 className="text-muted font-small-3 text-bold-600 text-uppercase my-3">Folders</h6>
                  <FilterEmail filter={VisibilityFilters.SHOW_INBOX}>
                    <Inbox className="mr-2" size={18} color="#212529" /> Inbox
                  </FilterEmail>
                  <FilterEmail filter={VisibilityFilters.SHOW_SENT}>
                    <Send className="mr-2" size={18} color="#212529" /> Sent
                  </FilterEmail>
                  <FilterEmail filter={VisibilityFilters.SHOW_DRAFTS}>
                    <File className="mr-2" size={18} color="#212529" />Drafts
                  </FilterEmail>
                  <FilterEmail filter={VisibilityFilters.SHOW_SPAM}>
                    <AlertCircle className="mr-2" size={18} color="#212529" />Spam
                  </FilterEmail>
                  <FilterEmail filter={VisibilityFilters.SHOW_TRASH}>
                    <Trash className="mr-2" size={18} color="#212529" />Trash
                  </FilterEmail>

                  <h6 className="text-muted font-small-3 text-bold-600 text-uppercase my-3">Filters</h6>
                  <FilterEmail filter={VisibilityFilters.SHOW_STARRED}>
                    <Star className="mr-2" size={18} color="#212529" />Starred
                  </FilterEmail>
                  <FilterEmail filter={VisibilityFilters.SHOW_IMPORTANT}>
                    <Pocket className="mr-2" size={18} color="#212529" />Important
                  </FilterEmail>

                  <h6 className="text-muted font-small-3 text-bold-600 text-uppercase my-3">Labels</h6>
                  <FilterEmail filter={VisibilityFilters.SHOW_TECHNOLOGY}>
                    <Tag className="mr-2 warning" size={18} />Technology
                  </FilterEmail>
                  <FilterEmail filter={VisibilityFilters.SHOW_FINANCE}>
                    <Tag className="mr-2 success" size={18} />Finance
                  </FilterEmail>
                  <FilterEmail filter={VisibilityFilters.SHOW_HEALTH}>
                    <Tag className="mr-2 danger" size={18} />Health
                  </FilterEmail>
                </div>
              </div>
          </div>
        </PerfectScrollbar>
      </div>
    )
  }
}

export default EmailSidebar;
