import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Plus } from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';

import Column from './column/index';
import data from './data';
import { Container, Button } from './styles';

export default function SmallGroups() {
  const [initialData, setInitialData] = useState(data);

  function handleAddColumn() {
    const nextGroup = initialData.lastGroup + 1;

    const newColumns = initialData.columns;
    newColumns[`group${nextGroup}`] = {
      id: `group${nextGroup}`,
      title: `Grupo ${nextGroup}`,
      personIds: [],
    };

    const columnsOrder = initialData.columnOrder;
    columnsOrder.push(`group${nextGroup}`);

    setInitialData({
      persons: initialData.persons,
      columns: newColumns,
      columnOrder: columnsOrder,
      lastGroup: nextGroup,
    });
  }

  function handleDragEnd(result) {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      // eslint-disable-next-line no-useless-return
      return;
    }

    const startColumn = initialData.columns[source.droppableId];
    const endColumn = initialData.columns[destination.droppableId];

    if (startColumn === endColumn) {
      const newPersonIds = Array.from(startColumn.personIds);

      newPersonIds.splice(source.index, 1);
      newPersonIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        personIds: newPersonIds,
      };

      setInitialData({
        ...initialData,
        columns: {
          ...initialData.columns,
          [newColumn.id]: newColumn,
        },
      });
    } else {
      const startPersonIds = Array.from(startColumn.personIds);
      startPersonIds.splice(source.index, 1);
      const newStartColumn = {
        ...startColumn,
        personIds: startPersonIds,
      };

      const endPersonIds = Array.from(endColumn.personIds);
      endPersonIds.splice(destination.index, 0, draggableId);
      const newEndColumn = {
        ...endColumn,
        personIds: endPersonIds,
      };

      setInitialData({
        ...initialData,
        columns: {
          ...initialData.columns,
          [newStartColumn.id]: newStartColumn,
          [newEndColumn.id]: newEndColumn,
        },
      });
    }
  }

  return (
    <PerfectScrollbar>
      <Container>
        <DragDropContext onDragEnd={result => handleDragEnd(result)}>
          {initialData.columnOrder.map(columnId => {
            const column = initialData.columns[columnId];
            const persons = column.personIds.map(
              personId => initialData.persons[personId]
            );

            return <Column key={column.id} column={column} persons={persons} />;
          })}
        </DragDropContext>
        <Button onClick={handleAddColumn}>
          <Plus size={18} /> Adicionar grupo
        </Button>
      </Container>
    </PerfectScrollbar>
  );
}
