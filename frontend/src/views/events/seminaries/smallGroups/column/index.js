import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import PerfectScrollbar from 'react-perfect-scrollbar';

import Person from './person';
import { Container, Title, PersonList } from './styles';

export default function Column({ column, persons }) {
  return (
    <Container>
      <Title>{column.title}</Title>
      <PerfectScrollbar>
        <Droppable droppableId={String(column.id)}>
          {provided => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <PersonList {...provided.droppableProps} ref={provided.innerRef}>
              {persons.map((person, index) => (
                <Person key={person.id} person={person} index={index} />
              ))}
              {provided.placeholder}
            </PersonList>
          )}
        </Droppable>
      </PerfectScrollbar>
    </Container>
  );
}
