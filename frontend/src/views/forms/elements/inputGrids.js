import React, { Component, Fragment } from "react";
import { Card, CardBody, CardTitle, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";

import ContentHeader from "../../../components/contentHead/contentHeader";
import ContentSubHeader from "../../../components/contentHead/contentSubHeader";

class InputGrids extends Component {
   render() {
      return (
         <Fragment>
            <ContentHeader>Form Input Grid</ContentHeader>
            <ContentSubHeader>Form Input Grid Examples.</ContentSubHeader>

            <Row>
               <Col sm="12">
                  <Card>
                     <CardBody>
                        <CardTitle>Horizontal Grid</CardTitle>
                        <Form>
                           <Row>
                              <Col sm="1">
                                 <FormGroup>
                                    <Input type="text" name="basicinput" placeholder="col-1" />
                                 </FormGroup>
                              </Col>
                              <Col sm="11">
                                 <FormGroup>
                                    <Input type="text" name="basicinput" placeholder="col-11" />
                                 </FormGroup>
                              </Col>
                           </Row>
                           <Row>
                              <Col sm="2">
                                 <FormGroup>
                                    <Input type="text" name="basicinput" placeholder="col-2" />
                                 </FormGroup>
                              </Col>
                              <Col sm="10">
                                 <FormGroup>
                                    <Input type="text" name="basicinput" placeholder="col-10" />
                                 </FormGroup>
                              </Col>
                           </Row>
                           <Row>
                              <Col sm="3">
                                 <FormGroup>
                                    <Input type="text" name="basicinput" placeholder="col-3" />
                                 </FormGroup>
                              </Col>
                              <Col sm="9">
                                 <FormGroup>
                                    <Input type="text" name="basicinput" placeholder="col-9" />
                                 </FormGroup>
                              </Col>
                           </Row>
                           <Row>
                              <Col sm="4">
                                 <FormGroup>
                                    <Input type="text" name="basicinput" placeholder="col-4" />
                                 </FormGroup>
                              </Col>
                              <Col sm="8">
                                 <FormGroup>
                                    <Input type="text" name="basicinput" placeholder="col-8" />
                                 </FormGroup>
                              </Col>
                           </Row>
                           <Row>
                              <Col sm="5">
                                 <FormGroup>
                                    <Input type="text" name="basicinput" placeholder="col-5" />
                                 </FormGroup>
                              </Col>
                              <Col sm="7">
                                 <FormGroup>
                                    <Input type="text" name="basicinput" placeholder="col-7" />
                                 </FormGroup>
                              </Col>
                           </Row>
                           <Row>
                              <Col sm="6">
                                 <FormGroup>
                                    <Input type="text" name="basicinput" placeholder="col-6" />
                                 </FormGroup>
                              </Col>
                              <Col sm="6">
                                 <FormGroup>
                                    <Input type="text" name="basicinput" placeholder="col-6" />
                                 </FormGroup>
                              </Col>
                           </Row>
                        </Form>
                     </CardBody>
                  </Card>
               </Col>
            </Row>

            <Row>
               <Col sm="12">
                  <Card>
                     <CardBody>
                        <CardTitle>Grid With Row Label</CardTitle>
                        <Form>
                           <Label>Row Label</Label>
                           <Row>
                              <Col sm="1">
                                 <FormGroup>
                                    <Input type="text" name="basicinput" placeholder="col-1" />
                                 </FormGroup>
                              </Col>
                              <Col sm="11">
                                 <FormGroup>
                                    <Input type="text" name="basicinput" placeholder="col-11" />
                                 </FormGroup>
                              </Col>
                           </Row>
                           
                           <Label>Row Label</Label>
                           <Row>
                              <Col sm="2">
                                 <FormGroup>
                                    <Input type="text" name="basicinput" placeholder="col-2" />
                                 </FormGroup>
                              </Col>
                              <Col sm="10">
                                 <FormGroup>
                                    <Input type="text" name="basicinput" placeholder="col-10" />
                                 </FormGroup>
                              </Col>
                           </Row>
                           
                           <Label>Row Label</Label>
                           <Row>
                              <Col sm="3">
                                 <FormGroup>
                                    <Input type="text" name="basicinput" placeholder="col-3" />
                                 </FormGroup>
                              </Col>
                              <Col sm="9">
                                 <FormGroup>
                                    <Input type="text" name="basicinput" placeholder="col-9" />
                                 </FormGroup>
                              </Col>
                           </Row>
                           
                           <Label>Row Label</Label>
                           <Row>
                              <Col sm="4">
                                 <FormGroup>
                                    <Input type="text" name="basicinput" placeholder="col-4" />
                                 </FormGroup>
                              </Col>
                              <Col sm="8">
                                 <FormGroup>
                                    <Input type="text" name="basicinput" placeholder="col-8" />
                                 </FormGroup>
                              </Col>
                           </Row>
                           
                           <Label>Row Label</Label>
                           <Row>
                              <Col sm="5">
                                 <FormGroup>
                                    <Input type="text" name="basicinput" placeholder="col-5" />
                                 </FormGroup>
                              </Col>
                              <Col sm="7">
                                 <FormGroup>
                                    <Input type="text" name="basicinput" placeholder="col-7" />
                                 </FormGroup>
                              </Col>
                           </Row>
                           
                           <Label>Row Label</Label>
                           <Row>
                              <Col sm="6">
                                 <FormGroup>
                                    <Input type="text" name="basicinput" placeholder="col-6" />
                                 </FormGroup>
                              </Col>
                              <Col sm="6">
                                 <FormGroup>
                                    <Input type="text" name="basicinput" placeholder="col-6" />
                                 </FormGroup>
                              </Col>
                           </Row>
                        </Form>
                     </CardBody>
                  </Card>
               </Col>
            </Row>

            <Row>
               <Col sm="12">
                  <Card>
                     <CardBody>
                        <CardTitle>Grid With Field Label</CardTitle>
                        <Form>
                           <Row>
                              <Col sm="1">
                                 <FormGroup>
                                    <Label>Label</Label>
                                    <Input type="text" name="basicinput" placeholder="col-1" />
                                 </FormGroup>
                              </Col>
                              <Col sm="11">
                                 <FormGroup>
                                    <Label>Label</Label>
                                    <Input type="text" name="basicinput" placeholder="col-11" />
                                 </FormGroup>
                              </Col>
                           </Row>
                           <Row>
                              <Col sm="2">
                                 <FormGroup>
                                    <Label>Label</Label>
                                    <Input type="text" name="basicinput" placeholder="col-2" />
                                 </FormGroup>
                              </Col>
                              <Col sm="10">
                                 <FormGroup>
                                    <Label>Label</Label>
                                    <Input type="text" name="basicinput" placeholder="col-10" />
                                 </FormGroup>
                              </Col>
                           </Row>
                           <Row>
                              <Col sm="3">
                                 <FormGroup>
                                    <Label>Label</Label>
                                    <Input type="text" name="basicinput" placeholder="col-3" />
                                 </FormGroup>
                              </Col>
                              <Col sm="9">
                                 <FormGroup>
                                    <Label>Label</Label>
                                    <Input type="text" name="basicinput" placeholder="col-9" />
                                 </FormGroup>
                              </Col>
                           </Row>
                           <Row>
                              <Col sm="4">
                                 <FormGroup>
                                    <Label>Label</Label>
                                    <Input type="text" name="basicinput" placeholder="col-4" />
                                 </FormGroup>
                              </Col>
                              <Col sm="8">
                                 <FormGroup>
                                    <Label>Label</Label>
                                    <Input type="text" name="basicinput" placeholder="col-8" />
                                 </FormGroup>
                              </Col>
                           </Row>
                           <Row>
                              <Col sm="5">
                                 <FormGroup>
                                    <Label>Label</Label>
                                    <Input type="text" name="basicinput" placeholder="col-5" />
                                 </FormGroup>
                              </Col>
                              <Col sm="7">
                                 <FormGroup>
                                    <Label>Label</Label>
                                    <Input type="text" name="basicinput" placeholder="col-7" />
                                 </FormGroup>
                              </Col>
                           </Row>
                           <Row>
                              <Col sm="6">
                                 <FormGroup>
                                    <Label>Label</Label>
                                    <Input type="text" name="basicinput" placeholder="col-6" />
                                 </FormGroup>
                              </Col>
                              <Col sm="6">
                                 <FormGroup>
                                    <Label>Label</Label>
                                    <Input type="text" name="basicinput" placeholder="col-6" />
                                 </FormGroup>
                              </Col>
                           </Row>
                        </Form>
                     </CardBody>
                  </Card>
               </Col>
            </Row>
         </Fragment>
      );
   }
}

export default InputGrids;
