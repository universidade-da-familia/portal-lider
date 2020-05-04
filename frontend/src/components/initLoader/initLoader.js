import React from "react";
import { ClipLoader } from "react-spinners";

import logo from "../../assets/img/loading-logo.png";

class InitLoader extends React.Component {
   state = {
      loading: true
   };
   render() {
      return (
         <div className="loader-bg">
            <div className="loader-content">
               <div className="logo">
                  <img src={logo} alt="Logo" />
               </div>
               <div className="loading">
                  <ClipLoader
                     className="clip-loader"
                     sizeUnit={"px"}
                     size={60}
                     color={"#c3526e"}
                     loading={this.state.loading}
                  />
               </div>
            </div>
         </div>
      );
   }
}

export default InitLoader;
