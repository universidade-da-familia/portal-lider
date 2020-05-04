import React, { PureComponent } from "react";
import { Card, CardBody, Media } from "reactstrap";
import PropTypes from "prop-types";
import classnames from "classnames";


//Chsrtis JS 
import ChartistGraph from "react-chartist";
import ChartistLib from "chartist";
//Chsrtis CSS
import "chartist/dist/chartist.min.css";
//Component specific chart CSS
import "../../assets/scss/components/cards/minimalStatisticsCardWithChart.scss";

class MinimalStatisticsChart extends PureComponent {
   render() {
      let iconLeft;
      let iconRight;
      let textDirection;

      if (this.props.iconSide === "right") {
         iconRight = this.props.children;
      } else {
         iconLeft = this.props.children;
         textDirection = "text-right";
      }
      return (
         <Card className={classnames(this.props.cardBgColor)}>
            <CardBody className="pt-2 pb-0">
               <Media>
                  {iconLeft}
                  <Media body className={classnames("white", textDirection)}>
                     <h3 className={classnames("font-large-1 mb-1", this.props.statisticsColor)}>{this.props.statistics}</h3>
                     <span>{this.props.text}</span>
                  </Media>
                  {iconRight}
               </Media>
            </CardBody>
            <ChartistGraph
               className="WidgetlineChart WidgetlineChartshadow mb-2"
               data={this.props.chartData}
               type="Line"
               options={{
                  height: "75px",
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
                  lineSmooth: ChartistLib.Interpolation.cardinal({
                     tension: 0
                  }),
                  fullWidth: true
               }}
            />
         </Card>
      );
   }
}

MinimalStatisticsChart.propTypes = {
   iconSide: PropTypes.string,   
   statisticsColor: PropTypes.string,
   statistics: PropTypes.string,
   cardBgColor: PropTypes.string,
   text: PropTypes.string,
   chartData: PropTypes.object
};

export default MinimalStatisticsChart;
