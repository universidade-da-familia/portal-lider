/* eslint-disable */
import React from 'react';
import { Trash2 } from 'react-feather';
import { useDispatch } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import ReactTable from 'react-table';
import { UncontrolledTooltip } from 'reactstrap';

import moment from 'moment';

// Import React Table
import 'react-table/react-table.css';

import { Creators as EventActions } from '~/store/ducks/event';

import history from '../../../app/history';

export default function TrainingTableGroups({ data }) {
  const dispatch = useDispatch();

  function handleEdit(e, column) {
    if (e === undefined) {
      return;
    }

    if (column === 'Ações') {
      if (e.original.noQuitterParticipants.length === 0) {
        toastr.confirm('Tem certeza que deseja deletar este treinamento?', {
          onOk: () => dispatch(EventActions.deleteEventRequest(e.original.id)),
          onCancel: () => {},
          okText: 'Sim',
          cancelText: 'Não',
        });
        return;
      }
      return;
    }

    const { id } = e.original;

    localStorage.setItem('@dashboard/editGroupActiveTab', '1');

    history.push(`/eventos/treinamento/${id}/editar`);
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
      sortable={false}
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
          id: 'defaultEvent.name',
          accessor: d => d.defaultEvent.name,
        },
        {
          Header: 'Ministério',
          id: 'defaultEvent.ministery.name',
          width: 100,
          accessor: d => d.defaultEvent.ministery.name,
        },
        {
          Header: 'Inscritos',
          accessor: 'noQuitterParticipants.length',
          width: 100,
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
          Header: 'Igreja',
          id: 'organization.corporate_name',
          accessor: 'organization.corporate_name',
          width: 220,
        },
        {
          Header: 'Status',
          accessor: 'status',
          id: 'status',
          width: 150,
        },
        {
          Header: 'Ações',
          accessor: 'delete',
          id: 'delete',
          width: 90,
          filterable: false,
          Cell: instance => {
            if (instance.original.noQuitterParticipants.length === 0) {
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
            }
            return (
              <div
                className="d-flex align-content-center justify-content-center p-1 line-height-1"
                id={`delete-${instance.original.id}`}
              >
                <Trash2 size={14} color="#D3D3D3" className="m-auto" />
                <UncontrolledTooltip
                  placement="left"
                  target={`delete-${instance.original.id}`}
                >
                  O evento não pode ser deletado pois possui participantes
                  inscritos
                </UncontrolledTooltip>
              </div>
            );
          },
        },
      ]}
      defaultPageSize={5}
      getTdProps={(state, rowInfo, column, instance) => {
        return {
          style: {
            cursor: 'pointer',
            overflow: column.id === 'actions' ? 'visible' : 'hidden',
          },

          onClick: () => handleEdit(rowInfo, column.Header),
        };
      }}
      className="-striped -highlight"
    />
  );
}
