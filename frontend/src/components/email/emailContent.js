import React from "react";
// import { Button } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import * as Icon from "react-feather";

const EmailContent = ({ emailDetails }) => (
   <div className="email-app-mail-content d-none d-md-block h-100">
      {emailDetails ? (
         <div className="email-app-mail-content-detail">
            <PerfectScrollbar>
               <div className="email-app-options card-block">
                  <div className="row d-md-none">
                     <button className="btn btn-raised btn-primary ml-2 back-to-inbox">
                        <i className="fa fa-angle-left" /> Back to inbox
                     </button>
                  </div>
               </div>

               <div className="email-app-title card-block">
                  <h3 className="list-group-item-heading">{emailDetails.subject}</h3>
               </div>
               <div className="media-list">
                  <div id="headingCollapse2" className="card-header p-0">
                     <a
                        data-toggle="collapse"
                        href="#collapse2"
                        aria-expanded="false"
                        aria-controls="collapse2"
                        className="email-app-sender list-group-item list-group-item-action no-border px-0 py-2"
                     >
                        <div className="media">
                           <span className="avatar avatar-md mr-2">
                              <img
                                 className="media-object rounded-circle width-50"
                                 src={emailDetails.thumbnail}
                                 alt="Generic placeholder 2"
                              />
                           </span>
                           <div className="media-body">
                              <h6 className="list-group-item-heading text-bold-500">
                                 {emailDetails.from}
                                 <span
                                    className={
                                       "float-right badge " +
                                       (emailDetails.label === "Technology" ? "badge-warning" : "") +
                                       (emailDetails.label === "Finance" ? "badge-success" : "") +
                                       (emailDetails.label === "Health" ? "badge-danger" : "") +
                                       " mr-1"
                                    }
                                 >
                                    {emailDetails.label}
                                 </span>
                              </h6>
                              <p className="list-group-item-text mb-0">
                                 to me
                                 <span>Today</span>
                                 <span className="font-small-2 text-muted float-right">{emailDetails.time}</span>
                              </p>
                           </div>
                        </div>
                     </a>
                  </div>
                  <div
                     id="collapse2"
                     role="tabpanel"
                     aria-labelledby="headingCollapse2"
                     className="card-collapse"
                     aria-expanded="false"
                  >
                     <div className="card-body px-0">
                        <div className="email-app-text card-block">
                           <div
                              className="email-app-message"
                              dangerouslySetInnerHTML={{ __html: emailDetails.emailContent }}
                           />
                        </div>
                     </div>
                  </div>
                  <div className="email-app-text-action card-body" />
               </div>
            </PerfectScrollbar>
         </div>
      ) : (
         <div className="row h-100">
            <div className="col-sm-12 my-auto">
               <div className="text-center">
                  <Icon.Mail size={84} color="#ccc" className="pb-3" />
                  <h4>Please select a email to show details.</h4>
               </div>
            </div>
         </div>
      )}
   </div>
);

EmailContent.propTypes = {
   emailDetails: PropTypes.object
};

export default EmailContent;
