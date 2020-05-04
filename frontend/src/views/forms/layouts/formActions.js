import React, { Component, Fragment } from "react";
import { Card, CardBody, CardTitle, Row, Col, Button, Alert, Form, CustomInput, FormGroup, Label, Input } from "reactstrap";
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

class FormActions extends Component {
   render() {
      return (
         <Fragment>
            <ContentHeader>Basic Forms</ContentHeader>
            <ContentSubHeader>Basic Form Examples.</ContentSubHeader>

            <Row>
               <Col md="6">
                  <Card>
                     <CardBody>
                        <CardTitle>Project Info</CardTitle>

                        <Alert color="success">
                           Form actions on bottom left!!
                        </Alert>
                        <p className="mb-0">This is the most basic and default form having form sections. To add form section use <code>.form-section</code> class with any heading tags. This form has the buttons on the bottom left corner which is the default position.</p>
                        <div className="px-3">
                           <Form>
                              <div className="form-body">
                                 <h4 className="form-section"><User size={20} color="#212529" /> Personal Info</h4>
                                 <Row>
                                    <Col md="6">
                                       <FormGroup>
                                          <Label for="projectinput1">First Name</Label>
                                          <Input type="text" id="projectinput1"   name="fname" />
                                       </FormGroup>
                                    </Col>
                                    <Col md="6">
                                       <FormGroup>
                                          <Label for="projectinput2">Last Name</Label>
                                          <Input type="text" id="projectinput2"   name="lname" />
                                       </FormGroup>
                                    </Col>
                                 </Row>
                                 <Row>
                                    <Col md="6">
                                       <FormGroup>
                                          <Label for="projectinput3">E-mail</Label>
                                          <Input type="text" id="projectinput3"   name="email"/>
                                       </FormGroup>
                                    </Col>
                                    <Col md="6">
                                       <FormGroup>
                                          <Label for="projectinput4">Contact Number</Label>
                                          <Input type="text" id="projectinput4"   name="phone"/>
                                       </FormGroup>
                                    </Col>
                                 </Row>

                                 <h4 className="form-section"><FileText size={20} color="#212529" /> Requirements</h4>

                                 <FormGroup>
                                    <Label for="companyName">Company</Label>
                                    <Input type="text" id="companyName"   name="company"/>
                                 </FormGroup>

                                 <Row>
                                    <Col md="6">
                                       <FormGroup>
                                          <Label for="projectinput5">Interested in</Label>
                                          <Input type="select" id="projectinput5" name="interested" >
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
                                          <Label for="projectinput6">Budget</Label>
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
                                    <Label>Select File</Label>
                                    <Input type="file" className="form-control-file" id="projectinput8"/>
                                 </FormGroup>

                                 <FormGroup>
                                    <Label for="projectinput8">About Project</Label>
                                    <Input type="textarea" id="projectinput8" rows="5"  name="comment" />
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

               <Col md="6">
                  <Card>
                     <CardBody>
                        <CardTitle>User Profile</CardTitle>

                        <Alert color="success">
                           Form actions on bottom right!!
                        </Alert>

                        <p className="mb-0">You can always change the border color of the form controls using <code>border-*</code> class. In this example we have used <code>border-primary</code> class for form controls. Form action buttons are on the bottom right position.</p>
                        <div className="px-3">						
                           <Form>
                              <div className="form-body">
                                 <h4 className="form-section"><Info size={20} color="#212529" /> About User</h4>
                                 <Row>
                                    <Col md="6">
                                       <FormGroup>
                                          <Label for="userinput1">First Name</Label>
                                          <Input type="text" id="userinput1" className="border-primary"  name="name"/>
                                       </FormGroup>
                                    </Col>
                                    <Col md="6">
                                       <FormGroup>
                                          <Label for="userinput2">Last Name</Label>
                                          <Input type="text" id="userinput2" className="border-primary"  name="company"/>
                                       </FormGroup>
                                    </Col>
                                 </Row>
                                 <Row>
                                    <Col md="6">
                                       <FormGroup>
                                          <Label for="userinput3">Username</Label>
                                          <Input type="text" id="userinput3" className="border-primary"  name="username"/>
                                       </FormGroup>
                                    </Col>
                                    <Col md="6">
                                       <FormGroup>
                                          <Label for="userinput4">Nick Name</Label>
                                          <Input type="text" id="userinput4" className="border-primary"  name="nickname"/>
                                       </FormGroup>
                                    </Col>
                                 </Row>

                                 <h4 className="form-section"><Mail size={20} color="#212529" /> Contact Info & Bio</h4>

                                 <FormGroup>
                                    <Label for="userinput5">Email</Label>
                                    <Input className="border-primary" type="email"  id="userinput5"/>
                                 </FormGroup>

                                 <FormGroup>
                                    <Label for="userinput6">Website</Label>
                                    <Input className="border-primary" type="url"  id="userinput6"/>
                                 </FormGroup>

                                 <FormGroup>
                                    <Label>Contact Number</Label>
                                    <Input className="border-primary" id="userinput7" type="tel" />
                                 </FormGroup>

                                 <FormGroup>
                                    <Label for="userinput8">Bio</Label>
                                    <Input type="textarea" id="userinput8" rows="5" className="border-primary" name="bio" />
                                 </FormGroup>

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


            <Row className="row-eq-height">
               <Col md="12">
                  <Card>
                     <CardBody>
                        <CardTitle>Event Registration</CardTitle>
                        
                        <Alert color="success">
                           Multiple Form Actions On Top And Bottom!!
                        </Alert>

                        <p className="mb-0">This example shows a way to center your form in the card. Here we have used <code>.justify-content-md-center</code> class to center the form in a full width card. User can always change columns according to his requirements. This example also uses form action buttons in the center bottom position of the card.</p>
                        <div className="px-3">

                           <Form>
                              <div className="form-actions top clearfix">
                                 <div className="float-left">
                                    <Button color="warning" className="mr-1">
                                       <X size={14} color="#FFF" /> Cancel
                                    </Button>
                                    <Button color="primary">
                                       <CheckSquare size={14} color="#FFF" /> Save
                                    </Button>
                                 </div>
                                 <div className="float-right">
                                    <Button color="info" className="mr-1">Action 1</Button>
                                    <Button color="success" className="mr-1">Action 2</Button>
                                    <Button color="danger" className="mr-1">Action 3</Button>
                                 </div>
                              </div>
                              <Row className="justify-content-md-center">
                                 <Col md="6">
                                    <div className="form-body">
                                       <FormGroup>
                                          <Label for="eventInput1">Full Name</Label>
                                          <Input type="text" id="eventInput1"   name="fullname" />
                                       </FormGroup>

                                       <FormGroup>
                                          <Label for="eventInput2">Title</Label>
                                          <Input type="text" id="eventInput2"   name="title" />
                                       </FormGroup>

                                       <FormGroup>
                                          <Label for="eventInput3">Company</Label>
                                          <Input type="text" id="eventInput3"   name="company" />
                                       </FormGroup>

                                       <FormGroup>
                                          <Label for="eventInput4">Email</Label>
                                          <Input type="email" id="eventInput4"   name="email" />
                                       </FormGroup>

                                       <FormGroup>
                                          <Label for="eventInput5">Contact Number</Label>
                                          <Input type="tel" id="eventInput5"  name="contact"  />
                                       </FormGroup>

                                       <FormGroup>
                                          <Label for="exampleCheckbox">Existing Customer</Label>
                                          <div>
                                             <CustomInput type="radio" id="exampleCustomRadio" name="customRadioInline1" label="Yes" inline />
                                             <CustomInput type="radio" id="exampleCustomRadio2" name="customRadioInline1" label="No" inline />
                                          </div>
                                       </FormGroup>
                                    </div>
                                 </Col>
                              </Row>

                              <div className="form-actions">
                                 <div className="float-left">
                                    <Button color="warning" className="mr-1">
                                       <X size={14} color="#FFF" /> Cancel
                                    </Button>
                                    <Button color="primary">
                                       <CheckSquare size={14} color="#FFF" /> Save
                                    </Button>
                                 </div>
                                 <div className="float-right">
                                    <Button color="info" className="mr-1">Action 1</Button>
                                    <Button color="success" className="mr-1">Action 2</Button>
                                    <Button color="danger" className="mr-1">Action 3</Button>
                                 </div>
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

export default FormActions;
