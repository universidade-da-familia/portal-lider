import React, { PureComponent } from "react";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";

//Chsrtis JS
import ChartistGraph from "react-chartist";
import ChartistLib from "chartist";
//Chsrtis CSS
import "chartist/dist/chartist.min.css";
//Component specific chart CSS
import "../../assets/scss/components/cards/weeklySalesStatisticsBarChartCard.scss";

class WeeklySalesStatisticsBarChartCard extends PureComponent {
   render() {
      return (
         <Card className={classnames(this.props.cardBgColor)}>            
            <CardHeader>
               <CardTitle className="mb-0 white">
                  {this.props.cardTitle}
               </CardTitle>
            </CardHeader>
            <CardBody className="pt-2 pb-0">
               <div className="p-2 text-center">
                <Link to="/" className="white font-medium-1">
                    Month
                </Link>
                <Link to="/" className="btn btn-round bg-white mx-3 my-0 px-3">
                    Week
                </Link>
                <Link to="/" className="white font-medium-1">
                    Day
                </Link>
               </div>
               <div className="my-3 text-center white">
                <Link to="/" className="font-large-2 d-block mb-1 white">
                    {this.props.statisticsAmount}{" "}
                    <span className="ft-arrow-up font-large-2" />
                </Link>
                  <span className="font-medium-1">
                     {this.props.statisticsRangeAmount}
                  </span>
               </div>
            </CardBody>
            <ChartistGraph
               className="height-250 lineChart lineChartShadow"
               data={this.props.weeklySalesStatisticsBarChartData}
               type="Line"
               options={{
                  axisX: {
                     showGrid: false
                  },
                  axisY: {
                     showGrid: false,
                     showLabel: false,
                     low: 0,
                     high: 100,
                     offset: 0
                  },
                  fullWidth: true,
                  offset: 0,
                  chartPadding: 25,
               }}
               listener={{
                  created: data => {
                     let circleRadius = 4;
                     if (data.type === "point") {
                        let circle = new ChartistLib.Svg("circle", {
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

WeeklySalesStatisticsBarChartCard.propTypes = {
   cardTitle: PropTypes.string,
   cardSubTitle: PropTypes.string,
   statisticsRangeAmount: PropTypes.string,
   statisticsAmount: PropTypes.string,
   weeklySalesStatisticsBarChartData: PropTypes.object
};

export default WeeklySalesStatisticsBarChartCard;
