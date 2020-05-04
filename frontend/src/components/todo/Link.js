import React from "react";
import PropTypes from "prop-types";


const Link = ({ active, children, onClick }) => (
   <li className={"list-group-item list-group-item-action " + (active ? "active" : "") + " no-border-top-radius no-border-bottom-radius no-border px-2 py-1"} onClick={onClick}>
      {children} 
   </li>
);

Link.propTypes = {
   active: PropTypes.bool.isRequired,
   children: PropTypes.node.isRequired,
   onClick: PropTypes.func.isRequired
};

export default Link;
