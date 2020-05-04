import React from 'react';
import { List } from 'react-feather';
import { useDispatch } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import ReactTable from 'react-table';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

// Import React Table
import 'react-table/react-table.css';

import { Creators as InviteActions } from '~/store/ducks/invite';

export default function InvitedTable({ data }) {
  const dispatch = useDispatch();

  function removeInvite(instance) {
    const invite_id = instance.original.id;

    toastr.confirm('Tem certeza de que deseja apagar o convite?', {
      onOk: () => dispatch(InviteActions.deleteInviteRequest(invite_id)),
      onCancel: () => {},
    });
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
      pageJumpText="pular para a página"
      rowsSelectorText="linhas por página"
      defaultFilterMethod={(filter, row) =>
        String(row[filter.id]) === filter.value
      }
      columns={[
        {
          Header: 'Id convite',
          id: 'id',
          accessor: d => d.id,
          width: 110,
        },
        {
          Header: 'Participante',
          id: 'name',
          accessor: d => d.name,
        },
        {
          Header: 'Email',
          id: 'email',
          accessor: d => d.email,
        },
        {
          Header: 'Ações',
          accessor: 'actions',
          id: 'actions',
          width: 80,
          filterable: false,
          sortable: false,
          Cell: instance => {
            return (
              <UncontrolledDropdown className="d-flex align-content-center justify-content-center">
                <DropdownToggle className="bg-transparent mb-0 p-1 line-height-1">
                  <List size={14} color="#000" />
                </DropdownToggle>
                <DropdownMenu className="overflow-visible">
                  <DropdownItem onClick={() => removeInvite(instance)}>
                    Remover
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            );
          },
        },
      ]}
      defaultPageSize={5}
      showPageSizeOptions={false}
      getTdProps={(state, rowInfo, column) => {
        return {
          style: {
            cursor: 'pointer',
            overflow: column.id === 'actions' ? 'visible' : 'hidden',
          },
        };
      }}
      className="-striped -highlight"
    />
  );
}
