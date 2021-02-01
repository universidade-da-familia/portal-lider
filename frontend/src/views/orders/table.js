/* eslint-disable */
import React from 'react';
import { Eye } from 'react-feather';
import ReactTable from 'react-table';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import { format, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import history from '~/app/history';

// Import React Table
import 'react-table/react-table.css';

export default function OrderTable({ data, rows = 5 }) {
  function handleEdit(e, column) {
    if (e === undefined) {
      return;
    }

    if (column === 'Link') {
      const url = e.original.transaction.boleto_url;
      window.open(url);

      return;
    }

    const { id } = e.original;

    localStorage.setItem('@dashboard/editGroupActiveTab', '1');

    history.push(`/pedido/${id}/visualizar`);
  }

  return (
    <ReactTable
      data={data}
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
          Header: 'Netsuite ID',
          accessor: 'netsuite_id',
          width: 110,
        },
        {
          Header: 'Solicitado em',
          id: 'created_at',
          width: 130,
          accessor: d => d.created_at,
          Cell: row =>
            format(new Date(row.value), 'dd/MM/yyyy', {
              locale: ptBR,
            }),
        },
        {
          Header: 'Receberá até',
          id: 'delivery_estimate_days',
          width: 130,
          accessor: d => d.delivery_estimate_days,
          Cell: row => {
            const estimate_date = row.value + 1;

            return format(
              addDays(new Date(row.row.created_at), estimate_date),
              'dd/MM/yyyy',
              {
                locale: ptBR,
              }
            );
          },
        },
        {
          Header: 'Total',
          id: 'total',
          accessor: d => d.total,
          Cell: row => {
            const currency = row.value.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            });

            return currency;
          },
          width: 170,
        },
        {
          Header: 'Pagamento',
          id: 'payment_name',
          accessor: d => d.payment_name,
          width: 150,
        },
        {
          Header: 'Status',
          id: 'status.name',
          accessor: d => d.status.name,
        },
      ]}
      defaultPageSize={rows}
      getTdProps={(state, rowInfo, column, instance) => {
        return {
          style: {
            cursor: 'pointer',
            overflow: column.id === 'actions' ? 'visible' : 'hidden',
            background:
              rowInfo !== undefined &&
              rowInfo.original.status_id === 10 &&
              '#FFCDD3',
          },

          onClick: () => handleEdit(rowInfo, column.Header),
        };
      }}
      className="-striped -highlight"
    />
  );
}
