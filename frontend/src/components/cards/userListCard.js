import React, { PureComponent } from "react";
import {
   Card,
   CardHeader,
   CardTitle,
   CardBody,
   Media,
   FormGroup,
   Label,
   Input,
   Button
} from "reactstrap";
import PropTypes from "prop-types";

class UserListCard extends PureComponent {
   render() {
      const userList = this.props.userListData;
      return (
         <Card>
            <CardHeader>
               <CardTitle className="mb-0">{this.props.cardTitle}</CardTitle>
            </CardHeader>

            <CardBody>
               {userList.series.map((object, i) => {
                  return (
                     <div key={i}>
                        {[
                           <Media className="mb-1" key={i}>
                              <Media left href="#">
                                 <img
                                    src={object.img}
                                    className="media-object d-flex mr-3 bg-primary height-50 rounded-circle"
                                    alt="Card cap 02"
                                 />
                              </Media>
                              <Media body>
                                 <h4 className="font-medium-1 mt-1 mb-0">
                                    {object.fullName}
                                 </h4>
                                 <p className="text-muted font-small-3">
                                    {object.position}
                                 </p>
                              </Media>
                              <FormGroup check>
                                 <Label check>
                                    <Input type="checkbox" />
                                 </Label>
                              </FormGroup>
                           </Media>
                        ]}
                     </div>
                  );
               })}
               <div className="action-buttons mt-2 text-center">
                  <Button className="gradient-blackberry py-2 px-4 white mr-2">Add New</Button>
               </div>
            </CardBody>
         </Card>
      );
   }
}

UserListCard.propTypes = {
   cardTitle: PropTypes.string,
   postition: PropTypes.string
};

export default UserListCard;
