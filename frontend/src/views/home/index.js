import React from 'react';
import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Button,
  Form,
  Input,
  FormGroup,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardText,
} from 'reactstrap';

// import internal(own) modules
import photo6 from '../../assets/img/photos/06.jpg';
import photo7 from '../../assets/img/photos/07.jpg';
import photo8 from '../../assets/img/photos/08.jpg';
import photo9 from '../../assets/img/photos/09.jpg';
import avatarS11 from '../../assets/img/portrait/small/avatar-s-11.png';
import avatarS14 from '../../assets/img/portrait/small/avatar-s-14.png';
import avatarS16 from '../../assets/img/portrait/small/avatar-s-16.png';
import avatarS5 from '../../assets/img/portrait/small/avatar-s-5.png';
import MinimalStatisticsChart from '../../components/cards/minimalStatisticsWithChartCard';
import { StaticCardData } from '../cards/staticCardData';

export default function Home() {
  return (
    <>
      {/* Minimal statistics charts */}
      <Row className="row-eq-height">
        <Col sm="12" md="6" xl="3">
          <MinimalStatisticsChart
            chartData={StaticCardData.ChartistData}
            cardBgColor="gradient-blackberry"
            statistics="2156"
            text="Grupos Abertos"
            iconSide="right"
          >
            <Icon.BookOpen size={36} strokeWidth="1.3" color="#fff" />
          </MinimalStatisticsChart>
        </Col>
        <Col sm="12" md="6" xl="3">
          <MinimalStatisticsChart
            chartData={StaticCardData.ChartistData}
            cardBgColor="gradient-ibiza-sunset"
            statistics="1567"
            text="Pessoas treinadas"
            iconSide="right"
          >
            <Icon.Users size={36} strokeWidth="1.3" color="#fff" />
          </MinimalStatisticsChart>
        </Col>
        <Col sm="12" md="6" xl="3">
          <MinimalStatisticsChart
            chartData={StaticCardData.ChartistData}
            cardBgColor="gradient-green-teal"
            statistics="4566"
            text="Treinamentos blabla"
            iconSide="right"
          >
            <Icon.Filter size={36} strokeWidth="1.3" color="#fff" />
          </MinimalStatisticsChart>
        </Col>
        <Col sm="12" md="6" xl="3">
          <MinimalStatisticsChart
            chartData={StaticCardData.ChartistData}
            cardBgColor="gradient-pomegranate"
            statistics="566"
            text="Bla"
            iconSide="right"
          >
            <Icon.DollarSign size={36} strokeWidth="1.3" color="#fff" />
          </MinimalStatisticsChart>
        </Col>
      </Row>

      <Row>
        <Col sm="9">
          {/* -------------------------------- TIMELINE ----------------------------------- */}
          <Row>
            <Col xs="12">
              <div className="content-header">Linha do Tempo</div>
            </Col>
          </Row>
          <div id="timeline" className="timeline-center timeline-wrapper">
            <ul className="timeline">
              <li className="timeline-line" />
              <li className="timeline-group">
                <Button color="primary">
                  <i className="fa fa-calendar-o" /> Hoje
                </Button>
              </li>
            </ul>
            <ul className="timeline">
              <li className="timeline-line" />
              <li className="timeline-item">
                <div className="timeline-badge">
                  <span
                    className="bg-red bg-lighten-1"
                    data-toggle="tooltip"
                    data-placement="right"
                    title="Portfolio project work"
                  >
                    <i className="fa fa-plane" />
                  </span>
                </div>
                <Card className="timeline-card border-grey border-lighten-2">
                  <CardHeader>
                    <h4 className="mb-0 card-title">
                      <Link to="/user-profile">Portfolio project work</Link>
                    </h4>
                    <div className="card-subtitle text-muted mt-0">
                      <span className="font-small-3">5 hours ago</span>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <img className="img-fluid" src={photo6} alt="Timeline 2" />
                    <CardBody>
                      <p className="card-text">
                        Nullam facilisis fermentum aliquam. Suspendisse ornare
                        dolor vitae libero hendrerit auctor lacinia a ligula.
                        Curabitur elit tellus, porta ut orci sed, fermentum
                        bibendum nisi.
                      </p>
                      <div className="list-inline mb-1">
                        <span className="pr-1">
                          <Link to="/user-profile" className="primary">
                            <span className="fa fa-thumbs-o-up" />
                            Like
                          </Link>
                        </span>
                        <span className="pr-1">
                          <Link to="/user-profile" className="primary">
                            <span className="fa fa-commenting-o" />
                            Comment
                          </Link>
                        </span>
                        <span>
                          <Link to="/user-profile" className="primary">
                            <span className="fa fa-share-alt" />
                            Share
                          </Link>
                        </span>
                      </div>
                    </CardBody>
                    <CardFooter className="px-0 py-0">
                      <Form>
                        <FormGroup className="position-relative has-icon-left mb-0">
                          <Input
                            type="text"
                            className="form-control"
                            placeholder="Write comments..."
                          />
                          <div className="form-control-position">
                            <i className="fa fa-dashcube" />
                          </div>
                        </FormGroup>
                      </Form>
                    </CardFooter>
                  </CardBody>
                </Card>
              </li>
              <li className="timeline-item mt-5">
                <div className="timeline-badge">
                  <span
                    className="avatar avatar-online"
                    data-toggle="tooltip"
                    data-placement="right"
                    title="Eu pid nunc urna integer"
                  >
                    <img src={avatarS5} alt="avatar" width="40" />
                  </span>
                </div>
                <div className="timeline-card card card-inverse">
                  <img
                    className="card-img img-fluid"
                    src={photo7}
                    alt="Card avatar2"
                  />
                  <div className="card-img-overlay bg-overlay">
                    <h4 className="card-title">Good Morning</h4>
                    <p className="card-text">
                      <small>15 hours ago</small>
                    </p>
                  </div>
                </div>
              </li>
            </ul>

            <ul className="timeline">
              <li className="timeline-line" />
              <li className="timeline-group">
                <Button color="primary">
                  <i className="fa fa-calendar-o" /> 2016
                </Button>
              </li>
            </ul>
            <ul className="timeline">
              <li className="timeline-line" />
              <li className="timeline-item">
                <div className="timeline-badge">
                  <span
                    className="bg-warning bg-darken-1"
                    data-toggle="tooltip"
                    data-placement="right"
                    title="Application API Support"
                  >
                    <i className="fa fa-life-ring" />
                  </span>
                </div>
                <Card className="timeline-card border-grey border-lighten-2">
                  <CardHeader>
                    <div className="media">
                      <div className="media-left">
                        <Link to="/user-profile">
                          <span className="avatar avatar-md avatar-busy">
                            <img src={avatarS11} alt="avatar" width="50" />
                          </span>
                          <i />
                        </Link>
                      </div>
                      <div className="media-body">
                        <h4 className="mb-0 card-title">
                          <Link to="/user-profile">
                            Application API Support
                          </Link>
                        </h4>
                        <div className="card-subtitle text-muted mt-0">
                          <span className="font-small-3">
                            15 Oct, 2016 at 8.00 A.M
                          </span>
                          <span className="tag tag-pill tag-default tag-warning float-right">
                            High
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <img className="img-fluid" src={photo8} alt="Timeline 3" />
                    <CardBody>
                      <p className="card-text">
                        Nullam facilisis fermentum aliquam. Suspendisse ornare
                        dolor vitae libero hendrerit auctor lacinia a ligula.
                        Curabitur elit tellus, porta ut orci sed, fermentum
                        bibendum nisi.
                      </p>
                      <div className="list-inline mb-1">
                        <span className="pr-1">
                          <Link to="/user-profile" className="primary">
                            <span className="fa fa-commenting-o" />
                            Comment
                          </Link>
                        </span>
                      </div>
                    </CardBody>
                    <CardFooter className="px-0 py-0">
                      <div className="media">
                        <div className="media-left">
                          <Link to="/user-profile">
                            <span className="avatar avatar-online">
                              <img src={avatarS14} alt="avatar" width="50" />
                            </span>
                          </Link>
                        </div>
                        <div className="media-body">
                          <p className="text-bold-600 mb-0">
                            <Link to="/user-profile">Crystal Lawson</Link>
                          </p>
                          <p className="m-0">
                            Cras sit amet nibh libero, in gravida nulla. Nulla
                            vel metus scelerisque ante sollicitudin commodo.
                          </p>
                          <div className="media">
                            <div className="media-left">
                              <Link to="/user-profile">
                                <span className="avatar avatar-online">
                                  <img
                                    src={avatarS16}
                                    alt="avatar"
                                    width="50"
                                  />
                                </span>
                              </Link>
                            </div>
                            <div className="media-body">
                              <p className="text-bold-600 mb-0">
                                <Link to="/user-profile">Rafila Găitan</Link>
                              </p>
                              <p>
                                Gravida nulla. Nulla vel metus scelerisque ante
                                sollicitudin.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Form>
                        <FormGroup className="position-relative has-icon-left mb-0">
                          <Input
                            type="text"
                            className="form-control"
                            placeholder="Write comments..."
                          />
                          <div className="form-control-position">
                            <i className="fa fa-dashcube" />
                          </div>
                        </FormGroup>
                      </Form>
                    </CardFooter>
                  </CardBody>
                </Card>
              </li>
              <li className="timeline-item mt-5">
                <div className="timeline-badge">
                  <span
                    className="bg-amber bg-darken-1"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Quote of the day"
                  >
                    <i className="fa fa-smile-o" />
                  </span>
                </div>
                <Card className="timeline-card border-grey border-lighten-2">
                  <CardHeader>
                    <h4 className="mb-0 card-title">
                      <Link to="/user-profile">Quote of the day</Link>
                    </h4>
                    <div className="card-subtitle text-muted mt-0">
                      <span className="font-small-3">
                        03 March, 2016 at 5 P.M
                      </span>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <img className="img-fluid" src={photo9} alt="Timeline 1" />

                    <blockquote className="card-blockquote">
                      <p className="card-text">
                        Eu pid nunc urna integer, sed, cras tortor scelerisque
                        penatibus facilisis a pulvinar, rhoncus sagittis ut nunc
                        elit! Sociis in et?
                      </p>
                      <footer>
                        Someone famous in
                        <cite title="Source Title">- Source Title</cite>
                      </footer>
                    </blockquote>
                  </CardBody>
                </Card>
              </li>
            </ul>

            <ul className="timeline">
              <li className="timeline-line" />
              <li className="timeline-group">
                <Button color="primary">
                  <i className="fa fa-calendar-o" /> Founded in 2015
                </Button>
              </li>
            </ul>
          </div>
        </Col>
        <Col sm="3">
          <Row>
            <Col xs="12">
              <div className="content-header">Avisos</div>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              <Card body inverse color="info">
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>
                  With supporting text below as a natural lead-in to additional
                  content.
                </CardText>
                <Button className="btn btn-raised btn-info btn-darken-3">
                  Buy Now
                </Button>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              <Card body inverse color="info">
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>
                  With supporting text below as a natural lead-in to additional
                  content.
                </CardText>
                <Button className="btn btn-raised btn-info btn-darken-3">
                  Buy Now
                </Button>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              <Card body inverse color="info">
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>
                  With supporting text below as a natural lead-in to additional
                  content.
                </CardText>
                <Button className="btn btn-raised btn-info btn-darken-3">
                  Buy Now
                </Button>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
