import React, { PureComponent } from "react";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import PropTypes from "prop-types";
//Chsrtis JS
import ChartistGraph from "react-chartist";
//Chsrtis CSS
import "chartist/dist/chartist.min.css";
//Component specific chart CSS
import "../../assets/scss/components/cards/salesAnalysisChartCard.scss";

class SalesAnalysisChart extends PureComponent {
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
                  <span className="text-uppercase mr-3">
                     <i className="fa fa-circle warning font-small-2 mr-1" /> {this.props.visitText}
                  </span>
                  <span className="text-uppercase">
                     <i className="fa fa-circle danger font-small-2 mr-1" /> {this.props.clickText}
                  </span>
               </div>
            </CardBody>
            <ChartistGraph
               className="height-350 lineChart1 lineChart1Shadow"
               data={this.props.salesAnalysisData}
               type="Line"
               options={{
                  axisX: {
                     showGrid: false
                  },
                  axisY: {
                     low: 0,
                     scaleMinSpace: 50
                  },
                  fullWidth: true,
                  chartPadding: { top: 0, right: 25, bottom: 0, left: 0 }
               }}
            />
         </Card>
      );
   }
}

SalesAnalysisChart.propTypes = {
   cardTitle: PropTypes.string,
   salesText: PropTypes.string,
   visitText: PropTypes.string,
   clickText: PropTypes.string,
   salesAnalysisData: PropTypes.object
};

export default SalesAnalysisChart;
