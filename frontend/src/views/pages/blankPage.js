// import external modules
import React, { Component, Fragment } from "react";
import ContentHeader from "../../components/contentHead/contentHeader";
import ContentSubHeader from "../../components/contentHead/contentSubHeader";

class blankPage extends Component {
   render() {
      return (
         <Fragment>
            <ContentHeader>Blank Page</ContentHeader>
            <ContentSubHeader>A sample blank page to start with</ContentSubHeader>
         </Fragment>
      );
   }
}

export default blankPage;
