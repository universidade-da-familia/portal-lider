import React from 'react';

import history from '../../../app/history';
import matchSorter from 'match-sorter';
import moment from 'moment';

// Import React Table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default function ParticipantTableGroups({ data }) {
  //const [loading, setLoading] = useState(false);

  return (
    <ReactTable
      data={data}
      previousText="Anterior"
      nextText="Próximo"
      loadingText="Carregando..."
      noDataText="Não há dados"
      pageText="Página"
      ofText="de"
      rowsText="linhas"
      pageJumpText="pular para a página"
      rowsSelectorText="linhas por página"
      defaultFilterMethod={(filter, row) =>
        String(row[filter.id]) === filter.value
      }
      columns={[
        {
          Header: 'Código',
          accessor: 'id',
          width: 110,
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
          id: 'defaultEvent.name',
          accessor: d => d.defaultEvent.name,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ['defaultEvent.name'] }),
          filterAll: true,
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
          Header: 'Ministério',
          id: 'defaultEvent.ministery.name',
          width: 100,
          accessor: d => d.defaultEvent.ministery.name,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, {
              keys: ['defaultEvent.ministery.name'],
            }),
          filterAll: true,
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
          Header: 'Inscritos',
          accessor: 'noQuitterParticipants.length',
          width: 100,
        },
        {
          Header: 'Início',
          id: 'startDate',
          accessor: d => {
            return d.startDate;
          },
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, {
              keys: ['startDate'],
            }),
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
          Cell: row => moment(row.value).format('DD/MM/YYYY'),
          filterAll: true,
          width: 170,
        },
        {
          Header: 'Local',
          accessor: 'address_name',
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
          Header: 'Status',
          accessor: 'status',
          id: 'status',
          filterMethod: (filter, row) => {
            if (filter.value === 'all') {
              return true;
            }
            if (filter.value === 'not') {
              return row[filter.id] === 'Não iniciado';
            }
            if (filter.value === 'run') {
              return row[filter.id] === 'Em andamento';
            }
            if (filter.value === 'fin') {
              return row[filter.id] === 'Finalizado';
            }
            if (filter.value === 'can') {
              return row[filter.id] === 'Cancelado';
            }
            return row[filter.id];
          },
          Filter: ({ filter, onChange }) => (
            <select
              onChange={event => onChange(event.target.value)}
              style={{ width: '100%', color: '#fff' }}
              value={filter ? filter.value : 'all'}
            >
              <option value="all">Mostrar todos</option>
              <option value="not">Não iniciado</option>
              <option value="run">Em andamento</option>
              <option value="fin">Finalizado</option>
              <option value="can">Cancelado</option>
            </select>
          ),
          width: 150,
        },
      ]}
      defaultPageSize={5}
      getTdProps={(state, rowInfo, column, instance) => {
        return {
          style: {
            cursor: 'pointer',
            overflow: column.id === 'actions' ? 'visible' : 'hidden',
          },

          // onClick: () => handleEdit(rowInfo, column.Header),
        };
      }}
      className="-striped -highlight"
    />
  );
}
