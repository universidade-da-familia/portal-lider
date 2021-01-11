/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  Row,
  Col,
  Button,
  Badge,
  // Modal,
  // ModalBody,
  // ModalFooter,
} from 'reactstrap';

import ContentHeader from '../../../components/contentHead/contentHeader';
import ContentSubHeader from '../../../components/contentHead/contentSubHeader';
import CustomTabs from '../../../components/tabs/default';
import { Creators as EventActions } from '../../../store/ducks/event';
// import GroupTabs from "./tabs";
import LeaderTable from './leaderTable';
// import ParticipantTable from './participantTable';
// import TrainedLeadersTable from './trainedLeadersTable';

// Table example pages
export default function Groups() {
  // const [modalCaminhosLegados, setModalCaminhosLegados] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  // const [
  //   canOpenedModalCaminhosLegados,
  //   setCanOpenedModalCaminhosLegados,
  // ] = useState(() => {
  //   const caminhoslegados = sessionStorage.getItem(
  //     '@dashboard/caminhoslegados'
  //   );

  //   return caminhoslegados ? false : true;
  // });

  const profile = useSelector(state => state.profile.data);
  const allData = useSelector(state => state.event.allData);

  const user_type = localStorage.getItem('@dashboard/user_type');

  const dispatch = useDispatch();

  useEffect(() => {
    if (allData.id) {
      const auxAllEvents = [];
      allData.organizators.filter(event => {
        if (event.defaultEvent.event_type === 'Curso') {
          return auxAllEvents.push(event);
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

  // useEffect(() => {
  //   if (canOpenedModalCaminhosLegados) {
  //     setModalCaminhosLegados(true);
  //   }

  //   sessionStorage.setItem('@dashboard/caminhoslegados', true);
  // }, []);

  return (
    <>
      <ContentHeader>Grupos</ContentHeader>
      <ContentSubHeader>Visualize os grupos que lidera.</ContentSubHeader>
      <Row className="row-eq-height">
        <Col sm="12">
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between">
                <Badge color="info" className="align-self-center">
                  {user_type === 'entity'
                    ? 'Grupos que sou líder'
                    : 'Grupos que sou responsável'}
                </Badge>
                <div>
                  <div className="d-none d-sm-none d-md-none d-lg-block">
                    <Link to="/eventos/grupo/criar">
                      <Button
                        color="success"
                        className="btn-raised mb-0 font-small-3"
                      >
                        <i className="fa fa-plus" /> Criar novo grupo
                      </Button>{' '}
                    </Link>
                  </div>
                  <div>
                    <Link to="/eventos/grupo/criar">
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
                  <LeaderTable
                    data={user_type === 'entity' ? allEvents : allData.events}
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
      {/* <Modal
        isOpen={modalCaminhosLegados}
        toggle={() => setModalCaminhosLegados(false)}
      >
        <ModalBody>
          <img
            src="https://i.imgur.com/tsfW6t5.png"
            alt="Caminhos e Legados"
            width="100%"
            height="auto"
          />
        </ModalBody>
        <ModalFooter>
          <Button
            className="ml-1 my-1 btn-default"
            color="primary"
            onClick={() => setModalCaminhosLegadosInvite(false)}
          >
            Entendi!
          </Button>
        </ModalFooter>
      </Modal> */}
    </>
  );
}
