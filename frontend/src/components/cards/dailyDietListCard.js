import React, { PureComponent } from "react";
import {
   Card,
   CardHeader,
   CardTitle,
   CardBody,
   ListGroup,
   ListGroupItem,
   Badge
} from "reactstrap";
import PropTypes from "prop-types";
import classnames from "classnames";

class DailyDietListCard extends PureComponent {
   render() {
      const dietList = this.props.dailyDietList;
      return (
         <Card>
            <CardHeader>
               <CardTitle className="mb-0">{this.props.cardTitle}</CardTitle>
            </CardHeader>
            <CardBody>
               <p className="card-text">{this.props.cardSubTitle}</p>
            </CardBody>
            <ListGroup>
               {dietList.list.map((object, i) => {
                  return (
                     <ListGroupItem className="justify-content-between" key={i}>
                        {object.item}{" "}
                        <Badge
                           pill
                           className={classnames(
                              "white float-right",
                              object.priorityColor
                           )}
                        >
                           {object.quantity}
                        </Badge>
                     </ListGroupItem>
                  );
               })}
            </ListGroup>
         </Card>
      );
   }
}

DailyDietListCard.propTypes = {
   cardTitle: PropTypes.string,
   cardSubTitle: PropTypes.string,
   dailyDietList: PropTypes.object
};

export default DailyDietListCard;
