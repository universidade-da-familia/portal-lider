import React from 'react';
import { useDispatch } from 'react-redux';

import history from '~/app/history';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default function LeaderTableGroups({ data }) {
  const dispatch = useDispatch();

  function handleEdit(e, column) {
    if (e === undefined) {
      return;
    }

    const id = e.original.id;

    history.push(`/admin/configuracao/ministerios/${id}/editar`);
  }

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
          Header: 'Ministério',
          id: 'name',
          accessor: d => d.name,
        },
        {
          Header: 'Email',
          id: 'email',
          accessor: d => d.email,
        },
        {
          Header: 'Telefone',
          id: 'phone',
          accessor: d => d.phone,
        },
      ]}
      defaultPageSize={5}
      getTdProps={(state, rowInfo, column, instance) => {
        return {
          onClick: () => handleEdit(rowInfo, column.Header),
        };
      }}
      className="-striped -highlight"
    />
  );
}
