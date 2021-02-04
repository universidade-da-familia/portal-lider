/* eslint-disable react/prop-types */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { List } from 'react-feather';
import { useDispatch } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import ReactTable from 'react-table';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Row,
  Col,
  Label,
  Button,
} from 'reactstrap';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

// Import React Table
import 'react-table/react-table.css';

import CpfFormat from '~/components/fields/CPFFormat';
import PhoneFormat from '~/components/fields/PhoneFormat';
// import { validateCPF } from '~/services/validateCPF';
import { Creators as ParticipantActions } from '~/store/ducks/participant';

const formEditParticipant = Yup.object().shape({
  email: Yup.string().matches(
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    'Digite um email válido'
  ),
});

// eslint-disable-next-line react/prop-types
export default function QuitterTable({
  data,
  totalParticipant,
  eventData,
  className,
}) {
  const dispatch = useDispatch();
  const [modalEditParticipant, setModalEditParticipant] = useState(false);
  const [participantData, setParticipantData] = useState(null);
  const [trainingLeadersCount, setTrainingLeadersCount] = useState(0);

  useEffect(() => {
    let trainingCounter = 0;

    eventData.participants.map(trainingLeader => {
      if (
        trainingLeader.pivot.assistant === true &&
        trainingLeader.pivot.is_quitter === false
      ) {
        trainingCounter += 1;
      }
    });

    setTrainingLeadersCount(trainingCounter);
  }, [eventData]);

  function setInscription(instance) {
    const participant_id = instance.original.pivot.id;

    toastr.confirm(
      `Tem certeza de que quer tornar ${instance.original.name} em inscrito?`,
      {
        onOk: () =>
          dispatch(
            ParticipantActions.setQuitterParticipantRequest(
              participant_id,
              false,
              false
            )
          ),
        onCancel: () => {},
        okText: 'Sim',
        cancelText: 'Não',
      }
    );
  }

  // function setLeader(leader) {
  //   toastr.confirm(`Tem certeza de que quer tornar ${leader.name} em líder?`, {
  //     onOk: () => {
  //       dispatch(
  //         ParticipantActions.changeParticipantLeaderRequest(
  //           leader.pivot.id,
  //           leader.id,
  //           eventData.id
  //         )
  //       );
  //       // window.location.reload();
  //     },
  //     onCancel: () => {},
  //   });
  // }

  function setTrainingLeader(trainingLeader) {
    toastr.confirm(
      `Tem certeza de que quer tornar ${trainingLeader.name} em líder em treinamento?`,
      {
        onOk: () =>
          dispatch(
            ParticipantActions.setQuitterParticipantRequest(
              trainingLeader.pivot.id,
              false,
              true
            )
          ),
        onCancel: () => {},
        okText: 'Sim',
        cancelText: 'Não',
      }
    );

    // dispatch(
    //   ParticipantActions.addParticipantRequest(
    //     trainingLeader.id,
    //     eventData.id,
    //     true
    //   )
    // );
  }

  function toggleOpenModalEditParticipant(participant, column) {
    if (column === 'Ações' || participant === undefined) {
      return;
    }
    setModalEditParticipant(!modalEditParticipant);
    setParticipantData(participant.original);
  }

  function toggleCloseModalEditParticipant() {
    setModalEditParticipant(false);
    setParticipantData(null);
  }

  function handleEditParticipant(values) {
    const data = {
      id: participantData ? participantData.id : '',
      name: values.name ? values.name : '',
      cpf: values.cpf ? values.cpf : '',
      email: values.email ? values.email : '',
      phone: values.phone ? values.phone : '',
      alt_phone: values.altPhone ? values.altPhone : '',
    };

    dispatch(ParticipantActions.editParticipantRequest(data));
  }

  return (
    <>
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
        sortable={false}
        defaultFilterMethod={(filter, row) =>
          String(row[filter.id]) === filter.value
        }
        columns={[
          {
            Header: 'Matrícula',
            id: 'pivot.id',
            accessor: d => d.pivot.id,
            width: 90,
          },
          {
            Header: 'Cod. Usuário',
            id: 'id',
            accessor: d => d.id,
            width: 110,
          },
          {
            Header: 'Nome',
            id: 'name',
            accessor: d => d.name,
          },
          // {
          //   Header: 'CPF',
          //   id: 'cpf',
          //   accessor: d => d.cpf,
          //   maxWidth: 150,
          // },
          {
            Header: 'Celular',
            id: 'phone',
            accessor: d => d.phone,
            maxWidth: 150,
          },
          {
            Header: 'Email',
            id: 'email',
            accessor: d => d.email,
          },
          {
            Header: 'Hierarquia',
            id: 'pivot.assistant',
            accessor: d =>
              d.pivot.assistant ? 'Líder em treinamento' : 'Participante',
            maxWidth: 200,
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
                  <DropdownToggle
                    className="bg-transparent mb-0 p-1 line-height-1"
                    disabled={!totalParticipant}
                  >
                    <List size={14} color="#000" />
                  </DropdownToggle>
                  <DropdownMenu className="overflow-visible">
                    <DropdownItem onClick={() => setInscription(instance)}>
                      Tornar participante
                    </DropdownItem>
                    {trainingLeadersCount <
                      eventData.defaultEvent.max_assistants &&
                      instance.original[eventData.defaultEvent.ministery.tag] >=
                        eventData.defaultEvent.assistant_hierarchy_id && (
                        <DropdownItem
                          onClick={() => setTrainingLeader(instance.original)}
                        >
                          Tornar lider em treinamento
                        </DropdownItem>
                      )}
                  </DropdownMenu>
                </UncontrolledDropdown>
              );
            },
          },
        ]}
        defaultPageSize={5}
        showPageSizeOptions={false}
        // eslint-disable-next-line no-unused-vars
        getTdProps={(state, rowInfo, column, instance) => {
          return {
            style: {
              cursor: 'pointer',
              overflow: column.id === 'actions' ? 'visible' : 'hidden',
            },
            onClick: () =>
              toggleOpenModalEditParticipant(rowInfo, column.Header),
          };
        }}
        className="-striped -highlight"
      />

      {/* MODAL EDITAR PARTICIPANTE */}
      <Modal
        isOpen={modalEditParticipant}
        toggle={toggleCloseModalEditParticipant}
        className={className}
      >
        <ModalHeader toggle={toggleCloseModalEditParticipant}>
          Visualizar participante
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              participant_id: participantData ? participantData.id : '',
              netsuite_id: participantData ? participantData.netsuite_id : '',
              name: participantData ? participantData.name : '',
              cpf: participantData ? participantData.cpf : '',
              email: participantData ? participantData.email : '',
              phone: participantData ? participantData.phone : '',
              altPhone: participantData ? participantData.alt_phone : '',
            }}
            validationSchema={formEditParticipant}
            onSubmit={values => handleEditParticipant(values)}
          >
            {({ values }) => (
              <Form>
                <FormGroup>
                  <Row className="mb-2 px-2">
                    <Col sm="6" md="6" lg="6">
                      <Label for="participant_id">ID</Label>
                      <Field
                        readOnly
                        type="text"
                        name="participant_id"
                        id="participant_id"
                        className="form-control"
                      />
                    </Col>
                    <Col sm="6" md="6" lg="6">
                      <Label for="netsuite_id">Netsuite ID</Label>
                      <Field
                        readOnly
                        type="text"
                        name="netsuite_id"
                        id="netsuite_id"
                        placeholder="Sem Netsuite id"
                        className="form-control"
                      />
                    </Col>
                  </Row>
                  <Col sm="12" md="12" lg="12" className="mb-2">
                    <Label for="name">Nome</Label>
                    <Field
                      readOnly
                      type="text"
                      placeholder="Nome do participante"
                      name="name"
                      id="name"
                      className="form-control"
                    />
                  </Col>
                  <Col sm="12" md="12" lg="12" className="mb-2">
                    <Label for="cpf">CPF</Label>
                    <Field
                      readOnly
                      type="text"
                      name="cpf"
                      id="cpf"
                      className="form-control"
                      render={({ field }) => (
                        <CpfFormat
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...field}
                          id="cpf"
                          name="cpf"
                          readOnly
                          placeholder="Sem CPF"
                          className="form-control"
                          value={values.cpf}
                        />
                      )}
                      // validate={validateCPF}
                    />
                  </Col>
                  <Col sm="12" md="12" lg="12" className="mb-2">
                    <Label for="email">Email</Label>
                    <Field
                      readOnly
                      type="text"
                      placeholder="Sem email"
                      name="email"
                      id="email"
                      className="form-control"
                    />
                  </Col>
                  <Col sm="12" md="12" lg="12" className="mb-2">
                    <Label for="phone">Telefone principal (NF)</Label>
                    <Field
                      readOnly
                      type="text"
                      name="phone"
                      id="phone"
                      className="form-control"
                      render={({ field }) => (
                        <PhoneFormat
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...field}
                          id="phone"
                          name="phone"
                          readOnly
                          placeholder="Sem telefone"
                          className="form-control"
                          value={values.phone}
                        />
                      )}
                    />
                  </Col>
                  <Col sm="12" md="12" lg="12" className="mb-2">
                    <Label for="altPhone">Telefone alternativo</Label>
                    <Field
                      readOnly
                      type="text"
                      placeholder="Sem telefone alternativo"
                      name="altPhone"
                      id="altPhone"
                      className="form-control"
                    />
                  </Col>
                </FormGroup>
              </Form>
            )}
          </Formik>
        </ModalBody>
        <ModalFooter>
          <Button
            className="ml-1 my-1"
            color="warning"
            onClick={toggleCloseModalEditParticipant}
          >
            Voltar
          </Button>{' '}
        </ModalFooter>
      </Modal>
    </>
  );
}
