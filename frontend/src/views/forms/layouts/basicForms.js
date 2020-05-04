import React, { Component, Fragment } from "react";
import { Card, CardBody, CardTitle, Row, Col, Button, Form, CustomInput, FormGroup, Label, Input } from "reactstrap";
import {
   X,
   CheckSquare,
   User,
   Briefcase,
   MessageSquare,
   Clock,
   File,
   Info,
   FileText,
   Mail,
   AlertTriangle
} from "react-feather";

import ContentHeader from "../../../components/contentHead/contentHeader";
import ContentSubHeader from "../../../components/contentHead/contentSubHeader";

class BasicForms extends Component {
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
               <Col md="6">
                  <Card>
                     <CardBody>
                        <CardTitle>Timesheet</CardTitle>
                        <p className="mb-0">This form shows the use of icons with form controls. Define the position of the icon using <code>has-icon-left</code> or <code>has-icon-right</code> class. Use <code>icon-*</code> class to define the icon for the form control. See Icons sections for the list of icons you can use. </p>
                        <div className="px-3">

                           <Form>
                              <div className="form-body">

                                 <FormGroup>
                                    <Label for="timesheetinput1">Employee Name</Label>
                                    <div className="position-relative has-icon-left">
                                       <Input type="text" id="timesheetinput1"   name="employeename" />
                                       <div className="form-control-position">
                                          <User size={14} color="#212529" />
                                       </div>
                                    </div>
                                 </FormGroup>

                                 <FormGroup>
                                    <Label for="timesheetinput2">Project Name</Label>
                                    <div className="position-relative has-icon-left">
                                       <Input type="text" id="timesheetinput2"   name="projectname" />
                                       <div className="form-control-position">
                                          <Briefcase size={14} color="#212529" />
                                       </div>
                                    </div>
                                 </FormGroup>

                                 <FormGroup>
                                    <Label for="timesheetinput3">Date</Label>
                                    <div className="position-relative has-icon-left">
                                       <Input type="date" id="timesheetinput3"  name="date" />
                                       <div className="form-control-position">
                                          <MessageSquare size={14} color="#212529" />
                                       </div>
                                    </div>
                                 </FormGroup>

                                 <FormGroup>
                                    <Label>Rate Per Hour</Label>
                                    <div className="input-group">
                                       <div className="input-group-prepend">
                                          <span className="input-group-text">$</span>
                                       </div>
                                       <Input type="text"   aria-label="Amount (to the nearest dollar)" name="rateperhour" />
                                       <div className="input-group-append">
                                          <span className="input-group-text">.00</span>
                                       </div>
                                    </div>
                                 </FormGroup>

                                 <Row>
                                    <Col md="6">
                                       <FormGroup>
                                          <Label for="timesheetinput5">Start Time</Label>
                                          <div className="position-relative has-icon-left">
                                             <Input type="time" id="timesheetinput5"  name="starttime" />
                                             <div className="form-control-position">
                                                <Clock size={14} color="#212529" />
                                             </div>
                                          </div>
                                       </FormGroup>
                                    </Col>
                                    <Col md="6">
                                       <FormGroup>
                                          <Label for="timesheetinput6">End Time</Label>
                                          <div className="position-relative has-icon-left">
                                             <Input type="time" id="timesheetinput6"  name="endtime" />
                                             <div className="form-control-position">
                                                <Clock size={14} color="#212529" />
                                             </div>
                                          </div>
                                       </FormGroup>
                                    </Col>
                                 </Row>

                                 <FormGroup>
                                    <Label for="timesheetinput7">Notes</Label>
                                    <div className="position-relative has-icon-left">
                                       <Input type="textarea" id="timesheetinput7" rows="5"  name="notes" />
                                       <div className="form-control-position">
                                          <File size={14} color="#212529" />
                                       </div>
                                    </div>
                                 </FormGroup>
                              </div>

                              <div className="form-actions right">
                                 <Button color="warning" className="mr-1">
                                    <X size={14} color="#212529" /> Cancel
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
                        <CardTitle>Issue Tracking</CardTitle>
                        <p className="mb-0">This form shows the use of icons with form controls. Define the position of the icon using <code>has-icon-left</code> or <code>has-icon-right</code> class. Use <code>icon-*</code> class to define the icon for the form control. See Icons sections for the list of icons you can use. </p>
                        <div className="px-3">

                           <Form>
                              <div className="form-body">

                                 <FormGroup>
                                    <Label for="issueinput1">Issue Title</Label>
                                    <div className="position-relative has-icon-right">
                                       <Input type="text" id="issueinput1"   name="issuetitle" data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Issue Title" />
                                       <div className="form-control-position">
                                          <AlertTriangle size={14} color="#212529" />
                                       </div>
                                    </div>
                                 </FormGroup>

                                 <FormGroup>
                                    <Label for="issueinput2">Opened By</Label>
                                    <div className="position-relative has-icon-right">
                                       <Input type="text" id="issueinput2"   name="openedby" data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Opened By" />
                                       <div className="form-control-position">
                                          <User size={14} color="#212529" />
                                       </div>
                                    </div>
                                 </FormGroup>

                                 <Row>
                                    <Col md="6">
                                       <FormGroup>
                                          <Label for="issueinput3">Date Opened</Label>
                                          <Input type="date" id="issueinput3"  name="dateopened" data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Date Opened" />
                                       </FormGroup>
                                    </Col>
                                    <Col md="6">
                                       <FormGroup>
                                          <Label for="issueinput4">Date Fixed</Label>
                                          <Input type="date" id="issueinput4"  name="datefixed" data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Date Fixed" />
                                       </FormGroup>
                                    </Col>
                                 </Row>


                                 <FormGroup>
                                    <Label for="issueinput5">Priority</Label>
                                    <Input type="select" id="issueinput5" name="priority"  data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Priority">
                                       <option value="low">Low</option>
                                       <option value="medium">Medium</option>
                                       <option value="high">High</option>
                                    </Input>
                                 </FormGroup>

                                 <FormGroup>
                                    <Label for="issueinput6">Status</Label>
                                    <Input type="select" id="issueinput6" name="status"  data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Status">
                                       <option value="not started">Not Started</option>
                                       <option value="started">Started</option>
                                       <option value="fixed">Fixed</option>
                                    </Input>
                                 </FormGroup>

                                 <FormGroup>
                                    <Label for="issueinput8">Comments</Label>
                                    <div className="position-relative has-icon-right">
                                       <Input type="textarea" id="issueinput8" rows="5"  name="comments"  data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Comments"/>
                                       <div className="form-control-position">
                                          <MessageSquare size={14} color="#212529" />
                                       </div>
                                    </div>
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


            <Row className="row-eq-height">
               <Col md="6">
                  <Card>
                     <CardBody>
                        <CardTitle>Complaint Form</CardTitle>
                        <p className="mb-0">This is a variation to the default form control styling. In this example all the form controls has round styling. To apply round style add class <code>round</code> to any form control.</p>
                        <div className="px-3">

                           <Form>
                              <div className="form-body">

                                 <FormGroup>
                                    <Label for="complaintinput1">Company Name</Label>
                                    <Input type="text" id="complaintinput1" className="round"  name="companyname" />
                                 </FormGroup>

                                 <FormGroup>
                                    <Label for="complaintinput2">Employee Name</Label>
                                    <Input type="text" id="complaintinput2" className="round"  name="employeename" />
                                 </FormGroup>

                                 <FormGroup>
                                    <Label for="complaintinput3">Date of Complaint</Label>
                                    <Input type="date" id="complaintinput3" className="round" name="complaintdate" />
                                 </FormGroup>


                                 <FormGroup>
                                    <Label for="complaintinput4">Supervisor's Name</Label>
                                    <Input type="text" id="complaintinput4" className="round"  name="supervisorname" />
                                 </FormGroup>


                                 <FormGroup>
                                    <Label for="complaintinput5">Complaint Details</Label>
                                    <Input type="textarea" id="complaintinput5" rows="5" className="round" name="complaintdetails" />
                                 </FormGroup>


                                 <FormGroup>
                                    <Label for="complaintinput6">Signature</Label>
                                    <Input type="text" id="complaintinput6" className="round"  name="signature" />
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
                        <CardTitle>Donation</CardTitle>
                        <p className="mb-0">This is another variation to the default form control styling. In this example all the form controls has square styling. To apply square style add class <code>square</code> to any form control.</p>
                        <div className="px-3">

                           <Form>
                              <div className="form-body">

                                 <FormGroup>
                                    <Label for="donationinput1">Full Name</Label>
                                    <Input type="text" id="donationinput1" className="square"  name="fullname" />
                                 </FormGroup>

                                 <FormGroup>
                                    <Label for="donationinput2">Email</Label>
                                    <Input type="email" id="donationinput2" className="square"  name="email" />
                                 </FormGroup>

                                 <FormGroup>
                                    <Label for="donationinput3">Contact Number</Label>
                                    <Input type="tel" id="donationinput3" className="square" name="contact" />
                                 </FormGroup>

                                 <FormGroup>
                                    <Label for="donationinput4">Dontaion Type</Label>
                                    <Input type="text" id="donationinput4" className="square"  name="donationtype" />
                                 </FormGroup>

                                 <FormGroup>
                                    <Label>Amount</Label>
                                    <div className="input-group">
                                       <div className="input-group-prepend">
                                          <span className="input-group-text">$</span>
                                       </div>
                                       <Input type="text" className="square"  aria-label="Amount (to the nearest dollar)" name="amount" />
                                       <div className="input-group-append">
                                          <span className="input-group-text">.00</span>
                                       </div>
                                    </div>
                                 </FormGroup>

                                 <FormGroup>
                                    <Label for="donationinput7">Comments</Label>
                                    <Input type="textarea" id="donationinput7" rows="5" className="square" name="comments" />
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
                        <p className="mb-0">This example shows a way to center your form in the card. Here we have used <code>.justify-content-md-center</code> class to center the form in a full width card. User can always change columns according to his requirements. This example also uses form action buttons in the center bottom position of the card.</p>
                        <div className="px-3">

                           <Form>
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


            <Row className="row-eq-height justify-content-md-center">
               <Col md="6">
                  <Card>
                     <CardBody>
                        <CardTitle>Event Registration</CardTitle>
                        <p className="mb-0">This example shows a ways to center your card with form. Here we have used <code>.justify-content-md-center</code> class to center the card as its not full width. User can always change column according to his requirements. This example also uses form action buttons in the center bottom position of the card.</p>
                        <div className="px-3">
                           <Form>
                              <div className="form-body">

                                 <FormGroup>
                                    <Label for="eventRegInput1">Full Name</Label>
                                    <Input type="text" id="eventRegInput1"   name="fullname" />
                                 </FormGroup>

                                 <FormGroup>
                                    <Label for="eventRegInput2">Title</Label>
                                    <Input type="text" id="eventRegInput2"   name="title" />
                                 </FormGroup>

                                 <FormGroup>
                                    <Label for="eventRegInput3">Company</Label>
                                    <Input type="text" id="eventRegInput3"   name="company" />
                                 </FormGroup>

                                 <FormGroup>
                                    <Label for="eventRegInput4">Email</Label>
                                    <Input type="email" id="eventRegInput4"   name="email" />
                                 </FormGroup>

                                 <FormGroup>
                                    <Label for="eventRegInput5">Contact Number</Label>
                                    <Input type="tel" id="eventRegInput5"  name="contact"  />
                                 </FormGroup>


                                 <FormGroup>
                                    <Label for="exampleCheckbox">Existing Customer</Label>
                                    <div>
                                       <CustomInput type="radio" id="exampleCustomRadio3" name="customRadioInline2" label="Yes" inline />
                                       <CustomInput type="radio" id="exampleCustomRadio4" name="customRadioInline2" label="No" inline />
                                    </div>
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

export default BasicForms;
