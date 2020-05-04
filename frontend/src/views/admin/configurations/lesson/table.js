import React from 'react';
import { useDispatch } from 'react-redux';

import history from '~/app/history';

import { toastr } from 'react-redux-toastr';
import { UncontrolledTooltip } from 'reactstrap';

import matchSorter from 'match-sorter';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import { Trash2 } from 'react-feather';

import { Creators as LessonActions } from '~/store/ducks/lesson';

export default function LeaderTableGroups({ data }) {
  const dispatch = useDispatch();

  function handleEdit(e, column) {
    if (e === undefined) {
      return;
    }

    if (column === 'Ações') {
      toastr.confirm(`Tem certeza de que quer deletar a lição?`, {
        onOk: () => dispatch(LessonActions.deleteLessonRequest(e.original.id)),
        onCancel: () => {},
      });
      return;
    }

    const id = e.original.id;

    history.push(`/admin/configuracao/licoes/${id}/editar`);
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
      filterable
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
            />
          ),
        },
        {
          Header: 'Titulo',
          id: 'title',
          accessor: d => d.title,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ['title'] }),
          filterAll: true,
          Filter: ({ filter, onChange }) => (
            <input
              onChange={event => onChange(event.target.value)}
              value={filter ? filter.value : ''}
            />
          ),
        },
        {
          Header: 'Descrição',
          id: 'description',
          accessor: d => d.description,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ['description'] }),
          filterAll: true,
          Filter: ({ filter, onChange }) => (
            <input
              onChange={event => onChange(event.target.value)}
              value={filter ? filter.value : ''}
            />
          ),
        },
        {
          Header: 'Evento',
          id: 'defaultEvent',
          accessor: d => d.defaultEvent.name,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ['defaultEvent'] }),
          filterAll: true,
          Filter: ({ filter, onChange }) => (
            <input
              onChange={event => onChange(event.target.value)}
              value={filter ? filter.value : ''}
            />
          ),
        },
        {
          Header: 'Ministério',
          id: 'ministery',
          accessor: d => d.defaultEvent.ministery.name,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, {
              keys: ['ministery'],
            }),
          filterAll: true,
          Filter: ({ filter, onChange }) => (
            <input
              onChange={event => onChange(event.target.value)}
              value={filter ? filter.value : ''}
            />
          ),
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
                <Trash2 size={14} color={'#f00'} className="m-auto" />
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
      getTdProps={(state, rowInfo, column, instance) => {
        return {
          onClick: () => handleEdit(rowInfo, column.Header),
        };
      }}
      className="-striped -highlight"
    />
  );
}
