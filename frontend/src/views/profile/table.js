import React, { Component } from 'react';
import matchSorter from 'match-sorter';
import moment from 'moment';

// Import React Table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default class TableExtended extends Component {
  makeData = () => {
    return [
      {
        id: 1,
        description: 'Grupo semanal Homem ao máximo',
        ministery: 'CMN',
        inscriptions: 9,
        startDate: '2019-04-27',
        status: 'Em andamento',
        locale: 'PIB de Marília',
        actions: 1,
        myFunction: 'Responsavel',
        type: 'Grupo',
      },
      {
        id: 2,
        description:
          'Como proteger a pureza dos seus filhos asdas asdsad asdadasd asdsadada adssad',
        ministery: 'GFI',
        inscriptions: 14,
        startDate: '2019-08-10',
        status: 'Não iniciado',
        locale: 'Primeira Igreja de Betânia',
        actions: 1,
        myFunction: 'Responsavel',
        type: 'Grupo',
      },
      {
        id: 3,
        description: 'Grupo semanal Crown finanças',
        ministery: 'CROWN',
        inscriptions: 6,
        startDate: '2019-05-01',
        status: 'Em andamento',
        locale: 'Holliness Pompéia',
        actions: 1,
        myFunction: 'Responsavel',
        type: 'Treinamento',
      },
      {
        id: 4,
        description: 'Grupo semanal Habitudes',
        ministery: 'PG',
        inscriptions: 9,
        startDate: '2019-04-10',
        status: 'Cancelado',
        locale: 'Universidade da Família',
        actions: 1,
        myFunction: 'Responsavel',
        type: 'Treinamento',
      },
      {
        id: 5,
        description: 'Grupo semanal Homem ao máximo',
        ministery: 'CMN',
        inscriptions: 9,
        startDate: '2019-04-27',
        status: 'Em andamento',
        locale: 'PIB de Marília',
        actions: 1,
        myFunction: 'Responsavel',
        type: 'Treinamento',
      },
      {
        id: 6,
        description: 'Grupo semanal Homem ao máximo',
        ministery: 'CMN',
        inscriptions: 9,
        startDate: '2019-04-27',
        status: 'Em andamento',
        locale: 'Universidade da Família',
        actions: 1,
        myFunction: 'Responsavel',
        type: 'Treinamento',
      },
    ];
  };

  render() {
    return (
      <ReactTable
        data={this.makeData()}
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
            id: 'description',
            accessor: d => d.description,
            filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: ['description'] }),
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
            Header: 'Data',
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
            Header: 'Minha Função',
            id: 'myFunction',
            accessor: 'myFunction',
            filterMethod: (filter, row) => {
              if (filter.value === 'all') {
                return true;
              }
              if (filter.value === 'par') {
                return row[filter.id] === 'Responsavel';
              }
              if (filter.value === 'org') {
                return row[filter.id] === 'Responsavel';
              }
              if (filter.value === 'res') {
                return row[filter.id] === 'Responsavel';
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
                <option value="par">Responsavel</option>
                <option value="org">Responsavel</option>
                <option value="res">Responsavel</option>
              </select>
            ),
            width: 150,
          },
          {
            Header: 'Tipo',
            accessor: 'type',
            id: 'type',
            filterMethod: (filter, row) => {
              if (filter.value === 'all') {
                return true;
              }
              if (filter.value === 'evento') {
                return row[filter.id] === 'Evento';
              }
              if (filter.value === 'pedido') {
                return row[filter.id] === 'Pedido';
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
                <option value="evento">Evento</option>
                <option value="pedido">Pedido</option>
              </select>
            ),
            width: 150,
          },
        ]}
        defaultPageSize={5}
        getTdProps={(state, rowInfo, column, instance) => ({
          style: {
            cursor: 'pointer',
            overflow: column.id === 'actions' ? 'visible' : 'hidden',
          },
        })}
        className="-striped -highlight"
      />
    );
  }
}
