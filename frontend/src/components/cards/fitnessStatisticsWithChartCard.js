import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
// reactstrap core  components
import { Card, CardBody } from "reactstrap";
//Chsrtis JS
import ChartistGraph from "react-chartist";
//Chsrtis CSS
import "chartist/dist/chartist.min.css";
//Component specific chart CSS
import "../../assets/scss/components/cards/fitnessStatisticsCardWithChart.scss";

class FitnessStatisticsCardWithChart extends PureComponent {
   render() {
      return (
         <Card>
            <CardBody className="px-3 py-3">
               <div className="text-center pb-0">
                  <span
                     className={classnames(
                        "font-medium-2",
                        this.props.textColor
                     )}
                  >
                     {this.props.textTop}
                  </span>
                  <h3 className="font-large-2 mt-1">
                     {this.props.statisticsTop}
                     <span className="font-medium-1 grey darken-1 text-bold-400">
                        {this.props.statisticsTopUnit}
                     </span>
                  </h3>
               </div>
               <ChartistGraph
                  className={classnames(
                     "height-250",
                     this.props.dountChartClass
                  )}
                  data={this.props.donutChartData}
                  type="Pie"
                  options={{
                     donut: true,
                     donutWidth: 3,
                     startAngle: 0,
                     chartPadding: 25,
                     total: 13,
                     labelInterpolationFnc: value => {
                        return "\ue9c9";
                     }
                  }}
                  listener={{
                     draw: data => {
                        if (data.type === "label") {
                           data.element.remove();
                        }
                     }
                  }}
               />
               <div className="text-center">
                  <span className="font-large-1 d-block mb-1">
                     {this.props.statisticsBottom}
                  </span>
                  <span
                     className={classnames(
                        "primary font-medium-1",
                        this.props.textColor
                     )}
                  >
                     {this.props.textBottom}
                  </span>
               </div>
            </CardBody>
         </Card>
      );
   }
}

FitnessStatisticsCardWithChart.propTypes = {
   donutChartData: PropTypes.object,
   textTop: PropTypes.string,
   statisticsTopUnit: PropTypes.string,
   statisticsTop: PropTypes.string,
   textBottom: PropTypes.string,
   statisticsBottom: PropTypes.string,
   textColor: PropTypes.string
};

export default FitnessStatisticsCardWithChart;
