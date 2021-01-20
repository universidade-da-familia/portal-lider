import React from 'react';
import ReactTable from 'react-table';

// Import React Table
import 'react-table/react-table.css';

export default function ChurchsTable({ churchs, value, modalChurch }) {
  function handleSelectChurch(rowInfo) {
    if (rowInfo === undefined) {
      return;
    }

    value(rowInfo.original);
    modalChurch(false);
  }

  return (
    <ReactTable
      data={churchs}
      previousText="Página anterior"
      nextText="Próxima página"
      loadingText="Carregando..."
      noDataText="Não há dados"
      pageText="Página"
      ofText="de"
      rowsText="linhas"
      pageSizeOptions={[5, 10]}
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
        },
        {
          Header: 'Nome',
          id: 'corporate_name',
          accessor: d => d.corporate_name,
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
      getTdProps={(state, rowInfo, column) => {
        return {
          style: {
            cursor: 'pointer',
            overflow: column.id === 'actions' ? 'visible' : 'hidden',
          },

          onClick: () => handleSelectChurch(rowInfo, column.Header),
        };
      }}
      className="-striped -highlight"
    />
  );
}
