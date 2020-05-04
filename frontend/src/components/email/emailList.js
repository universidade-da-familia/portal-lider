import React from "react";
// import PropTypes from 'prop-types'
import Email from "./emailListItem";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";

const EmailList = ({ active, emails, openEmail, onStar, onImportant, setSelectedEmail }) => (
   <PerfectScrollbar>
      <div className="email-app-list">
         <div id="users-list">
            <ul className="list-group">
               {emails.map(email => (
                  <Email
                     key={email.id}
                     active={active}
                     {...email}
                     onClick={() => openEmail(email.id)}
                     onStar={() => onStar(email.id)}
                     onImportant={() => onImportant(email.id)}
                     onChange={e => {
                        if (e.target.checked === true) setSelectedEmail(email.id, "checked");
                        else setSelectedEmail(email.id, "unchecked");
                     }}
                  />
               ))}
            </ul>
         </div>
      </div>
   </PerfectScrollbar>
);

EmailList.propTypes = {
   emails: PropTypes.array.isRequired,
   openEmail: PropTypes.func.isRequired,
   onStar: PropTypes.func.isRequired,
   onImportant: PropTypes.func.isRequired,
   setSelectedEmail: PropTypes.func.isRequired
};
export default EmailList;
