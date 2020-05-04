// import external modules
import React from "react";
import {
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardImg,
  CardBody
} from "reactstrap";

import logo from "../../assets/img/logo-big.png";

const Maintainance = props => {
  return (
    <div className="container-fluid">
      <Row className="full-height-vh">
        <Col
          xs="12"
          className="d-flex align-items-center justify-content-center gradient-blue-grey-blue"
        >
          <Card className="border-grey border-lighten-3 px-1 py-1 box-shadow-3">
            <CardHeader>
              <Row className="py-2">
                <CardImg
                  alt="Logo UDF"
                  className="m-auto width-100 img-fluid"
                  src={logo}
                />
              </Row>
            </CardHeader>
            <CardBody className="text-center">
              <h3>Essa página está em manutenção</h3>
              <p>
                Pedimos desculpa pelo incoveniente.
                <br /> Por favor, volte mais tarde.
              </p>
              <div className="mt-2">
                <i className="fa fa-cog spinner font-large-2" />
              </div>

              <hr />
              <p className="socialIcon card-text text-center pt-2 pb-2">
                <Button className="btn-social-icon mr-1 mb-1 btn-outline-facebook bg-white">
                  <span className="fa fa-facebook" />
                </Button>
                <Button className="btn-social-icon mr-1 mb-1 btn-outline-instagram bg-white">
                  <span className="fa fa-instagram" />
                </Button>
                <Button className="btn-social-icon mr-1 mb-1 btn-outline-youtube bg-white">
                  <span className="fa fa-youtube-play" />
                </Button>
              </p>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Maintainance;
