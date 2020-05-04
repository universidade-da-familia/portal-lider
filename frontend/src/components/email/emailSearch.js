import React from "react";
import PropTypes from 'prop-types';

class EmailSearch extends React.Component {
   render() {
      return (
         <div className="email-search-box w-100 bg-white pt-3 p-2">
            <div className="media">
               <span className="email-app-sidebar-toggle ft-align-justify font-large-1 mr-2 d-xl-none" />
               <div className="media-body">
                  <input
                     type="text"
                     className="form-control round"
                     placeholder="Search emails"
                     onChange={e => this.props.onChange(e.target.value)}
                     value={this.props.searchTerm}
                  />
               </div>
            </div>
         </div>
      );
   }
}

EmailSearch.propTypes = {
    onChange: PropTypes.func.isRequired,
    searchTerm: PropTypes.string.isRequired
}

export default EmailSearch;
