import React, { PureComponent } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import PropTypes from "prop-types";

import * as Icon from "react-feather";

//Chsrtis JS
import ChartistGraph from "react-chartist";
//Chsrtis CSS
import "chartist/dist/chartist.min.css";
//Component specific chart CSS
import "../../assets/scss/components/cards/userStatisticChartCard.scss";

class UserStatisticChartCard extends PureComponent {
   render() {
      return (
         <Card>
            <CardBody>
               <Row className="d-flex mb-3 py-2">
                  <Col sm="12" className="text-center">
                     <img
                        src={require("../../assets/img/portrait/small/avatar-s-8.png")}
                        className="bg-danger width-100 rounded-circle img-fluid mb-4"
                        alt="Card cap 02"
                     />
                     <h3 className="font-large-1 text-center">
                        {this.props.fullName}
                     </h3>
                     <span className="font-medium-1 grey d-block text-center">
                        {this.props.department}
                     </span>
                  </Col>
               </Row>
               <Row className="mt-4 mb-3">
                  <Col sm="7">
                     <ChartistGraph
                        className="height-75 WidgetlineChart1 WidgetlineChart1Shadow px-2"
                        data={this.props.userStatisticData}
                        type="Line"
                        options={{
                           axisX: {
                              showGrid: false,
                              showLabel: false,
                              offset: 0
                           },
                           axisY: {
                              showGrid: false,
                              low: 50,
                              showLabel: false,
                              offset: 0
                           },
                           fullWidth: true,
                           chartPadding: {
                              top: 0,
                              right: 0,
                              bottom: 10,
                              left: 0
                           }
                        }}
                        listener={{
                           created: data => {
                              let defs = data.svg.elem("defs");
                              defs
                                 .elem("linearGradient", {
                                    id: "widgradient",
                                    x1: 0,
                                    y1: 1,
                                    x2: 0,
                                    y2: 0
                                 })
                                 .elem("stop", {
                                    offset: 0,
                                    "stop-color": "rgba(132, 60, 247, 1)"
                                 })
                                 .parent()
                                 .elem("stop", {
                                    offset: 1,
                                    "stop-color": "rgba(56, 184, 242, 1)"
                                 });
                           }
                        }}
                     />
                  </Col>
                  <Col sm="5">
                     <span className="font-large-1">
                        <Icon.ArrowUpCircle
                           size={20}
                           strokeWidth="1.6"
                           className="success"
                        />{" "}
                        27%
                     </span>
                  </Col>
               </Row>
            </CardBody>
         </Card>
      );
   }
}

UserStatisticChartCard.propTypes = {
   fullName: PropTypes.string,
   department: PropTypes.string,
   userStatisticData: PropTypes.object
};

export default UserStatisticChartCard;
