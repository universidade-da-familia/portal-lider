// import external modules
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import {
   Row,
   Col,
   Card,
   CardBody,
   CardHeader,
   CardFooter,
   ListGroup,
   ListGroupItem,
   Button,
   Modal,
   ModalBody,
   ModalFooter,
   ModalHeader
} from "reactstrap";
import { Bell, FileText, Award, Briefcase, Calendar, Codepen, BarChart } from "react-feather";

class KnowledgeBase extends Component {
   state = {
      modal: false,
      modalTitle: ""
   };

   toggleModal = e => {
      if (e.target.nodeName === "LI") {
         let titleText = e.target.innerText;
         this.setState(prevState => ({
            modalTitle: titleText
         }));
      }
      this.setState(prevState => ({
         modal: !prevState.modal
      }));
   };

   render() {
      return (
         <Fragment>
            <Row>
               <Col xs="12">
                  <div className="content-header">Knowledge Base</div>
               </Col>
            </Row>
            <Modal fade={false} isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
               <ModalHeader toggle={this.toggle}>{this.state.modalTitle}</ModalHeader>
               <ModalBody>
                  <p className="text-bold-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <p>
                     Curabitur et congue orci. Nullam tempor, lectus vitae facilisis consectetur, enim dolor sodales nunc, ut
                     venenatis ipsum massa non eros. Integer tristique consequat sagittis. Sed vitae sapien lobortis, viverra
                     turpis non, hendrerit erat. Vivamus luctus, nisl et dignissim pretium, quam risus sollicitudin augue, ut
                     mollis erat neque a lectus. Donec et ex vitae orci pretium volutpat eget sed est. Nunc ornare mauris
                     nunc, id ullamcorper libero finibus id. Fusce imperdiet laoreet suscipit. Nunc sagittis arcu non sem
                     euismod auctor. Sed tellus odio, posuere id molestie quis, egestas sit amet turpis. Duis velit diam,
                     dictum a semper eu, ultricies id neque. Integer nec eros placerat lacus bibendum viverra in eu urna.
                  </p>
               </ModalBody>
               <ModalFooter>
                  <Button color="secondary" onClick={this.toggleModal}>
                     Cancel
                  </Button>
               </ModalFooter>
            </Modal>
            <Row>
               <Col xl="4" lg="12">
                  <Card>
                     <CardHeader>
                        <Bell size={24} className="float-left mr-2" />
                        <h4 className="card-title mb-0">Getting Started</h4>
                     </CardHeader>
                     <CardBody>
                        <p className="card-text">Vestibulum consequat odio sit amet eros.</p>
                        <ListGroup>
                           <ListGroupItem className="cursor-pointer" onClick={this.toggleModal}>
                              <span className="badge bg-primary float-left mr-2">
                                 <FileText size={14} className="white" />
                              </span>
                              Activating an Account
                           </ListGroupItem>
                           <ListGroupItem className="cursor-pointer" onClick={this.toggleModal}>
                              <span className="badge bg-primary float-left mr-2">
                                 <FileText size={14} className="white" />
                              </span>
                              User Profile
                           </ListGroupItem>
                           <ListGroupItem className="cursor-pointer" onClick={this.toggleModal}>
                              <span className="badge bg-primary float-left mr-2">
                                 <FileText size={14} className="white" />
                              </span>
                              Using the Dashboard
                           </ListGroupItem>
                           <ListGroupItem className="cursor-pointer" onClick={this.toggleModal}>
                              <span className="badge bg-primary float-left mr-2">
                                 <FileText size={14} className="white" />
                              </span>
                              Subscribing to Email Alerts
                           </ListGroupItem>
                           <ListGroupItem className="cursor-pointer" onClick={this.toggleModal}>
                              <span className="badge bg-primary float-left mr-2">
                                 <FileText size={14} className="white" />
                              </span>
                              Changing a Password
                           </ListGroupItem>
                        </ListGroup>
                     </CardBody>
                     <CardFooter>
                        <Link to="/knowledge-base" className="nav-link primary p-0">
                            See all articles (20)
                        </Link>
                     </CardFooter>
                  </Card>
               </Col>
               <Col xl="4" lg="12">
                  <Card>
                     <CardHeader>
                        <BarChart size={24} className="float-left mr-2" />
                        <h4 className="card-title mb-0">User Guide</h4>
                     </CardHeader>
                     <CardBody>
                        <p className="card-text">Vestibulum consequat odio sit amet eros.</p>
                        <ListGroup>
                           <ListGroupItem className="cursor-pointer" onClick={this.toggleModal}>
                              <span className="badge bg-danger float-left mr-2">
                                 <FileText size={14} className="white" />
                              </span>
                              Files Overview
                           </ListGroupItem>
                           <ListGroupItem className="cursor-pointer" onClick={this.toggleModal}>
                              <span className="badge bg-danger float-left mr-2">
                                 <FileText size={14} className="white" />
                              </span>
                              Search Overview
                           </ListGroupItem>
                           <ListGroupItem className="cursor-pointer" onClick={this.toggleModal}>
                              <span className="badge bg-danger float-left mr-2">
                                 <FileText size={14} className="white" />
                              </span>
                              Using Tasks
                           </ListGroupItem>
                           <ListGroupItem className="cursor-pointer" onClick={this.toggleModal}>
                              <span className="badge bg-danger float-left mr-2">
                                 <FileText size={14} className="white" />
                              </span>
                              Events
                           </ListGroupItem>
                           <ListGroupItem className="cursor-pointer" onClick={this.toggleModal}>
                              <span className="badge bg-danger float-left mr-2">
                                 <FileText size={14} className="white" />
                              </span>
                              Blogs
                           </ListGroupItem>
                        </ListGroup>
                     </CardBody>
                     <CardFooter>
                        <Link to="/knowledge-base" className="nav-link danger p-0">
                            See all articles (20)
                        </Link>
                     </CardFooter>
                  </Card>
               </Col>
               <Col xl="4" lg="12">
                  <Card>
                     <CardHeader>
                        <Award size={24} className="float-left mr-2" />
                        <h4 className="card-title mb-0">Files</h4>
                     </CardHeader>
                     <CardBody>
                        <p className="card-text">Vestibulum consequat odio sit amet eros.</p>
                        <ListGroup>
                           <ListGroupItem className="cursor-pointer" onClick={this.toggleModal}>
                              <span className="badge bg-blue float-left mr-2">
                                 <FileText size={14} className="white" />
                              </span>
                              Basic Files Module Features
                           </ListGroupItem>
                           <ListGroupItem className="cursor-pointer" onClick={this.toggleModal}>
                              <span className="badge bg-blue float-left mr-2">
                                 <FileText size={14} className="white" />
                              </span>
                              How to Add a Single File
                           </ListGroupItem>
                           <ListGroupItem className="cursor-pointer" onClick={this.toggleModal}>
                              <span className="badge bg-blue float-left mr-2">
                                 <FileText size={14} className="white" />
                              </span>
                              Drag-and-Drop upload files
                           </ListGroupItem>
                           <ListGroupItem className="cursor-pointer" onClick={this.toggleModal}>
                              <span className="badge bg-blue float-left mr-2">
                                 <FileText size={14} className="white" />
                              </span>
                              Searching Files
                           </ListGroupItem>
                           <ListGroupItem className="cursor-pointer" onClick={this.toggleModal}>
                              <span className="badge bg-blue float-left mr-2">
                                 <FileText size={14} className="white" />
                              </span>
                              Digital Rights Management
                           </ListGroupItem>
                        </ListGroup>
                     </CardBody>
                     <CardFooter>
                        <Link to="/knowledge-base" className="nav-link blue p-0">
                            See all articles (20)
                        </Link>
                     </CardFooter>
                  </Card>
               </Col>
               <Col xl="4" lg="12">
                  <Card>
                     <CardHeader>
                        <Briefcase size={24} className="float-left mr-2" />
                        <h4 className="card-title mb-0">Managing Users</h4>
                     </CardHeader>
                     <CardBody>
                        <p className="card-text">Vestibulum consequat odio sit amet eros.</p>
                        <ListGroup>
                           <ListGroupItem className="cursor-pointer" onClick={this.toggleModal}>
                              <span className="badge bg-warning float-left mr-2">
                                 <FileText size={14} className="white" />
                              </span>
                              Inviting and Managing Users
                           </ListGroupItem>
                           <ListGroupItem className="cursor-pointer" onClick={this.toggleModal}>
                              <span className="badge bg-warning float-left mr-2">
                                 <FileText size={14} className="white" />
                              </span>
                              Creating and Managing Groups
                           </ListGroupItem>
                           <ListGroupItem className="cursor-pointer" onClick={this.toggleModal}>
                              <span className="badge bg-warning float-left mr-2">
                                 <FileText size={14} className="white" />
                              </span>
                              Granting Roles
                           </ListGroupItem>
                           <ListGroupItem className="cursor-pointer" onClick={this.toggleModal}>
                              <span className="badge bg-warning float-left mr-2">
                                 <FileText size={14} className="white" />
                              </span>
                              Organizing Groups
                           </ListGroupItem>
                           <ListGroupItem className="cursor-pointer" onClick={this.toggleModal}>
                              <span className="badge bg-warning float-left mr-2">
                                 <FileText size={14} className="white" />
                              </span>
                              Unable to Login
                           </ListGroupItem>
                        </ListGroup>
                     </CardBody>
                     <CardFooter>
                        <Link to="/knowledge-base" className="nav-link warning p-0">
                            See all articles (20)
                        </Link>
                     </CardFooter>
                  </Card>
               </Col>
               <Col xl="4" lg="12">
                  <Card>
                     <CardHeader>
                        <Calendar size={24} className="float-left mr-2" />
                        <h4 className="card-title mb-0">Site Administration</h4>
                     </CardHeader>
                     <CardBody>
                        <p className="card-text">Vestibulum consequat odio sit amet eros.</p>
                        <ListGroup>
                           <ListGroupItem className="cursor-pointer" onClick={this.toggleModal}>
                              <span className="badge bg-info float-left mr-2">
                                 <FileText size={14} className="white" />
                              </span>
                              Introduction to the Site Admin
                           </ListGroupItem>
                           <ListGroupItem className="cursor-pointer" onClick={this.toggleModal}>
                              <span className="badge bg-info float-left mr-2">
                                 <FileText size={14} className="white" />
                              </span>
                              How to Create a Virtual Deal
                           </ListGroupItem>
                           <ListGroupItem className="cursor-pointer" onClick={this.toggleModal}>
                              <span className="badge bg-info float-left mr-2">
                                 <FileText size={14} className="white" />
                              </span>
                              Best Practices for New Site
                           </ListGroupItem>
                           <ListGroupItem className="cursor-pointer" onClick={this.toggleModal}>
                              <span className="badge bg-info float-left mr-2">
                                 <FileText size={14} className="white" />
                              </span>
                              General Settings
                           </ListGroupItem>
                           <ListGroupItem className="cursor-pointer" onClick={this.toggleModal}>
                              <span className="badge bg-info float-left mr-2">
                                 <FileText size={14} className="white" />
                              </span>
                              Advanced Settings
                           </ListGroupItem>
                        </ListGroup>
                     </CardBody>
                     <CardFooter>
                        <Link to="/knowledge-base" className="nav-link info p-0">
                            See all articles (20)
                        </Link>
                     </CardFooter>
                  </Card>
               </Col>
               <Col xl="4" lg="12">
                  <Card>
                     <CardHeader>
                        <Codepen size={24} className="float-left mr-2" />
                        <h4 className="card-title mb-0">Administration</h4>
                     </CardHeader>
                     <CardBody>
                        <p className="card-text">Vestibulum consequat odio sit amet eros.</p>
                        <ListGroup>
                           <ListGroupItem className="cursor-pointer" onClick={this.toggleModal}>
                              <span className="badge bg-success float-left mr-2">
                                 <FileText size={14} className="white" />
                              </span>
                              Administration Overview
                           </ListGroupItem>
                           <ListGroupItem className="cursor-pointer" onClick={this.toggleModal}>
                              <span className="badge bg-success float-left mr-2">
                                 <FileText size={14} className="white" />
                              </span>
                              Creating Sites
                           </ListGroupItem>
                           <ListGroupItem className="cursor-pointer" onClick={this.toggleModal}>
                              <span className="badge bg-success float-left mr-2">
                                 <FileText size={14} className="white" />
                              </span>
                              User Administration
                           </ListGroupItem>
                           <ListGroupItem className="cursor-pointer" onClick={this.toggleModal}>
                              <span className="badge bg-success float-left mr-2">
                                 <FileText size={14} className="white" />
                              </span>
                              Org Administration
                           </ListGroupItem>
                           <ListGroupItem className="cursor-pointer" onClick={this.toggleModal}>
                              <span className="badge bg-success float-left mr-2">
                                 <FileText size={14} className="white" />
                              </span>
                              Site Category System Settings
                           </ListGroupItem>
                        </ListGroup>
                     </CardBody>
                     <CardFooter>
                        <Link to="/knowledge-base" className="nav-link success p-0">
                            See all articles (20)
                        </Link>
                     </CardFooter>
                  </Card>
               </Col>
            </Row>
         </Fragment>
      );
   }
}

export default KnowledgeBase;
