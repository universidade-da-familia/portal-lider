// import external modules
import React, { Fragment } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

import ImgSrc1 from "../../assets/img/gallery/1.jpg";
import ImgSrc2 from "../../assets/img/gallery/2.jpg";

const Gallery = props => {
   return (
      <Fragment>
         <Row>
            <Col xs="12">
               <div className="content-header">Hover Effects</div>
               <p className="content-sub-header">
                  Image gallery grid with 30 subtle hover effect. Try to hover below demo images to show each hover effect.
               </p>
            </Col>
         </Row>

         <Card>
            <CardBody>
               <div className="grid-hover">
                  <h5 className="text-bold-400 text-uppercase">Lily</h5>
                  <Row>
                     <Col md="6" xs="12">
                        <figure className="effect-lily">
                           <img src={ImgSrc1} alt="img1" />
                           <figcaption>
                              <div>
                                 <h2>
                                    Nice
                                    <span>Lily</span>
                                 </h2>
                                 <p>Lily likes to play with crayons and pencils</p>
                              </div>
                              <Link to="/gallery">View more</Link>
                           </figcaption>
                        </figure>
                     </Col>
                     <Col md="6" xs="12">
                        <figure className="effect-lily">
                           <img src={ImgSrc2} alt="img2" />
                           <figcaption>
                              <div>
                                 <h2>
                                    Nice
                                    <span>Lily</span>
                                 </h2>
                                 <p>Lily likes to play with crayons and pencils</p>
                              </div>
                              <Link to="/gallery">View more</Link>
                           </figcaption>
                        </figure>
                     </Col>
                  </Row>
               </div>
               <div className="grid-hover">
                  <h5 className="text-bold-400 text-uppercase">Sadie</h5>
                  <Row>
                     <Col md="6" xs="12">
                        <figure className="effect-sadie">
                           <img src={ImgSrc1} alt="img1" />
                           <figcaption>
                              <div>
                                 <h2>
                                    Holy
                                    <span>Sadie</span>
                                 </h2>
                                 <p>
                                    Sadie never took her eyes off me.
                                    <br />
                                    She had a dark soul.
                                 </p>
                              </div>
                              <Link to="/gallery">View more</Link>
                           </figcaption>
                        </figure>
                     </Col>
                     <Col md="6" xs="12">
                        <figure className="effect-sadie">
                           <img src={ImgSrc2} alt="img2" />
                           <figcaption>
                              <div>
                                 <h2>
                                    Holy
                                    <span>Sadie</span>
                                 </h2>
                                 <p>
                                    Sadie never took her eyes off me.
                                    <br />
                                    She had a dark soul.
                                 </p>
                              </div>
                              <Link to="/gallery">View more</Link>
                           </figcaption>
                        </figure>
                     </Col>
                  </Row>
               </div>
               <div className="grid-hover">
                  <h5 className="text-bold-400 text-uppercase">Honey</h5>
                  <Row>
                     <Col md="6" xs="12">
                        <figure className="effect-honey">
                           <img src={ImgSrc1} alt="img1" />
                           <figcaption>
                              <div>
                                 <h2>
                                    Dreamy
                                    <span>Honey</span> <i>Now</i>
                                 </h2>
                              </div>
                              <Link to="/gallery">View more</Link>
                           </figcaption>
                        </figure>
                     </Col>
                     <Col md="6" xs="12">
                        <figure className="effect-honey">
                           <img src={ImgSrc2} alt="img2" />
                           <figcaption>
                              <div>
                                 <h2>
                                    Dreamy
                                    <span>Honey</span> <i>Now</i>
                                 </h2>
                              </div>
                              <Link to="/gallery">View more</Link>
                           </figcaption>
                        </figure>
                     </Col>
                  </Row>
               </div>
               <div className="grid-hover">
                  <h5 className="text-bold-400 text-uppercase">Layla</h5>
                  <Row>
                     <Col md="6" xs="12">
                        <figure className="effect-layla">
                           <img src={ImgSrc1} alt="img1" />
                           <figcaption>
                              <div>
                                 <h2>
                                    Crazy
                                    <span>Layla</span>
                                 </h2>
                                 <p>When Layla appears, she brings an eternal summer along.</p>
                              </div>
                              <Link to="/gallery">View more</Link>
                           </figcaption>
                        </figure>
                     </Col>
                     <Col md="6" xs="12">
                        <figure className="effect-layla">
                           <img src={ImgSrc2} alt="img2" />
                           <figcaption>
                              <div>
                                 <h2>
                                    Crazy
                                    <span>Layla</span>
                                 </h2>
                                 <p>When Layla appears, she brings an eternal summer along.</p>
                              </div>
                              <Link to="/gallery">View more</Link>
                           </figcaption>
                        </figure>
                     </Col>
                  </Row>
               </div>
               <div className="grid-hover">
                  <h5 className="text-bold-400 text-uppercase">Zoe</h5>
                  <Row>
                     <Col md="6" xs="12">
                        <figure className="effect-zoe">
                           <img src={ImgSrc1} alt="img1" />
                           <figcaption>
                              <div>
                                 <h2>
                                    Creative
                                    <span>Zoe</span>
                                 </h2>
                                 <p className="icon-links">
                                    <Link to="/gallery" className="mr-1">
                                       <i className="ft-heart" />
                                    </Link>
                                    <Link to="/gallery" className="mr-1">
                                       <i className="ft-eye" />
                                    </Link>
                                    <Link to="/gallery" className="mr-1">
                                       <i className="ft-edit" />
                                    </Link>
                                 </p>
                                 <p className="description">
                                    Zoe never had the patience of her sisters. She deliberately punched the bear in his face.
                                 </p>
                              </div>
                              <Link to="/gallery">View more</Link>
                           </figcaption>
                        </figure>
                     </Col>
                     <Col md="6" xs="12">
                        <figure className="effect-zoe">
                           <img src={ImgSrc2} alt="img2" />
                           <figcaption>
                              <div>
                                 <h2>
                                    Creative
                                    <span>Zoe</span>
                                 </h2>
                                 <p className="icon-links">
                                    <Link to="/gallery" className="mr-1">
                                       <i className="ft-heart" />
                                    </Link>
                                    <Link to="/gallery" className="mr-1">
                                       <i className="ft-eye" />
                                    </Link>
                                    <Link to="/gallery" className="mr-1">
                                       <i className="ft-edit" />
                                    </Link>
                                 </p>
                                 <p className="description">
                                    Zoe never had the patience of her sisters. She deliberately punched the bear in his face.
                                 </p>
                              </div>
                              <Link to="/gallery">View more</Link>
                           </figcaption>
                        </figure>
                     </Col>
                  </Row>
               </div>
               <div className="grid-hover">
                  <h5 className="text-bold-400 text-uppercase">Oscar</h5>
                  <Row>
                     <Col md="6" xs="12">
                        <figure className="effect-oscar">
                           <img src={ImgSrc1} alt="img1" />
                           <figcaption>
                              <div>
                                 <h2>
                                    Warm
                                    <span>Oscar</span>
                                 </h2>
                                 <p>Oscar is a decent man. He used to clean porches with pleasure.</p>
                              </div>
                              <Link to="/gallery">View more</Link>
                           </figcaption>
                        </figure>
                     </Col>
                     <Col md="6" xs="12">
                        <figure className="effect-oscar">
                           <img src={ImgSrc2} alt="img2" />
                           <figcaption>
                              <div>
                                 <h2>
                                    Warm
                                    <span>Oscar</span>
                                 </h2>
                                 <p>Oscar is a decent man. He used to clean porches with pleasure.</p>
                              </div>
                              <Link to="/gallery">View more</Link>
                           </figcaption>
                        </figure>
                     </Col>
                  </Row>
               </div>
               <div className="grid-hover">
                  <h5 className="text-bold-400 text-uppercase">Marley</h5>
                  <Row>
                     <Col md="6" xs="12">
                        <figure className="effect-marley">
                           <img src={ImgSrc1} alt="img1" />
                           <figcaption>
                              <div>
                                 <h2>
                                    Sweet
                                    <span>Marley</span>
                                 </h2>
                                 <p>Marley tried to convince her but she was not interested.</p>
                              </div>
                              <Link to="/gallery">View more</Link>
                           </figcaption>
                        </figure>
                     </Col>
                     <Col md="6" xs="12">
                        <figure className="effect-marley">
                           <img src={ImgSrc2} alt="img2" />
                           <figcaption>
                              <div>
                                 <h2>
                                    Sweet
                                    <span>Marley</span>
                                 </h2>
                                 <p>Marley tried to convince her but she was not interested.</p>
                              </div>
                              <Link to="/gallery">View more</Link>
                           </figcaption>
                        </figure>
                     </Col>
                  </Row>
               </div>
               <div className="grid-hover">
                  <h5 className="text-bold-400 text-uppercase">Ruby</h5>
                  <Row>
                     <Col md="6" xs="12">
                        <figure className="effect-ruby">
                           <img src={ImgSrc1} alt="img1" />
                           <figcaption>
                              <div>
                                 <h2>
                                    Glowing
                                    <span>Ruby</span>
                                 </h2>
                                 <p>Ruby did not need any help. Everybody knew that.</p>
                              </div>
                              <Link to="/gallery">View more</Link>
                           </figcaption>
                        </figure>
                     </Col>
                     <Col md="6" xs="12">
                        <figure className="effect-ruby">
                           <img src={ImgSrc2} alt="img2" />
                           <figcaption>
                              <div>
                                 <h2>
                                    Glowing
                                    <span>Ruby</span>
                                 </h2>
                                 <p>Ruby did not need any help. Everybody knew that.</p>
                              </div>
                              <Link to="/gallery">View more</Link>
                           </figcaption>
                        </figure>
                     </Col>
                  </Row>
               </div>
               <div className="grid-hover">
                  <h5 className="text-bold-400 text-uppercase">Roxy</h5>
                  <Row>
                     <Col md="6" xs="12">
                        <figure className="effect-roxy">
                           <img src={ImgSrc1} alt="img1" />
                           <figcaption>
                              <div>
                                 <h2>
                                    Charming
                                    <span>Roxy</span>
                                 </h2>
                                 <p>Roxy was my best friend. She'd cross any border for me.</p>
                              </div>
                              <Link to="/gallery">View more</Link>
                           </figcaption>
                        </figure>
                     </Col>
                     <Col md="6" xs="12">
                        <figure className="effect-roxy">
                           <img src={ImgSrc2} alt="img2" />
                           <figcaption>
                              <div>
                                 <h2>
                                    Charming
                                    <span>Roxy</span>
                                 </h2>
                                 <p>Roxy was my best friend. She'd cross any border for me.</p>
                              </div>
                              <Link to="/gallery">View more</Link>
                           </figcaption>
                        </figure>
                     </Col>
                  </Row>
               </div>
               <div className="grid-hover">
                  <h5 className="text-bold-400 text-uppercase">Bubba</h5>
                  <Row>
                     <Col md="6" xs="12">
                        <figure className="effect-bubba">
                           <img src={ImgSrc1} alt="img1" />
                           <figcaption>
                              <div>
                                 <h2>
                                    Fresh
                                    <span>Bubba</span>
                                 </h2>
                                 <p>Bubba likes to appear out of thin air.</p>
                              </div>
                              <Link to="/gallery">View more</Link>
                           </figcaption>
                        </figure>
                     </Col>
                     <Col md="6" xs="12">
                        <figure className="effect-bubba">
                           <img src={ImgSrc2} alt="img2" />
                           <figcaption>
                              <div>
                                 <h2>
                                    Fresh
                                    <span>Bubba</span>
                                 </h2>
                                 <p>Bubba likes to appear out of thin air.</p>
                              </div>
                              <Link to="/gallery">View more</Link>
                           </figcaption>
                        </figure>
                     </Col>
                  </Row>
               </div>
               <div className="grid-hover">
                  <h5 className="text-bold-400 text-uppercase">Romeo</h5>
                  <Row>
                     <Col md="6" xs="12">
                        <figure className="effect-romeo">
                           <img src={ImgSrc1} alt="img1" />
                           <figcaption>
                              <div>
                                 <h2>
                                    Wild
                                    <span>Romeo</span>
                                 </h2>
                                 <p>Romeo never knows what he wants. He seemed to be very cross about something.</p>
                              </div>
                              <Link to="/gallery">View more</Link>
                           </figcaption>
                        </figure>
                     </Col>
                     <Col md="6" xs="12">
                        <figure className="effect-romeo">
                           <img src={ImgSrc2} alt="img2" />
                           <figcaption>
                              <div>
                                 <h2>
                                    Wild
                                    <span>Romeo</span>
                                 </h2>
                                 <p>Romeo never knows what he wants. He seemed to be very cross about something.</p>
                              </div>
                              <Link to="/gallery">View more</Link>
                           </figcaption>
                        </figure>
                     </Col>
                  </Row>
               </div>
               <div className="grid-hover">
                  <h5 className="text-bold-400 text-uppercase">Dexter</h5>
                  <Row>
                     <Col md="6" xs="12">
                        <figure className="effect-dexter">
                           <img src={ImgSrc1} alt="img1" />
                           <figcaption>
                              <div>
                                 <h2>
                                    Strange
                                    <span>Dexter</span>
                                 </h2>
                                 <p>Dexter had his own strange way. You could watch him training ants.</p>
                              </div>
                              <Link to="/gallery">View more</Link>
                           </figcaption>
                        </figure>
                     </Col>
                     <Col md="6" xs="12">
                        <figure className="effect-dexter">
                           <img src={ImgSrc2} alt="img2" />
                           <figcaption>
                              <div>
                                 <h2>
                                    Strange
                                    <span>Dexter</span>
                                 </h2>
                                 <p>Dexter had his own strange way. You could watch him training ants.</p>
                              </div>
                              <Link to="/gallery">View more</Link>
                           </figcaption>
                        </figure>
                     </Col>
                  </Row>
               </div>
               <div className="grid-hover">
                  <h5 className="text-bold-400 text-uppercase">Sarah</h5>
                  <Row>
                     <Col md="6" xs="12">
                        <figure className="effect-sarah">
                           <img src={ImgSrc1} alt="img1" />
                           <figcaption>
                              <div>
                                 <h2>
                                    Free
                                    <span>Sarah</span>
                                 </h2>
                                 <p>Sarah likes to watch clouds. She's quite depressed.</p>
                              </div>
                              <Link to="/gallery">View more</Link>
                           </figcaption>
                        </figure>
                     </Col>
                     <Col md="6" xs="12">
                        <figure className="effect-sarah">
                           <img src={ImgSrc2} alt="img2" />
                           <figcaption>
                              <div>
                                 <h2>
                                    Free
                                    <span>Sarah</span>
                                 </h2>
                                 <p>Sarah likes to watch clouds. She's quite depressed.</p>
                              </div>
                              <Link to="/gallery">View more</Link>
                           </figcaption>
                        </figure>
                     </Col>
                  </Row>
               </div>
               <div className="grid-hover">
                  <h5 className="text-bold-400 text-uppercase">Chico</h5>
                  <Row>
                     <Col md="6" xs="12">
                        <figure className="effect-chico">
                           <img src={ImgSrc1} alt="img1" />
                           <figcaption>
                              <div>
                                 <h2>
                                    Silly
                                    <span>Chico</span>
                                 </h2>
                                 <p>Chico's main fear was missing the morning bus.</p>
                              </div>
                              <Link to="/gallery">View more</Link>
                           </figcaption>
                        </figure>
                     </Col>
                     <Col md="6" xs="12">
                        <figure className="effect-chico">
                           <img src={ImgSrc2} alt="img2" />
                           <figcaption>
                              <div>
                                 <h2>
                                    Silly
                                    <span>Chico</span>
                                 </h2>
                                 <p>Chico's main fear was missing the morning bus.</p>
                              </div>
                              <Link to="/gallery">View more</Link>
                           </figcaption>
                        </figure>
                     </Col>
                  </Row>
               </div>
               <div className="grid-hover">
                  <h5 className="text-bold-400 text-uppercase">Milo</h5>
                  <Row>
                     <Col md="6" xs="12">
                        <figure className="effect-milo">
                           <img src={ImgSrc1} alt="img1" />
                           <figcaption>
                              <div>
                                 <h2>
                                    Faithful
                                    <span>Milo</span>
                                 </h2>
                                 <p>Milo went to the woods. He took a fun ride and never came back.</p>
                              </div>
                              <Link to="/gallery">View more</Link>
                           </figcaption>
                        </figure>
                     </Col>
                     <Col md="6" xs="12">
                        <figure className="effect-milo">
                           <img src={ImgSrc2} alt="img2" />
                           <figcaption>
                              <div>
                                 <h2>
                                    Faithful
                                    <span>Milo</span>
                                 </h2>
                                 <p>Milo went to the woods. He took a fun ride and never came back.</p>
                              </div>
                              <Link to="/gallery">View more</Link>
                           </figcaption>
                        </figure>
                     </Col>
                  </Row>
               </div>
            </CardBody>
         </Card>
      </Fragment>
   );
};

export default Gallery;
