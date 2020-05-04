import React, { PureComponent } from "react";
import { Card, CardBody, Media } from "reactstrap";
import PropTypes from 'prop-types';
import classnames from "classnames";

class MinimalStatistics extends PureComponent {
   render() {
      
      let iconLeft;
      let iconRight;
      let textDirection;
      
      if (this.props.iconSide === "right") {
         iconRight = this.props.children;         
      } else {
         iconLeft = this.props.children;
         textDirection = "text-right"
      }
      return (
         <Card>
            <CardBody className="px-3 py-3">
               <Media>
                  {iconLeft}
                  <Media body className={textDirection}>
                     <h3 className={classnames("mb-1", this.props.statisticsColor)}>{this.props.statistics}</h3>
                     <span>{this.props.text}</span>
                  </Media>
                  {iconRight}
               </Media>
            </CardBody>
         </Card>
      );
   }
}

MinimalStatistics.propTypes = {
   iconSide: PropTypes.string,   
   statisticsColor: PropTypes.string,
   statistics: PropTypes.string,
   text: PropTypes.string,
 };

export default MinimalStatistics;
