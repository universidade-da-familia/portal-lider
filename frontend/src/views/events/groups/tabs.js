/* eslint-disable array-callback-return */
import React, { Component } from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Creators as ProfileActions } from "../../../store/ducks/profile";

import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardBody
} from "reactstrap";

import CustomTabs from "../../../components/tabs/default";

import LeaderTable from "./leaderTable";
import ParticipantTable from "./participantTable";
import TrainedLeadersTable from "./trainedLeadersTable";

import classnames from "classnames";

class GroupTabs extends Component {
  static propTypes = {
    error: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    profileRequest: PropTypes.func.isRequired
  };

  state = {
    activeTab: "1",
    estado: ""
  };

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  stateChange = value => {
    this.setState({ estado: value });
  };

  handleSubmit = values => {};

  componentDidMount() {
    const { profileRequest } = this.props;

    profileRequest();
  }

  render() {
    // const { loading, data } = this.props;

    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "1"
              })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Que sou líder
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "2"
              })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Que participo
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "3"
              })}
              onClick={() => {
                this.toggle("3");
              }}
            >
              Meus treinados
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Card>
              <CardBody>
                <CustomTabs TabContent={<LeaderTable />} />
              </CardBody>
            </Card>
          </TabPane>

          <TabPane tabId="2">
            <Card>
              <CardBody>
                <CustomTabs TabContent={<ParticipantTable />} />
              </CardBody>
            </Card>
          </TabPane>

          <TabPane tabId="3">
            <Card>
              <CardBody>
                <CustomTabs TabContent={<TrainedLeadersTable />} />
              </CardBody>
            </Card>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.profile.error,
  loading: state.profile.loading,
  data: state.profile.data
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ProfileActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupTabs);
