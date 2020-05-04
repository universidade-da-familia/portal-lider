import React, { memo } from 'react';
import Avatar from 'react-avatar';
import { Draggable } from 'react-beautiful-dnd';

import {
  Container,
  LeftContainer,
  RightContainer,
  Name,
  Age,
  PersonIdContainer,
  PersonType,
  Identificator,
} from './styles';

function Person({ person, index }) {
  return (
    <Draggable key={person.id} draggableId={String(person.id)} index={index}>
      {provided => (
        <Container
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...provided.draggableProps}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          style={{
            ...provided.draggableProps.style,
          }}
        >
          <LeftContainer>
            <Avatar
              size="50"
              round
              title={person.name}
              name={person.name}
              src={person.src}
            />
          </LeftContainer>
          <RightContainer>
            <Name>{person.name}</Name>
            <Age>Idade: {person.age} anos</Age>
            <PersonIdContainer>
              <PersonType organizator={person.organizator}>
                {person.organizator ? 'Facilitador' : 'Participante'}
              </PersonType>
              <Identificator>ID: {person.id}</Identificator>
            </PersonIdContainer>
          </RightContainer>
        </Container>
      )}
    </Draggable>
  );
}

export default memo(Person);
