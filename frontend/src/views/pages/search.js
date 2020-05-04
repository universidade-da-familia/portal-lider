// import external modules
import React from "react";
import { Row, Col, Form, FormGroup, Input, Card, CardHeader, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

import { Mic } from "react-feather";

import ImgPortfolio14 from "../../assets/img/width-600/portfolio-14.jpg";
import ImgPortfolio3 from "../../assets/img/width-600/portfolio-3.jpg";
import gallery11 from "../../assets/img/gallery/11.jpg";
import gallery12 from "../../assets/img/gallery/12.jpg";
import gallery13 from "../../assets/img/gallery/13.jpg";
import gallery14 from "../../assets/img/gallery/14.jpg";
import gallery25 from "../../assets/img/gallery/25.jpg";
import gallery23 from "../../assets/img/gallery/23.jpg";

const Search = props => {
   return (
      <Card>
         <CardHeader>
            <h4 className="card-title">Website search results</h4>
         </CardHeader>
         <CardBody>
            <div className="pb-0">
               <Form action="#">
                  <FormGroup className="position-relative has-icon-right mb-0">
                     <Input
                        type="text"
                        className="form-control form-control-lg input-lg"
                        id="iconLeft"
                        placeholder="Apex Admin Template"
                     />
                     <div className="form-control-position">
                        <Mic />
                     </div>
                  </FormGroup>
               </Form>
            </div>

            <div id="search-nav" className="pt-1">
               <ul className="nav nav-inline">
                  <li className="nav-item">
                     <Link to="/search" className="nav-link active">
                        <i className="fa fa-link" /> Website
                     </Link>
                  </li>
                  <li className="nav-item">
                     <Link to="/search" className="nav-link">
                        <i className="fa fa-file-image-o" /> Images
                     </Link>
                  </li>
                  <li className="nav-item">
                     <Link to="/search" className="nav-link">
                        <i className="fa fa-file-video-o" /> Videos
                     </Link>
                  </li>
                  <li className="nav-item">
                     <Link to="/search" className="nav-link">
                        <i className="fa fa-map-o" /> Maps
                     </Link>
                  </li>
                  <li className="dropdown nav-item float-right mt-1">
                     <Link to="/search" className="btn dropdown-toggle" data-toggle="dropdown">
                        <i className="fa fa-cog" />
                        <span className="caret" />
                     </Link>
                     <ul className="dropdown-menu dropdown-menu-right">
                        <li className="dropdown-item">
                           <Link to="/search" className="dropdown-link">Languages</Link>
                        </li>
                        <li className="dropdown-item">
                           <Link to="/search" className="dropdown-link">Search Settings</Link>
                        </li>
                        <li className="dropdown-item">
                           <Link to="/search" className="dropdown-link">History</Link>
                        </li>
                        <li className="dropdown-item">
                           <Link to="/search" className="dropdown-link">Search Help</Link>
                        </li>
                     </ul>
                  </li>
               </ul>
            </div>

            <div id="search-results">
               <Row>
                  <Col lg="8">
                     <p className="text-muted font-small-3">About 68,00,000 results (0.58 seconds)</p>
                     <Row className="media-list">
                        <li className="media">
                           <div className="media-body">
                              <p className="lead mb-0">
                                <Link to="/search">
                                    <span className="text-bold-600">Apex</span>- Responsive React 16 Admin Template
                                 </Link>
                              </p>
                              <p className="mb-0">
                                <Link to="/search" className="teal darken-1">
                                    https://pixinvent.com/
                                    <span className="text-bold-600">Apex</span>/<i aria-hidden="true" />
                                 </Link>
                              </p>
                              <ul className="list-inline list-inline-pipe text-muted">
                                 <li>
                                    <i className="fa fa-star yellow darken-2" />
                                    <i className="fa fa-star yellow darken-2" />
                                    <i className="fa fa-star yellow darken-2" />
                                    <i className="fa fa-star yellow darken-2" />
                                    <i className="fa fa-star yellow darken-2" />
                                    &nbsp;5 stars
                                 </li>
                                 <li>590 votes</li>
                                 <li>US$ 28.00</li>
                                 <li>In stock</li>
                              </ul>
                              <p>
                                 <span className="text-muted">Oct 24, 2017 -</span>
                                 <span className="text-bold-600">Apex</span>
                                 nec nisl lobortis erat rutrum dignissim. Colonel
                                 <span className="text-bold-600">Responsive Angular 5 Admin Template</span>
                                 Ut tellus dui, rhoncus quis vulputate non, sodales ac ex. Fusce interdum efficitur purus
                                 quis viverra...
                              </p>
                              <div className="website-detailed-list mx-1 my-1">
                                 <Row>
                                    <Col md="6">
                                       <div className="content-group">
                                          <div className="media-body">
                                             <p className="mb-0">
                                                <Link to="/search" className="teal darken-1">Dashboard</Link>
                                             </p>
                                             <p>Donec vitae ante ipsum. In aliquet, urna id varius mattis...</p>
                                          </div>
                                       </div>
                                       <div className="content-group">
                                          <div className="media-body">
                                             <p className="mb-0">
                                                <Link to="/search" className="teal darken-1">Form Components</Link>
                                             </p>
                                             <p>Velit mi sodales turpis, nec consectetur leo elit.</p>
                                          </div>
                                       </div>
                                       <div className="content-group">
                                          <div className="media-body">
                                             <p className="mb-0">
                                                <Link to="/search" className="teal darken-1">Charts</Link>
                                             </p>
                                             <p>Vestibulum nec orci placerat, euismod turpis egestas...</p>
                                          </div>
                                       </div>
                                    </Col>
                                    <Col md="6">
                                       <div className="content-group">
                                          <div className="media-body">
                                             <p className="mb-0">
                                                <Link to="/search" className="teal darken-1">UI Components</Link>
                                             </p>
                                             <p>Nam in velit iaculis, vestibulum ex a, porta sapien...</p>
                                          </div>
                                       </div>
                                       <div className="content-group">
                                          <div className="media-body">
                                             <p className="mb-0">
                                                <Link to="/search" className="teal darken-1">Support</Link>
                                             </p>
                                             <p>Donec ullamcorper est vel dui commodo dictum.</p>
                                          </div>
                                       </div>
                                       <div className="content-group">
                                          <div className="media-body">
                                             <p className="mb-0">
                                                <Link to="/search" className="teal darken-1">Documentation</Link>
                                             </p>
                                             <p>Ut rhoncus massa diam, in commodo enim posuere quis mosito...</p>
                                          </div>
                                       </div>
                                    </Col>
                                 </Row>
                              </div>
                           </div>
                        </li>

                        <li className="media">
                           <div className="media-left d-none d-sm-block">
                                <Link to="/search">
                                    <img className="media-object width-150" src={ImgPortfolio14} alt="General placeholder 1" />
                                </Link>
                           </div>
                           <div className="media-body media-search">
                              <p className="lead mb-0">
                                 <Link to="/search" className="teal darken-1">
                                    <span className="text-bold-600">Attire bench</span>- Quick win shoot me an email
                                 </Link>
                              </p>
                              <p className="mb-0">
                                 <Link to="/search" className="teal darken-1">
                                    https://pixinvent.com/
                                    <span className="text-bold-600">Apex</span>/
                                    <i className="fa fa-angle-down" aria-hidden="true" />
                                 </Link>
                              </p>
                              <ul className="list-inline list-inline-pipe text-muted">
                                 <li>
                                    <i className="fa fa-star yellow darken-2" />
                                    <i className="fa fa-star yellow darken-2" />
                                    <i className="fa fa-star yellow darken-2" />
                                    <i className="fa fa-star yellow darken-2" />
                                    <i className="fa fa-star-half yellow darken-2" />
                                    &nbsp;4.5 stars
                                 </li>
                                 <li>50 votes</li>
                                 <li>US$ 40.00</li>
                                 <li>In stock</li>
                              </ul>
                              <p>
                                 <span className="text-muted">Oct 24, 2017 -</span>
                                 We need to dialog around
                                 <span className="text-bold-600">Apex Admin</span>
                                 your choice of work attire bench mark, or win-win-win. Quick win shoot me an email.
                                 Proceduralize i don't want to drain the whole swamp, i just want to shoot some alligators
                                 yet old boys club.
                              </p>
                           </div>
                        </li>

                        <li className="media">
                           <div className="media-left media-search d-none d-sm-block">
                              <iframe
                                 width="150"
                                 height="110"
                                 title="unique-youtube-video"
                                 src="https://www.youtube.com/embed/SsE5U7ta9Lw?rel=0&amp;controls=0&amp;showinfo=0"
                              />
                           </div>
                           <div className="media-body">
                              <p className="lead mb-0">
                                 <Link to="/search" className="teal darken-1">
                                    <span className="text-bold-600">The Table</span>- for what do you feel you would bring to
                                 </Link>
                              </p>
                              <p className="mb-0">
                                 <Link to="/search" className="teal darken-1">
                                    http://youtube.com/
                                    <span className="text-bold-600">Apex</span>/
                                    <i className="fa fa-angle-down" aria-hidden="true" />
                                 </Link>
                              </p>
                              <ul className="list-inline list-inline-pipe text-muted">
                                 <li>Oct 24, 2017</li>
                                 <li>1M Views</li>
                                 <li>Uploaded by PlayStation</li>
                              </ul>
                              <p>
                                 <span className="text-bold-600">Proceduralize</span>
                                 Not the long pole in my tent. Get buy-in pixel pushing, and quick win . What's the status on
                                 the deliverables for eow? goalposts golden goose, and take five.
                              </p>
                           </div>
                        </li>
                        <li className="media">
                           <div className="media-body">
                              <p className="lead mb-0">
                                 <Link to="/search" className="teal darken-1">
                                    <span className="text-bold-600">Microdosing</span>- deep v actually schlitz chia
                                 </Link>
                              </p>
                              <p className="mb-0">
                                 <Link to="/search" className="teal darken-1">
                                    http://themeforest.net/
                                    <span className="text-bold-600">Apex</span>
                                    /microdosing
                                    <i className="fa fa-angle-down" aria-hidden="true" />
                                 </Link>
                              </p>
                              <p>
                                 Lobortis erat rutrum dignissim. Colonel
                                 <span className="text-bold-600">Responsive React 16 Admin Template</span>
                                 Ut tellus dui, rhoncus quis vulputate non, sodales ac ex. Fusce interdum efficitur purus
                                 quis viverra. Vivamus eros urna, scelerisque ac enim...
                              </p>
                           </div>
                        </li>
                        <li className="media">
                           <div className="media-body">
                              <p className="lead mb-0">
                                 <Link to="/search" className="teal darken-1">
                                    Aesthetic neutra
                                    <span className="text-bold-600">freegan</span>, mlkshk literally
                                 </Link>
                              </p>
                              <p className="mb-0">
                                 <Link to="/search" className="teal darken-1">
                                    http://envato.com/literally/
                                    <span className="text-bold-600">Apex</span>/
                                    <i className="fa fa-angle-down" aria-hidden="true" />
                                 </Link>
                              </p>
                              <p>
                                 <span className="text-muted">June 30, 2016 -</span>
                                 <span className="text-bold-600">Humblebrag</span>
                                 mixtape tumblr small batch, marfa blog mumblecore retro sustainable bitters normcore brunch
                                 whatever helvetica.
                                 <span className="text-bold-600">Humblebrag mumblecore</span>
                                 beard irony, XOXO craft beer kogi letterpress freegan vegan disrupt...
                              </p>
                           </div>
                        </li>
                        <li className="media">
                           <div className="media-body">
                              <p className="lead mb-0">
                                 <Link to="/search" className="teal darken-1">
                                    <span className="text-bold-600">iCell</span>- disrupt butcher pitchfork.
                                 </Link>
                              </p>
                              <p className="mb-0">
                                 <Link to="/search" className="teal darken-1">
                                    http://google.com/
                                    <span className="text-bold-600">icell</span>/
                                    <i className="fa fa-angle-down" aria-hidden="true" />
                                 </Link>
                              </p>
                              <ul className="list-inline list-inline-pipe text-muted">
                                 <li>
                                    <i className="fa fa-star yellow darken-2" />
                                    <i className="fa fa-star yellow darken-2" />
                                    <i className="fa fa-star-half yellow darken-2" />
                                    <i className="fa fa-star-outline yellow darken-2" />
                                    <i className="fa fa-star-outline yellow darken-2" />
                                    &nbsp;2.5 stars
                                 </li>
                                 <li>590 votes</li>
                                 <li>US$ 399.00</li>
                                 <li>In stock</li>
                              </ul>
                              <p>
                                 <span className="text-muted">March 23, 2016 -</span>
                                 Church-key selfies bitters man bun post-ironic.
                                 <span className="text-bold-600">8-bit 3 wolf moon</span>
                                 drinking vinegar, direct trade plaid cred hashtag offal. Fap XOXO chambray, intelligentsia
                                 kogi keytar flexitarian cardigan kale chips food truck.
                              </p>
                           </div>
                        </li>
                        <li className="media">
                           <div className="media-body">
                              <p className="lead mb-0">
                                 <Link to="/search" className="teal darken-1">
                                    <span className="text-bold-600">Run it</span>- up the flagpole, ping the boss
                                 </Link>
                              </p>
                              <p className="mb-0">
                                 <Link to="/search" className="teal darken-1">
                                    http://mail.example.com/
                                    <span className="text-bold-600">run</span>/
                                    <i className="fa fa-angle-down" aria-hidden="true" />
                                 </Link>
                              </p>
                              <p>
                                 Pixel pushing horsehead offer that jerk from finance really threw me under the bus, but best
                                 practices new economy and take five, punch the tree, and come back in here with a clear
                                 head...
                              </p>
                           </div>
                        </li>
                     </Row>
                     <div className="text-center">
                        <nav aria-label="Page navigation">
                           <ul className="pagination pagination-separate pagination-round pagination-flat">
                              <li className="page-item">
                                 <Link to="/search" className="page-link" aria-label="Previous">
                                    <span aria-hidden="true">« Prev</span>
                                    <span className="sr-only">Previous</span>
                                 </Link>
                              </li>
                              <li className="page-item">
                                 <Link to="/search" className="page-link">1</Link>
                              </li>
                              <li className="page-item">
                                 <Link to="/search" className="page-link">2</Link>
                              </li>
                              <li className="page-item active">
                                 <Link to="/search" className="page-link">3</Link>
                              </li>
                              <li className="page-item">
                                 <Link to="/search" className="page-link">4</Link>
                              </li>
                              <li className="page-item">
                                 <Link to="/search" className="page-link">5</Link>
                              </li>
                              <li className="page-item">
                                 <Link to="/search" className="page-link" aria-label="Next">
                                    <span aria-hidden="true">Next »</span>
                                    <span className="sr-only">Next</span>
                                 </Link>
                              </li>
                           </ul>
                        </nav>
                     </div>
                  </Col>
                  <Col lg="4">
                     <Card className="card">
                        <div className="px-0">
                           <h4 className="card-title">Apex</h4>
                           <h6 className="card-subtitle text-muted">Responsive React 16 Admin Template</h6>
                        </div>
                        <img className="img-fluid" src={ImgPortfolio3} alt="logo" />
                        <div className="px-0">
                           <p className="card-text">
                              Some quick example text to build on the card title and make up the bulk of the card's content.
                              <Link to="/search">Wikipedia</Link>
                           </p>
                           <ul className="list-group mb-2">
                              <li className="list-group-item">
                                 <strong>Website :</strong>
                                 <Link to="/search" className="card-link">https://pixinvent.com/</Link>
                              </li>
                              <li className="list-group-item">
                                 <strong>Customer service :</strong> 022 8888 9999
                              </li>
                              <li className="list-group-item">
                                 <strong>Founder :</strong> PIXINVENT
                              </li>
                              <li className="list-group-item">
                                 <strong>Founded :</strong> 2017
                              </li>
                              <li className="list-group-item">
                                 <strong>Support:</strong>
                                 <Link to="/search">support@pixinvent.com</Link>
                              </li>
                           </ul>
                           <div className="py-1 text-center">
                              <Link to="/search" className="btn btn-social-icon mr-1 mb-1 btn-outline-facebook">
                                 <span className="fa fa-facebook" />
                              </Link>
                              <Link to="/search" className="btn btn-social-icon mr-1 mb-1 btn-outline-twitter">
                                 <span className="fa fa-twitter" />
                              </Link>
                              <Link to="/search" className="btn btn-social-icon mr-1 mb-1 btn-outline-linkedin">
                                 <span className="fa fa-linkedin font-medium-4" />
                              </Link>
                              <Link to="/search" className="btn btn-social-icon mr-1 mb-1 btn-outline-github">
                                 <span className="fa fa-github font-medium-4" />
                              </Link>
                           </div>
                        </div>
                        <div className="px-0">
                           <p className="text-bold-600">People also search for</p>
                           <Row>
                              <Col md="4">
                                 <img className="img-fluid rounded" src={gallery11} alt="1" />
                                 <Link to="/search" className="font-small-2">Ashoka</Link>
                              </Col>
                              <Col md="4">
                                 <img className="img-fluid rounded" src={gallery12} alt="2" />
                                 <Link to="/search" className="font-small-2">Materialize</Link>
                              </Col>
                              <Col md="4">
                                 <img className="img-fluid rounded" src={gallery13} alt="3" />
                                 <Link to="/search" className="font-small-2">HTML </Link>
                              </Col>
                              <Col md="4">
                                 <img className="img-fluid rounded" src={gallery14} alt="4" />
                                 <Link to="/search" className="font-small-2">Ashoka</Link>
                              </Col>
                              <Col md="4">
                                 <img className="img-fluid rounded" src={gallery25} alt="5" />
                                 <Link to="/search" className="font-small-2">Materialize</Link>
                              </Col>
                              <Col md="4">
                                 <img className="img-fluid rounded" src={gallery23} alt="6" />
                                 <Link to="/search" className="font-small-2">HTML </Link>
                              </Col>
                           </Row>
                        </div>
                     </Card>
                  </Col>
               </Row>
            </div>
         </CardBody>
      </Card>
   );
};

export default Search;
