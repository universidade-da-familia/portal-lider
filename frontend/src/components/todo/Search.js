import React from "react";
import PropTypes from "prop-types";


const Search = ({ value, onChange }) => (   
   <input type="text" className="form-control round" placeholder="Search todo" onChange={(e) => onChange(e.target.value)} defaultValue={value}/>
);

Search.propTypes = {
   onChange: PropTypes.func.isRequired
};

export default Search;
