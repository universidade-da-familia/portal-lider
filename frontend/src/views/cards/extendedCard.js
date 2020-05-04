import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import {
   Card,
   CardGroup,
   CardDeck,
   CardColumns,
   CardImg,
   CardImgOverlay,
   CardTitle,
   CardSubtitle,
   CardText,
   CardBody,
   CardLink,
   CardFooter,
   Badge,
   Button,   
   Carousel,
   CarouselItem,
   CarouselControl,
   CarouselIndicators,
   CarouselCaption,   
   Row,
   Col
} from "reactstrap";

import {Plus} from "react-feather";

import cardImg01 from "../../assets/img/photos/01.jpg";
import cardImg02 from "../../assets/img/photos/02.jpg";
import cardImg03 from "../../assets/img/photos/03.jpg";
import cardImg04 from "../../assets/img/photos/04.jpg";
import cardImg05 from "../../assets/img/photos/05.jpg";
import cardImg06 from "../../assets/img/photos/06.jpg";
import cardImg09 from "../../assets/img/photos/09.jpg";
import cardImg10 from "../../assets/img/photos/10.jpg";
import cardImg14 from "../../assets/img/photos/14.jpg";
import cardImg15 from "../../assets/img/photos/15.jpg";

import cardImg12 from "../../assets/img/photos/12.jpg";
import cardImg13 from "../../assets/img/photos/13.jpg";
import cardImg17 from "../../assets/img/photos/17.jpg";

import cardImgEle01 from "../../assets/img/elements/01.png";
import cardImgEle04 from "../../assets/img/elements/04.png";
import cardImgEle06 from "../../assets/img/elements/06.png";
import cardImgEle07 from "../../assets/img/elements/07.png";
import cardImgEle11 from "../../assets/img/elements/11.png";
import cardImgEle14 from "../../assets/img/elements/14.png";

const items = [
   {
      src: cardImg12,
      altText: "Slide 1",
      caption: "Slide 1"
   },
   {
      src: cardImg13,
      altText: "Slide 2",
      caption: "Slide 2"
   },
   {
      src: cardImg17,
      altText: "Slide 3",
      caption: "Slide 3"
   }
];

class ExtendedCards extends Component {
   constructor(props) {
      super(props);
      this.state = { activeIndex: 0 };
      this.next = this.next.bind(this);
      this.previous = this.previous.bind(this);
      this.goToIndex = this.goToIndex.bind(this);
      this.onExiting = this.onExiting.bind(this);
      this.onExited = this.onExited.bind(this);
   }

   onExiting() {
      this.animating = true;
   }

   onExited() {
      this.animating = false;
   }

   next() {
      if (this.animating) return;
      const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
      this.setState({ activeIndex: nextIndex });
   }

   previous() {
      if (this.animating) return;
      const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
      this.setState({ activeIndex: nextIndex });
   }

   goToIndex(newIndex) {
      if (this.animating) return;
      this.setState({ activeIndex: newIndex });
   }

   render() {
      const { activeIndex } = this.state;

      const slides = items.map(item => {
         return (
            <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item.src}>
               <img src={item.src} alt={item.altText} />
               <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
            </CarouselItem>
         );
      });

      return (
         <Fragment>
            <h4 className="mt-4 text-bold-400 mb-0">Fabs (Floating Action Buttons) in cards</h4>
            <p>
               Cards require a small amount of markup and classes to provide you with as much control as possible. These
               classes and markup are flexible though and can typically be remixed and extended with ease. For example, if
               your card has no flush content like images, feel free to put the <code>.card-block</code> class on the{" "}
               <code>.card</code> element to consolidate your markup.
            </p>
            <Row className="row-eq-height">
               <Col sm="12" md="4">
                  <Card className="text-left">
                     <div className="card-img">
                        <img width="100%" src={cardImg14} alt="Card cap 14" />
                        <CardTitle>Card title</CardTitle>
                        <Link to="/cards/extended-card" className="btn btn-floating halfway-fab bg-warning">
                            <Plus size={25} color="#FFF" />
                        </Link>
                     </div>
                     <CardBody className="mt-2">
                        <CardText>
                           Icing powder caramels macaroon. Toffee sugar plum brownie pastry gummies jelly gummies.
                        </CardText>
                        <Button color="success">Button</Button>
                     </CardBody>
                  </Card>
               </Col>
               <Col sm="12" md="4">
                  <Card className="text-left">
                     <CardBody>
                        <CardTitle>Card title</CardTitle>
                        <CardText>Support card subtitle</CardText>
                     </CardBody>
                     <div className="card-img">
                        <img width="100%" src={cardImg15} alt="Card cap 15" />
                        <Link to="/cards/extended-card" className="btn btn-floating halfway-fab bg-danger">
                            <Plus size={25} color="#FFF" />
                        </Link>
                     </div>
                     <CardBody>
                        <CardText>Bear claw sesame snaps gummies.</CardText>
                        <CardLink href="#">Card Link</CardLink>
                        <CardLink href="#">Another Link</CardLink>
                     </CardBody>
                  </Card>
               </Col>
               <Col sm="12" md="4">
                  <Card className="text-left">
                     <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
                        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                        {slides}
                        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                     </Carousel>
                     <CardBody>
                        <CardText>Bear claw sesame snaps gummies chocolate.</CardText>
                        <CardLink href="#">Card Link</CardLink>
                        <CardLink href="#">Another Link</CardLink>
                     </CardBody>
                     <CardFooter>
                        2 day ago{" "}
                        <Badge className="float-right" color="success">
                           Branding
                        </Badge>
                        <Badge className="float-right mr-1" color="danger">
                           Design
                        </Badge>
                     </CardFooter>
                  </Card>
               </Col>
            </Row>

            <h4 className="mt-4 text-bold-400 mb-0">Overlap Image Cards</h4>
            <p>Overlap Image Cards</p>
            <Row className="row-eq-height mt-4">
               <Col sm="12" md="4">
                  <Card className="card card-inverse bg-primary text-center">
                     <CardBody>
                        <div className="card-img overlap">
                           <img src={cardImgEle11} width="190" alt="Card cap 11" className="" />
                        </div>
                        <CardTitle>New Arrival</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText>Donut toffee candy brownie soufflé macaroon.</CardText>
                     </CardBody>
                  </Card>
               </Col>
               <Col sm="12" md="4">
                  <Card className="card card-inverse bg-danger text-center">
                     <CardBody>
                        <div className="card-img overlap">
                           <img src={cardImgEle14} width="190" alt="Card cap 14" className="" />
                        </div>
                        <CardTitle>Brand Minute</CardTitle>
                        <CardText>Donut toffee candy brownie soufflé macaroon.</CardText>
                     </CardBody>
                  </Card>
               </Col>
               <Col sm="12" md="4">
                  <Card className="card card-inverse bg-warning text-center">
                     <CardBody>
                        <div className="card-img overlap">
                           <img src={cardImgEle07} width="190" alt="Card cap 07" className="" />
                        </div>
                        <CardTitle>Brand Minute</CardTitle>
                        <CardText>Donut toffee candy brownie soufflé macaroon.</CardText>
                     </CardBody>
                  </Card>
               </Col>{" "}
            </Row>

            <h4 className="mt-4 text-bold-400 mb-0">Background variants</h4>
            <p>
               Cards include their own variant classes for quickly changing the <code>background-color</code> and{" "}
               <code>border-color</code> of a card. Darker colors require the use of <code>.card-inverse</code>. <br />
               Cards include a class for quickly toggling the text color. By default, cards use dark text and assume a light
               background. Add <code>.card-inverse</code> for white text and specify the <code>background-color</code> and{" "}
               <code>border-color</code> to go with it.
               <br />
               You can also use <code>.card-inverse</code> with the contextual backgrounds variants.
            </p>
            <Row className="row-eq-height mt-4">
               <Col sm="12" md="6">
                  <Card className="card card-inverse bg-primary text-center p-3">
                     <CardBody>
                        <div className="row d-flex">
                           <div className="col align-self-center">
                              <img src={cardImgEle01} width="190" alt="Card cap 01" className="" />
                           </div>
                           <div className="col align-self-center">
                              <CardTitle className="mt-3">Brand Minute</CardTitle>
                              <CardText>Donut toffee candy brownie soufflé macaroon.</CardText>
                              <Button className="btn btn-raised btn-primary btn-darken-3">Buy Now</Button>
                           </div>
                        </div>
                     </CardBody>
                  </Card>
               </Col>
               <Col sm="12" md="6">
                  <Card className="card card-inverse bg-success text-center p-3">
                     <CardBody>
                        <img src={cardImgEle06} width="190" alt="Card cap 06" className="" />
                        <CardTitle className="mt-3 mb-0">Ceramic Bottle</CardTitle>
                        <CardText>456 items</CardText>
                     </CardBody>
                  </Card>
               </Col>
               <Col sm="12" md="6">
                  <Card className="card card-inverse bg-danger text-center p-3">
                     <CardBody>
                        <div className="row d-flex">
                           <div className="col align-self-center">
                              <CardTitle className="mt-3">Brand Minute</CardTitle>
                              <CardText>Donut toffee candy brownie soufflé macaroon.</CardText>
                              <Button className="btn btn-raised btn-danger btn-darken-3">Buy Now</Button>
                           </div>
                           <div className="col align-self-center">
                              <img src={cardImgEle01} width="190" alt="Card cap 01" className="" />
                           </div>
                        </div>
                     </CardBody>
                  </Card>
               </Col>

               <Col sm="12" md="6">
                  <Card className="card card-inverse bg-info text-center p-3">
                     <CardBody>
                        <div className="row d-flex">
                           <div className="col align-self-center">
                              <img src={cardImgEle07} width="225" alt="Card cap 07" className="" />
                           </div>
                           <div className="col align-self-center">
                              <CardTitle className="mt-3">New Arrival</CardTitle>
                              <CardText>Donut toffee candy brownie soufflé macaroon.</CardText>
                              <Button className="btn btn-raised btn-info btn-darken-3">Button</Button>
                           </div>
                        </div>
                     </CardBody>
                  </Card>
               </Col>

               <Col sm="12" md="6">
                  <Card className="card card-inverse bg-warning text-center p-3">
                     <CardBody>
                        <img src={cardImgEle04} width="190" alt="Card cap 04" className="" />
                        <CardTitle className="mt-3 mb-0">Storage Device</CardTitle>
                        <CardText>945 items</CardText>
                     </CardBody>
                  </Card>
               </Col>

               <Col sm="12" md="6">
                  <Card className="card card-inverse bg-primary text-center p-3">
                     <CardBody>
                        <div className="row d-flex">
                           <div className="col align-self-center">
                              <CardTitle className="mt-3 mb-0">New Arrival</CardTitle>
                              <CardText>Donut toffee candy brownie soufflé macaroon.</CardText>
                              <Button className="btn btn-raised btn-primary btn-darken-3">Buy Now</Button>
                           </div>
                           <div className="col align-self-center">
                              <img src={cardImgEle11} width="190" alt="Card cap 11" className="" />
                           </div>
                        </div>
                     </CardBody>
                  </Card>
               </Col>
            </Row>

            <h4 className="mt-4 text-bold-400 mb-0">Outline variants</h4>
            <p className="content-sub-header">
               In need of a colored card, but not the hefty background colors they bring? Replace the default modifier
               classes with the <code>.card-outline-*</code> ones to style just the <code>border-color</code> of a card.
            </p>

            <Row className="row-eq-height mt-4">
               <Col sm="12" md="6">
                  <Card className="card card-outline-primary box-shadow-0 text-center p-3">
                     <CardBody>
                        <div className="row d-flex">
                           <div className="col align-self-center">
                              <img src={cardImgEle01} width="190" alt="Card cap 01" className="" />
                           </div>
                           <div className="col align-self-center">
                              <CardTitle className="mt-3">Brand Minute</CardTitle>
                              <CardText>Donut toffee candy brownie soufflé macaroon.</CardText>
                              <Button className="btn btn-raised btn-primary">Buy Now</Button>
                           </div>
                        </div>
                     </CardBody>
                  </Card>
               </Col>
               <Col sm="12" md="6">
                  <Card className="card card-outline-success box-shadow-0 text-center p-3">
                     <CardBody>
                        <img src={cardImgEle06} width="190" alt="Card cap 06" className="" />
                        <CardTitle className="mt-3 mb-0">Ceramic Bottle</CardTitle>
                        <CardText>456 items</CardText>
                     </CardBody>
                  </Card>
               </Col>
               <Col sm="12" md="6">
                  <Card className="card card-outline-danger box-shadow-0 text-center p-3">
                     <CardBody>
                        <div className="row d-flex">
                           <div className="col align-self-center">
                              <CardTitle className="mt-3">Brand Minute</CardTitle>
                              <CardText>Donut toffee candy brownie soufflé macaroon.</CardText>
                              <Button className="btn btn-raised btn-danger">Buy Now</Button>
                           </div>
                           <div className="col align-self-center">
                              <img src={cardImgEle01} width="190" alt="Card cap 01" className="" />
                           </div>
                        </div>
                     </CardBody>
                  </Card>
               </Col>
               <Col sm="12" md="6">
                  <Card className="card card-outline-info box-shadow-0 text-center p-3">
                     <CardBody>
                        <div className="row d-flex">
                           <div className="col align-self-center">
                              <img src={cardImgEle07} width="225" alt="Card cap 07" className="" />
                           </div>
                           <div className="col align-self-center">
                              <CardTitle className="mt-3">New Arrival</CardTitle>
                              <CardText>Donut toffee candy brownie soufflé macaroon.</CardText>
                              <Button className="btn btn-raised btn-info">Buy Now</Button>
                           </div>
                        </div>
                     </CardBody>
                  </Card>
               </Col>
               <Col sm="12" md="6">
                  <Card className="card card-outline-warning box-shadow-0 text-center p-3">
                     <CardBody>
                        <img src={cardImgEle04} width="190" alt="Card cap 04" className="" />
                        <CardTitle className="mt-3 mb-0">Storage Device</CardTitle>
                        <CardText>945 items</CardText>
                     </CardBody>
                  </Card>
               </Col>
               <Col sm="12" md="6">
                  <Card className="card card-outline-primary box-shadow-0 text-center p-3">
                     <CardBody>
                        <div className="row d-flex">
                           <div className="col align-self-center">
                              <CardTitle className="mt-3 mb-0">New Arrival</CardTitle>
                              <CardText>Donut toffee candy brownie soufflé macaroon.</CardText>
                              <Button className="btn btn-raised btn-primary">Buy Now</Button>
                           </div>
                           <div className="col align-self-center">
                              <img src={cardImgEle11} width="190" alt="Card cap 11" className="" />
                           </div>
                        </div>
                     </CardBody>
                  </Card>
               </Col>
            </Row>
            <h4 className="mt-4 text-bold-400 mb-0">Groups</h4>
            <p>
               Use card groups to render cards as a single, attached element with equal width and height columns. By default,
               card groups use <code>display: table;</code> and <code>table-layout: fixed;</code> to achieve their uniform
               sizing. However, enabling flexbox mode can switch that to use <code>display: flex;</code> and provide the same
               effect.
            </p>

            <CardGroup>
               <Card>
                  <CardImg top width="100%" src={cardImg04} alt="Card cap" />
                  <CardBody>
                     <CardTitle>Card title</CardTitle>
                     <CardSubtitle>Card subtitle</CardSubtitle>
                     <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
                     <p>
                        <small className="text-muted">Last updated 3 mins ago</small>
                     </p>
                  </CardBody>
               </Card>
               <Card>
                  <CardImg top width="100%" src={cardImg01} alt="Card cap" />
                  <CardBody>
                     <CardTitle>Card title</CardTitle>
                     <CardSubtitle>Card subtitle</CardSubtitle>
                     <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
                     <p>
                        <small className="text-muted">Last updated 3 mins ago</small>
                     </p>
                  </CardBody>
               </Card>
               <Card>
                  <CardImg top width="100%" src={cardImg06} alt="Card cap" />
                  <CardBody>
                     <CardTitle>Card title</CardTitle>
                     <CardSubtitle>Card subtitle</CardSubtitle>
                     <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
                     <p>
                        <small className="text-muted">Last updated 3 mins ago</small>
                     </p>
                  </CardBody>
               </Card>
               <Card>
                  <CardImg top width="100%" src={cardImg02} alt="Card cap" />
                  <CardBody>
                     <CardTitle>Card title</CardTitle>
                     <CardSubtitle>Card subtitle</CardSubtitle>
                     <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
                     <p>
                        <small className="text-muted">Last updated 3 mins ago</small>
                     </p>
                  </CardBody>
               </Card>
            </CardGroup>
            <h4 className="mt-4 text-bold-400 mb-0">Decks</h4>
            <p>
               Need a set of equal width and height cards that aren’t attached to one another? Use card decks. By default,
               card decks require two wrapping elements: <code>.card-deck-wrapper</code> and a <code>.card-deck</code>. We
               use table styles for the sizing and the gutters on <code>.card-deck</code>. The{" "}
               <code>.card-deck-wrapper</code> is used to negative margin out the <code>border-spacing</code> on the{" "}
               <code>.card-deck</code>.
            </p>

            <CardDeck>
               <Card>
                  <CardImg top width="100%" src={cardImg05} alt="Card cap" />
                  <CardBody>
                     <CardTitle>Card title</CardTitle>
                     <CardSubtitle>Card subtitle</CardSubtitle>
                     <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
                     <p>
                        <small className="text-muted">Last updated 3 mins ago</small>
                     </p>
                  </CardBody>
               </Card>
               <Card>
                  <CardImg top width="100%" src={cardImg09} alt="Card cap" />
                  <CardBody>
                     <CardTitle>Card title</CardTitle>
                     <CardSubtitle>Card subtitle</CardSubtitle>
                     <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
                     <p>
                        <small className="text-muted">Last updated 3 mins ago</small>
                     </p>
                  </CardBody>
               </Card>
               <Card>
                  <CardImg top width="100%" src={cardImg02} alt="Card cap" />
                  <CardBody>
                     <CardTitle>Card title</CardTitle>
                     <CardSubtitle>Card subtitle</CardSubtitle>
                     <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
                     <p>
                        <small className="text-muted">Last updated 3 mins ago</small>
                     </p>
                  </CardBody>
               </Card>
               <Card>
                  <CardImg top width="100%" src={cardImg04} alt="Card cap" />
                  <CardBody>
                     <CardTitle>Card title</CardTitle>
                     <CardSubtitle>Card subtitle</CardSubtitle>
                     <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
                     <p>
                        <small className="text-muted">Last updated 3 mins ago</small>
                     </p>
                  </CardBody>
               </Card>
            </CardDeck>

            <h4 className="mt-4 text-bold-400 mb-0">Columns</h4>
            <p>
               Cards can be organized into Masonry-like columns with just CSS by wrapping them in <code>.card-columns</code>.
               Only applies to small devices and above.
               <br />><strong>Heads up!</strong> This is <strong>not available in IE9</strong> and below as they have no
               support for the column-* CSS properties.
            </p>

            <CardColumns>
               <Card>
                  <CardImg top width="100%" src={cardImg06} alt="Card cap" />
                  <CardBody>
                     <CardTitle>Card title</CardTitle>
                     <CardSubtitle>Card subtitle</CardSubtitle>
                     <CardText>
                        This is a wider card with supporting text below as a natural lead-in to additional content. This
                        content is a little bit longer.
                     </CardText>
                     <Button className="btn btn-outline-danger">Buy Now</Button>
                  </CardBody>
               </Card>
               <Card className="card card-inverse bg-success text-center p-3">
                  <CardBody>
                     <img src={cardImgEle06} width="190" alt="Card cap 06" className="" />
                     <CardTitle className="mt-3 mb-0">Ceramic Bottle</CardTitle>
                     <CardText>456 items</CardText>
                  </CardBody>
               </Card>
               <Card inverse>
                  <CardImg width="100%" src={cardImg03} alt="Card cap" />
                  <CardImgOverlay className="overlay-warning">
                     <CardTitle>Card Title</CardTitle>
                     <CardText>
                        This is a wider card with supporting text below as a natural lead-in to additional content. This
                        content is a little bit longer.
                     </CardText>
                  </CardImgOverlay>
               </Card>
               <Card>
                  <CardBody>
                     <CardTitle>Card title</CardTitle>
                     <CardSubtitle>Card subtitle</CardSubtitle>
                     <CardText>
                        This is a wider card with supporting text below as a natural lead-in to additional content. This card
                        has even longer content than the first to show that equal height action.
                     </CardText>
                     <Button>Button</Button>
                  </CardBody>
                  <CardImg top width="100%" src={cardImg10} alt="Card cap" />
               </Card>
               <Card className="card card-inverse bg-danger text-center p-3">
                  <CardBody>
                     <div className="row d-flex">
                        <div className="col align-self-center">
                           <CardTitle className="mt-3">Brand Minute</CardTitle>
                           <CardText>Donut toffee candy brownie soufflé macaroon.</CardText>
                           <Button className="btn btn-raised btn-danger btn-darken-3">Buy Now</Button>
                        </div>
                        <div className="col align-self-center">
                           <img src={cardImgEle14} width="190" alt="Card cap 01" className="" />
                        </div>
                     </div>
                  </CardBody>
               </Card>

               <Card className="card card-outline-warning box-shadow-0 text-center p-3">
                  <CardBody>
                     <img src={cardImgEle04} width="190" alt="Card cap 04" className="" />
                     <CardTitle className="mt-3 mb-0">Storage Device</CardTitle>
                     <CardText>945 items</CardText>
                  </CardBody>
               </Card>               
            </CardColumns>
         </Fragment>
      );
   }
}
export default ExtendedCards;
