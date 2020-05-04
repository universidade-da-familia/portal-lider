import React, { Component, createContext } from "react";

const FullScreenContext = createContext();

class FullScreenProvider extends Component {
   state = {
      fullScreen: false,
      makeFullScreen: () => {
         this.setState(prevState => ({
            fullScreen: true
         }));
      },
      makeNormalScreen: () => {
         this.setState(prevState => ({
            fullScreen: false
         }));
      }
   };

   render() {
      return (
         <FullScreenContext.Provider value={{ ...this.state }}>
            {this.props.children}
         </FullScreenContext.Provider>
      );
   }
}
const FullScreenConsumer = FullScreenContext.Consumer;

export { FullScreenConsumer, FullScreenProvider };
