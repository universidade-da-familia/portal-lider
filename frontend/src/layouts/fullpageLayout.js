import React from "react";
import templateConfig from "../templateConfig";
import classnames from "classnames";

const FullPageLayout = ({ children, ...rest }) => {
  return (
    <div
      className={classnames("login-layout wrapper", {
        "layout-dark": templateConfig.layoutDark
      })}
    >
      <main className="main text-muted">{children}</main>
    </div>
  );
};

export default FullPageLayout;
