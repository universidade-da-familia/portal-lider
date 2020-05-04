/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardBody, Row, Col, Button, Badge } from 'reactstrap';

import ContentHeader from '../../../components/contentHead/contentHeader';
import ContentSubHeader from '../../../components/contentHead/contentSubHeader';
import CustomTabs from '../../../components/tabs/default';
import { Creators as EventActions } from '../../../store/ducks/event';
// import GroupTabs from "./tabs";
import MyTrainingsTable from './myTrainingsTable';
// import ParticipantTable from './participantTable';
// import TrainedLeadersTable from './trainedLeadersTable';

// Table example pages
export default function Trainings() {
  const [allEvents, setAllEvents] = useState([]);

  const profile = useSelector(state => state.profile.data);
  const allData = useSelector(state => state.event.allData);

  const user_type = localStorage.getItem('@dashboard/user_type');

  const dispatch = useDispatch();

  useEffect(() => {
    if (allData.id) {
      const auxAllEvents = []
      allData.organizators.filter(event => {
        if (event.defaultEvent.event_type === 'Treinamento de treinadores') {
          return auxAllEvents.push(event)
        }
      });
      allData.participants.map(participant => {
        if (participant.pivot.assistant) {
          auxAllEvents.push(participant);
        }
      });

      auxAllEvents.sort((a, b) => {
        if (a.start_date < b.start_date) {
          return 1;
        }
        if (a.start_date > b.start_date) {
          return -1;
        }
        return 0;
      });

      setAllEvents(auxAllEvents);
    }
  }, [allData]);

  useEffect(() => {
    dispatch(EventActions.allEventRequest());
  }, [profile]);

  return (
    <>
      <ContentHeader>Treinamentos</ContentHeader>
      <ContentSubHeader>
        Visualize seus treinamentos.
      </ContentSubHeader>
      <Row className="row-eq-height">
        <Col sm="12">
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between">
                <Badge color="info" className="align-self-center">
                  Meus treinamentos
                </Badge>
                <div>
                  <div className="d-none d-sm-none d-md-none d-lg-block">
                    <Link to="/eventos/treinamento/criar">
                      <Button
                        color="success"
                        className="btn-raised mb-0 font-small-3"
                      >
                        <i className="fa fa-plus" /> Criar novo treinamento
                      </Button>{' '}
                    </Link>
                  </div>
                  <div>
                    <Link to="/eventos/treinamento/criar">
                      <Button
                        color="success"
                        className="btn-raised mb-0 d-lg-none"
                      >
                        <i className="fa fa-plus" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <CustomTabs
                TabContent={
                  <MyTrainingsTable
                    data={allEvents}
                  />
                }
              />
            </CardBody>
          </Card>
          {/* <Card>
            <CardBody>
              <div className="d-flex justify-content-between">
                <Badge color="info" className="align-self-center">
                  {user_type === 'entitys'
                    ? 'Grupos que participo'
                    : 'Grupos com membros inscritos'}
                </Badge>
              </div>
              <CustomTabs
                TabContent={<ParticipantTable data={allData.participants} />}
              />
            </CardBody>
          </Card> */}
          {/* <Card>
            <CardBody>
              <div className="d-flex justify-content-between">
                <Badge color="info" className="align-self-center">
                  Líderes que eu treinei
                </Badge>
              </div>
              <CustomTabs
                TabContent={<TrainedLeadersTable data={allData.myTrainers} />}
              />
            </CardBody>
          </Card> */}
        </Col>
      </Row>
    </>
  );
}
