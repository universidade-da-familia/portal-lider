/* eslint-disable react/prop-types */
import React, { useState, useEffect, memo } from 'react';
import { CSVLink } from 'react-csv';
import { Trash2 } from 'react-feather';
import { FaFileExcel, FaFileDownload } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { BounceLoader } from 'react-spinners';
import ReactTable from 'react-table';
import {
  UncontrolledTooltip,
  Input,
  Button,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';

// eslint-disable-next-line import/no-extraneous-dependencies
import { css } from '@emotion/core';
import { BlobProvider } from '@react-pdf/renderer';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import 'react-table/react-table.css';

import history from '~/app/history';
import { Creators as EventActions } from '~/store/ducks/event';
import { Creators as ExportExcelActions } from '~/store/ducks/exportExcel';
import { Creators as ShippingTagActions } from '~/store/ducks/shippingTag';
import Tag from '~/views/tag/index';

function AdminTableEvents({ data, reload }) {
  const [selectionData, setSelectionData] = useState([]);
  const [tagLeaderData, setTagLeaderData] = useState([]);
  const [selectAllData, setSelectAllData] = useState(false);
  const [modalTag, setModalTag] = useState(false);
  const [excelHeaders, setExcelHeaders] = useState([]);
  const [excelData, setExcelData] = useState([]);

  const shippingTagData = useSelector(state => state.shippingTag.data);
  const excel_data = useSelector(state => state.exportExcel.eventData);
  const excel_loading = useSelector(state => state.exportExcel.loading);

  const dataTable = data.data;
  const dispatch = useDispatch();

  function handleEdit(e, column) {
    if (e === undefined || column === 'check_box') {
      return;
    }

    if (column === 'delete') {
      toastr.confirm('Tem certeza que deseja deletar este grupo?', {
        onOk: () => dispatch(EventActions.deleteEventRequest(e.original.id)),
        onCancel: () => {},
        okText: 'Sim',
        cancelText: 'Não',
      });
      return;
    }

    const { id } = e.original;

    // window.open(`/eventos/grupo/${id}/editar`, '_blank');
    history.push(`/eventos/grupo/${id}/editar`);
  }

  function handlePageChange(pageIndex) {
    document.getElementById('selectAllHeader').checked = false;
    setSelectAllData(false);
    setSelectionData([]);
    localStorage.setItem('@dashboard/admin_event_page', pageIndex + 1);
    dispatch(EventActions.allConsultEventRequest(pageIndex + 1, data.filters));
  }

  // function handlePageSizeChange(pageSize) {
  //   document.getElementById('selectAllHeader').checked = false;
  //   setSelectAllData(false);
  //   setSelectionData([]);
  //   data.filters.perPage = pageSize;

  //   data.page = 1;

  //   dispatch(EventActions.allConsultEventRequest(data.page, data.filters));
  // }

  function onHeaderCheckboxClickHandler() {
    const selectAll = !selectAllData;
    if (selectAll) {
      // eslint-disable-next-line array-callback-return
      setSelectionData(
        dataTable.map(item => {
          return {
            event_id: item.id,
            leader_id: item.organizators[0].id,
          };
        })
      );
    }
    setSelectAllData(selectAll);
    // setSelectionData(selection);
  }

  function checkCheckedSelection(rowid) {
    const keyIndex = selectionData.findIndex(index => index.event_id === rowid);
    if (keyIndex >= 0) return true;
    return false;
  }

  function checkboxOnClickHandler(event_id, leader_id) {
    const keyIndex = selectionData.findIndex(
      index => index.event_id === event_id
    );
    if (keyIndex >= 0) {
      setSelectionData(
        selectionData.filter((data, index) => {
          return index !== keyIndex;
        })
      );
    } else {
      setSelectionData([...selectionData, { event_id, leader_id }]);
    }
  }

  function toggleModalTag() {
    setModalTag(!modalTag);
  }

  function handleGenerateTag() {
    toggleModalTag(true);
    dispatch(ShippingTagActions.shippingTagRequest(selectionData));
  }

  function exportToExcel(event) {
    event.preventDefault();

    dispatch(
      ExportExcelActions.exportExcelRequest(data.lastPage, data.filters)
    );
  }

  useEffect(() => {
    if (shippingTagData.length > 0) {
      const tags = shippingTagData.map(tag => {
        const eventsTags = [];
        selectionData.filter(select => {
          return select.leader_id === tag.id
            ? eventsTags.push(select.event_id)
            : '';
        });
        tag.events = eventsTags;
        return tag;
      });

      setTagLeaderData(tags);
    }
  }, [shippingTagData, selectionData]);

  useEffect(() => {
    if (reload) {
      document.getElementById('selectAllHeader').checked = false;
      setSelectAllData(false);
      setSelectionData([]);

      // eslint-disable-next-line react-hooks/exhaustive-deps
      reload = false;
    }
  }, [reload]);

  useEffect(() => {
    if (excel_data && excel_data.length > 0) {
      setExcelHeaders([
        { label: 'id', key: 'id' },
        { label: 'nome', key: 'name' },
        { label: 'ministerio', key: 'ministery' },
        { label: 'lider', key: 'leader' },
        { label: 'cep', key: 'cep' },
        { label: 'cidade', key: 'city' },
        { label: 'estado', key: 'uf' },
        { label: 'data inicio', key: 'start_date' },
        { label: 'data formatura', key: 'end_date' },
        { label: 'status', key: 'status' },
        { label: 'lideres', key: 'leaders' },
        { label: 'assistentes', key: 'assistants' },
        { label: 'inscritos', key: 'no_quitters' },
        { label: 'desistentes', key: 'quitters' },
        { label: 'data criacao', key: 'created_at' },
        { label: 'ultima atualizacao', key: 'updated_at' },
      ]);

      setExcelData(
        excel_data.map(event => {
          return {
            id: event.id,
            name: event.defaultEvent.name,
            ministery: event.defaultEvent.ministery.name,
            leader: event.organizators[0].name,
            cep: event.cep,
            city: event.city,
            uf: event.uf,
            start_date: format(new Date(event.start_date), 'dd/MM/yyyy', {
              locale: pt,
            }),
            end_date: event.end_date
              ? format(new Date(event.end_date), 'dd/MM/yyyy', {
                  locale: pt,
                })
              : 'Não informado',
            status: event.status,
            leaders: event.organizators.length,
            assistants: event.participants.filter(
              assistant =>
                assistant.pivot.assistant && !assistant.pivot.is_quitter
            ).length,
            no_quitters: event.noQuitterParticipants.length,
            quitters: event.participants.filter(
              quitter => quitter.pivot.is_quitter
            ).length,
            created_at: format(
              new Date(event.created_at),
              'dd/MM/yyyy HH:mm:ss',
              {
                locale: pt,
              }
            ),
            updated_at: format(
              new Date(event.updated_at),
              'dd/MM/yyyy HH:mm:ss',
              {
                locale: pt,
              }
            ),
          };
        })
      );
    }
  }, [excel_data]);

  return (
    <>
      <Row className="d-flex justify-content-between">
        <Col lg="2" md="2" sm="12">
          <Button
            color="success"
            className="btn-default btn-raised"
            onClick={handleGenerateTag}
            disabled={selectionData.length <= 0}
          >
            Gerar etiquetas
          </Button>
        </Col>
        {excelData && excelData.length === 0 && (
          <Col lg="1" md="1" sm="12">
            <Button
              disabled={excel_loading}
              color="success"
              onClick={event => exportToExcel(event)}
            >
              {excel_loading ? (
                <BounceLoader
                  size={23}
                  color="#fff"
                  css={css`
                    display: block;
                    margin: 0 auto;
                  `}
                />
              ) : (
                <FaFileExcel size={20} />
              )}
            </Button>
          </Col>
        )}
        {excelData && excelData.length > 0 && (
          <Col lg="1" md="1" sm="12">
            <CSVLink
              filename={`eventos-portal-lider-${format(
                new Date(),
                'dd-MM-yyyy-HH-mm-ss',
                {
                  locale: pt,
                }
              )}`}
              id="csv-download"
              className="btn btn-outline-info"
              data={excelData}
              headers={excelHeaders}
              separator=";"
            >
              <FaFileDownload size={20} />
            </CSVLink>
            <UncontrolledTooltip placement="left" target="csv-download">
              Fazer download
            </UncontrolledTooltip>
          </Col>
        )}
      </Row>
      <ReactTable
        data={dataTable}
        manual
        resolveData={data => data.map(row => row)}
        page={data.page - 1}
        pages={data.lastPage}
        sortable={false}
        onPageChange={pageIndex => handlePageChange(pageIndex)}
        previousText="Página anterior"
        nextText="Próxima página"
        loadingText="Carregando..."
        noDataText="Não há dados"
        pageText="Página"
        ofText="de"
        rowsText="linhas"
        pageJumpText="pular para a página"
        rowsSelectorText="linhas por página"
        // pageSizeOptions={[10, 25, 50]}
        minRows={data.filters.perPage}
        defaultPageSize={data.filters.perPage}
        showPageSizeOptions={false}
        // pageSize={data.perPage}
        // onPageSizeChange={pageSize => handlePageSizeChange(pageSize)}
        columns={[
          {
            id: 'check_box',
            accessor: 'check_box',
            Header: (
              <Input
                className="my-auto"
                type="checkbox"
                name="checkAll"
                id="selectAllHeader"
                onChange={onHeaderCheckboxClickHandler}
              />
            ),
            Cell: row => {
              const rowid = row.original.id;
              return (
                <Input
                  className="m-auto"
                  type="checkbox"
                  key={`key${rowid}`}
                  name="check"
                  id={rowid}
                  onChange={() =>
                    checkboxOnClickHandler(
                      rowid,
                      row.original.organizators[0].id
                    )
                  }
                  checked={checkCheckedSelection(rowid)}
                />
              );
            },
            width: 50,
            sortable: false,
            filterable: false,
          },
          {
            Header: 'ID',
            accessor: 'id',
            width: 80,
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
            width: 120,
            accessor: d => d.defaultEvent.event_type,
          },
          {
            Header: 'Evento',
            id: 'defaultEvent',
            width: 260,
            accessor: d => d.defaultEvent.name,
          },
          {
            Header: 'Líder',
            id: 'organizator',
            accessor: d =>
              d.organizators.length > 0 ? d.organizators[0].name : 'Sem líder',
          },
          {
            Header: 'Ministério',
            id: 'ministery',
            width: 120,
            accessor: d => d.defaultEvent.ministery.name,
          },
          {
            Header: 'Inscritos',
            id: 'participants',
            width: 80,
            accessor: d => d.noQuitterParticipants.length,
          },
          {
            Header: 'Início',
            id: 'start_date',
            accessor: d => {
              return d.start_date;
            },
            Cell: row =>
              format(new Date(row.value), 'dd/MM/yyyy', { locale: pt }),
            filterAll: true,
            width: 100,
          },
          {
            Header: 'Status',
            id: 'status',
            width: 100,
            accessor: d => d.status,
          },
          {
            Header: 'Ações',
            accessor: 'delete',
            id: 'delete',
            width: 80,
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
        getTdProps={(state, rowInfo, column) => {
          return {
            style: {
              cursor: 'pointer',
              overflow: column.id === 'actions' ? 'visible' : 'hidden',
            },
            onClick: () => {
              handleEdit(rowInfo, column.id);
            },
          };
        }}
        className="-striped -highlight"
      />

      <Modal isOpen={modalTag} toggle={toggleModalTag} size="lg">
        <ModalHeader toggle={toggleModalTag}>
          Impressão de etiquetas
        </ModalHeader>
        <ModalBody>
          {/* <PDFViewer className="width-100-per height-800">
            <Tag tags={selectionData} />
          </PDFViewer> */}
          <BlobProvider document={<Tag tags={tagLeaderData} />}>
            {({ url }) => {
              return (
                <iframe
                  title="print_tag"
                  src={url}
                  style={{ width: '100%', height: '700px' }}
                />
              );
            }}
          </BlobProvider>
        </ModalBody>
      </Modal>
    </>
  );
}

export default memo(AdminTableEvents);
