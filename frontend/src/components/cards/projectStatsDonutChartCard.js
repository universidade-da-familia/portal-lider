import React, { PureComponent } from "react";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import PropTypes from "prop-types";
import classnames from "classnames";

//Chsrtis JS
import ChartistGraph from "react-chartist";
//Chsrtis CSS
import "chartist/dist/chartist.min.css";
//Component specific chart CSS
import "../../assets/scss/components/cards/projectStatsDonutChartCard.scss";

class ProjectStatsDonutChartCard extends PureComponent {
   render() {
      const projectStatsDonutChartData = this.props.projectStatsDonutChartData;
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
               className="height-250 donut"
               data={this.props.projectStatsDonutChartData}
               type="Pie"
               options={{
                  donut: true,
                  startAngle: 0,
                  labelInterpolationFnc: value => {
                     let total = projectStatsDonutChartData.series.reduce(
                        (prev, series) => {
                           return prev + series.value;
                        },
                        0
                     );
                     return total + "%";
                  }
               }}
               listener={{
                  draw: data => {
                     if (data.type === "label") {
                        if (data.index === 0) {
                           data.element.attr({
                              dx: data.element.root().width() / 2,
                              dy: data.element.root().height() / 2
                           });
                        } else {
                           data.element.remove();
                        }
                     }
                  }
               }}
            />
            <CardBody>
               <div className="row">
                  {projectStatsDonutChartData.series.map((object, i) => {
                     return (
                        <div className={"col-6"} key={i}>
                           {[
                              <div key={i}>
                                 <span className="mb-1 text-muted d-block">
                                    {object.value}% - {object.name}
                                 </span>
                                 <div
                                    className="progress"
                                    style={{ height: 5 + "px" }}
                                 >
                                    <div
                                       className={classnames(
                                          "progress-bar",
                                          object.progressClassName
                                       )}
                                       role="progressbar"
                                       style={{ width: object.value + "%" }}
                                       aria-valuenow={object.value}
                                       aria-valuemin="0"
                                       aria-valuemax="100"
                                    />
                                 </div>
                              </div>
                           ]}
                        </div>
                     );
                  })}
               </div>
            </CardBody>
         </Card>
      );
   }
}

ProjectStatsDonutChartCard.propTypes = {
   cardTitle: PropTypes.string,
   cardSubTitle: PropTypes.string,
   stackbarchartData: PropTypes.object
};

export default ProjectStatsDonutChartCard;
