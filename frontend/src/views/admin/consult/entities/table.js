/* eslint-disable react/prop-types */
import React, { useState, useEffect, memo } from 'react';
import { CSVLink } from 'react-csv';
import { FaFileExcel, FaFileDownload } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { BounceLoader } from 'react-spinners';
import ReactTable from 'react-table';
import {
  UncontrolledTooltip,
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
import hierarchies from '~/assets/data/hierarchies';
import { Creators as EntityActions } from '~/store/ducks/entity';
import { Creators as ExportExcelActions } from '~/store/ducks/exportExcel';
// import { Creators as ShippingTagActions } from '~/store/ducks/shippingTag';
import Tag from '~/views/tag/index';

function AdminTableEntities({ data, reload }) {
  // const [selectionData, setSelectionData] = useState([]);
  const [tagLeaderData, setTagLeaderData] = useState([]);
  // const [selectAllData, setSelectAllData] = useState(false);
  const [modalTag, setModalTag] = useState(false);
  const [excelHeaders, setExcelHeaders] = useState([]);
  const [excelData, setExcelData] = useState([]);

  const excel_data = useSelector(state => state.exportExcel.entityData);
  const excel_loading = useSelector(state => state.exportExcel.loading);

  const shippingTagData = useSelector(state => state.shippingTag.data);

  const dataTable = data.data;
  const dispatch = useDispatch();

  function handleEdit(e, column) {
    if (e === undefined || column === 'check_box') {
      return;
    }

    const { id } = e.original;

    // window.open(`/eventos/grupo/${id}/editar`, '_blank');
    history.push(`/admin/consulta/entidades/${id}`);
  }

  function handlePageChange(pageIndex) {
    // document.getElementById('selectAllHeader').checked = false;
    // setSelectAllData(false);
    // setSelectionData([]);
    localStorage.setItem('@dashboard/admin_entities_page', pageIndex + 1);
    dispatch(
      EntityActions.allConsultEntitiesRequest(pageIndex + 1, data.filters)
    );
  }

  // function onHeaderCheckboxClickHandler() {
  //   const selectAll = !selectAllData;
  //   const selection = [];
  //   if (selectAll) {
  //     // eslint-disable-next-line array-callback-return
  //     dataTable.map(item => {
  //       selection.push({
  //         event_id: item.id,
  //         leader_id: item.organizators[0].id,
  //       });
  //     });
  //   }
  //   setSelectAllData(selectAll);
  //   setSelectionData(selection);
  // }

  // function checkCheckedSelection(rowid) {
  //   const keyIndex = selectionData.findIndex(index => index.event_id === rowid);
  //   if (keyIndex >= 0) return true;
  //   return false;
  // }

  // function checkboxOnClickHandler(event_id, leader_id) {
  //   const keyIndex = selectionData.findIndex(
  //     index => index.event_id === event_id
  //   );
  //   if (keyIndex >= 0) {
  //     setSelectionData(
  //       selectionData.filter((data, index) => {
  //         return index !== keyIndex;
  //       })
  //     );
  //   } else {
  //     setSelectionData([...selectionData, { event_id, leader_id }]);
  //   }
  // }

  function toggleModalTag() {
    setModalTag(!modalTag);
  }

  // function handleGenerateTag() {
  //   toggleModalTag(true);
  //   dispatch(ShippingTagActions.shippingTagRequest(selectionData));
  // }

  function exportToExcel(event) {
    event.preventDefault();

    dispatch(
      ExportExcelActions.exportExcelEntityRequest(data.lastPage, data.filters)
    );
  }

  useEffect(() => {
    if (shippingTagData.length > 0) {
      setTagLeaderData(shippingTagData);
    }
  }, [shippingTagData]);

  useEffect(() => {
    if (reload) {
      // document.getElementById('selectAllHeader').checked = false;
      // setSelectAllData(false);
      // setSelectionData([]);

      // eslint-disable-next-line react-hooks/exhaustive-deps
      reload = false;
    }
  }, [reload]);

  useEffect(() => {
    if (excel_data && excel_data.length > 0) {
      setExcelHeaders([
        { label: 'id', key: 'id' },
        { label: 'nome', key: 'name' },
        { label: 'email', key: 'email' },
        { label: 'cpf', key: 'cpf' },
        { label: 'data nascimento', key: 'birthday' },
        { label: 'sexo', key: 'sex' },
        { label: 'telefone', key: 'phone' },
        { label: 'teltefone alt', key: 'alt_phone' },
        { label: 'facebook', key: 'facebook' },
        { label: 'instagram', key: 'instagram' },
        { label: 'linkedin', key: 'linkedin' },
        { label: 'cmn', key: 'cmn' },
        { label: 'mu', key: 'mu' },
        { label: 'crown', key: 'crown' },
        { label: 'mp', key: 'mp' },
        { label: 'ffi', key: 'ffi' },
        { label: 'gfi', key: 'gfi' },
        { label: 'pg hab', key: 'pg_hab' },
        { label: 'pg yes', key: 'pg_yes' },
        { label: 'data criacao', key: 'created_at' },
        { label: 'ultima atualizacao', key: 'updated_at' },
      ]);

      setExcelData(
        excel_data.map(entity => {
          let formattedPhone = null;
          let formattedAltPhone = null;

          if (entity.phone !== null) {
            formattedPhone = entity.phone
              .replace(/\D/g, '')
              .replace(/^(\d{2})(\d)/g, '($1) $2')
              .replace(/(\d)(\d{4})$/, '$1-$2');
          }

          if (entity.alt_phone !== null) {
            formattedAltPhone = entity.alt_phone
              .replace(/\D/g, '')
              .replace(/^(\d{2})(\d)/g, '($1) $2')
              .replace(/(\d)(\d{4})$/, '$1-$2');
          }

          return {
            id: entity.id,
            name: entity.name,
            email: entity.email,
            cpf: entity.cpf,
            birthday: entity.birthday,
            sex: entity.sex,
            phone: formattedPhone,
            alt_phone: formattedAltPhone,
            facebook: entity.facebook,
            instagram: entity.instagram,
            linkedin: entity.linkedin,
            cmn: hierarchies[entity.cmn_hierarchy_id],
            mu: hierarchies[entity.mu_hierarchy_id],
            crown: hierarchies[entity.crown_hierarchy_id],
            mp: hierarchies[entity.mp_hierarchy_id],
            ffi: hierarchies[entity.ffi_hierarchy_id],
            gfi: hierarchies[entity.gfi_hierarchy_id],
            pg_hab: hierarchies[entity.pg_hab_hierarchy_id],
            pg_yes: hierarchies[entity.pg_yes_hierarchy_id],
            created_at: entity.created_at,
            updated_at: entity.updated_at,
          };
        })
      );
    }
  }, [excel_data]);

  return (
    <>
      {/* <Row>
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
      </Row> */}
      <Row className="d-flex justify-content-end">
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
              filename={`entidades-portal-lider-${format(
                new Date(),
                'dd-MM-yyyy-HH-mm-ss',
                {
                  locale: pt,
                }
              )}.csv`}
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
        minRows={10}
        defaultPageSize={10}
        showPageSizeOptions={false}
        // pageSize={data.perPage}
        // onPageSizeChange={pageSize => handlePageSizeChange(pageSize)}
        columns={[
          // {
          //   id: 'check_box',
          //   accessor: 'check_box',
          //   Header: (
          //     <Input
          //       className="my-auto"
          //       type="checkbox"
          //       name="checkAll"
          //       id="selectAllHeader"
          //       onChange={onHeaderCheckboxClickHandler}
          //     />
          //   ),
          //   Cell: row => {
          //     const rowid = row.original.id;
          //     return (
          //       <Input
          //         className="m-auto"
          //         type="checkbox"
          //         key={`key${rowid}`}
          //         name="check"
          //         id={rowid}
          //         onChange={() =>
          //           checkboxOnClickHandler(
          //             rowid,
          //             row.original.organizators[0].id
          //           )
          //         }
          //         checked={checkCheckedSelection(rowid)}
          //       />
          //     );
          //   },
          //   width: 50,
          //   sortable: false,
          //   filterable: false,
          // },
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
            Header: 'Nome',
            id: 'name',
            accessor: d => d.name,
          },
          {
            Header: 'CPF',
            id: 'cpf',
            accessor: d => d.cpf,
          },
          {
            Header: 'Email',
            id: 'email',
            accessor: d => d.email,
          },
          {
            Header: 'Telefone',
            id: 'phone',
            accessor: d => {
              let formattedPhoneTable = null;

              if (d.phone !== null) {
                formattedPhoneTable = d.phone
                  .replace(/\D/g, '')
                  .replace(/^(\d{2})(\d)/g, '($1) $2')
                  .replace(/(\d)(\d{4})$/, '$1-$2');
              }

              return formattedPhoneTable;
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

export default memo(AdminTableEntities);
