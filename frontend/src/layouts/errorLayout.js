import React from "react";
import templateConfig from "../templateConfig";
import classnames from "classnames";

const ErrorLayout = ({ children, ...rest }) => {
   return (
      <div
         className={classnames("error-layout  ", {
            "layout-dark": templateConfig.layoutDark
         })}
      >
         <main className="main">{children}</main>
      </div>
   );
};

export default ErrorLayout;
