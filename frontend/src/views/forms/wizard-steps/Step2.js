import React from "react";
import { Row, Col, Form, FormGroup, Label, Input } from "reactstrap";

const Step2 = props => (
   <div className="step step2">
      <Form>
         <div className="form-body">
            <Row>
               <Col md="6">
                  <FormGroup>
                     <Label for="companyName">Company</Label>
                     <Input type="text" id="companyName" name="company" />
                  </FormGroup>
               </Col>
               <Col md="6">
                  <FormGroup>
                     <Label for="jobtitle">Job Title</Label>
                     <Input type="text" id="jobtitle" name="jobtitle" />
                  </FormGroup>
               </Col>
            </Row>

            <Row>
               <Col md="6">
                  <FormGroup>
                     <Label for="projectinput5">Interested in</Label>
                     <Input type="select" id="projectinput5" name="interested">
                        <option value="none" defaultValue="" disabled="">
                           Interested in
                        </option>
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
                     <Input type="select" id="projectinput6" name="budget">
                        <option value="0" defaultValue="" disabled="">
                           Budget
                        </option>
                        <option value="less than 5000$">less than 5000$</option>
                        <option value="5000$ - 10000$">5000$ - 10000$</option>
                        <option value="10000$ - 20000$">10000$ - 20000$</option>
                        <option value="more than 20000$">more than 20000$</option>
                     </Input>
                  </FormGroup>
               </Col>
            </Row>
         </div>
      </Form>
   </div>
);

export default Step2;
