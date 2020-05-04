import React, { Component, Fragment } from "react";
import { Card, CardBody, CardTitle, Row, Col, Form, CustomInput, FormGroup, Label, Input, FormText } from "reactstrap";
import { Search, Upload, User, Bell, Loader, RefreshCw} from "react-feather";

import ContentHeader from "../../../components/contentHead/contentHeader";
import ContentSubHeader from "../../../components/contentHead/contentSubHeader";

class Inputs extends Component {
   render() {
      return (
         <Fragment>
            <ContentHeader>Form Inputs</ContentHeader>
            <ContentSubHeader>Basic Input Examples.</ContentSubHeader>

            <Row>
               <Col sm="12">
                  <Card>
                     <CardBody>
                        <CardTitle>Text Inputs</CardTitle>
                        <Form>
                           <Row>
                              <Col xl="4" lg="6" md="12">
                                 <FormGroup>
                                    <Label for="basicinput">Basic Input</Label>
                                    <Input type="text" id="basicinput" name="basicinput" />
                                 </FormGroup>
                              </Col>
                              <Col xl="4" lg="6" md="12">
                                 <FormGroup>
                                    <Label for="dinput">INPUT TEXT WITH HELP</Label>
                                    <small className="text-muted">
                                       eg.
                                       <i>someone@example.com</i>
                                    </small>
                                    <Input type="text" id="dinput" name="hinput" />
                                 </FormGroup>
                              </Col>
                              <Col xl="4" lg="6" md="12">
                                 <FormGroup>
                                    <Label for="projectinput1">DISABLED INPUT</Label>
                                    <Input type="text" id="projectinput1" name="dinput" disabled />
                                 </FormGroup>
                              </Col>
                              <Col xl="4" lg="6" md="12">
                                 <FormGroup>
                                    <Label for="rinput">READONLY INPUT</Label>
                                    <Input type="text" id="rinput" name="rinput" readOnly value="You can't update me :P" />
                                 </FormGroup>
                              </Col>
                              <Col xl="4" lg="6" md="12">
                                 <FormGroup>
                                    <Label for="pinput">INPUT WITH PLACEHOLDER</Label>
                                    <Input type="text" id="pinput" name="pinput" placeholder="Enter Email Address" />
                                 </FormGroup>
                              </Col>
                              <Col xl="4" lg="6" md="12">
                                 <FormGroup>
                                    <Label for="sinput">STATIC TEXT</Label>
                                    <Input plaintext>email@pixinvent.com</Input>
                                 </FormGroup>
                              </Col>
                              <Col xl="4" lg="6" md="12">
                                 <FormGroup>
                                    <Label for="roundinput">ROUNDED INPUT</Label>
                                    <Input type="text" id="roundinput" name="roundinput" className="round" />
                                 </FormGroup>
                              </Col>
                              <Col xl="4" lg="6" md="12">
                                 <FormGroup>
                                    <Label for="squareinput">SQUARE INPUT</Label>
                                    <Input type="text" id="squareinput" name="squareinput" className="square" />
                                 </FormGroup>
                              </Col>
                              <Col xl="4" lg="6" md="12">
                                 <FormGroup>
                                    <Label for="helpertxtinput">WITH HELPER TEXT</Label>
                                    <Input type="text" id="helpertxtinput" name="helpertxtinput" />
                                    <FormText color="muted">This is some placeholder block-level help text for the above input.</FormText>
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
                        <CardTitle>Textarea</CardTitle>
                        <Form>
                           <Row>
                              <Col xl="4" lg="6" md="12">
                                 <FormGroup>
                                    <Label for="basictextarea">Basic Textarea</Label>
                                    <Input type="textarea" id="basictextarea" rows="5" name="basictextarea" />
                                 </FormGroup>
                              </Col>
                              <Col xl="4" lg="6" md="12">
                                 <FormGroup>
                                    <Label for="textareaplaceholder">Textarea With Placeholder (Round)</Label>
                                    <Input type="textarea" id="textareaplaceholder" className="round" rows="5" name="textareaplaceholder" placeholder="Textarea with placeholder" />
                                 </FormGroup>
                              </Col>
                              <Col xl="4" lg="6" md="12">
                                 <FormGroup>
                                    <Label for="textareadesc">Textarea With Description (Square)</Label>
                                    <Input type="textarea" id="textareadesc" rows="5" className="square" name="textareadesc" placeholder="Textarea with description" />
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
                        <CardTitle>Select</CardTitle>
                        <Form>
                           <Row>
                              <Col xl="4" lg="6" md="12">
                                 <FormGroup>
                                    <Label for="basicselect">Basic Select</Label>
                                    <Input type="select" id="basicselect" name="interested">
                                       <option value="none" defaultValue="" disabled="">
                                          Select Option
                                       </option>
                                       <option value="design">design</option>
                                       <option value="development">development</option>
                                       <option value="illustration">illustration</option>
                                       <option value="branding">branding</option>
                                       <option value="video">video</option>
                                    </Input>
                                 </FormGroup>
                              </Col>
                              <Col xl="4" lg="6" md="12">
                                 <FormGroup>
                                    <Label for="exampleCustomSelect">Custom Select</Label>
                                    <CustomInput type="select" id="exampleCustomSelect" name="customSelect">
                                       <option value="">Select</option>
                                       <option>Value 1</option>
                                       <option>Value 2</option>
                                       <option>Value 3</option>
                                       <option>Value 4</option>
                                       <option>Value 5</option>
                                    </CustomInput>
                                 </FormGroup>
                              </Col>
                              <Col xl="4" lg="6" md="12">
                                 <FormGroup>
                                    <Label for="exampleSelectMulti">Select Multiple</Label>
                                    <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
                                       <option>Value 1</option>
                                       <option>Value 2</option>
                                       <option>Value 3</option>
                                       <option>Value 4</option>
                                       <option>Value 5</option>
                                    </Input>
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
                        <CardTitle>File Input</CardTitle>
                        <Form>
                           <Row>
                              <Col xl="6" lg="6" md="12">
                                 <FormGroup>
                                    <Label for="exampleFile">Simple File Input</Label>
                                    <Input type="file" name="file" id="exampleFile" />
                                 </FormGroup>
                              </Col>
                              <Col xl="6" lg="6" md="12">
                                 <FormGroup>
                                    <Label for="exampleCustomFileBrowser">Custom File Input</Label>
                                    <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" />
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
                        <CardTitle>Checkboxes</CardTitle>
                        <Form>
                            <Row>
                                <Col md="6" sm="12">
                                    <FormGroup tag="fieldset">
                                        <h6>Default Raido Buttons</h6>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="checkbox" defaultChecked />{' '}
                                                Default Checkbox
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="checkbox" />{' '}
                                                Second Default Checkbox
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="checkbox" disabled />{' '}
                                                Default Checkbox
                                            </Label>
                                        </FormGroup>
                                    </FormGroup>
                                </Col>
                                <Col md="6" sm="12">
                                    <FormGroup tag="fieldset">
                                        <h6>Custom checkbox</h6>
                                        <FormGroup check className="px-0">
                                            <CustomInput type="checkbox" id="exampleCustomCheckbox" label="Check this custom checkbox" defaultChecked />
                                        </FormGroup>
                                        <FormGroup check className="px-0">
                                            <CustomInput type="checkbox" id="exampleCustomCheckbox2" label="Or this one" />
                                        </FormGroup>
                                        <FormGroup check className="px-0">
                                            <CustomInput type="checkbox" id="exampleCustomCheckbox3" label="But not this disabled one" disabled />
                                        </FormGroup>
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
                        <CardTitle>Radio Buttons</CardTitle>
                        <Form>
                            <Row>
                                <Col md="6" sm="12">
                                    <FormGroup tag="fieldset">
                                        <h6>Default Raido Buttons</h6>
                                        <FormGroup check>
                                            <Label check>
                                            <Input type="radio" name="radio1" defaultChecked />{' '}
                                                Default radio
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Label check>
                                            <Input type="radio" name="radio1" />{' '}
                                                Second default radio
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check disabled>
                                            <Label check>
                                            <Input type="radio" name="radio1" disabled />{' '}
                                                Disabled radio
                                            </Label>
                                        </FormGroup>
                                    </FormGroup>
                                </Col>
                                <Col md="6" sm="12">
                                    <FormGroup tag="fieldset">
                                        <h6>Custom Raido Buttons</h6>
                                        <FormGroup check className="px-0">
                                            <CustomInput type="radio" id="exampleCustomRadio" name="customRadio" label="Custom radio" defaultChecked />
                                        </FormGroup>
                                        <FormGroup check className="px-0">
                                            <CustomInput type="radio" id="exampleCustomRadio2" name="customRadio" label="Select this one" />
                                        </FormGroup>
                                        <FormGroup check className="px-0">
                                            <CustomInput type="radio" id="exampleCustomRadio3" label="But not this disabled one" disabled />
                                        </FormGroup>
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
                        <CardTitle>Sizing Options</CardTitle>
                        <Form>
                           <Row>
                              <Col xl="6" lg="6" md="12">
                                 <FormGroup>
                                    <Label for="largeInput">Large Input</Label>
                                    <Input id="largeInput" placeholder="Large Input" bsSize="lg" />
                                 </FormGroup>
                              </Col>
                              <Col xl="6" lg="6" md="12">
                                 <FormGroup>
                                    <Label for="largeSelect">Large Select</Label>
                                    <Input type="select" id="largeSelect" name="largeSelect" bsSize="lg">
                                       <option value="none" defaultValue="" disabled="">
                                          Select Option
                                       </option>
                                       <option value="design">design</option>
                                       <option value="development">development</option>
                                       <option value="illustration">illustration</option>
                                       <option value="branding">branding</option>
                                       <option value="video">video</option>
                                    </Input>
                                 </FormGroup>
                              </Col>
                              <Col xl="6" lg="6" md="12">
                                 <FormGroup>
                                    <Label for="defaultInput">Default Input</Label>
                                    <Input id="defaultInput" placeholder="Default Input" />
                                 </FormGroup>
                              </Col>
                              <Col xl="6" lg="6" md="12">
                                 <FormGroup>
                                    <Label for="defaultSelect">Default Select</Label>
                                    <Input type="select" id="defaultSelect" name="defaultSelect">
                                       <option value="none" defaultValue="" disabled="">
                                          Select Option
                                       </option>
                                       <option value="design">design</option>
                                       <option value="development">development</option>
                                       <option value="illustration">illustration</option>
                                       <option value="branding">branding</option>
                                       <option value="video">video</option>
                                    </Input>
                                 </FormGroup>
                              </Col>
                              <Col xl="6" lg="6" md="12">
                                 <FormGroup>
                                    <Label for="smallInput">Small Input</Label>
                                    <Input id="smallInput" placeholder="Small Input" bsSize="sm" />
                                 </FormGroup>
                              </Col>
                              <Col xl="6" lg="6" md="12">
                                 <FormGroup>
                                    <Label for="smallSelect">Small Select</Label>
                                    <Input type="select" id="smallSelect" name="smallSelect" bsSize="sm">
                                       <option value="none" defaultValue="" disabled="">
                                          Select Option
                                       </option>
                                       <option value="design">design</option>
                                       <option value="development">development</option>
                                       <option value="illustration">illustration</option>
                                       <option value="branding">branding</option>
                                       <option value="video">video</option>
                                    </Input>
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
                        <CardTitle>Input With Icons</CardTitle>
                        <Form>
                           <Row>
                              <Col xl="6" lg="6" md="12">
                                 <FormGroup>
                                    <Label for="iconLeft">Icon Left Class</Label>
                                    <div className="position-relative has-icon-left">
                                       <Input type="text" id="iconLeft" name="iconLeft" />
                                       <div className="form-control-position">
                                          <Search size={14} className="info" />
                                       </div>
                                    </div>
                                 </FormGroup>
                              </Col>
                              <Col xl="6" lg="6" md="12">
                                 <FormGroup>
                                    <Label for="iconRight">Icon Right Class</Label>
                                    <div className="position-relative has-icon-right">
                                       <Input type="text" id="iconRight" name="iconRight" />
                                       <div className="form-control-position">
                                          <Upload size={14} className="warning" />
                                       </div>
                                    </div>
                                 </FormGroup>
                              </Col>
                              <Col xl="6" lg="6" md="12">
                                 <FormGroup>
                                    <Label for="iconLeft">Icon Left Class</Label>
                                    <div className="position-relative has-icon-left">
                                       <Input type="text" id="iconLeft" name="iconLeft" className="round" />
                                       <div className="form-control-position">
                                          <User size={14} className="danger" />
                                       </div>
                                    </div>
                                 </FormGroup>
                              </Col>
                              <Col xl="6" lg="6" md="12">
                                 <FormGroup>
                                    <Label for="iconRight">Icon Right Class</Label>
                                    <div className="position-relative has-icon-right">
                                       <Input type="text" id="iconRight" name="iconRight" className="round" />
                                       <div className="form-control-position">
                                          <Bell size={14} className="success" />
                                       </div>
                                    </div>
                                 </FormGroup>
                              </Col>
                              <Col xl="6" lg="6" md="12">
                                 <FormGroup>
                                    <Label for="iconLeft">Icon Left Class</Label>
                                    <div className="position-relative has-icon-left">
                                       <Input type="text" id="iconLeft" name="iconLeft" className="square" />
                                       <div className="form-control-position">
                                          <Loader size={14} className="spinner" />
                                       </div>
                                    </div>
                                 </FormGroup>
                              </Col>
                              <Col xl="6" lg="6" md="12">
                                 <FormGroup>
                                    <Label for="iconRight">Icon Right Class</Label>
                                    <div className="position-relative has-icon-right">
                                       <Input type="text" id="iconRight" name="iconRight" className="square" />
                                       <div className="form-control-position">
                                          <RefreshCw size={14} className="spinner" />
                                       </div>
                                    </div>
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
export default Inputs;
