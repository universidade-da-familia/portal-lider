import React, { PureComponent } from "react";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import PropTypes from "prop-types";
import classnames from "classnames";

//Chsrtis JS
import ChartistGraph from "react-chartist";
//Chsrtis CSS
import "chartist/dist/chartist.min.css";
//Component specific chart CSS
import "../../assets/scss/components/cards/hobbiesStatisticsBarChartCard.scss";

class HobbiesStatisticsBarChartCard extends PureComponent {
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
               className="height-400 BarChartShadow BarChart"
               data={this.props.hobbiesStatisticsBarChartData}
               type="Bar"
               options={{
                  axisX: {
                     showGrid: false
                  },
                  axisY: {
                     showGrid: false,
                     showLabel: false,
                     offset: 0
                  },
                  low: 0
               }}
               listener={{
                  created: data => {
                     let defs = data.svg.elem("defs");
                     defs
                        .elem("linearGradient", {
                           id: "gradient4",
                           x1: 0,
                           y1: 1,
                           x2: 0,
                           y2: 0
                        })
                        .elem("stop", {
                           offset: 0,
                           "stop-color": "rgba(238, 9, 121,1)"
                        })
                        .parent()
                        .elem("stop", {
                           offset: 1,
                           "stop-color": "rgba(255, 106, 0, 1)"
                        });
                     defs
                        .elem("linearGradient", {
                           id: "gradient5",
                           x1: 0,
                           y1: 1,
                           x2: 0,
                           y2: 0
                        })
                        .elem("stop", {
                           offset: 0,
                           "stop-color": "rgba(0, 75, 145,1)"
                        })
                        .parent()
                        .elem("stop", {
                           offset: 1,
                           "stop-color": "rgba(120, 204, 55, 1)"
                        });

                     defs
                        .elem("linearGradient", {
                           id: "gradient6",
                           x1: 0,
                           y1: 1,
                           x2: 0,
                           y2: 0
                        })
                        .elem("stop", {
                           offset: 0,
                           "stop-color": "rgba(132, 60, 247,1)"
                        })
                        .parent()
                        .elem("stop", {
                           offset: 1,
                           "stop-color": "rgba(56, 184, 242, 1)"
                        });
                     defs
                        .elem("linearGradient", {
                           id: "gradient7",
                           x1: 0,
                           y1: 1,
                           x2: 0,
                           y2: 0
                        })
                        .elem("stop", {
                           offset: 0,
                           "stop-color": "rgba(155, 60, 183,1)"
                        })
                        .parent()
                        .elem("stop", {
                           offset: 1,
                           "stop-color": "rgba(255, 57, 111, 1)"
                        });
                  },
                  draw: data => {
                     if (data.type === "bar") {
                        data.element.attr({
                           y1: 340,
                           x1: data.x1 + 0.001
                        });
                     }
                  }
               }}
            />
         </Card>
      );
   }
}

HobbiesStatisticsBarChartCard.propTypes = {
   cardTitle: PropTypes.string,
   cardSubTitle: PropTypes.string,
   stackbarchartData: PropTypes.object
};

export default HobbiesStatisticsBarChartCard;
