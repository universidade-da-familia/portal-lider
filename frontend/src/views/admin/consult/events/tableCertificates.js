/* eslint-disable react/prop-types */
import React from 'react';
import { Trash2 } from 'react-feather';
import { useDispatch } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import ReactTable from 'react-table';
import { UncontrolledTooltip } from 'reactstrap';

import moment from 'moment';

import 'react-table/react-table.css';

import history from '~/app/history';
import { Creators as EventActions } from '~/store/ducks/event';

export default function AllPrintTableGroups({ data }) {
  const dataTable = data.data;
  const dispatch = useDispatch();

  function handleEdit(e, column) {
    if (e === undefined) {
      return;
    }

    if (column === 'Ações') {
      toastr.confirm(`Tem certeza de que quer deletar o evento?`, {
        onOk: () => dispatch(EventActions.deleteEventRequest(e.original.id)),
        onCancel: () => {},
      });
      return;
    }

    const { id } = e.original;

    history.push(`/eventos/grupo/${id}/editar`);
  }

  function handlePageChange(pageIndex) {
    dispatch(
      EventActions.allConsultEventForPrintCertificateRequest(
        pageIndex + 1,
        data.filters
      )
    );
  }

  return (
    <ReactTable
      data={dataTable}
      manual
      resolveData={data => data.map(row => row)}
      page={data.page - 1}
      pages={data.lastPage}
      sortable={false}
      onPageChange={pageIndex => handlePageChange(pageIndex)}
      previousText="Anterior"
      nextText="Próximo"
      loadingText="Carregando..."
      noDataText="Não há dados"
      pageText="Página"
      ofText="de"
      rowsText="linhas"
      pageJumpText="pular para a página"
      rowsSelectorText="linhas por página"
      showPageSizeOptions={false}
      columns={[
        {
          Header: 'ID',
          accessor: 'id',
          width: 90,
          Filter: ({ filter, onChange }) => (
            <input
              onChange={event => onChange(event.target.value)}
              value={filter ? filter.value : ''}
            />
          ),
        },
        {
          Header: 'Tipo do evento',
          id: 'event_type',
          width: 150,
          accessor: d => d.defaultEvent.event_type,
        },
        {
          Header: 'Evento',
          id: 'defaultEvent',
          accessor: d => d.defaultEvent.name,
        },
        {
          Header: 'Ministério',
          id: 'ministery',
          width: 150,
          accessor: d => d.defaultEvent.ministery.name,
        },
        {
          Header: 'Inscritos',
          id: 'participants',
          width: 100,
          accessor: d => d.noQuitterParticipants.length,
        },
        {
          Header: 'Início',
          id: 'start_date',
          accessor: d => {
            return d.start_date;
          },
          Cell: row => moment(row.value).format('DD/MM/YYYY'),
          filterAll: true,
          width: 120,
        },
        {
          Header: 'Status',
          id: 'status',
          width: 150,
          accessor: d => d.status,
        },
        {
          Header: 'Ações',
          accessor: 'delete',
          id: 'delete',
          width: 90,
          filterable: false,
          Cell: instance => {
            return (
              <div
                className="d-flex align-content-center justify-content-center p-1 line-height-1"
                id={`delete-${instance.original.id}`}
              >
                <Trash2 size={14} color="#f00" className="m-auto" />
                <UncontrolledTooltip
                  placement="left"
                  target={`delete-${instance.original.id}`}
                >
                  Deletar evento
                </UncontrolledTooltip>
              </div>
            );
          },
        },
      ]}
      defaultPageSize={5}
      getTdProps={(state, rowInfo, column) => {
        return {
          onClick: () => handleEdit(rowInfo, column.Header),
        };
      }}
      className="-striped -highlight"
    />
  );
}
