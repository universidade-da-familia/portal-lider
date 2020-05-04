import React, { PureComponent } from "react";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import PropTypes from "prop-types";
//Chsrtis JS
import ChartistGraph from "react-chartist";
import Chartist from "chartist";
//Chsrtis CSS
import "chartist/dist/chartist.min.css";
//Component specific chart CSS
import "../../assets/scss/components/cards/visitSalesStatistics.scss";

class VisitSalesStatistics extends PureComponent {
   render() {
      return (
         <Card>
            <CardHeader>
               <CardTitle className="mb-0">{this.props.cardTitle}</CardTitle>
            </CardHeader>
            <CardBody className="pt-2 pb-0">
               <div className="chart-info mb-2">
                  <span className="text-uppercase mr-3">
                     <i className="fa fa-circle primary font-small-2 mr-1" /> {this.props.salesText}
                  </span>
                  <span className="text-uppercase">
                     <i className="fa fa-circle deep-purple font-small-2 mr-1" /> {this.props.visitText}
                  </span>
               </div>
            </CardBody>
            <ChartistGraph
               className="height-400 lineAreaDashboard"
               data={this.props.visitSalesData}
               type="Line"
               options={{
                  showArea: true,
                  fullWidth: true,
                  lineSmooth: Chartist.Interpolation.none(),
                  axisX: {
                     showGrid: false
                  },
                  axisY: {
                     low: 0,
                     scaleMinSpace: 50
                  }
               }}
               listener={{
                  created: data => {
                     let defs = data.svg.elem("defs");
                     defs
                        .elem("linearGradient", {
                           id: "gradient2",
                           x1: 0,
                           y1: 1,
                           x2: 0,
                           y2: 0
                        })
                        .elem("stop", {
                           offset: 0,
                           "stop-opacity": "0.2",
                           "stop-color": "rgba(255, 255, 255, 1)"
                        })
                        .parent()
                        .elem("stop", {
                           offset: 1,
                           "stop-opacity": "0.2",
                           "stop-color": "rgba(0, 201, 255, 1)"
                        });

                     defs
                        .elem("linearGradient", {
                           id: "gradient3",
                           x1: 0,
                           y1: 1,
                           x2: 0,
                           y2: 0
                        })
                        .elem("stop", {
                           offset: 0.3,
                           "stop-opacity": "0.2",
                           "stop-color": "rgba(255, 255, 255, 1)"
                        })
                        .parent()
                        .elem("stop", {
                           offset: 1,
                           "stop-opacity": "0.2",
                           "stop-color": "rgba(132, 60, 247, 1)"
                        });
                  },
                  draw: data => {
                     let circleRadius = 4;
                     if (data.type === "point") {
                        let circle = new Chartist.Svg("circle", {
                           cx: data.x,
                           cy: data.y,
                           r: circleRadius,
                           'class': "ct-point-circle"
                        });
                        data.element.replace(circle);
                     } else if (data.type === "label") {
                        // adjust label position for rotation
                        const dX = data.width / 2 + (30 - data.width);
                        data.element.attr({ x: data.element.attr("x") - dX });
                     }
                  }
               }}
            />
         </Card>
      );
   }
}

VisitSalesStatistics.propTypes = {
   cardTitle: PropTypes.string,
   salesText: PropTypes.string,
   visitText: PropTypes.string,
   visitSalesData: PropTypes.object
};

export default VisitSalesStatistics;
