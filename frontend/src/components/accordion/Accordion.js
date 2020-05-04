import React, { Component, Fragment, Children, cloneElement } from "react";

class Accordion extends Component {
   state = {
      selectedAccordionItem: -1
   };

   toggle = accordionIndex => {
      if (this.state.selectedAccordionItem === accordionIndex) {
         this.setState({
            selectedAccordionItem: -1
         });
      } else {
         this.setState({ selectedAccordionItem: accordionIndex });
      }
   };

   static AccordionItem = props => (
      <Fragment>
         <div
            className="accordion-item"
            onClick={() => props.toggle(props.index)}
         >
            {props.render()} {/* can pass state and can do extra stuff*/}
         </div>
         {props.selected ? props.children : null}
      </Fragment>
   );

   render() {
      const Nodes = Children.map(this.props.children, (child, index) => {
         if (Boolean(child.type === Accordion.AccordionItem)) {
            return cloneElement(child, {
               index: index,
               toggle: this.toggle,
               selected:
                  index === this.state.selectedAccordionItem ? true : false,
               ...child.props
            });
         }
      });

      return <div className="accordion">{Nodes}</div>;
   }
}

export default Accordion;
