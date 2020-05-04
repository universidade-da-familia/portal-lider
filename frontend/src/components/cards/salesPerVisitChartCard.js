import React, { PureComponent } from "react";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import PropTypes from "prop-types";
//Chsrtis JS
import ChartistGraph from "react-chartist";
import Chartist from "chartist";
//Chsrtis CSS
import "chartist/dist/chartist.min.css";
//Component specific chart CSS
import "../../assets/scss/components/cards/salesPerVisitChartCard.scss";

class SalesPerVisit extends PureComponent {
   render() {
      return (
         <Card>
            <CardHeader>
               <CardTitle className="mb-0">{this.props.cardTitle}</CardTitle>
            </CardHeader>
            <CardBody className="pt-2 pb-0">
               <div className="chart-info mb-2">
                  <span className="text-uppercase mr-3">
                     <i className="fa fa-circle primary font-small-2 mr-1" />{" "}
                     {this.props.salesText}
                  </span>
                  <span className="text-uppercase mr-3">
                     <i className="fa fa-circle warning font-small-2 mr-1" />{" "}
                     {this.props.visitText}
                  </span>
               </div>
            </CardBody>
            <ChartistGraph
               className="height-300 lineAreaChart mb-1"
               data={this.props.salesPerVisitData}
               type="Line"
               options={{
                  low: 0,
                  showArea: true,
                  fullWidth: true,
                  onlyInteger: true,
                  axisY: {
                     low: 0,
                     scaleMinSpace: 50
                  },
                  axisX: {
                     showGrid: false
                  }
               }}
               listener={{
                  created: data => {
                     let defs = data.svg.elem("defs");
                     defs
                        .elem("linearGradient", {
                           id: "gradient",
                           x1: 0,
                           y1: 1,
                           x2: 0,
                           y2: 0
                        })
                        .elem("stop", {
                           offset: 0,
                           "stop-color": "rgba(255, 255, 255, 1)"
                        })
                        .parent()
                        .elem("stop", {
                           offset: 1,
                           "stop-color": "rgba(38, 198, 218, 1)"
                        });
                  },
                  draw: data => {
                     let circleRadius = 6;
                     if (data.type === "point") {
                        let circle = new Chartist.Svg("circle", {
                           cx: data.x,
                           cy: data.y,
                           r: circleRadius,
                           'class': "ct-point-circle"
                        });
                        data.element.replace(circle);
                     }
                  }
               }}
            />
         </Card>
      );
   }
}

SalesPerVisit.propTypes = {
   cardTitle: PropTypes.string,
   salesText: PropTypes.string,
   visitText: PropTypes.string,
   salesPerVisitData: PropTypes.object
};

export default SalesPerVisit;
