/* eslint-disable */
// import external modules
import React, { Component } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';

import CustomTabs from '~/components/tabs/profileTabs';
import OrganizationTabs from './tabs';

class OrganizationEdit extends Component {
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
                    <h2 className="text-center">Organização</h2>
                    <CustomTabs TabContent1={<OrganizationTabs match={this.props.match} />} />
                  </>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default OrganizationEdit;
