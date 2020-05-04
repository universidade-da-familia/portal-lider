// import external modules
import React from "react";
import { Route } from "react-router-dom";

// import internal(own) modules
import FullPageLayout from "../fullpageLayout";

const FullPageLayoutRoute = ({ render, ...rest }) => {
   return (
      <Route
         {...rest}
         render={matchProps => (
            <FullPageLayout>
               {render(matchProps)}
            </FullPageLayout>
         )}
      />
   );
};

export default FullPageLayoutRoute;