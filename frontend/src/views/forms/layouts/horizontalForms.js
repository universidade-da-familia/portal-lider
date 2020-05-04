import React, { Component, Fragment } from "react";
import { Card, CardBody, CardTitle, Row, Col, Button, Form, CustomInput, FormGroup, Label, Input } from "reactstrap";
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


class HorizontalForms extends Component {
   render() {
      return (
         <Fragment>
            <ContentHeader>Horizontal Forms</ContentHeader>
            <ContentSubHeader>Horizontal Form Examples.</ContentSubHeader>

            <Row>
               <Col sm="12">
                  <Card>
                     <CardBody>
                        <CardTitle>Project Info</CardTitle>
                        <p className="mb-0">This is the basic horizontal form with labels on left and form controls on right in one line. Add <code>.form-horizontal</code> class to the form tag to have horizontal form styling. To define form sections use <code>form-section</code> class with any heading tags.</p>
                        <div className="px-3">
                           <Form className="form-horizontal">
                              <div className="form-body">
                                 <h4 className="form-section"><User size={20} color="#212529" /> Personal Info</h4>
                                 
                                 <FormGroup row>
                                    <Label for="projectinput1" sm={3}>First Name:</Label>
                                    <Col sm={9}>
                                       <Input type="text" id="projectinput1"   name="fname" />
                                    </Col>
                                 </FormGroup>
                                 <FormGroup row>
                                    <Label for="projectinput2" sm={3}>Last Name:</Label>
                                    <Col sm={9}>
                                       <Input type="text" id="projectinput2"   name="lname" />
                                    </Col>
                                 </FormGroup>
                                 <FormGroup row>
                                    <Label for="projectinput3" sm={3}>E-mail:</Label>
                                    <Col sm={9}>
                                       <Input type="text" id="projectinput3"   name="email"/>
                                    </Col>
                                 </FormGroup>
                                 <FormGroup row>
                                    <Label for="projectinput4" sm={3}>Contact Number:</Label>
                                    <Col sm={9}>
                                       <Input type="text" id="projectinput4"   name="phone"/>
                                    </Col>
                                 </FormGroup>
                                    
                                 <h4 className="form-section"><FileText size={20} color="#212529" /> Requirements</h4>

                                 <FormGroup row>
                                    <Label for="companyName" sm={3}>Company:</Label>
                                    <Col sm={9}>
                                       <Input type="text" id="companyName"   name="company"/>
                                    </Col>
                                 </FormGroup>

                                 <FormGroup row>
                                    <Label for="projectinput5" sm={3}>Interested in:</Label>
                                    <Col sm={9}>
                                       <Input type="select" id="projectinput5" name="interested" >
                                          <option value="none" defaultValue="" disabled="">Interested in</option>
                                          <option value="design">design</option>
                                          <option value="development">development</option>
                                          <option value="illustration">illustration</option>
                                          <option value="branding">branding</option>
                                          <option value="video">video</option>
                                       </Input>
                                    </Col>
                                 </FormGroup>
                              
                                 <FormGroup row>
                                    <Label for="projectinput6" sm={3}>Budget:</Label>
                                    <Col sm={9}>
                                       <Input type="select" id="projectinput6" name="budget" >
                                          <option value="0" defaultValue="" disabled="">Budget</option>
                                          <option value="less than 5000$">less than 5000$</option>
                                          <option value="5000$ - 10000$">5000$ - 10000$</option>
                                          <option value="10000$ - 20000$">10000$ - 20000$</option>
                                          <option value="more than 20000$">more than 20000$</option>
                                       </Input>
                                    </Col>
                                 </FormGroup>

                                 <FormGroup row>
                                    <Label sm={3}>Select File:</Label>
                                    <Col sm={9}>
                                       <Input type="file" className="form-control-file" id="projectinput8"/>
                                    </Col>
                                 </FormGroup>

                                 <FormGroup row>
                                    <Label for="projectinput9" sm={3}>About Project:</Label>
                                    <Col sm={9}>
                                       <Input type="textarea" id="projectinput9" rows="5"  name="comment" />
                                    </Col>
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
                        <p className="mb-0">This is 2-columns horizontal form with labels on left and form controls on right in one line. Add <code>.form-horizontal</code> class to the form tag to have horizontal form styling. User can also change the border color of the form controls using <code>border-*</code> class. In this example we have used <code>border-primary</code> class for form controls.</p>
                        <div className="px-3">						
                           <Form className="form-horizontal">
                              <div className="form-body">
                                 <h4 className="form-section"><Info size={20} color="#212529" /> About User</h4>
                                 <Row>
                                    <Col md="6">
                                       <FormGroup row>
                                          <Label for="userinput1" sm={3}>First Name:</Label>
                                          <Col sm={9}>
                                             <Input type="text" id="userinput1" className="border-primary"  name="name"/>
                                          </Col>
                                       </FormGroup>
                                    </Col>
                                    <Col md="6">
                                       <FormGroup row>
                                          <Label for="userinput2" sm={3}>Last Name:</Label>
                                          <Col sm={9}>
                                             <Input type="text" id="userinput2" className="border-primary"  name="company"/>
                                          </Col>
                                       </FormGroup>
                                    </Col>
                                 </Row>
                                 <Row>
                                    <Col md="6">
                                       <FormGroup row>
                                          <Label for="userinput3" sm={3}>Username:</Label>
                                          <Col sm={9}>
                                             <Input type="text" id="userinput3" className="border-primary"  name="username"/>
                                          </Col>
                                       </FormGroup>
                                    </Col>
                                    <Col md="6">
                                       <FormGroup row>
                                          <Label for="userinput4" sm={3}>Nick Name:</Label>
                                          <Col sm={9}>
                                             <Input type="text" id="userinput4" className="border-primary"  name="nickname"/>
                                          </Col>
                                       </FormGroup>
                                    </Col>
                                 </Row>

                                 <h4 className="form-section"><Mail size={20} color="#212529" /> Contact Info & Bio</h4>

                                 <Row>
                                    <Col md="6">
                                       <FormGroup row>
                                          <Label for="userinput5" sm={3}>Email:</Label>
                                          <Col sm={9}>
                                             <Input className="border-primary" type="email"  id="userinput5"/>
                                          </Col>
                                       </FormGroup>

                                       <FormGroup row>
                                          <Label for="userinput6" sm={3}>Website:</Label>
                                          <Col sm={9}>
                                             <Input className="border-primary" type="url"  id="userinput6"/>
                                          </Col>
                                       </FormGroup>

                                       <FormGroup row>
                                          <Label for="userinput7" sm={3}>Contact Number:</Label>
                                          <Col sm={9}>
                                             <Input className="border-primary" id="userinput7" type="tel" />
                                          </Col>
                                       </FormGroup>
                                    </Col>
                                    <Col md="6">
                                       <FormGroup row>
                                          <Label for="userinput8" sm={3}>Bio:</Label>
                                          <Col sm={9}>
                                             <Input type="textarea" id="userinput8" rows="5" className="border-primary" name="bio" />
                                          </Col>
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
                        <p className="mb-0">Add <code>.form-horizontal</code> class to the form tag to have horizontal form styling. This is horizontal form demo with centered card. Here we have used <code>.justify-content-md-center</code> class to center the card as its not full width. User can always change column according to his requirements.</p>
                        <div className="px-3">
                           <Form className="form-horizontal">
                              <div className="form-body">

                                 <FormGroup row>
                                    <Label for="eventRegInput1" sm={3}>Full Name:</Label>
                                    <Col sm={9}>
                                       <Input type="text" id="eventRegInput1"   name="fullname" />
                                    </Col>
                                 </FormGroup>

                                 <FormGroup row>
                                    <Label for="eventRegInput2" sm={3}>Title:</Label>
                                    <Col sm={9}>
                                       <Input type="text" id="eventRegInput2"   name="title" />
                                    </Col>
                                 </FormGroup>

                                 <FormGroup row>
                                    <Label for="eventRegInput3" sm={3}>Company:</Label>
                                    <Col sm={9}>
                                       <Input type="text" id="eventRegInput3"   name="company" />
                                    </Col>
                                 </FormGroup>

                                 <FormGroup row>
                                    <Label for="eventRegInput4" sm={3}>Email:</Label>
                                    <Col sm={9}>
                                       <Input type="email" id="eventRegInput4"   name="email" />
                                    </Col>
                                 </FormGroup>

                                 <FormGroup row>
                                    <Label for="eventRegInput5" sm={3}>Contact Number:</Label>
                                    <Col sm={9}>
                                       <Input type="tel" id="eventRegInput5"  name="contact"  />
                                    </Col>
                                 </FormGroup>

                                 <FormGroup row>
                                    <Label for="exampleCheckbox" sm={3}>Existing Customer:</Label>
                                    <Col sm={9}>
                                       <div>
                                          <CustomInput type="radio" id="exampleCustomRadio3" name="customRadioInline2" label="Yes" inline />
                                          <CustomInput type="radio" id="exampleCustomRadio4" name="customRadioInline2" label="No" inline />
                                       </div>
                                    </Col>
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

export default HorizontalForms;
