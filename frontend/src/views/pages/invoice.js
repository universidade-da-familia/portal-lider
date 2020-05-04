// import external modules
import React, { Fragment } from "react";
import { Row, Col, Table, Card, CardBody } from "reactstrap";

// import internal(own) modules
import ImgSingnature from "../../assets/img/pages/signature-scan.png";
import CompanyLogo from "../../assets/img/logos/logo-big-black.png";

const Invoice = props => {
   return (
      <Fragment>
         <Row>
            <Col md="12">
               <h4>Invoice</h4>
            </Col>
         </Row>
         <div className="invoice-template">
            <Card>
               <CardBody className="p-3">
                  <div id="invoice-template">
                     <Row id="invoice-company-details">
                        <Col xs="6" className="text-left">
                           <img src={CompanyLogo} alt="company logo" className="mb-2" width="70" />
                           <ul className="px-0 list-unstyled">
                              <li className="text-bold-800">Pixinvent Creative Studio</li>
                              <li>4025 Oak Avenue,</li>
                              <li>Melbourne,</li>
                              <li>Florida 32940,</li>
                              <li>USA</li>
                           </ul>
                        </Col>
                        <Col xs="6" className="text-right">
                           <h2>INVOICE</h2>
                           <p className="pb-3"># INV-001001</p>
                           <ul className="px-0 list-unstyled">
                              <li>Balance Due</li>
                              <li className="lead text-bold-800">$ 12,000.00</li>
                           </ul>
                        </Col>
                     </Row>
                     <Row id="invoice-customer-details" className="pt-2">
                        <Col xs="12" className="text-left">
                           <p className="text-muted">Bill To</p>
                        </Col>
                        <Col xs="6" className="text-left">
                           <ul className="px-0 list-unstyled">
                              <li className="text-bold-800">Mr. Bret Lezama</li>
                              <li>4879 Westfall Avenue,</li>
                              <li>Albuquerque,</li>
                              <li>New Mexico-87102.</li>
                           </ul>
                        </Col>
                        <Col className="text-right">
                           <p>
                              <span className="text-muted">Invoice Date :</span> 06/05/2016
                           </p>
                           <p>
                              <span className="text-muted">Terms :</span> Due on Receipt
                           </p>
                           <p>
                              <span className="text-muted">Due Date :</span> 10/05/2016
                           </p>
                        </Col>
                     </Row>

                     <Row id="invoice-items-details" className="pt-2">
                        <Col xs="12" className="table-responsive">
                           <Table>
                              <thead>
                                 <tr>
                                    <th>#</th>
                                    <th>Item &amp; Description</th>
                                    <th className="text-right">Rate</th>
                                    <th className="text-right">Hours</th>
                                    <th className="text-right">Amount</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 <tr>
                                    <th scope="row">1</th>
                                    <td>
                                       <p>Create PSD for mobile APP</p>
                                       <p className="text-muted">
                                          Simply dummy text of the printing and typesetting industry.
                                       </p>
                                    </td>
                                    <td className="text-right">$ 20.00/hr</td>
                                    <td className="text-right">120</td>
                                    <td className="text-right">$ 2400.00</td>
                                 </tr>
                                 <tr>
                                    <th scope="row">2</th>
                                    <td>
                                       <p>iOS Application Development</p>
                                       <p className="text-muted">Pellentesque maximus feugiat lorem at cursus.</p>
                                    </td>
                                    <td className="text-right">$ 25.00/hr</td>
                                    <td className="text-right">260</td>
                                    <td className="text-right">$ 6500.00</td>
                                 </tr>
                                 <tr>
                                    <th scope="row">3</th>
                                    <td>
                                       <p>WordPress Template Development</p>
                                       <p className="text-muted">Vestibulum euismod est eu elit convallis.</p>
                                    </td>
                                    <td className="text-right">$ 20.00/hr</td>
                                    <td className="text-right">300</td>
                                    <td className="text-right">$ 6000.00</td>
                                 </tr>
                              </tbody>
                           </Table>
                        </Col>
                     </Row>
                     <Row>
                        <Col md="6" xs="12" className="text-left">
                           <p className="lead">Payment Methods:</p>
                           <Row className="row">
                              <Col xs="12">
                                 <Table className="table table-borderless table-sm">
                                    <tbody>
                                       <tr>
                                          <td>Bank name:</td>
                                          <td className="text-right">ABC Bank, USA</td>
                                       </tr>
                                       <tr>
                                          <td>Acc name:</td>
                                          <td className="text-right">Amanda Orton</td>
                                       </tr>
                                       <tr>
                                          <td>IBAN:</td>
                                          <td className="text-right">FGS165461646546AA</td>
                                       </tr>
                                       <tr>
                                          <td>SWIFT code:</td>
                                          <td className="text-right">BTNPP34</td>
                                       </tr>
                                    </tbody>
                                 </Table>
                              </Col>
                           </Row>
                        </Col>
                        <Col md="6" xs="12">
                           <p className="lead">Total due</p>
                           <div className="table-responsive">
                              <Table>
                                 <tbody>
                                    <tr>
                                       <td>Sub Total</td>
                                       <td className="text-right">$ 14,900.00</td>
                                    </tr>
                                    <tr>
                                       <td>TAX (12%)</td>
                                       <td className="text-right">$ 1,788.00</td>
                                    </tr>
                                    <tr>
                                       <td className="text-bold-800">Total</td>
                                       <td className="text-bold-800 text-right">$ 16,688.00</td>
                                    </tr>
                                    <tr>
                                       <td>Payment Made</td>
                                       <td className="pink text-right">(-) $ 4,688.00</td>
                                    </tr>
                                    <tr className="bg-grey bg-lighten-4">
                                       <td className="text-bold-800">Balance Due</td>
                                       <td className="text-bold-800 text-right">$ 12,000.00</td>
                                    </tr>
                                 </tbody>
                              </Table>
                           </div>
                           <div className="text-center">
                              <p>Authorized person</p>
                              <img src={ImgSingnature} alt="signature" className="width-250" />
                              <h6>Amanda Orton</h6>
                              <p className="text-muted">Managing Director</p>
                           </div>
                        </Col>
                     </Row>
                     <Row id="invoice-footer">
                        <Col md="9" xs="12">
                           <h6>Terms &amp; Condition</h6>
                           <p>
                              You know, being a test pilot isn't always the healthiest business in the world. We predict too
                              much for the next year and yet far too little for the next 10.
                           </p>
                        </Col>
                        <Col md="3" xs="12" className="text-center">
                           <button type="button" className="btn btn-primary btn-raised my-1">
                              <i className="fa fa-paper-plane-o" /> Send Invoice
                           </button>
                        </Col>
                     </Row>
                  </div>
               </CardBody>
            </Card>
         </div>
      </Fragment>
   );
};

export default Invoice;
