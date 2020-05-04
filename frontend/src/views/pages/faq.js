// import external modules
import React, { useState, useEffect } from 'react';
import {
  Search,
  Package,
  DollarSign,
  Truck,
  Award,
  UserPlus,
} from 'react-feather';
import { Row, Col, Card, CardBody, CardHeader, Input } from 'reactstrap';

import faq from '~/assets/data/faq';

// import internal(own) modules
import Accordion from '~/components/accordion/Accordion';

export default function Faq() {
  const [searchWord, setSearchWord] = useState('');
  const [searchCard, setSearchCard] = useState([]);

  function searchFaq(e) {
    e.preventDefault();
    setSearchWord(e.target.value);
  }

  useEffect(() => {
    const teste = new RegExp(searchWord, 'i');
    const auxQuestions = [];
    faq.forEach(faq => {
      faq.questions.forEach(question => {
        if (question.description.search(teste) !== -1) {
          auxQuestions.push(question);
        }
      });
    });

    setSearchCard(auxQuestions);
  }, [searchWord]);

  return (
    <>
      <Row>
        <Col xs="12">
          <Card className="gradient-purple-bliss white text-center p-4">
            <CardHeader className="p-0">
              <h1>Perguntas frequentes portal do líder</h1>
              <p className="mb-5">
                <em>Como podemos ajudá-lo?</em>
              </p>
            </CardHeader>
            <CardBody className="p-0">
              <Col xl="12" lg="10" xs="12" className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Pesquise por palavras-chave"
                  onChange={e => searchFaq(e)}
                />
              </Col>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {searchWord !== '' && (
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                <CardHeader className="border-bottom-grey border-bottom-lighten-1">
                  <span
                    aria-expanded="true"
                    aria-disabled="false"
                    aria-controls="1"
                    className="primary mx-0 cursor-pointer"
                  >
                    <h2>
                      <Search size={24} /> <span>Resultado da pesquisa</span>
                    </h2>
                  </span>
                </CardHeader>

                {searchCard.length === 0 && <div>Nada encontrado</div>}
                <Accordion>
                  {searchCard.map(faq => {
                    return (
                      <Accordion.AccordionItem
                        render={() => (
                          <CardHeader className="border-bottom-grey border-bottom-lighten-4">
                            <span
                              aria-expanded="true"
                              aria-disabled="false"
                              aria-controls="1"
                              className="mx-0 cursor-pointer"
                            >
                              <h5>
                                <span className="text-bold-600">
                                  {faq.description}
                                </span>
                              </h5>
                            </span>
                          </CardHeader>
                        )}
                      >
                        <CardBody className="mb-5">
                          <p>{faq.answer}</p>
                        </CardBody>
                      </Accordion.AccordionItem>
                    );
                  })}
                </Accordion>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}

      <Row>
        <Col xs="12">
          <Card className="accordion">
            <CardBody>
              <Accordion>
                {faq.map(faq => {
                  return (
                    <Accordion.AccordionItem
                      render={() => (
                        <CardHeader className="border-bottom-grey border-bottom-lighten-1">
                          <span
                            aria-expanded="true"
                            aria-disabled="false"
                            aria-controls="1"
                            className="primary mx-0 cursor-pointer"
                          >
                            <h2>
                              {faq.category === 'Pedidos' && (
                                <>
                                  <Package size={24} />{' '}
                                  <span>{faq.category}</span>
                                </>
                              )}
                              {faq.category === 'Condições de pagamento' && (
                                <>
                                  <DollarSign size={24} />{' '}
                                  <span>{faq.category}</span>
                                </>
                              )}
                              {faq.category === 'Frete e envio' && (
                                <>
                                  <Truck size={24} />{' '}
                                  <span>{faq.category}</span>
                                </>
                              )}
                              {faq.category === 'Certificado' && (
                                <>
                                  <Award size={24} />{' '}
                                  <span>{faq.category}</span>
                                </>
                              )}
                              {faq.category === 'Cadastro' && (
                                <>
                                  <UserPlus size={24} />{' '}
                                  <span>{faq.category}</span>
                                </>
                              )}
                            </h2>
                          </span>
                        </CardHeader>
                      )}
                    >
                      <Accordion>
                        {faq.questions.map(question => {
                          return (
                            <Accordion.AccordionItem
                              render={() => (
                                <CardHeader className="border-bottom-grey border-bottom-lighten-4">
                                  <span
                                    aria-expanded="true"
                                    aria-disabled="false"
                                    aria-controls="1"
                                    className="mx-0 cursor-pointer"
                                  >
                                    <h5>
                                      <span className="text-bold-600">
                                        {question.description}
                                      </span>
                                    </h5>
                                  </span>
                                </CardHeader>
                              )}
                            >
                              <CardBody className="mb-5">
                                <p>{question.answer}</p>
                              </CardBody>
                            </Accordion.AccordionItem>
                          );
                        })}
                      </Accordion>
                    </Accordion.AccordionItem>
                  );
                })}
              </Accordion>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}
