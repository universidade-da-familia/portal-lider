// import external modules
import React, { Fragment } from "react";
import { Row, Col, Form, FormGroup, Input, Card, CardHeader, CardBody, CardFooter, Button } from "reactstrap";
import { Link } from "react-router-dom";

import photo1 from "../../assets/img/photos/01.jpg";
import photo2 from "../../assets/img/photos/02.jpg";
import photo3 from "../../assets/img/photos/03.jpg";
import photo4 from "../../assets/img/photos/04.jpg";
import avatarS1 from "../../assets/img/portrait/small/avatar-s-1.png";
import avatarS18 from "../../assets/img/portrait/small/avatar-s-18.png";
import avatarS14 from "../../assets/img/portrait/small/avatar-s-14.png";
import avatarS4 from "../../assets/img/portrait/small/avatar-s-4.png";
import avatarS5 from "../../assets/img/portrait/small/avatar-s-5.png";
import avatarS6 from "../../assets/img/portrait/small/avatar-s-6.png";
import gallery1 from "../../assets/img/gallery/1.jpg";
import gallery2 from "../../assets/img/gallery/2.jpg";
import gallery3 from "../../assets/img/gallery/3.jpg";
import gallery4 from "../../assets/img/gallery/4.jpg";
import gallery5 from "../../assets/img/gallery/5.jpg";
import gallery6 from "../../assets/img/gallery/6.jpg";
import gallery7 from "../../assets/img/gallery/7.jpg";
import gallery8 from "../../assets/img/gallery/8.jpg";
import gallery9 from "../../assets/img/gallery/9.jpg";
import gallery10 from "../../assets/img/gallery/10.jpg";
import gallery11 from "../../assets/img/gallery/11.jpg";
import gallery12 from "../../assets/img/gallery/12.jpg";

const VerticalTimeline = props => (
   <Fragment>
      <Row>
         <Col sm="12">
            <div className="content-header">Vertical Timeline</div>
            <p className="content-sub-header">
               This vertical timeline contain post with photos, videos, charts and map to make timeline more effective.
            </p>
         </Col>
      </Row>
      <h3 className="page-title text-center">Timeline</h3>

      <div id="timeline" className="timeline-center timeline-wrapper">
         <ul className="timeline">
            <li className="timeline-line" />
            <li className="timeline-group">
                <Button color="primary"><i className="fa fa-calendar-o" /> Today</Button>
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
                  <CardHeader className="pb-0">
                     <h4 className="card-title mb-0">
                        <Link to="/vertical-timeline">Portfolio project work</Link>
                     </h4>
                     <div className="card-subtitle text-muted mt-0">
                        <span className="font-small-3">5 hours ago</span>
                     </div>
                  </CardHeader>

                  <CardBody>
                     <img className="img-fluid" src={photo1} alt="Timeline 1" />
                     <p className="card-text">
                        Nullam facilisis fermentum aliquam. Suspendisse ornare dolor vitae libero hendrerit auctor lacinia a
                        ligula. Curabitur elit tellus, porta ut orci sed, fermentum bibendum nisi.
                     </p>
                     <div className="list-inline mb-1">
                        <span className="pr-1">
                            <Link to="/vertical-timeline" className="primary">
                                <span className="fa fa-thumbs-o-up" /> Like
                            </Link>
                        </span>
                        <span className="pr-1">
                            <Link to="/vertical-timeline" className="primary">
                                <span className="fa fa-commenting-o" /> Comment
                            </Link>
                        </span>
                        <span>
                            <Link to="/vertical-timeline" className="primary">
                                <span className="fa fa-share-alt" /> Share
                            </Link>
                        </span>
                     </div>
                  </CardBody>
                  <CardFooter>
                     <div className="media">
                        <div className="media-left">
                            <Link to="/vertical-timeline">
                                <span className="avatar avatar-online">
                                    <img src={avatarS1} alt="avatar" width="50" />
                                </span>
                            </Link>
                        </div>
                        <div className="media-body">
                           <p className="text-bold-600 mb-0">
                            <Link to="/vertical-timeline">Jason Ansley</Link>
                           </p>
                           <p className="m-0">
                              Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin
                              commodo.
                           </p>
                           <div className="list-inline mb-1">
                              <span className="pr-1">
                                <Link to="/vertical-timeline" className="primary">
                                    <span className="fa fa-thumbs-o-up" />
                                    Like
                                </Link>
                              </span>
                              <span className="pr-1">
                                <Link to="/vertical-timeline" className="primary">
                                    <span className="fa fa-commenting-o" />
                                    Replay
                                 </Link>
                              </span>
                           </div>
                           <div className="media">
                              <div className="media-left">
                                <Link to="/vertical-timeline">
                                    <span className="avatar avatar-online">
                                       <img src={avatarS18} alt="avatar" width="50" />
                                    </span>
                                </Link>
                              </div>
                              <div className="media-body">
                                 <p className="text-bold-600 mb-0">
                                    <Link to="/vertical-timeline">Janice Johnston</Link>
                                 </p>
                                 <p>Gravida nulla. Nulla vel metus scelerisque ante sollicitudin.</p>
                                 <div className="list-inline mb-1">
                                    <span className="pr-1">
                                        <Link to="/vertical-timeline" className="primary">
                                          <span className="fa fa-thumbs-o-up" />
                                          Like
                                        </Link>
                                    </span>
                                    <span className="pr-1">
                                        <Link to="/vertical-timeline" className="primary">
                                          <span className="fa fa-commenting-o" />
                                          Replay
                                       </Link>
                                    </span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                     <Form>
                        <FormGroup className="position-relative has-icon-left mb-0">
                           <Input type="text" className="form-control" placeholder="Write comments..." />
                           <div className="form-control-position">
                              <i className="fa fa-dashcube" />
                           </div>
                        </FormGroup>
                     </Form>
                  </CardFooter>
               </Card>
            </li>
            <li className="timeline-item mt-5">
               <div className="timeline-badge">
                  <span
                     className="avatar avatar-online"
                     data-toggle="tooltip"
                     data-placement="left"
                     title="Eu pid nunc urna integer"
                  >
                     <img src={avatarS14} alt="avatar" width="40" />
                  </span>
               </div>
               <Card className="timeline-card border-grey border-lighten-2">
                  <CardHeader className="pb-0">
                     <h4 className="card-title mb-0">
                        <Link to="/vertical-timeline">Sofia Orav</Link>
                     </h4>
                     <div className="card-subtitle text-muted mt-0">
                        <span className="font-small-3">8 hours ago</span>
                     </div>
                  </CardHeader>

                  <CardBody>
                     <div className="embed-responsive embed-responsive-4by3">
                        <iframe title="vimeo-video" src="https://player.vimeo.com/video/118589137?title=0&byline=0" />
                     </div>
                     <p className="card-text">
                        Nullam facilisis fermentum aliquam. Suspendisse ornare dolor vitae libero hendrerit auctor lacinia a
                        ligula. Curabitur elit tellus, porta ut orci sed, fermentum bibendum nisi.
                     </p>
                     <p className="card-text">
                        Eu pid nunc urna integer, sed, cras tortor scelerisque penatibus facilisis a pulvinar, rhoncus
                        sagittis ut nunc elit! Sociis in et? Rhoncus, vel dignissim in scelerisque. Dolor lacus pulvinar
                        adipiscing adipiscing montes! Elementum risus adipiscing non, cras scelerisque risus penatibus? Massa
                        vut, habitasse, tincidunt!
                     </p>
                     <div className="list-inline mb-1">
                        <span className="pr-1">
                           <Link to="/vertical-timeline" className="primary">
                              <span className="fa fa-thumbs-o-up" /> Like
                           </Link>
                        </span>
                        <span className="pr-1">
                           <Link to="/vertical-timeline" className="primary">
                              <span className="fa fa-commenting-o" /> Comment
                           </Link>
                        </span>
                        <span>
                           <Link to="/vertical-timeline" className="primary">
                              <span className="fa fa-share-alt" /> Share
                           </Link>
                        </span>
                     </div>
                  </CardBody>
                  <CardFooter>
                     <Form>
                        <FormGroup className="position-relative has-icon-left mb-0">
                           <Input type="text" className="form-control" placeholder="Write comments..." />
                           <div className="form-control-position">
                              <i className="fa fa-dashcube" />
                           </div>
                        </FormGroup>
                     </Form>
                  </CardFooter>
               </Card>
            </li>
         </ul>

         <ul className="timeline">
            <li className="timeline-line" />
            <li className="timeline-group">
                <Button color="primary"><i className="fa fa-calendar-o" /> 2016</Button>
            </li>
         </ul>
         <ul className="timeline">
            <li className="timeline-line" />

            <li className="timeline-item">
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
               <Card className="timeline-card card-inverse">
                  <img className="card-img img-fluid" src={photo2} alt="Card-avatar" />
                  <div className="card-img-overlay bg-overlay">
                     <h4 className="card-title">Good Morning</h4>
                     <p className="card-text">
                        <small>26 Aug, 2016 at 2.00 A.M</small>
                     </p>
                  </div>
               </Card>
            </li>

            <li className="timeline-item mt-5">
               <div className="timeline-badge">
                  <span
                     className="bg-teal bg-lighten-1"
                     data-toggle="tooltip"
                     data-placement="left"
                     title="Nullam facilisis fermentum"
                  >
                     <i className="fa fa-check-square-o" />
                  </span>
               </div>
               <Card className="timeline-card border-grey border-lighten-2">
                  <CardHeader className="pb-0">
                     <h4 className="pb-0 card-title">
                        <Link to="/vertical-timeline">Sofia Orav</Link>
                     </h4>
                     <div className="card-subtitle text-muted mt-0">
                        <span className="font-small-3">18 June, 2016 at 4.50 P.M</span>
                     </div>
                  </CardHeader>
                  <CardBody>
                     <p className="card-text">
                        Nullam facilisis fermentum aliquam. Suspendisse ornare dolor vitae libero hendrerit auctor lacinia a
                        ligula. Curabitur elit tellus, porta ut orci sed, fermentum bibendum nisi.
                     </p>
                     <ul className="list-group icheck-task">
                        <li className="list-group-item">
                           <div className="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0">
                              <input defaultChecked={true} type="checkbox" className="custom-control-input" id="1st-item" />
                              <label className="custom-control-label" htmlFor="1st-item">
                                 Cras justo odio
                              </label>
                           </div>
                        </li>
                        <li className="list-group-item">
                           <div className="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0">
                              <input defaultChecked={true} type="checkbox" className="custom-control-input" id="2nd-item" />
                              <label className="custom-control-label" htmlFor="2nd-item">
                                 checked Dapibus ac facilisis in
                              </label>
                           </div>
                        </li>
                        <li className="list-group-item">
                           <div className="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0">
                              <input defaultChecked={true} type="checkbox" className="custom-control-input" id="3rd-item" />
                              <label className="custom-control-label" htmlFor="3rd-item">
                                 Morbi leo risus
                              </label>
                           </div>
                        </li>
                        <li className="list-group-item">
                           <div className="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0">
                              <input defaultChecked={true} type="checkbox" className="custom-control-input" id="4th-item" />
                              <label className="custom-control-label" htmlFor="4th-item">
                                 disabled Porta ac consectetur ac
                              </label>
                           </div>
                        </li>
                        <li className="list-group-item">
                           <div className="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0">
                              <input defaultChecked={true} type="checkbox" className="custom-control-input" id="5th-item" />
                              <label className="custom-control-label" htmlFor="5th-item">
                                 Vestibulum at eros
                              </label>
                           </div>
                        </li>
                     </ul>
                  </CardBody>
                  <CardFooter>
                     <CardBody>
                        <Form>
                           <FormGroup className="position-relative has-icon-left mb-0">
                              <Input type="text" className="form-control" placeholder="Write comments..." />
                              <div className="form-control-position">
                                 <i className="fa fa-dashcube" />
                              </div>
                           </FormGroup>
                        </Form>
                     </CardBody>
                  </CardFooter>
               </Card>
            </li>
         </ul>
         <ul className="timeline">
            <li className="timeline-line" />
            <li className="timeline-group">
               <Button color="primary"><i className="fa fa-calendar-o" /> 2015</Button>
            </li>
         </ul>
         <ul className="timeline">
            <li className="timeline-line" />

            <li className="timeline-item block">
               <div className="timeline-badge" />
               <Card className="timeline-card border-grey border-lighten-2">
                  <CardHeader>
                     <div className="text-center">
                        <p className="mt-1">
                           <i className="fa fa-file-image-o font-medium-4" />
                        </p>
                        <h4>Media Gallery</h4>
                        <p className="timeline-date">July 1, 2015</p>
                        <p>
                           Eu pid nunc urna integer, sed, cras tortor scelerisque penatibus facilisis a pulvinar, rhoncus
                           sagittis ut nunc elit! Sociis in et?
                        </p>
                     </div>
                  </CardHeader>

                  <CardBody>
                     <div className="card-block my-gallery" itemScope itemType="http://schema.org/ImageGallery">
                        <div className="row">
                           <figure
                              className="col-md-3 col-sm-6 col-12"
                              itemProp="associatedMedia"
                              itemScope
                              itemType="http://schema.org/ImageObject"
                           >
                              <Link to="/vertical-timeline" itemProp="contentUrl" data-size="480x360">
                                 <img
                                    className="img-thumbnail img-fluid"
                                    src={gallery1}
                                    itemProp="thumbnail"
                                    alt="description"
                                 />
                              </Link>
                           </figure>
                           <figure
                              className="col-md-3 col-sm-6 col-12"
                              itemProp="associatedMedia"
                              itemScope
                              itemType="http://schema.org/ImageObject"
                           >
                              <Link to="/vertical-timeline" itemProp="contentUrl" data-size="480x360">
                                 <img
                                    className="img-thumbnail img-fluid"
                                    src={gallery2}
                                    itemProp="thumbnail"
                                    alt="description"
                                 />
                              </Link>
                           </figure>
                           <figure
                              className="col-md-3 col-sm-6 col-12"
                              itemProp="associatedMedia"
                              itemScope
                              itemType="http://schema.org/ImageObject"
                           >
                              <Link to="/vertical-timeline" itemProp="contentUrl" data-size="480x360">
                                 <img
                                    className="img-thumbnail img-fluid"
                                    src={gallery3}
                                    itemProp="thumbnail"
                                    alt="description"
                                 />
                              </Link>
                           </figure>
                           <figure
                              className="col-md-3 col-sm-6 col-12"
                              itemProp="associatedMedia"
                              itemScope
                              itemType="http://schema.org/ImageObject"
                           >
                              <Link to="/vertical-timeline" itemProp="contentUrl" data-size="480x360">
                                 <img
                                    className="img-thumbnail img-fluid"
                                    src={gallery4}
                                    itemProp="thumbnail"
                                    alt="description"
                                 />
                              </Link>
                           </figure>
                        </div>
                        <div className="row">
                           <figure
                              className="col-md-3 col-sm-6 col-12"
                              itemProp="associatedMedia"
                              itemScope
                              itemType="http://schema.org/ImageObject"
                           >
                              <Link to="/vertical-timeline" itemProp="contentUrl" data-size="480x360">
                                 <img
                                    className="img-thumbnail img-fluid"
                                    src={gallery5}
                                    itemProp="thumbnail"
                                    alt="description"
                                 />
                              </Link>
                           </figure>
                           <figure
                              className="col-md-3 col-sm-6 col-12"
                              itemProp="associatedMedia"
                              itemScope
                              itemType="http://schema.org/ImageObject"
                           >
                              <Link to="/vertical-timeline" itemProp="contentUrl" data-size="480x360">
                                 <img
                                    className="img-thumbnail img-fluid"
                                    src={gallery6}
                                    itemProp="thumbnail"
                                    alt="description"
                                 />
                              </Link>
                           </figure>
                           <figure
                              className="col-md-3 col-sm-6 col-12"
                              itemProp="associatedMedia"
                              itemScope
                              itemType="http://schema.org/ImageObject"
                           >
                              <Link to="/vertical-timeline" itemProp="contentUrl" data-size="480x360">
                                 <img
                                    className="img-thumbnail img-fluid"
                                    src={gallery7}
                                    itemProp="thumbnail"
                                    alt="description"
                                 />
                              </Link>
                           </figure>
                           <figure
                              className="col-md-3 col-sm-6 col-12"
                              itemProp="associatedMedia"
                              itemScope
                              itemType="http://schema.org/ImageObject"
                           >
                              <Link to="/vertical-timeline" itemProp="contentUrl" data-size="480x360">
                                 <img
                                    className="img-thumbnail img-fluid"
                                    src={gallery8}
                                    itemProp="thumbnail"
                                    alt="description"
                                 />
                              </Link>
                           </figure>
                        </div>
                        <div className="row">
                           <figure
                              className="col-md-3 col-sm-6 col-12"
                              itemProp="associatedMedia"
                              itemScope
                              itemType="http://schema.org/ImageObject"
                           >
                              <Link to="/vertical-timeline" itemProp="contentUrl" data-size="480x360">
                                 <img
                                    className="img-thumbnail img-fluid"
                                    src={gallery9}
                                    itemProp="thumbnail"
                                    alt="description"
                                 />
                              </Link>
                           </figure>
                           <figure
                              className="col-md-3 col-sm-6 col-12"
                              itemProp="associatedMedia"
                              itemScope
                              itemType="http://schema.org/ImageObject"
                           >
                              <Link to="/vertical-timeline" itemProp="contentUrl" data-size="480x360">
                                 <img
                                    className="img-thumbnail img-fluid"
                                    src={gallery10}
                                    itemProp="thumbnail"
                                    alt="description"
                                 />
                              </Link>
                           </figure>
                           <figure
                              className="col-md-3 col-sm-6 col-12"
                              itemProp="associatedMedia"
                              itemScope
                              itemType="http://schema.org/ImageObject"
                           >
                              <Link to="/vertical-timeline" itemProp="contentUrl" data-size="480x360">
                                 <img
                                    className="img-thumbnail img-fluid"
                                    src={gallery11}
                                    itemProp="thumbnail"
                                    alt="description"
                                 />
                              </Link>
                           </figure>
                           <figure
                              className="col-md-3 col-sm-6 col-12"
                              itemProp="associatedMedia"
                              itemScope
                              itemType="http://schema.org/ImageObject"
                           >
                              <Link to="/vertical-timeline" itemProp="contentUrl" data-size="480x360">
                                 <img
                                    className="img-thumbnail img-fluid"
                                    src={gallery12}
                                    itemProp="thumbnail"
                                    alt="description"
                                 />
                              </Link>
                           </figure>
                        </div>
                     </div>
                  </CardBody>
               </Card>
            </li>
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
                  <CardHeader className="pb-0">
                     <div className="media">
                        <div className="media-left">
                            <Link to="/vertical-timeline">
                              <span className="avatar avatar-md avatar-busy">
                                 <img src={avatarS18} alt="avatar" width="50" />
                              </span>
                           </Link>
                        </div>
                        <div className="media-body">
                           <h4 className="card-title mb-0">
                           <Link to="/vertical-timeline">Application API Support</Link>
                           </h4>
                           <div className="card-subtitle text-muted mt-0">
                              <span className="font-small-3">15 Oct, 2015 at 8.00 A.M</span>
                              <span className="tag tag-pill tag-default tag-warning float-right">High</span>
                           </div>
                        </div>
                     </div>
                  </CardHeader>
                  <CardBody>
                     <img className="img-fluid" src={photo3} alt="Timeline 3" />
                     <CardBody>
                        <p className="card-text">
                           Nullam facilisis fermentum aliquam. Suspendisse ornare dolor vitae libero hendrerit auctor lacinia
                           a ligula. Curabitur elit tellus, porta ut orci sed, fermentum bibendum nisi.
                        </p>
                        <div className="list-inline mb-1">
                           <span className="pr-1">
                                <Link to="/vertical-timeline" className="primary">
                                    <span className="fa fa-commenting-o" /> Comment
                                </Link>
                           </span>
                        </div>
                     </CardBody>
                     <CardFooter className="px-0 py-0">
                        <Card>
                           <div className="media">
                              <div className="media-left">
                                <Link to="/vertical-timeline">
                                    <span className="avatar avatar-online">
                                       <img src={avatarS4} alt="avatar" width="50" />
                                    </span>
                                 </Link>
                              </div>
                              <div className="media-body">
                                 <p className="text-bold-600 mb-0">
                                    <Link to="/vertical-timeline">Crystal Lawson</Link>
                                 </p>
                                 <p className="m-0">
                                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                                    sollicitudin commodo.
                                 </p>
                                 <div className="media">
                                    <div className="media-left">
                                        <Link to="/vertical-timeline">
                                          <span className="avatar avatar-online">
                                             <img src={avatarS6} alt="avatar" width="50" />
                                          </span>
                                       </Link>
                                    </div>
                                    <div className="media-body">
                                       <p className="text-bold-600 mb-0">
                                            <Link to="/vertical-timeline">Rafila Găitan</Link>
                                       </p>
                                       <p>Gravida nulla. Nulla vel metus scelerisque ante sollicitudin.</p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <Form>
                              <FormGroup className="position-relative has-icon-left mb-0">
                                 <Input type="text" className="form-control" placeholder="Write comments..." />
                                 <div className="form-control-position">
                                    <i className="fa fa-dashcube" />
                                 </div>
                              </FormGroup>
                           </Form>
                        </Card>
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
                  <CardHeader className="pb-0">
                     <h4 className="card-title mb-0">
                        <Link to="/vertical-timeline">Quote of the day</Link>
                     </h4>
                     <div className="card-subtitle text-muted mt-0">
                        <span className="font-small-3">03 March, 2015 at 5 P.M</span>
                     </div>
                  </CardHeader>
                  <CardBody>
                     <img className="img-fluid" src={photo4} alt="Timeline 1" />

                     <blockquote className="card-blockquote">
                        <p className="card-text">
                           Eu pid nunc urna integer, sed, cras tortor scelerisque penatibus facilisis a pulvinar, rhoncus
                           sagittis ut nunc elit! Sociis in et?
                        </p>
                        <div>
                           Someone famous in
                           <cite title="Source Title"> - Source Title</cite>
                        </div>
                     </blockquote>
                  </CardBody>
               </Card>
            </li>
         </ul>
         <ul className="timeline">
            <li className="timeline-line" />
            <li className="timeline-group">
                <Link to="/vertical-timeline" className="btn btn-raised btn-primary">
                  <i className="fa fa-calendar-o" /> Founded in 2013
                </Link>
            </li>
         </ul>
      </div>
   </Fragment>
);

export default VerticalTimeline;
