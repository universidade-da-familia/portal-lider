import React, { Component, Fragment } from "react";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import StepZilla from "./wizard-steps/main";
import Step1 from "./wizard-steps/Step1";
import Step2 from "./wizard-steps/Step2";
import Step3 from "./wizard-steps/Step3";
import Step4 from "./wizard-steps/Step4";

import "../../assets/scss/views/form/wizard.scss"

// import classnames from "classnames";
import ContentHeader from "../../components/contentHead/contentHeader";
import ContentSubHeader from "../../components/contentHead/contentSubHeader";

class Wizard extends Component {
   state = {};

   sampleStore = {
      email: "",
      gender: "",
      savedToCloud: false
   };

   componentDidMount() {}

   componentWillUnmount() {}

   getStore() {
      return this.sampleStore;
   }

   updateStore(update) {
      this.sampleStore = {
         ...this.sampleStore,
         ...update
      };
   }

   render() {
      const steps = [
         {
            name: "Step1",
            component: (
               <Step1
                  getStore={() => this.getStore()}
                  updateStore={u => {
                     this.updateStore(u);
                  }}
               />
            )
         },
         {
            name: "Step2",
            component: (
               <Step2
                  getStore={() => this.getStore()}
                  updateStore={u => {
                     this.updateStore(u);
                  }}
               />
            )
         },
         {
            name: "Step3",
            component: (
               <Step3
                  getStore={() => this.getStore()}
                  updateStore={u => {
                     this.updateStore(u);
                  }}
               />
            )
         },
         {
            name: "Step4",
            component: (
               <Step4
                  getStore={() => this.getStore()}
                  updateStore={u => {
                     this.updateStore(u);
                  }}
               />
            )
         }
      ];

      return (
         <Fragment>
            <ContentHeader>Form Wizard</ContentHeader>
            <ContentSubHeader>
               <p>A React multi-step/wizard component for sequential data collection, <a href="https://github.com/newbreedofgeek/react-stepzilla" target="_blank" rel="noopener noreferrer">react-stepzilla</a></p>
               <a href="https://github.com/newbreedofgeek/react-stepzilla" target="_blank" rel="noopener noreferrer">
                  <img src="https://img.shields.io/github/stars/newbreedofgeek/react-stepzilla.svg?style=social" alt="Stars" />
               </a>
            </ContentSubHeader>
            <Row>
               <Col sm="12">
                  <Card>
                     <CardBody>
                        <CardTitle>Multistep / Form Wizard </CardTitle>
                        <div className="example">
                           <div className="step-progress">
                              <StepZilla
                                 steps={steps}
                                 preventEnterSubmission={true}
                                 nextTextOnFinalActionStep={"Save"}
                                 hocValidationAppliedTo={[3]}
                                 startAtStep={window.sessionStorage.getItem("step") ? parseFloat(window.sessionStorage.getItem("step")) : 0}
                                 onStepChange={step => window.sessionStorage.setItem("step", step)}
                              />
                           </div>
                        </div>
                     </CardBody>
                  </Card>
               </Col>
            </Row>
         </Fragment>
      );
   }
}

export default Wizard;