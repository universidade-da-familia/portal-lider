import React, { Component } from "react";
import { TabContent, TabPane, Row, Col } from "reactstrap";

export default class ProfileTabs extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1"
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <div className="nav-tabs-vc">
        <TabContent activeTab={this.state.activeTab} className="px-0">
          <TabPane tabId="1">
            <Row>
              <Col sm="12">{this.props.TabContent1}</Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">{this.props.TabContent2}</Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
