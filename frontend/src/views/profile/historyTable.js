import React from 'react';
import ReactTable from 'react-table';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Import React Table
import 'react-table/react-table.css';

import history from '~/app/history';

export default function HistoryTable({ events }) {
  function handleEdit(e) {
    if (e === undefined) {
      return;
    }

    const { id } = e.original;

    localStorage.setItem('@dashboard/editGroupActiveTab', '1');

    history.push(`/eventos/grupo/${id}/editar`);
  }

  return (
    <ReactTable
      data={events}
      previousText="Página anterior"
      nextText="Próxima página"
      loadingText="Carregando..."
      noDataText="Não há dados"
      pageText="Página"
      ofText="de"
      rowsText="linhas"
      pageSizeOptions={[5, 10, 20]}
      pageJumpText="pular para a página"
      rowsSelectorText="linhas por página"
      defaultFilterMethod={(filter, row) =>
        String(row[filter.id]) === filter.value
      }
      columns={[
        {
          Header: 'ID',
          accessor: 'id',
          width: 90,
          Filter: ({ filter, onChange }) => (
            <input
              onChange={event => onChange(event.target.value)}
              value={filter ? filter.value : ''}
              style={{
                width: '100%',
                color: 'white',
              }}
            />
          ),
        },
        {
          Header: 'Descrição',
          id: 'defaultEventName',
          accessor: d => d.defaultEvent.name,
        },
        {
          Header: 'Início',
          id: 'start_date',
          accessor: d => d.start_date,
          width: 130,
          Cell: row =>
            format(new Date(row.value), 'dd/MM/yyyy', {
              locale: ptBR,
            }),
        },
        {
          Header: 'Formatura',
          id: 'end_date',
          accessor: d => d.end_date,
          width: 130,
          Cell: row =>
            row.value
              ? format(new Date(row.value), 'dd/MM/yyyy', {
                  locale: ptBR,
                })
              : 'Não informado',
        },
        {
          Header: 'Status',
          id: 'status',
          accessor: d => d.status,
          width: 150,
        },
        {
          Header: 'Tipo',
          id: 'type',
          accessor: d => d.history_type,
          width: 110,
        },
      ]}
      defaultPageSize={5}
      getTdProps={(state, rowInfo, column) => {
        return {
          style: {
            cursor: 'pointer',
            overflow: column.id === 'actions' ? 'visible' : 'hidden',
          },

          onClick: () => handleEdit(rowInfo),
        };
      }}
      className="-striped -highlight"
    />
  );
}
