import React, { PureComponent } from "react";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import PropTypes from "prop-types";
import classnames from "classnames";

//Chsrtis JS
import ChartistGraph from "react-chartist";
//Chsrtis CSS
import "chartist/dist/chartist.min.css";
//Component specific chart CSS
import "../../assets/scss/components/cards/monthlySalesStatisticsBarChartCard.scss";

class MonthlySalesStatisticsBarChartCard extends PureComponent {
   render() {
      return (
         <Card className={classnames(this.props.cardBgColor)}>
            <CardHeader>
               <CardTitle className="mb-0">{this.props.cardTitle}</CardTitle>
            </CardHeader>
            <CardBody className="pt-2 pb-0">
               <p className="font-medium-2 text-muted text-center pb-2">
                  {this.props.cardSubTitle}
               </p>
            </CardBody>
            <ChartistGraph
               className="height-300 Stackbarchart mb-2"
               data={this.props.monthlySalesStatisticsBarChartData}
               type="Bar"
               options={{
                  stackBars: true,
                  fullWidth: true,
                  axisX: {
                     showGrid: false
                  },
                  axisY: {
                     showGrid: false,
                     showLabel: false,
                     offset: 0
                  },
                  chartPadding: 30
               }}
               listener={{
                  created: data => {
                     let defs = data.svg.elem("defs");
                     defs
                        .elem("linearGradient", {
                           id: "linear",
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
                  },
                  draw: data => {
                     if (data.type === "bar") {
                        data.element.attr({
                           style: "stroke-width: 5px",
                           x1: data.x1 + 0.001
                        });
                     } else if (data.type === "label") {
                        data.element.attr({
                           y: 270
                        });
                     }
                  }
               }}
            />
         </Card>
      );
   }
}

MonthlySalesStatisticsBarChartCard.propTypes = {
   cardTitle: PropTypes.string,
   cardSubTitle: PropTypes.string,
   stackbarchartData: PropTypes.object
};

export default MonthlySalesStatisticsBarChartCard;
