/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unused-state */
/* eslint-disable */
import React, { useState, useEffect, Component } from 'react';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Table,
  Label,
  Button,
} from 'reactstrap';
import { ChevronUp, ChevronDown } from 'react-feather';
import * as Yup from 'yup';

// import Plyr from '@rocketseat/react-plyr';
import { differenceInCalendarYears } from 'date-fns';
import { Formik, Field, Form, FieldArray } from 'formik';

import history from '~/app/history';

import { Creators as EventActions } from '../../../../../store/ducks/event';
import { Creators as LessonReportActions } from '../../../../../store/ducks/lessonReport';
import { Creators as ParticipantActions } from '../../../../../store/ducks/participant';

const formLessonReport = Yup.object().shape({
  prayRequest: Yup.string().max(700, 'Limite máximo de caracteres'),
});

class CurrencyFormat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  render() {
    const { currencyValue } = this.state;

    return (
      <NumberFormat
        inputMode="decimal"
        prefix="R$ "
        thousandSeparator="."
        decimalSeparator=","
        fixedDecimalScale
        decimalScale={2}
        allowNegative={false}
        defaultValue={0}
        value={currencyValue}
        onValueChange={vals => {
          this.setState({ value: vals.formattedValue });
        }}
        {...this.props}
      />
    );
  }
}

export default function Lesson({ match }) {
  const [confirmDisabled, setConfirmDisabled] = useState(true);
  const [presenceList, setPresenceList] = useState(null);
  const [lastLesson, setLastLesson] = useState(null);
  const [cantFinish, setCantFinish] = useState(false);
  const [openPrayRequest, setOpenPrayRequest] = useState(false);

  const dispatch = useDispatch();
  const data = useSelector(state => state.lessonReport.data);
  const eventData = useSelector(state => state.event.data);
  const profileData = useSelector(state => state.profile.data);

  function handleCheck(setFieldValue) {
    const participants = document.getElementsByClassName('childCheck').length;

    if (document.getElementById('checkAll').checked === true) {
      for (let index = 0; index < participants; index += 1) {
        document.getElementsByClassName('childCheck')[index].checked = true;
        setFieldValue(`selecteds.${index}.is_present`, true);
      }

      setConfirmDisabled(false);
    } else {
      for (let index = 0; index < participants; index += 1) {
        document.getElementsByClassName('childCheck')[index].checked = false;
        setFieldValue(`selecteds.${index}.is_present`, false);
      }

      setConfirmDisabled(true);
    }
  }

  function handleCheckChild(e, setFieldValue, id) {
    setFieldValue(`selecteds.${id}.is_present`, e.target.checked);

    if (e.target.checked) {
      setConfirmDisabled(false);
    }
  }

  function prayRequest(event) {
    event.preventDefault();
    setOpenPrayRequest(!openPrayRequest);
  }

  function handleSubmit(values) {
    if (parseInt(lastLesson.id, 10) === parseInt(match.params.lesson_id, 10)) {
      if (cantFinish === true) {
        toastr.confirm('Envie os relatórios das outras lições', {
          onOk: () => {},
          disableCancel: true,
        });
      } else {
        const participants = [];
        const participantsId = [];
        const assistantsId = [];

        eventData.participants.map(participant => {
          if (participant.pivot.assistant === false) {
            participantsId.push(participant.id);
          } else {
            assistantsId.push(participant.id);
          }
        });

        values.selecteds.map(selected => {
          participants.push({
            id: selected.id,
            is_present: selected.is_present,
          });
        });

        const payload = {
          lesson_report_id: data.id,
          date: new Date(),
          participants,
          offer: values.offer || 0,
          pray_request: values.prayRequest,
          // testimony: values.testimony,
          // doubts: values.doubts,
        };

        const participantWillBecome =
          eventData.defaultEvent.participant_will_become_id;
        const assistantWillBecome =
          eventData.defaultEvent.assistant_will_become_id;

        const hierarchyName = eventData.defaultEvent.ministery.tag;

        const payloadEvent = {
          is_finished: true,
        };

        dispatch(
          EventActions.eventEditRequest(match.params.event_id, payloadEvent)
        );
        dispatch(
          ParticipantActions.editParticipantHierarchyRequest(
            payload,
            eventData.id,
            participantsId,
            assistantsId,
            hierarchyName,
            participantWillBecome,
            assistantWillBecome
          )
        );
      }
    } else {
      const participants = [];

      eventData.participants.map(quitter => {
        if (quitter.pivot.is_quitter === true) {
          participants.push({
            id: quitter.pivot.id,
            is_present: false,
          });
        }
      });

      values.selecteds.map(selected => {
        participants.push({
          id: selected.id,
          is_present: selected.is_present,
        });
      });

      const payload = {
        lesson_report_id: data.id,
        date: new Date(),
        participants,
        offer: values.offer || 0,
        pray_request: values.prayRequest,
        // testimony: values.testimony,
        // doubts: values.doubts,
      };

      dispatch(
        LessonReportActions.editLessonReportRequest(
          match.params.event_id,
          payload
        )
      );
    }
  }

  function handleBackLessons() {
    toastr.confirm('As informações não serão salvas ao voltar.', {
      onOk: () =>
        history.push(`/eventos/grupo/${match.params.event_id}/editar`),
      onCancel: () => {},
    });
  }

  useEffect(() => {
    if (eventData !== null) {
      setLastLesson(
        eventData.lessonReports[eventData.lessonReports.length - 1]
      );

      let auxVerifyEndEvent = 0;

      eventData.lessonReports.map((lesson, index) => {
        if (eventData.lessonReports.length === index + 1) {
          return;
        }
        if (lesson.is_finished === false) {
          auxVerifyEndEvent += 1;
        }
      });

      if (auxVerifyEndEvent > 0) {
        setCantFinish(true);
      }
    }
  }, [eventData]);

  useEffect(() => {
    if (!!data.event && data.event.participants.length > 0) {
      const participants = [];

      if (data.is_finished === false) {
        data.event.participants.map(participant => {
          if (participant.pivot.is_quitter === false) {
            participants.push({
              id: participant.pivot.id,
              name: participant.name,
              birthday: participant.birthday,
              is_present: false,
            });
          } else {
            //
          }
        });

        setPresenceList(participants);
      } else {
        data.event.participants.map(participant => {
          const attendance = data.attendances.find(
            attendanceFind => attendanceFind.id === participant.pivot.id
          );
          if (attendance !== undefined) {
            participants.push({
              id: participant.pivot.id,
              name: participant.name,
              birthday: participant.birthday,
              is_present: attendance.pivot.is_present,
            });

            if (attendance.pivot.is_present) {
              setConfirmDisabled(false);
            }
          }
        });
        setPresenceList(participants);

        setOpenPrayRequest(true);
      }
    }
  }, [data, eventData]);

  useEffect(() => {
    dispatch(LessonReportActions.lessonReportRequest(match.params.lesson_id));
    dispatch(EventActions.eventRequest(match.params.event_id));
  }, []);

  return (
    <>
      {eventData !== null &&
        eventData.is_inscription_finished === false &&
        toastr.confirm('Finalize as inscrições primeiro!', {
          onOk: history.push(`/eventos/grupo/${match.params.event_id}/editar`),
          disableCancel: true,
        })}
      {!!data.lesson && (
        <Row>
          <Col xs="12">
            <Card className="white text-center p-4">
              <CardHeader className="p-0">
                <h1 className="black">{data.lesson.title}</h1>
                <p className="black">
                  <em>{data.lesson.description}</em>
                </p>
              </CardHeader>
              <CardBody className="d-flex flex-column justify-content-center align-items-center p-0">
                <Col xl="8" lg="7" md="12" xs="12" className="form-group">
                  {/* {data.lesson.video_id && (
                    <Plyr type="" videoId={data.lesson.video_id} />
                  )} */}
                </Col>
                <Formik
                  enableReinitialize
                  initialValues={{
                    checkAll: false,
                    selecteds: presenceList !== null ? presenceList : [],
                    offer: data.offer ? data.offer : '',
                    prayRequest: data.pray_request ? data.pray_request : '',
                  }}
                  validationSchema={formLessonReport}
                  onSubmit={values => handleSubmit(values)}
                >
                  {({ values, setFieldValue, errors, touched }) => (
                    <Form className="w-100 d-flex flex-column justify-content-center align-items-center">
                      <Col lg="8" md="12" xs="12">
                        <h2 className="black mt-4">Chamada</h2>
                        <h6 className="black">
                          <em>Marque os participantes presentes</em>
                        </h6>
                        <h6 className="red">
                          <em>*Ao menos um participante deve estar presente</em>
                        </h6>
                        {profileData.admin &&
                          lastLesson &&
                          parseInt(lastLesson.id, 10) ===
                            parseInt(match.params.lesson_id, 10) && (
                            <h6 className="red font-weight-bold">
                              CUIDADO: ao atualizar o último relatório semanal,
                              caso a chamada seja alterada, as hierarquias dos
                              participantes não serão atualizadas novamente. Se
                              necessário, acesse o cadastro de cada participante
                              para atualizar suas hierarquias.
                            </h6>
                          )}

                        {/* <TablePresence data={} /> */}
                        <Table bordered responsive>
                          <thead>
                            <tr>
                              <th width={'20%'}>
                                <Field
                                  disabled={
                                    data.is_finished && !profileData.admin
                                  }
                                  type="checkbox"
                                  className="ml-0"
                                  id="checkAll"
                                  name="checkAll"
                                  onClick={() => handleCheck(setFieldValue)}
                                />
                                <Label for="checkAll" className="pl-3">
                                  Todos
                                </Label>
                              </th>
                              <th width={'80%'}>Participantes</th>
                              {/* <th>Idade</th> */}
                            </tr>
                          </thead>
                          <tbody>
                            <FieldArray
                              name="selecteds"
                              render={arrayHelpers => (
                                <>
                                  {values.selecteds.map((selecteds, index) => (
                                    <tr
                                      key={index}
                                      className={`${!selecteds.is_present &&
                                        'table-danger'}`}
                                    >
                                      <td>
                                        <Field
                                          disabled={
                                            data.is_finished &&
                                            !profileData.admin
                                          }
                                          type="checkbox"
                                          checked={selecteds.is_present}
                                          className="ml-0 childCheck"
                                          id={`selecteds.${index}.checked`}
                                          name={`selecteds.${index}.checked`}
                                          onClick={e =>
                                            handleCheckChild(
                                              e,
                                              setFieldValue,
                                              index
                                            )
                                          }
                                        />
                                      </td>
                                      <td>
                                        <Label>{selecteds.name}</Label>
                                      </td>
                                    </tr>
                                  ))}
                                </>
                              )}
                            />
                          </tbody>
                        </Table>
                      </Col>

                      <Col lg="8" md="12" xs="12">
                        <h2
                          className="black mt-4"
                          style={{ cursor: 'pointer' }}
                          onClick={event => prayRequest(event)}
                        >
                          Comentários e pedidos de oração{' '}
                          {openPrayRequest === true ? (
                            <ChevronUp size={30} color="#212529" />
                          ) : (
                            <ChevronDown size={30} color="#212529" />
                          )}
                        </h2>
                        {openPrayRequest === true && (
                          <Field
                            component="textarea"
                            disabled={data.is_finished && !profileData.admin}
                            type="textarea"
                            id="prayRequest"
                            rows="5"
                            name="prayRequest"
                            className={`
                              form-control
                              ${errors &&
                                errors.prayRequest &&
                                touched &&
                                touched.prayRequest &&
                                'is-invalid'}
                            `}
                            value={values.prayRequest}
                            style={{
                              minHeight: '70px',
                              maxHeight: '350px',
                            }}
                          />
                        )}
                        {errors.prayRequest && touched.prayRequest ? (
                          <div className="invalid-feedback">
                            {errors.prayRequest}
                          </div>
                        ) : null}
                      </Col>
                      <Col lg="8" md="12" xs="12">
                        <h2 className="black mt-4">Oferta</h2>
                        <CurrencyFormat
                          disabled={data.is_finished && !profileData.admin}
                          id="offer"
                          name="offer"
                          className="form-control"
                          value={values.offer}
                          onValueChange={val =>
                            setFieldValue('offer', val.floatValue)
                          }
                        />
                      </Col>
                      <Col>
                        <Button
                          className="mt-4 mr-2"
                          outline
                          color="warning"
                          onClick={handleBackLessons}
                        >
                          Voltar
                        </Button>
                        {profileData.admin ? (
                          <Button
                            disabled={confirmDisabled}
                            className="mt-4 btn-success"
                            type="submit"
                          >
                            {data.is_finished
                              ? 'Alterar relatório'
                              : 'Confirmar relatório'}
                          </Button>
                        ) : (
                          <Button
                            disabled={data.is_finished || confirmDisabled}
                            className="mt-4 btn-success"
                            type="submit"
                          >
                            {data.is_finished
                              ? 'Alterar relatório'
                              : 'Confirmar relatório'}
                          </Button>
                        )}
                      </Col>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}
