/* eslint-disable */
// import external modules
import React, { Component } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';

import CustomTabs from '../../components/tabs/profileTabs';
import TabsBorderBottomPF from './tabs';
import TabsBorderBottomPJ from './tabsPJ';

const user_type = localStorage.getItem('@dashboard/user_type');

class Profile extends Component {
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
                {user_type === 'entity' ? (
                  <>
                    <h2 className="text-center">Meu perfil</h2>
                    <CustomTabs TabContent1={<TabsBorderBottomPF />} />
                  </>
                ) : (
                  <>
                    <h2 className="text-center">Minha empresa</h2>
                    <CustomTabs TabContent1={<TabsBorderBottomPJ />} />
                  </>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default Profile;
