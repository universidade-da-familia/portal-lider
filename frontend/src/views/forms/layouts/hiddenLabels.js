import React, { Component, Fragment } from "react";
import { Card, CardBody, CardTitle, Row, Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import {
   X,
   CheckSquare,
   User,
   Info,
   FileText,
   Mail
} from "react-feather";

import ContentHeader from "../../../components/contentHead/contentHeader";
import ContentSubHeader from "../../../components/contentHead/contentSubHeader";


class Hiddenlabels extends Component {
   render() {
      return (
         <Fragment>
            <ContentHeader>Hidden Label Forms</ContentHeader>
            <ContentSubHeader>Hidden Label Form Examples.</ContentSubHeader>

            <Row>
               <Col sm="12">
                  <Card>
                     <CardBody>
                        <CardTitle>Project Info</CardTitle>
                        <p className="mb-0">This is the most basic and default form having form sections. Just add <code>hidden</code> attribute to a Label tag to hide. To add form section use <code>.form-section</code> class with any heading tags. This form has the buttons on the bottom left corner which is the default position.</p>
                        <div className="px-3">
                           <Form>
                              <div className="form-body">
                                 <h4 className="form-section"><User size={20} color="#212529" /> Personal Info</h4>
                                 <Row>
                                    <Col md="6">
                                       <FormGroup>
                                          <Label for="projectinput1" hidden>First Name</Label>
                                          <Input type="text" id="projectinput1" name="fname" placeholder="First Name" />
                                       </FormGroup>
                                    </Col>
                                    <Col md="6">
                                       <FormGroup>
                                          <Label for="projectinput2" hidden>Last Name</Label>
                                          <Input type="text" id="projectinput2" name="lname" placeholder="Last Name" />
                                       </FormGroup>
                                    </Col>
                                 </Row>
                                 <Row>
                                    <Col md="6">
                                       <FormGroup>
                                          <Label for="projectinput3" hidden>E-mail</Label>
                                          <Input type="text" id="projectinput3" name="email" placeholder="E-mail" />
                                       </FormGroup>
                                    </Col>
                                    <Col md="6">
                                       <FormGroup>
                                          <Label for="projectinput4" hidden>Contact Number</Label>
                                          <Input type="text" id="projectinput4" name="phone" placeholder="Contact Number" />
                                       </FormGroup>
                                    </Col>
                                 </Row>

                                 <h4 className="form-section"><FileText size={20} color="#212529" /> Requirements</h4>

                                 <FormGroup>
                                    <Label for="companyName" hidden>Company</Label>
                                    <Input type="text" id="companyName" name="company" placeholder="Company" />
                                 </FormGroup>

                                 <Row>
                                    <Col md="6">
                                       <FormGroup>
                                          <Label for="projectinput5" hidden>Interested in</Label>
                                          <Input type="select" id="projectinput5" name="interested">
                                             <option value="none" defaultValue="" disabled="">Interested in</option>
                                             <option value="design">design</option>
                                             <option value="development">development</option>
                                             <option value="illustration">illustration</option>
                                             <option value="branding">branding</option>
                                             <option value="video">video</option>
                                          </Input>
                                       </FormGroup>
                                    </Col>

                                    <Col md="6">
                                       <FormGroup>
                                          <Label for="projectinput6" hidden>Budget</Label>
                                          <Input type="select" id="projectinput6" name="budget" >
                                             <option value="0" defaultValue="" disabled="">Budget</option>
                                             <option value="less than 5000$">less than 5000$</option>
                                             <option value="5000$ - 10000$">5000$ - 10000$</option>
                                             <option value="10000$ - 20000$">10000$ - 20000$</option>
                                             <option value="more than 20000$">more than 20000$</option>
                                          </Input>
                                       </FormGroup>
                                    </Col>
                                 </Row>

                                 <FormGroup>
                                    <Label hidden>Select File</Label>
                                    <Input type="file" className="form-control-file" id="projectinput8"/>
                                 </FormGroup>

                                 <FormGroup>
                                    <Label for="projectinput8" hidden>About Project</Label>
                                    <Input type="textarea" id="projectinput8" rows="5"  name="comment" placeholder="About Project" />
                                 </FormGroup>
                              </div>

                              <div className="form-actions">
                                 <Button color="warning" className="mr-1">
                                    <X size={14} color="#FFF" /> Cancel
                                 </Button>
                                 <Button color="primary">
                                    <CheckSquare size={14} color="#FFF" /> Save
                                 </Button>
                              </div>
                           </Form>
                        </div>
                     </CardBody>
                  </Card>
               </Col>
            </Row>

            <Row>
               <Col sm="12">
                  <Card>
                     <CardBody>
                        <CardTitle>User Profile</CardTitle>
                        <p className="mb-0">Just add <code>hidden</code> attribute to a label tag to hide. You can always change the border color of the form controls using <code>border-*</code> class. In this example we have used <code>border-primary</code> class for form controls. Form action buttons are on the bottom right position.</p>
                        <div className="px-3">						
                           <Form>
                              <div className="form-body">
                                 <h4 className="form-section"><Info size={20} color="#212529" /> About User</h4>
                                 <Row>
                                    <Col md="6">
                                       <FormGroup>
                                          <Label for="userinput1" hidden>First Name</Label>
                                          <Input type="text" id="userinput1" className="border-primary" name="name" placeholder="First Name" />
                                       </FormGroup>
                                    </Col>
                                    <Col md="6">
                                       <FormGroup>
                                          <Label for="userinput2" hidden>Last Name</Label>
                                          <Input type="text" id="userinput2" className="border-primary" name="company" placeholder="Last Name" />
                                       </FormGroup>
                                    </Col>
                                 </Row>
                                 <Row>
                                    <Col md="6">
                                       <FormGroup>
                                          <Label for="userinput3" hidden>Username</Label>
                                          <Input type="text" id="userinput3" className="border-primary" name="username" placeholder="Username" />
                                       </FormGroup>
                                    </Col>
                                    <Col md="6">
                                       <FormGroup>
                                          <Label for="userinput4" hidden>Nick Name</Label>
                                          <Input type="text" id="userinput4" className="border-primary" name="nickname" placeholder="Nick Name" />
                                       </FormGroup>
                                    </Col>
                                 </Row>

                                 <h4 className="form-section"><Mail size={20} color="#212529" /> Contact Info & Bio</h4>
                                 <Row>
                                    <Col md="6">
                                       <FormGroup>
                                          <Label for="userinput5" hidden>Email</Label>
                                          <Input className="border-primary" type="email" id="userinput5" placeholder="Email" />
                                       </FormGroup>

                                       <FormGroup>
                                          <Label for="userinput6" hidden>Website</Label>
                                          <Input className="border-primary" type="url" id="userinput6" placeholder="Website" />
                                       </FormGroup>

                                       <FormGroup>
                                          <Label for="userinput7" hidden>Contact Number</Label>
                                          <Input className="border-primary" id="userinput7" type="tel" placeholder="Contact Number" />
                                       </FormGroup>
                                    </Col>
                                    <Col md="6">
                                       <FormGroup>
                                          <Label for="userinput8" hidden>Bio</Label>
                                          <Input type="textarea" id="userinput8" rows="5" className="border-primary" name="bio" placeholder="Bio" />
                                       </FormGroup>
                                    </Col>
                                 </Row>
                              </div>

                              <div className="form-actions right">
                                 <Button color="warning" className="mr-1">
                                    <X size={14} color="#FFF" /> Cancel
                                 </Button>
                                 <Button color="primary">
                                    <CheckSquare size={14} color="#FFF" /> Save
                                 </Button>
                              </div>
                           </Form>

                        </div>
                     </CardBody>
                  </Card>
               </Col>
            </Row>
            <Row className="row-eq-height justify-content-md-center">
               <Col md="6">
                  <Card>
                     <CardBody>
                        <CardTitle>Event Registration</CardTitle>
                        <p className="mb-0">Just add <code>hidden</code> attribute to a label tag to hide. Here we have used <code>.justify-content-md-center</code> class to center the card as its not full width. User can always change column according to his requirements. This example also uses form action buttons in the center bottom position of the card.</p>
                        <div className="px-3">
                           <Form>
                              <div className="form-body">

                                 <FormGroup>
                                    <Label for="eventRegInput1" hidden>Full Name</Label>
                                    <Input type="text" id="eventRegInput1" name="fullname" placeholder="Full Name" />
                                 </FormGroup>

                                 <FormGroup>
                                    <Label for="eventRegInput2" hidden>Title</Label>
                                    <Input type="text" id="eventRegInput2" name="title" placeholder="Title" />
                                 </FormGroup>

                                 <FormGroup>
                                    <Label for="eventRegInput3" hidden>Company</Label>
                                    <Input type="text" id="eventRegInput3" name="company" placeholder="Company" />
                                 </FormGroup>

                                 <FormGroup>
                                    <Label for="eventRegInput4" hidden>Email</Label>
                                    <Input type="email" id="eventRegInput4" name="email" placeholder="Email" />
                                 </FormGroup>

                                 <FormGroup>
                                    <Label for="eventRegInput5" hidden>Contact Number</Label>
                                    <Input type="tel" id="eventRegInput5" name="contact" placeholder="Contact Number"  />
                                 </FormGroup>
                              </div>

                              <div className="form-actions center">
                                 <Button color="warning" className="mr-1">
                                    <X size={14} color="#FFF" /> Cancel
                                 </Button>
                                 <Button color="primary">
                                    <CheckSquare size={14} color="#FFF" /> Save
                                 </Button>
                              </div>
                           </Form>
                        </div>
                     </CardBody>
                  </Card>
               </Col>
            </Row>
         </Fragment>
      );
   }
}

export default Hiddenlabels;