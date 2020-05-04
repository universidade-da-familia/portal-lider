import React from "react";
import { Row, Col, Form, FormGroup, Label, Input } from "reactstrap";

const Step3 = props => (
   <div className="step step3">
      <Form>
         <div className="form-body">
            <Row>
               <Col md="6">
                  <FormGroup>
                     <Label for="eventName">Event Name</Label>
                     <Input type="text" id="eventName" name="event" />
                  </FormGroup>
               </Col>
               <Col md="6">
                  <FormGroup>
                     <Label for="eventType">Event Type</Label>
                     <Input type="text" id="eventType" name="eventtype" />
                  </FormGroup>
               </Col>
            </Row>

            <Row>
               <Col md="6">
                  <FormGroup>
                     <Label for="eventLocation">Event Location</Label>
                     <Input type="select" id="eventLocation" name="location">
                        <option value="none" defaultValue="" disabled="">
                           Select City
                        </option>
                        <option value="">Select City</option>
                        <option value="Amsterdam">Amsterdam</option>
                        <option value="Berlin">Berlin</option>
                        <option value="Frankfurt">Frankfurt</option>
                     </Input>
                  </FormGroup>
               </Col>

               <Col md="6">
                  <FormGroup>
                     <Label for="eventStatus">Event Status</Label>
                     <Input type="select" id="eventStatus" name="status">
                        <option value="0" defaultValue="" disabled="">
                           Event Status
                        </option>
                        <option value="Planning">Planning</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Finished">Finished</option>
                     </Input>
                  </FormGroup>
               </Col>
            </Row>
         </div>
      </Form>
   </div>
);

export default Step3;
