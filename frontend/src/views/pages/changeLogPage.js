// import external modules
import React, { Component, Fragment } from "react";
import ContentHeader from "../../components/contentHead/contentHeader";
import { Row, Col, Card, CardBody, CardTitle, Badge } from "reactstrap";

class blankPage extends Component {
   render() {
      return (
         <Fragment>
            <ContentHeader>Changelog</ContentHeader>
            <Row>
               <Col xs="12">
                  <Card>
                     <CardBody>
                        <CardTitle>
                           v1.1.0
                           <small className="text-muted ml-2">(15-Nov-2018)</small>
                        </CardTitle>
                        <Badge color="success my-2">New</Badge>
                        <ul>
                           <li>Added Built-in Customizer</li>
                           <li>Added Dark Layout</li>
                           <li>Added ToDo application</li>
                           <li>Added Chat Application</li>
                           <li>Added React Toaster</li>
                        </ul>
                        <Badge color="warning my-2">Fixed</Badge>
                        <ul>
                           <li>Fixed minor UI issues and improve it</li>
                        </ul>
                     </CardBody>
                  </Card>
                  <Card>
                     <CardBody>
                        <CardTitle>
                           v1.0.0
                           <small className="text-muted ml-2">(15-Nov-2018)</small>
                        </CardTitle>
                        <Badge color="success my-2">New</Badge>
                        <ul>
                           <li>Initial Release</li>
                        </ul>
                     </CardBody>
                  </Card>
               </Col>
            </Row>
         </Fragment>
      );
   }
}

export default blankPage;
