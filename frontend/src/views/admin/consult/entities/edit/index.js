/* eslint-disable */
// import external modules
import React, { Component } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';

import CustomTabs from '~/components/tabs/profileTabs';
import EntityTabs from './tabs';

const user_type = localStorage.getItem('@dashboard/user_type');

class EntityEdit extends Component {
  state = {
    activeTab: '1',
  };

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  render() {
    return (
      <>
        <Row>
          <Col md="12" lg="12">
            <Card>
              <CardBody>
                  <>
                    <h2 className="text-center">Entidade</h2>
                    <CustomTabs TabContent1={<EntityTabs match={this.props.match} />} />
                  </>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default EntityEdit;
