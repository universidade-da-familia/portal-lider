/* eslint-disable react/no-unused-state */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Row, Col, Button, Badge } from 'reactstrap';

import ContentHeader from '../../../components/contentHead/contentHeader';
import ContentSubHeader from '../../../components/contentHead/contentSubHeader';
import CustomTabs from '../../../components/tabs/default';
// import GroupTabs from "./tabs";
import CoordinateTable from './coordinateTable';
import FacilitateLeadersTable from './facilitateTable';
import ParticipantTable from './participantTable';
// import TrainedFacilitatorTable from './trainedFacilitatorTable';

class Seminaries extends Component {
  state = {
    modalAddEvent: false,
  };

  render() {
    return (
      <>
        <ContentHeader>Seminários</ContentHeader>
        <ContentSubHeader>
          Visualize os seminários que coordena ou facilita.
        </ContentSubHeader>
        <Row className="row-eq-height">
          <Col sm="12">
            <Card>
              <CardBody>
                <div className="d-flex justify-content-between">
                  <Badge color="info" className="align-self-center">
                    Seminários que coordeno
                  </Badge>
                  <div>
                    <div className="d-none d-sm-none d-md-none d-lg-block">
                      <Link to="/eventos/grupo/criar">
                        <Button
                          color="success"
                          className="btn-raised mb-0 font-small-3"
                        >
                          <i className="fa fa-plus" /> Criar novo seminário
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
                <CustomTabs TabContent={<CoordinateTable />} />
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="d-flex justify-content-between">
                  <Badge color="info" className="align-self-center">
                    Seminários que participo
                  </Badge>
                </div>
                <CustomTabs TabContent={<FacilitateLeadersTable />} />
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="d-flex justify-content-between">
                  <Badge color="info" className="align-self-center">
                    Facilitadores que eu treinei
                  </Badge>
                </div>
                <CustomTabs TabContent={<ParticipantTable />} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default Seminaries;
