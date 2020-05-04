// import external modules
import React from "react";
import { NavLink, Link } from "react-router-dom";

// import internal(own) modules
import { Row, Col, Button, CardImg } from "reactstrap";

import logo from "../../assets/img/logo-big.png";

const Error = props => {
  return (
    <div className="container-fluid bg-grey bg-lighten-3 text-muted">
      <div className="container-fluid">
        <Row className="full-height-vh">
          <Col
            md="12"
            lg="12"
            className="d-flex align-items-center justify-content-center gradient-blue-grey-blue"
          >
            <div className="error-container">
              <Row className="py-2">
                <CardImg
                  alt="Logo UDF"
                  className="m-auto width-100 img-fluid"
                  src={logo}
                />
              </Row>
              <div className="no-border">
                <div
                  className="text-center text-bold-600 text-white darken-1 mt-5"
                  style={{ fontSize: "10rem", marginBottom: "4rem" }}
                >
                  404
                </div>
              </div>
              <div className="error-body">
                <Row className="py-2">
                  <p className="text-white text-center col-12 py-1">
                    Ops, parece que a página que você está procurando não
                    existe.
                  </p>
                </Row>
                <Row className="py-2">
                  <Col xs="12" className="input-group">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Pesquisar..."
                      aria-describedby="button-addon2"
                    />
                    <span className="input-group-btn" id="button-addon2">
                      <Link to="/user-profile">
                        <i className="ft-search" />
                      </Link>
                    </span>
                  </Col>
                </Row>
                <Row className="py-2 justify-content-center">
                  <Col>
                    <NavLink
                      to="/"
                      className="btn btn-default btn-raised btn-block font-medium-2"
                    >
                      <i className="ft-home" /> Voltar para a Home
                    </NavLink>
                  </Col>
                </Row>
              </div>
              <div className="error-footer bg-transparent">
                <Row>
                  <p className="text-white text-center col-12 py-1">
                    © 2019 Desenvolvido por{" "}
                    <i className="ft-heart font-small-3" />
                    <a
                      href="https://www.udf.org.br/"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {" "}
                      Universidade da Família
                    </a>
                  </p>
                  <Col xs="12" className="text-center">
                    <Button className="btn-social-icon mr-1 mb-1 btn-facebook">
                      <span className="fa fa-facebook" />
                    </Button>
                    <Button className="btn-social-icon mr-1 mb-1 btn-instagram">
                      <span className="fa fa-instagram" />
                    </Button>
                    <Button className="btn-social-icon mr-1 mb-1 btn-youtube">
                      <span className="fa fa-youtube-play" />
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Error;
