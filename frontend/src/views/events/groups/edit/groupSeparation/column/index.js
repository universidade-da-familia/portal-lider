import React, { Component } from "react";
import { Droppable } from "react-beautiful-dnd";
import Participant from "../participant/index";

import { Container, Title, ParticipantList } from "./styles";

export default class Column extends Component {
  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <Droppable droppableId={this.props.column.id}>
          {provided => (
            <ParticipantList ref={provided.innerRef} {...provided.droppableProps}>
              {this.props.participants.map((participant, index) => (
                <Participant key={participant.id} participant={participant} index={index} />
              ))}
              {provided.placeholder}
            </ParticipantList>
          )}
        </Droppable>
      </Container>
    );
  }
}
