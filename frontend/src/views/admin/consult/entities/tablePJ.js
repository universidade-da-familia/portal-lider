/* eslint-disable react/prop-types */
import React, { useEffect, useState, memo } from 'react';
import { CSVLink } from 'react-csv';
import { FaFileExcel, FaFileDownload } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { BounceLoader } from 'react-spinners';
import ReactTable from 'react-table';
import { UncontrolledTooltip, Button, Row, Col } from 'reactstrap';

// eslint-disable-next-line import/no-extraneous-dependencies
import { css } from '@emotion/core';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import 'react-table/react-table.css';

import history from '~/app/history';
import { Creators as EntityActions } from '~/store/ducks/entity';
import { Creators as ExportExcelActions } from '~/store/ducks/exportExcel';

function AdminTableOrganizations({ data, reload }) {
  const [excelHeaders, setExcelHeaders] = useState([]);
  const [excelData, setExcelData] = useState([]);

  const excel_data = useSelector(state => state.exportExcel.organizationData);
  const excel_loading = useSelector(state => state.exportExcel.loading);

  const dataTable = data.data;
  const dispatch = useDispatch();

  function handleEdit(e, column) {
    if (e === undefined || column === 'check_box') {
      return;
    }

    const { id } = e.original;

    // window.open(`/eventos/grupo/${id}/editar`, '_blank');
    history.push(`/admin/consulta/entidades/pj/${id}`);
  }

  function handlePageChange(pageIndex) {
    localStorage.setItem('@dashboard/admin_entities_page', pageIndex + 1);
    dispatch(
      EntityActions.allConsultEntitiesRequest(pageIndex + 1, data.filters)
    );
  }

  function exportToExcel(event) {
    event.preventDefault();

    dispatch(
      ExportExcelActions.exportExcelOrganizationRequest(
        data.lastPage,
        data.filters
      )
    );
  }

  useEffect(() => {
    if (excel_data && excel_data.length > 0) {
      setExcelHeaders([
        { label: 'id', key: 'id' },
        { label: 'nome', key: 'name' },
        { label: 'email', key: 'email' },
        { label: 'cnpj', key: 'cnpj' },
        { label: 'data fundacao', key: 'foundation' },
        { label: 'telefone', key: 'phone' },
        { label: 'teltefone alt', key: 'alt_phone' },
        { label: 'facebook', key: 'facebook' },
        { label: 'instagram', key: 'instagram' },
        { label: 'linkedin', key: 'linkedin' },
        { label: 'data criacao', key: 'created_at' },
        { label: 'ultima atualizacao', key: 'updated_at' },
      ]);

      setExcelData(
        excel_data.map(organization => {
          return {
            id: organization.id,
            name: organization.corporate_name,
            email: organization.email,
            cnpj: organization.cnpj,
            foundation: organization.foundation,
            phone: organization.phone,
            alt_phone: organization.alt_phone,
            facebook: organization.facebook,
            instagram: organization.instagram,
            linkedin: organization.linkedin,
            created_at: organization.created_at,
            updated_at: organization.updated_at,
          };
        })
      );
    }
  }, [excel_data]);

  useEffect(() => {
    if (reload) {
      reload = false;
    }
  }, [reload]);

  return (
    <>
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
        minRows={10}
        defaultPageSize={10}
        showPageSizeOptions={false}
        columns={[
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
            accessor: d => d.corporate_name,
          },
          {
            Header: 'CNPJ',
            id: 'cnpj',
            accessor: d => d.cnpj,
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
    </>
  );
}

export default memo(AdminTableOrganizations);
