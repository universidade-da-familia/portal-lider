import React, { PureComponent } from "react";
import { Card, CardHeader, CardTitle, CardBody, Media } from "reactstrap";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";


class DiscoverPeopleCard extends PureComponent {
   render() {
      const peopleList = this.props.discoverPeopleList;

      return (
         <Card>
            <CardHeader>
               <CardTitle className="mb-0">{this.props.cardTitle}</CardTitle>
            </CardHeader>

            <CardBody>
               {peopleList.series.map((object, i) => {
                  return (
                     <div key={i}>
                        {[
                           <Media className="my-2" key={i}>
                              <Media left href="#">
                                 <img
                                    src={object.img}
                                    className="media-object d-flex mr-3 bg-primary height-40 rounded-circle"
                                    alt="Card cap 02"
                                 />
                              </Media>
                              <Media body>
                                 <h4 className="font-medium-1 mt-1 mb-0">
                                    {object.fullName}
                                 </h4>
                                 <p className="text-muted font-small-3">
                                    {object.role}
                                 </p>
                              </Media>
                                <Link to="/cards/advanced-card"
                                 className={classnames(
                                    "d-flex ml-3 btn btn-small btn-raised btn-round justify-content-center width-100",
                                    object.followBtn
                                 )}
                                >
                                    {object.followTxt}
                                </Link>
                           </Media>
                        ]}
                     </div>
                  );
               })}
            </CardBody>
         </Card>
      );
   }
}

DiscoverPeopleCard.propTypes = {
   cardTitle: PropTypes.string,
   peopleList: PropTypes.object
};

export default DiscoverPeopleCard;
