import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Container } from "./styles";

export default class Participant extends Component {
  render() {
    //const { provided, innerRef, children } = this.props;
    return (
      <Draggable draggableId={this.props.participant.id} index={this.props.index}>
        {provided => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {this.props.participant.name}
          </Container>
        )}
      </Draggable>
    );
  }
}
