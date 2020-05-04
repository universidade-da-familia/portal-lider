import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import {
   Card,
   CardImg,
   CardTitle,
   CardSubtitle,
   CardText,
   CardBody,
   CardImgOverlay,
   CardLink,
   CardFooter,
   Badge,
   Button,
   ListGroup,
   ListGroupItem,
   Carousel,
   CarouselItem,
   CarouselControl,
   CarouselIndicators,
   CarouselCaption,
   Form,
   FormGroup,
   Input,
   Row,
   Col
} from "reactstrap";

import { User, CheckCircle, X, Plus, Check, Mail } from "react-feather";

import cardImg02 from "../../assets/img/photos/02.jpg";
import cardImg06 from "../../assets/img/photos/06.jpg";
import cardImg08 from "../../assets/img/photos/08.jpg";
import cardImg09 from "../../assets/img/photos/09.jpg";
import cardImg10 from "../../assets/img/photos/10.jpg";
import cardImg14 from "../../assets/img/photos/14.jpg";

import cardImg12 from "../../assets/img/photos/12.jpg";
import cardImg13 from "../../assets/img/photos/13.jpg";
import cardImg17 from "../../assets/img/photos/17.jpg";

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

class BasicCards extends Component {
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
            <h4 className="mt-4 mb-0 text-bold-400">Basic Cards with Image caps Examples</h4>
            <p>
               Cards require a small amount of markup and classes to provide you with as much control as possible. These
               classes and markup are flexible though and can typically be remixed and extended with ease. For example, if
               your card has no flush content like images, feel free to put the <code>.card-block</code> class on the{" "}
               <code>.card</code> element to consolidate your markup.
            </p>
            <Row className="row-eq-height">
               <Col sm="12" md="4">
                  <Card>
                     <CardImg top width="100%" src={cardImg02} alt="Card cap" />
                     <CardBody>
                        <CardTitle>Card title</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText>
                           Some quick example text to build on the card title and make up the bulk of the card's content.
                        </CardText>
                        <Button className="btn btn-danger">Button</Button>
                     </CardBody>
                  </Card>
               </Col>
               <Col sm="12" md="4">
                  <Card>
                     <CardBody>
                        <CardTitle>Card title</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText>
                           Some quick example text to build on the card title and make up the bulk of the card's content.
                        </CardText>
                        <Button className="btn btn-info">Button</Button>
                     </CardBody>
                     <CardImg top width="100%" src={cardImg06} alt="Card cap" />
                  </Card>
               </Col>
               <Col sm="12" md="4">
                  <Card>
                     <CardBody>
                        <CardTitle>Card title</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                     </CardBody>
                     <CardImg top width="100%" src={cardImg10} alt="Card cap" />
                     <CardBody>
                        <CardText>
                           Some quick example text to build on the card title and make up the bulk of the card's content.
                        </CardText>
                        <Button className="btn btn-success">Button</Button>
                     </CardBody>
                  </Card>
               </Col>
            </Row>

            <h4 className="mt-4 mb-0 text-bold-400">Content Types</h4>
            <p>
               Cards support a wide variety of content, including images, text, list groups, links, and more. Mix and match
               multiple content types to create the card you need.
            </p>

            <Row className="row-eq-height">
               <Col sm="12" md="4">
                  <Card>
                     <CardBody>
                        <CardImg top width="100%" src={cardImg08} alt="Card cap" />
                        <CardTitle className="mt-3">Card title</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText>
                           Some quick example text to build on the card title and make up the bulk of the card's content.
                        </CardText>
                        <Button color="danger">Button</Button>
                     </CardBody>
                  </Card>
               </Col>
               <Col sm="12" md="4">
                  <Card>
                     <CardBody>
                        <CardTitle>Card title</CardTitle>
                        <CardSubtitle>Support card subtitle</CardSubtitle>
                     </CardBody>
                     <img width="100%" src={cardImg10} alt="Card cap 10" />
                     <CardBody>
                        <CardText>
                           Some quick example text to build on the card title and make up the bulk of the card's content.
                        </CardText>
                        <CardLink href="#">Card Link</CardLink>
                        <CardLink href="#">Another Link</CardLink>
                     </CardBody>
                  </Card>
               </Col>
               <Col sm="12" md="4">
                  <Card>
                     <CardBody>
                        <CardTitle>Card title</CardTitle>
                        <CardSubtitle>Support card subtitle</CardSubtitle>

                        <img width="100%" src={cardImg09} alt="Card cap 09" className="my-4" />

                        <CardText>
                           Some quick example text to build on the card title and make up the bulk of the card's content.
                        </CardText>
                        <CardLink className="danger" href="#">
                           Card Link
                        </CardLink>
                        <CardLink className="danger" href="#">
                           Another Link
                        </CardLink>
                     </CardBody>
                  </Card>
               </Col>
            </Row>

            <Row className="row-eq-height">
               <Col sm="12" md="4">
                  <Card>
                     <CardImg top width="100%" src={cardImg14} alt="Card cap" />
                     <CardBody>
                        <CardTitle>Basic</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText>
                           Some quick example text to build on the card title and make up the bulk of the card's content.
                        </CardText>
                        <Button className="btn-round" outline color="danger">
                           Button
                        </Button>
                     </CardBody>
                  </Card>
               </Col>
               <Col sm="12" md="4">
                  <Card>
                     <CardBody>
                        <CardTitle>LIST GROUP</CardTitle>
                        <CardText>
                           Some quick example text to build on the card title and make up the bulk of the card's content.
                        </CardText>
                     </CardBody>
                     <ListGroup>
                        <ListGroupItem>
                           Cras justo odio{" "}
                           <Badge className="float-right" color="primary">
                              7
                           </Badge>
                        </ListGroupItem>
                        <ListGroupItem>
                           Dapibus ac facilisis in{" "}
                           <Badge className="float-right" color="success">
                              2
                           </Badge>
                        </ListGroupItem>
                        <ListGroupItem>
                           Morbi leo risus{" "}
                           <Badge className="float-right" color="danger">
                              4
                           </Badge>
                        </ListGroupItem>
                        <ListGroupItem>
                           Porta ac consectetur ac{" "}
                           <Badge className="float-right" color="info">
                              4
                           </Badge>
                        </ListGroupItem>
                     </ListGroup>
                     <CardBody>
                        <CardLink className="info" href="#">
                           Card Link
                        </CardLink>
                        <CardLink className="info" href="#">
                           Another Link
                        </CardLink>
                     </CardBody>
                  </Card>
               </Col>
               <Col sm="12" md="4">
                  <Card>
                     <CardBody>
                        <CardTitle>CAROUSEL</CardTitle>
                        <CardSubtitle>Support card subtitle</CardSubtitle>
                        <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous} className="my-3">
                           <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                           {slides}
                           <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                           <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                        </Carousel>
                        <CardText>
                           Some quick example text to build on the card title and make up the bulk of the card's content.
                        </CardText>
                        <Button className="btn-round" outline color="danger">
                           Button
                        </Button>
                     </CardBody>
                  </Card>
               </Col>
            </Row>

            <h4 className="mt-4 mb-0 text-bold-400">Header and footer</h4>
            <p>Add an optional header and/or footer within a card.</p>

            <Row className="row-eq-height">
               <Col sm="12" md="4">
                  <Card className="text-left">
                     <CardBody>
                        <CardTitle>Basic Card</CardTitle>
                        <CardText>Basic Card With Header & Footer</CardText>
                     </CardBody>
                     <img width="100%" src={cardImg02} alt="Card cap 02" />
                     <CardBody>
                        <CardText>Bear claw sesame snaps gummies chocolate.</CardText>
                        <CardLink href="#">Card Link</CardLink>
                        <CardLink href="#">Another Link</CardLink>
                     </CardBody>
                     <CardFooter>
                        3 hours ago{" "}
                        <Link to="/cards/basic-card" className="float-right">
                            Read More >
                        </Link>
                     </CardFooter>
                  </Card>
               </Col>
               <Col sm="12" md="4">
                  <Card className="text-left">
                     <CardBody>
                        <CardTitle>Floating Action Button</CardTitle>
                        <CardText>With Header & Footer</CardText>
                     </CardBody>
                     <div className="card-img">
                        <img width="100%" src={cardImg09} alt="Card cap 09" />
                        <Link to="/cards/basic-card" className="btn btn-floating halfway-fab btn-large bg-danger">
                            <Plus size={25} color="#FFF" />
                        </Link>
                     </div>
                     <CardBody>
                        <CardText>Bear claw sesame snaps gummies chocolate.</CardText>
                        <CardLink href="#">Card Link</CardLink>
                        <CardLink href="#">Another Link</CardLink>
                     </CardBody>
                     <CardFooter>
                        1 day ago{" "}
                        <Badge className="float-right" color="success">
                           Technology
                        </Badge>
                        <Badge className="float-right mr-1" color="danger">
                           Mobile
                        </Badge>
                     </CardFooter>
                  </Card>
               </Col>
               <Col sm="12" md="4">
                  <Card className="text-left">
                     <CardBody>
                        <CardTitle>Carousel</CardTitle>
                        <CardText>Carousel Card With Header & Footer</CardText>
                     </CardBody>
                     <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
                        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                        {slides}
                        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                     </Carousel>
                     <CardBody>
                        <CardText>
                           Some quick example text to build on the card title and make up the bulk of the card's content.
                        </CardText>
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

            <h4 className="mt-4 mb-0 text-bold-400">Text alignment</h4>
            <p>
               You can quickly change the text alignment of any card—in its entirety or specific parts—with our text align
               classes.
            </p>

            <Row className="row-eq-height">
               <Col sm="12" md="4">
                  <Card className="text-left">
                     <CardBody>
                        <CardTitle className="info">Text Align Left</CardTitle>
                        <CardText>
                           Gummi bears I love oat cake gingerbread donut cotton candy pie biscuit tart. Chocolate cake
                           chocolate cake I love marzipan cookie macaroon. Tart I love I love carrot cake carrot cake chupa
                           chups caramels. Carrot cake pastry cotton candy. Dessert I love brownie biscuit topping I love
                           chocolate cake gingerbread jelly beans. Chocolate cake cake cheesecake. Chocolate cake pastry
                           macaroon.
                        </CardText>
                        <Button color="info">Button</Button>
                     </CardBody>
                  </Card>
               </Col>
               <Col sm="12" md="4">
                  <Card className="text-center">
                     <CardBody>
                        <CardTitle className="danger">Text Align Center</CardTitle>
                        <CardText>
                           Gummi bears I love oat cake gingerbread donut cotton candy pie biscuit tart. Chocolate cake
                           chocolate cake I love marzipan cookie macaroon. Tart I love I love carrot cake carrot cake chupa
                           chups caramels. Carrot cake pastry cotton candy. Dessert I love brownie biscuit topping I love
                           chocolate cake gingerbread jelly beans. Chocolate cake cake cheesecake. Chocolate cake pastry
                           macaroon.
                        </CardText>
                        <Button color="danger">Button</Button>
                     </CardBody>
                  </Card>
               </Col>
               <Col sm="12" md="4">
                  <Card className="text-right">
                     <CardBody>
                        <CardTitle className="success">Text Align Right</CardTitle>
                        <CardText>
                           Gummi bears I love oat cake gingerbread donut cotton candy pie biscuit tart. Chocolate cake
                           chocolate cake I love marzipan cookie macaroon. Tart I love I love carrot cake carrot cake chupa
                           chups caramels. Carrot cake pastry cotton candy. Dessert I love brownie biscuit topping I love
                           chocolate cake gingerbread jelly beans. Chocolate cake cake cheesecake. Chocolate cake pastry
                           macaroon.
                        </CardText>
                        <Button color="success">Button</Button>
                     </CardBody>
                  </Card>
               </Col>
            </Row>

            <h4 className="mt-4 mb-0 text-bold-400">Sizing</h4>
            <p>
               Constrain the width of cards via custom CSS, our predefined grid classes, or with custom styles using our grid
               mixins.
            </p>

            <Row className="row-eq-height">
               <Col sm="12" md="6">
                  <Card>
                     <CardBody>
                        <CardTitle>Project Info</CardTitle>
                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                        <Form>
                           <div className="form-body">
                              <h4 className="form-section">
                                 <User size={20} color="#212529" /> Personal Info
                              </h4>
                              <Row>
                                 <Col md="6">
                                    <FormGroup>
                                       <Input type="text" id="projectinput1" name="fname" placeholder="First Name" />
                                    </FormGroup>
                                 </Col>
                                 <Col md="6">
                                    <FormGroup>
                                       <Input type="text" id="projectinput2" name="lname" placeholder="Last Name" />
                                    </FormGroup>
                                 </Col>
                              </Row>
                              <Row>
                                 <Col md="6">
                                    <FormGroup>
                                       <Input type="text" id="projectinput3" name="email" placeholder="E-mail" />
                                    </FormGroup>
                                 </Col>
                                 <Col md="6">
                                    <FormGroup>
                                       <Input type="text" id="projectinput4" name="phone" placeholder="Contact Number" />
                                    </FormGroup>
                                 </Col>
                              </Row>

                              <h4 className="form-section">
                                 <CheckCircle size={20} color="#212529" /> Requirements
                              </h4>

                              <FormGroup>
                                 <Input type="text" id="companyName" name="company" placeholder="Company" />
                              </FormGroup>

                              <Row>
                                 <Col md="6">
                                    <FormGroup>
                                       <Input type="select" id="projectinput5" name="interested">
                                          <option value="none" defaultValue disabled="">
                                             Interested in
                                          </option>
                                          <option value="design">design</option>
                                          <option value="development">development</option>
                                          <option value="illustration">illustration</option>
                                          <option value="branding">branding</option>
                                          <option value="video">video</option>
                                       </Input>
                                    </FormGroup>
                                 </Col>

                                 <Col md="6">
                                    <FormGroup>
                                       <Input type="select" id="projectinput6" name="budget">
                                          <option value="0" defaultValue disabled="">
                                             Budget
                                          </option>
                                          <option value="less than 5000$">less than 5000$</option>
                                          <option value="5000$ - 10000$">5000$ - 10000$</option>
                                          <option value="10000$ - 20000$">10000$ - 20000$</option>
                                          <option value="more than 20000$">more than 20000$</option>
                                       </Input>
                                    </FormGroup>
                                 </Col>
                              </Row>
                              <FormGroup>
                                 <Input
                                    type="textarea"
                                    id="projectinput8"
                                    rows="5"
                                    name="comment"
                                    placeholder="About Project"
                                 />
                              </FormGroup>
                           </div>

                           <div className="form-actions text-right">
                              <Button color="warning" className="mr-1">
                                 <X size={20} color="#FFF" /> Cancel
                              </Button>
                              <Button color="success">
                                 <Check size={20} color="#FFF" /> Save
                              </Button>
                           </div>
                        </Form>
                     </CardBody>
                  </Card>
               </Col>
               <Col sm="12" md="6">
                  <Card>
                     <CardBody>
                        <CardTitle>User Profile</CardTitle>
                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                        <Form>
                           <div className="form-body">
                              <h4 className="form-section">
                                 <User size={20} color="#212529" /> About User
                              </h4>
                              <Row>
                                 <Col md="6">
                                    <FormGroup>
                                       <Input type="text" id="projectinput1" name="fname" placeholder="Name" />
                                    </FormGroup>
                                 </Col>
                                 <Col md="6">
                                    <FormGroup>
                                       <Input type="text" id="projectinput2" name="lname" placeholder="Company" />
                                    </FormGroup>
                                 </Col>
                              </Row>
                              <Row>
                                 <Col md="6">
                                    <FormGroup>
                                       <Input type="text" id="projectinput3" name="email" placeholder="Username" />
                                    </FormGroup>
                                 </Col>
                                 <Col md="6">
                                    <FormGroup>
                                       <Input type="text" id="projectinput4" name="phone" placeholder="Nick Name" />
                                    </FormGroup>
                                 </Col>
                              </Row>

                              <h4 className="form-section">
                                 <Mail size={20} color="#212529" /> Contact Info & Bio
                              </h4>

                              <FormGroup>
                                 <Input type="email" id="companyName" name="company" placeholder="email" />
                              </FormGroup>

                              <FormGroup>
                                 <Input type="url" id="companyUrl" name="url" placeholder="http://" />
                              </FormGroup>

                              <FormGroup>
                                 <Input type="textarea" id="projectinput8" rows="5" name="comment" placeholder="Bio" />
                              </FormGroup>
                           </div>

                           <div className="form-actions text-right">
                              <Button color="warning" className="mr-1">
                                 <X size={20} color="#FFF" /> Cancel
                              </Button>
                              <Button color="success">
                                 <Check size={20} color="#FFF" /> Save
                              </Button>
                           </div>
                        </Form>
                     </CardBody>
                  </Card>
               </Col>
            </Row>

            <h4 className="mt-4 mb-0 text-bold-400">Image overlays</h4>

            <Row className="row-eq-height">
               <Col sm="12" md="4">
                  <Card inverse>
                     <CardImg width="100%" src={cardImg08} alt="Card cap" />
                     <CardImgOverlay className="overlay-danger">
                        <CardTitle>Card Title</CardTitle>
                        <CardText>
                           This is a wider card with supporting text below as a natural lead-in to additional content. This
                           content is a little bit longer.
                        </CardText>
                     </CardImgOverlay>
                  </Card>
               </Col>
               <Col sm="12" md="4">
                  <Card inverse>
                     <CardImg width="100%" src={cardImg06} alt="Card cap" />
                     <CardImgOverlay className="overlay-info">
                        <CardTitle>Card Title</CardTitle>
                        <CardText>
                           This is a wider card with supporting text below as a natural lead-in to additional content. This
                           content is a little bit longer.
                        </CardText>
                     </CardImgOverlay>
                  </Card>
               </Col>
               <Col sm="12" md="4">
                  <Card inverse>
                     <CardImg width="100%" src={cardImg10} alt="Card cap" />
                     <CardImgOverlay className="overlay-warning">
                        <CardTitle>Card Title</CardTitle>
                        <CardText>
                           This is a wider card with supporting text below as a natural lead-in to additional content. This
                           content is a little bit longer.
                        </CardText>
                     </CardImgOverlay>
                  </Card>
               </Col>
            </Row>

            <h4 className="mt-4 mb-0 text-bold-400">Background variants</h4>

            <Row className="row-eq-height">
               <Col sm="12" md="4">
                  <Card body inverse color="danger">
                     <CardTitle>Special Title Treatment</CardTitle>
                     <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                     <Button className="btn btn-raised btn-danger btn-darken-3">Buy Now</Button>
                  </Card>
               </Col>
               <Col sm="12" md="4">
                  <Card body inverse color="info">
                     <CardTitle>Special Title Treatment</CardTitle>
                     <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                     <Button className="btn btn-raised btn-info btn-darken-3">Buy Now</Button>
                  </Card>
               </Col>
               <Col sm="12" md="4">
                  <Card body inverse color="warning">
                     <CardTitle>Special Title Treatment</CardTitle>
                     <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                     <Button className="btn btn-raised btn-warning btn-darken-3">Buy Now</Button>
                  </Card>
               </Col>
            </Row>
         </Fragment>
      );
   }
}
export default BasicCards;
