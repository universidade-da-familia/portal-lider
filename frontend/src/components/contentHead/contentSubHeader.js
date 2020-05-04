import React from "react";

const ContentSubHeader = props => {
   const { className } = props;
   return (
      <div
         className={`content-sub-header${
            className === undefined ? "" : ` ${className}`
         }`}
      >
         {props.children}
      </div>
   );
};

export default ContentSubHeader;
