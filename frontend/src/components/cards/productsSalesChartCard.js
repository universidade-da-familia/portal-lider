import React, { PureComponent } from "react";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import PropTypes from "prop-types";
//Chsrtis JS
import ChartistGraph from "react-chartist";
//Chsrtis CSS
import "chartist/dist/chartist.min.css";
//Component specific chart CSS
import "../../assets/scss/components/cards/productSalesChartCard.scss";

class ProductSalesChartCard extends PureComponent {
   render() {
      return (
         <Card>
            <CardHeader>
               <CardTitle className="mb-0">{this.props.cardTitle}</CardTitle>
            </CardHeader>
            <CardBody className="pt-2 pb-0">
               <div className="chart-info mb-2">
                  <span className="gradient-blackberry d-inline-block rounded-circle mr-1 p-1">
                     {" "}
                  </span>
                  {this.props.salesText}
                  <span className="gradient-mint d-inline-block rounded-circle mr-1 ml-2 p-1">
                     {" "}
                  </span>
                  {this.props.visitText}
               </div>
            </CardBody>
            <ChartistGraph
               className="height-350 lineArea"
               data={this.props.productsSalesData}
               type="Line"
               options={{
                  low: 0,
                  showArea: true,
                  fullWidth: true,
                  onlyInteger: true,
                  axisY: {
                     low: 0,
                     scaleMinSpace: 50,
                     offset:35,
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
                           x2: 1,
                           y2: 0
                        })
                        .elem("stop", {
                           offset: 0,
                           "stop-color": "rgba(0, 201, 255, 1)"
                        })
                        .parent()
                        .elem("stop", {
                           offset: 1,
                           "stop-color": "rgba(146, 254, 157, 1)"
                        });

                     defs
                        .elem("linearGradient", {
                           id: "gradient1",
                           x1: 0,
                           y1: 1,
                           x2: 1,
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
         </Card>
      );
   }
}

ProductSalesChartCard.propTypes = {
   cardTitle: PropTypes.string,
   salesText: PropTypes.string,
   visitText: PropTypes.string,
   productsSalesData: PropTypes.object
};

export default ProductSalesChartCard;
