import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { Settings } from "react-feather";

import { FoldedContentConsumer } from "../../utility/context/toggleContentContext";

import PerfectScrollbar from "react-perfect-scrollbar";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Creators as CustomizerActions } from "../../store/ducks/customizer";

import bgImg1 from "../../assets/img/sidebar-bg/01.jpg";
import bgImg2 from "../../assets/img/sidebar-bg/02.jpg";
import bgImg3 from "../../assets/img/sidebar-bg/03.jpg";
import bgImg4 from "../../assets/img/sidebar-bg/04.jpg";
import bgImg5 from "../../assets/img/sidebar-bg/05.jpg";
import bgImg6 from "../../assets/img/sidebar-bg/06.jpg";

const circleStyle = {
  width: "20px",
  height: "20px"
};

class Customizer extends Component {
  static propTypes = {
    error: PropTypes.bool.isRequired,
    sidebarImageRequest: PropTypes.func.isRequired,
    sidebarImageUrlRequest: PropTypes.func.isRequired,
    sidebarBgColorRequest: PropTypes.func.isRequired,
    sidebarCollapsedRequest: PropTypes.func.isRequired,
    sidebarSizeRequest: PropTypes.func.isRequired,
    changeLayoutRequest: PropTypes.func.isRequired
  };

  state = {
    customizer: false
  };

  toggleCustomizer = () => {
    this.setState({
      customizer: !this.state.customizer
    });
  };

  handleSizeChange = size => {
    this.props.handleSidebarSize(size);
  };

  handleLayout = layout => {
    this.props.handleLayout(layout);
  };

  handleSidebarChange = state => {
    this.props.handleCollapsedSidebar(state);
  };

  render() {
    return (
      <FoldedContentConsumer>
        {context => (
          <div
            className={
              `customizer border-left-blue-grey border-left-lighten-4 d-none d-sm-none d-md-block ` +
              (this.state.customizer === true ? `open` : ``)
            }
          >
            <Link to="/" className="customizer-close">
              <i className="ft-x font-medium-3" />{" "}
            </Link>{" "}
            <span
              className="customizer-toggle bg-default"
              id="customizer-toggle-icon"
              onClick={this.toggleCustomizer}
            >
              <Settings size={18} className="white spinner" />
            </span>
            <PerfectScrollbar>
              <div className="customizer-content p-3">
                <h4 className="text-uppercase mb-0 text-bold-400">
                  Customizador visual
                </h4>
                <p>Customize o visual do tema em tempo real</p>
                <hr className="my-3" />

                <h6 className="text-center text-bold-500 mb-3 text-uppercase">
                  Opções de cores da barra lateral
                </h6>
                <div className="cz-bg-color">
                  <div className="row p-1">
                    <div className="col">
                      <span
                        className="gradient-pomegranate d-block rounded-circle"
                        style={circleStyle}
                        onClick={() =>
                          this.props.sidebarBgColorRequest("pomegranate")
                        }
                      />
                    </div>
                    <div className="col">
                      <span
                        className="gradient-king-yna d-block rounded-circle"
                        style={circleStyle}
                        onClick={() =>
                          this.props.sidebarBgColorRequest("king-yna")
                        }
                      />
                    </div>
                    <div className="col">
                      <span
                        className="gradient-ibiza-sunset d-block rounded-circle"
                        style={circleStyle}
                        onClick={() =>
                          this.props.sidebarBgColorRequest("ibiza-sunset")
                        }
                      />
                    </div>
                    <div className="col">
                      <span
                        className="gradient-flickr d-block rounded-circle"
                        style={circleStyle}
                        onClick={() =>
                          this.props.sidebarBgColorRequest("flickr")
                        }
                      />
                    </div>
                    <div className="col">
                      <span
                        className="gradient-purple-bliss d-block rounded-circle"
                        style={circleStyle}
                        onClick={() =>
                          this.props.sidebarBgColorRequest("purple-bliss")
                        }
                      />
                    </div>
                    <div className="col">
                      <span
                        className="gradient-man-of-steel d-block rounded-circle"
                        style={circleStyle}
                        onClick={() =>
                          this.props.sidebarBgColorRequest("man-of-steel")
                        }
                      />
                    </div>
                    <div className="col">
                      <span
                        className="gradient-purple-love d-block rounded-circle"
                        style={circleStyle}
                        onClick={() =>
                          this.props.sidebarBgColorRequest("purple-love")
                        }
                      />
                    </div>
                  </div>
                  <div className="row p-1">
                    <div className="col">
                      <span
                        className="bg-black d-block rounded-circle"
                        style={circleStyle}
                        onClick={() =>
                          this.props.sidebarBgColorRequest("black")
                        }
                      />
                    </div>
                    <div className="col">
                      <span
                        className="bg-grey d-block rounded-circle"
                        style={circleStyle}
                        onClick={() =>
                          this.props.sidebarBgColorRequest("white")
                        }
                      />
                    </div>
                    <div className="col">
                      <span
                        className="bg-blue d-block rounded-circle"
                        style={circleStyle}
                        onClick={() => this.props.sidebarBgColorRequest("blue")}
                      />
                    </div>
                    <div className="col">
                      <span
                        className="bg-purple d-block rounded-circle"
                        style={circleStyle}
                        onClick={() =>
                          this.props.sidebarBgColorRequest("purple")
                        }
                      />
                    </div>
                    <div className="col">
                      <span
                        className="bg-red d-block rounded-circle"
                        style={circleStyle}
                        onClick={() => this.props.sidebarBgColorRequest("red")}
                      />
                    </div>
                    <div className="col">
                      <span
                        className="bg-orange d-block rounded-circle"
                        style={circleStyle}
                        onClick={() =>
                          this.props.sidebarBgColorRequest("orange")
                        }
                      />
                    </div>
                    <div className="col">
                      <span
                        className="bg-indigo d-block rounded-circle"
                        style={circleStyle}
                        onClick={() =>
                          this.props.sidebarBgColorRequest("navy-blue")
                        }
                      />
                    </div>
                  </div>
                </div>

                <hr className="my-3" />

                <h6 className="text-center text-bold-500 mb-2 text-uppercase">
                  Imagem de fundo da barra lateral
                </h6>
                <div className="cz-bg-image py-3">
                  <img
                    className="rounded width-50 height-100"
                    src={bgImg1}
                    width="90"
                    alt="bg-image01"
                    onClick={() => this.props.sidebarImageUrlRequest(bgImg1)}
                  />

                  <img
                    className="rounded width-50 height-100"
                    src={bgImg2}
                    width="90"
                    alt="bg-image02"
                    onClick={() => this.props.sidebarImageUrlRequest(bgImg2)}
                  />

                  <img
                    className="rounded width-50 height-100"
                    src={bgImg3}
                    width="90"
                    alt="bg-image03"
                    onClick={() => this.props.sidebarImageUrlRequest(bgImg3)}
                  />

                  <img
                    className="rounded width-50 height-100"
                    src={bgImg4}
                    width="90"
                    alt="bg-image04"
                    onClick={() => this.props.sidebarImageUrlRequest(bgImg4)}
                  />

                  <img
                    className="rounded width-50 height-100"
                    src={bgImg5}
                    width="90"
                    alt="bg-image05"
                    onClick={() => this.props.sidebarImageUrlRequest(bgImg5)}
                  />

                  <img
                    className="rounded width-50 height-100"
                    src={bgImg6}
                    width="90"
                    alt="bg-image06"
                    onClick={() => this.props.sidebarImageUrlRequest(bgImg6)}
                  />
                </div>

                <hr className="my-3" />

                <div>
                  <Form>
                    <div className="togglebutton">
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="checkbox"
                            defaultChecked
                            id="cz-bg-image-display"
                            onChange={e => {
                              if (e.target.checked === true) {
                                this.handleLayout("layout-dark");
                              } else {
                                this.handleLayout("layout-light");
                              }
                            }}
                          />{" "}
                          Tema escuro
                        </Label>
                      </FormGroup>
                    </div>

                    <hr className="my-3" />

                    <div>
                      <FormGroup>
                        <Label for="largeSelect">
                          Largura da barra lateral
                        </Label>
                        <Input
                          type="select"
                          id="sidebarWidth"
                          name="sidebarWidth"
                          defaultValue="sidebar-sm"
                          onChange={e => this.handleSizeChange(e.target.value)}
                        >
                          <option value="sidebar-sm">Pequena</option>
                          <option value="sidebar-md">Média</option>
                          <option value="sidebar-lg">Grande</option>
                        </Input>
                      </FormGroup>
                    </div>
                  </Form>
                </div>

                {/* <Form>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" defaultChecked onChange={e => {
                                                if (e.target.checked === true) sidebarImage(true);
                                                else sidebarImage(false);
                                            }} />{' '}
                                            Sidebar Bg Image
                                        </Label>
                                    </FormGroup>
                                        <div className="switch"><span>Sidebar Bg Image</span>
                                            <div className="float-right">
                                            <div className="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0">
                                                <input className="custom-control-input cz-bg-image-display" id="sidebar-bg-img" type="checkbox" checked="" />
                                                <label className="custom-control-label" for="sidebar-bg-img"></label>
                                            </div>
                                            </div>
                                        </div>
                                </Form> */}
              </div>
            </PerfectScrollbar>
          </div>
        )}
      </FoldedContentConsumer>
    );
  }
}

const mapStateToProps = state => ({
  error: state.customizer.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CustomizerActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Customizer);
