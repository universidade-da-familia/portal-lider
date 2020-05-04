import React, { PureComponent } from "react";
import { Card, CardTitle, CardBody } from "reactstrap";
import PropTypes from "prop-types";

import * as Icon from "react-feather";

//Chsrtis JS
import ChartistGraph from "react-chartist";
import Chartist from "chartist";
//Chsrtis CSS
import "chartist/dist/chartist.min.css";
//Component specific chart CSS
import "../../assets/scss/components/cards/earningStatisticChartCard.scss";

class EarningStatisticChartCard extends PureComponent {
   render() {
      return (
         <Card>
            <CardBody>
               <CardTitle className="mb-0">{this.props.cardTitle}</CardTitle>
               <span className="grey">{this.props.cardSubTitle}</span>
               <div className="earning-details my-4">
                  <h3 className="font-large-2 mb-2">
                     {this.props.earningAmount}
                     <Icon.ArrowUp
                        size={56}
                        strokeWidth="1.4"
                        className="teal accent-3"
                     />
                  </h3>
                  <span className="font-medium-1 grey d-block">
                     {this.props.earningText}
                  </span>
               </div>

               <ChartistGraph
                  className="height-100 WidgetlineChart2 WidgetlineChart2Shadow"
                  data={this.props.earningStatisticData}
                  type="Line"
                  options={{
                     axisX: {
                        showGrid: true,
                        showLabel: false,
                        offset: 0
                     },
                     axisY: {
                        showGrid: false,
                        low: 40,
                        showLabel: false,
                        offset: 0
                     },
                     lineSmooth: Chartist.Interpolation.cardinal({
                        tension: 0
                     }),
                     fullWidth: true
                  }}
                  listener={{
                     created: data => {
                        let defs = data.svg.elem("defs");
                        defs
                           .elem("linearGradient", {
                              id: "widgradient1",
                              x1: 0,
                              y1: 1,
                              x2: 0,
                              y2: 0
                           })
                           .elem("stop", {
                              offset: 0,
                              "stop-color": "rgba(0, 201, 255,1)"
                           })
                           .parent()
                           .elem("stop", {
                              offset: 1,
                              "stop-color": "rgba(17,228,183, 1)"
                           });
                     }
                  }}
               />
            </CardBody>
         </Card>
      );
   }
}

EarningStatisticChartCard.propTypes = {
   cardTitle: PropTypes.string,
   cardSubTitle: PropTypes.string,
   earningAmount: PropTypes.string,
   earningText: PropTypes.string,
   earningStatisticData: PropTypes.object
};

export default EarningStatisticChartCard;
