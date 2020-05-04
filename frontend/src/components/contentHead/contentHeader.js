import React from "react";

const ContentHeader = props => {
  const {className} = props;
   return (
      <div
         className={`content-header${
            className === undefined ? "" : ` ${className}`
         }`}
      >
         {props.children}
      </div>
   );
};

export default ContentHeader;
