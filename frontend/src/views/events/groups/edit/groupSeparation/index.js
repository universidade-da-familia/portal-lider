import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./column/index";
import { Container } from "./styles";
import { Row, Col, Card, Button } from "reactstrap";

class GroupSeparation extends Component {
  state = {
    defaultLeader: [
      {
        id: 1,
        name: "Erick"
      },
      {
        id: 2,
        name: "Lucas"
      }
    ],
    defaultParticipant: [
      {
        id: 3,
        name: "Joana"
      },
      {
        id: 4,
        name: "João"
      }
    ],
    participants: {},
    columns: [
      {
        id: "lider",
        title: "Organizador",
        participantIds: [1, 2]
      },
      {
        id: "participante",
        title: "Participante",
        participantIds: [3, 4]
      }
    ],
    groupColumns: [
      {
        id: 1,
        title: "Grupo",
        participantes: []
      }
    ],
    columnOrder: [0, 1],
    columnOrderGroup: [0]
  };

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let sourceIndex;

    if (source.droppableId === "lider") {
      sourceIndex = 0;
    } else if (source.droppableId === "participante") {
      sourceIndex = 1;
    } else {
      sourceIndex = source.droppableId;
    }
  };

  render() {
    const child = { width: `30em`, height: `100%` };
    const parent = { width: `60em`, height: `100%` };

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Row>
          <Col>
            {this.state.columnOrder.map(columnId => {
              if (columnId === 0) {
                const column = this.state.columns[columnId];
                const leader = column.participantIds.map(
                  leaderId => this.state.defaultParticipant[leaderId]
                );

                return (
                  <Column
                    key={column.id}
                    column={column}
                    participants={leader}
                  />
                );
              } else {
                const column = this.state.columns[columnId];
                const participant = column.participantIds.map(
                  participantId => this.state.defaultParticipant[participantId]
                );

                return (
                  <Column
                    key={column.id}
                    column={column}
                    participants={participant}
                  />
                );
              }
            })}
          </Col>
          <Col className="col-sm">
            {this.state.columnOrderGroup.map(columnId => {
              const column = this.state.groupColumns[columnId];
              const participants = column.participantes.map(
                participantId => this.state.participants[participantId]
              );

              return (
                <Column
                  key={column.id}
                  column={column}
                  participants={participants}
                />
              );
            })}
          </Col>
          <Col>
            <Button
              className="rounded-circle width-100 height-100 mt-4"
              outline
              color="success"
            >
              <i className="fa fa-plus" />
            </Button>
          </Col>
        </Row>
      </DragDropContext>
    );
  }
}

export default GroupSeparation;
