import React, { Component } from "react";
import { Row, Col, Form, FormGroup, Label, Input } from "reactstrap";

export default class Step1 extends Component {
   state = {};

   componentDidMount() {}

   componentWillUnmount() {}

   // not required as this component has no forms or user entry
   // isValidated() {}

   render() {
      return (
         <div className="step step1">
            <Form>
               <div className="form-body">
                  <Row>
                     <Col md="6">
                        <FormGroup>
                           <Label for="projectinput1">First Name</Label>
                           <Input type="text" id="projectinput1" name="fname" />
                        </FormGroup>
                     </Col>
                     <Col md="6">
                        <FormGroup>
                           <Label for="projectinput2">Last Name</Label>
                           <Input type="text" id="projectinput2" name="lname" />
                        </FormGroup>
                     </Col>
                  </Row>
                  <Row>
                     <Col md="6">
                        <FormGroup>
                           <Label for="projectinput3">E-mail</Label>
                           <Input type="text" id="projectinput3" name="email" />
                        </FormGroup>
                     </Col>
                     <Col md="6">
                        <FormGroup>
                           <Label for="projectinput4">Contact Number</Label>
                           <Input type="text" id="projectinput4" name="phone" />
                        </FormGroup>
                     </Col>
                  </Row>
               </div>
            </Form>
         </div>
      );
   }
}
