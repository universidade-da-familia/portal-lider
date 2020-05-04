import React, { PureComponent } from "react";
import { Card, CardHeader, CardTitle, Table, Button } from "reactstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class ShoppingCartCard extends PureComponent {
   render() {
      const shoppingList = this.props.shoppingCart;
      return (
         <Card>
            <CardHeader>
               <CardTitle className="mb-0">{this.props.cardTitle}</CardTitle>
            </CardHeader>
            <Table responsive className="text-center">
               <thead>
                  <tr>
                     <th>#</th>
                     <th>Product</th>
                     <th>Quantity</th>
                     <th>Status</th>
                     <th>Amount</th>
                     <th>Delete</th>
                  </tr>
               </thead>
               <tbody>
                  {shoppingList.list.map((object, i) => {
                     let button;
                     if (object.status === "active") {
                        button = (
                            <Button color="success" className="btn-round">Active</Button>
                        );
                     } else if (object.status === "pending") {
                        button = (
                            <Button color="warning" className="btn-round">Pending</Button>
                        );
                     } else {
                        button = (
                            <Button color="danger" className="btn-round">Cancelled</Button>                            
                        );
                     }

                     return (
                        <tr key={i}>
                           <td>
                              <img
                                 src={require("../../assets/img/elements/0" +
                                    (i + 1) +
                                    ".png")}
                                 className="media-object round-media height-50"
                                 alt="Card cap 02"
                              />
                           </td>
                           <td>{object.product}</td>
                           <td>{object.quantity}</td>
                           <td>{button}</td>
                           <td>{object.amount}</td>
                           <td className="danger">
                                <Link to="/">
                                    {object.delete}
                                </Link>
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </Table>
         </Card>
      );
   }
}

ShoppingCartCard.propTypes = {
   cardTitle: PropTypes.string,
   shoppingCart: PropTypes.object
};

export default ShoppingCartCard;
