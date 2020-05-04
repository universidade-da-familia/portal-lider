/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */
/* eslint-disable no-else-return */
import React, { useEffect, Component } from 'react';
import { MapPin, Edit, Navigation, Box, List, Bookmark } from 'react-feather';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Form,
  Input,
  FormGroup,
  Card,
  CardBody,
  Label,
  Table,
} from 'reactstrap';

import { format, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import 'react-table/react-table.css';

import ContentHeader from '~/components/contentHead/contentHeader';
import { Creators as OrderActions } from '~/store/ducks/order';

class CepFormat extends Component {
  state = {
    value: '',
  };

  render() {
    return (
      <NumberFormat
        inputMode="decimal"
        displayType="input"
        format="#####-###"
        allowNegative={false}
        value={this.state.value}
        onValueChange={vals => {
          this.setState({ value: vals.value });
        }}
        {...this.props}
      />
    );
  }
}

export default function OrderRead({ match }) {
  const order_data = useSelector(state => state.order.data);

  const dispatch = useDispatch();

  function handleTransactionStatus(status) {
    if (status === 'APPROVED') {
      return 'APROVADO';
    } else if (status === 'DECLINED') {
      return 'REJEITADO';
    } else if (status === 'ERROR') {
      return 'ERRO';
    } else if (status === 'EXPIRED') {
      return 'EXPIRADO';
    } else if (status === 'PENDING') {
      return 'PENDENTE';
    } else {
      return status;
    }
  }

  useEffect(() => {
    dispatch(OrderActions.orderRequest(match.params.order_id));
  }, []);

  return (
    order_data !== null && (
      <>
        <ContentHeader>
          Visualizar pedido número {match.params.order_id}
        </ContentHeader>
        <Card>
          <CardBody className="d-flex flex-column justify-content-center">
            <Form>
              <h4 className="form-section">
                <Bookmark size={20} color="#212529" /> Tipo de pedido
              </h4>
              <Input
                type="select"
                component="select"
                id="orderType"
                name="orderType"
                className="form-control"
                disabled
              >
                <option value={order_data.type}>{order_data.type}</option>
              </Input>

              <h4 className="form-section">
                <Box size={20} color="#212529" /> Materiais
              </h4>

              <Table striped responsive className="text-center">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome produto</th>
                    <th>Valor unitário</th>
                    <th>Quantidade</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order_data.products.map(product => (
                    <tr key={product.id}>
                      <th scope="row">{product.id}</th>
                      <td>{product.name}</td>
                      <td>
                        {product.group_price.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </td>
                      <td>{product.pivot.quantity} UN</td>
                      <td>
                      {(() => {
                          if (order_data.type === 'Curso') {
                            return (
                              product.pivot.quantity * product.group_price
                            ).toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            });
                          } else if (order_data.type === 'Seminário') {
                            return (
                              product.pivot.quantity * product.seminary_price
                            ).toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            });
                          } else if (
                            order_data.type === 'Treinamento de treinadores' ||
                            order_data.type === 'Capacitação de líderes'
                          ) {
                            return (
                              product.pivot.quantity * product.training_price
                            ).toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            });
                          } else return '';
                        })()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <h4 className="form-section mt-3">
                <MapPin size={20} color="#212529" /> Endereço de entrega
              </h4>
              <Row>
                <Col sm="12" md="3" lg="3" xl="3">
                  <FormGroup>
                    <Label for="cep">CEP</Label>
                    <div className="position-relative has-icon-right">
                      <CepFormat
                        autoComplete="cep"
                        id="cep"
                        name="cep"
                        value={order_data.shipping_cep}
                        disabled
                        className="form-control"
                      />
                    </div>
                  </FormGroup>
                </Col>
                <Col sm="12" md="3" lg="3" xl="3">
                  <FormGroup>
                    <Label for="uf">Estado</Label>
                    <Input
                      readOnly
                      type="text"
                      id="uf"
                      name="uf"
                      value={order_data.shipping_uf}
                    />
                  </FormGroup>
                </Col>
                <Col sm="12" md="12" lg="6" xl="6">
                  <FormGroup>
                    <Label for="city">Cidade</Label>
                    <Input
                      readOnly
                      type="text"
                      id="city"
                      name="city"
                      value={order_data.shipping_city}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col sm="12" md="12" lg="8" xl="6">
                  <FormGroup>
                    <Label for="street">Rua</Label>
                    <div className="position-relative has-icon-left">
                      <Input
                        readOnly
                        type="text"
                        id="street"
                        name="street"
                        value={order_data.shipping_street}
                      />
                      <div className="form-control-position">
                        <i className="fa fa-road" />
                      </div>
                    </div>
                  </FormGroup>
                </Col>
                <Col sm="12" md="12" lg="4" xl="2">
                  <FormGroup>
                    <Label for="street_number">Número</Label>
                    <div className="position-relative has-icon-left">
                      <Input
                        readOnly
                        type="text"
                        id="street_number"
                        name="street_number"
                        value={order_data.shipping_street_number}
                      />
                      <div className="form-control-position">
                        <Navigation size={14} color="#212529" />
                      </div>
                    </div>
                  </FormGroup>
                </Col>
                <Col sm="12" md="12" lg="12" xl="4">
                  <FormGroup>
                    <Label for="neighborhood">Bairro</Label>
                    <div className="position-relative has-icon-left">
                      <Input
                        readOnly
                        type="text"
                        id="neighborhood"
                        name="neighborhood"
                        value={order_data.shipping_neighborhood}
                      />
                      <div className="form-control-position">
                        <i className="fa fa-map-signs" />
                      </div>
                    </div>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col sm="12" md="6" lg="6" xl="6">
                  <FormGroup>
                    <Label for="complement">Complemento</Label>
                    <div className="position-relative has-icon-left">
                      <Input
                        readOnly
                        type="text"
                        id="complement"
                        name="complement"
                        value={order_data.shipping_complement}
                      />
                      <div className="form-control-position">
                        <Edit size={14} color="#212529" />
                      </div>
                    </div>
                  </FormGroup>
                </Col>
                <Col sm="12" md="6" lg="6" xl="6">
                  <FormGroup>
                    <Label for="receiver">Recebedor</Label>
                    <div className="position-relative has-icon-left">
                      <Input
                        readOnly
                        type="text"
                        id="receiver"
                        name="receiver"
                        value={order_data.shipping_receiver}
                      />
                      <div className="form-control-position">
                        <Edit size={14} color="#212529" />
                      </div>
                    </div>
                  </FormGroup>
                </Col>
              </Row>

              <h4 className="form-section mt-3">
                <List size={20} color="#212529" /> Resumo do pedido
              </h4>

              <p className="font-medium-2">
                <span className="black">Número do pedido: </span>
                <span className="black font-weight-bold">{order_data.id}</span>
              </p>

              <p className="font-medium-2">
                <span className="black">Número do pedido (Netsuite): </span>
                <span className="black font-weight-bold">
                  {order_data.netsuite_id}
                </span>
              </p>

              <p className="font-medium-2">
                <span className="black">Status do pedido: </span>
                <span className="black font-weight-bold">
                  {order_data.status.name}
                </span>
              </p>

              <p className="font-medium-2">
                <span className="black">Solicitado em: </span>
                <span className="black font-weight-bold">
                  {format(new Date(order_data.created_at), 'dd/MM/yyyy', {
                    locale: ptBR,
                  })}
                </span>
              </p>

              {order_data.payment_name === 'Boleto' && (
                <p className="font-medium-2">
                  <span className="black">Vencimento do boleto: </span>
                  <span className="black font-weight-bold">
                    {format(
                      addDays(new Date(order_data.created_at), 30),
                      'dd/MM/yyyy',
                      {
                        locale: ptBR,
                      }
                    )}
                  </span>
                </p>
              )}

              <p className="font-medium-2">
                <span className="black">Tipo de pagamento: </span>
                {order_data.payment_name === 'Boleto' ? (
                  <a
                    href={order_data.transaction.boleto_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="blue font-weight-bold"
                  >
                    {order_data.payment_name} (Clique aqui para visualizar)
                  </a>
                ) : (
                  <span className="black font-weight-bold">
                    {order_data.payment_name}
                  </span>
                )}
              </p>

              <p className="font-medium-2">
                <span className="black">Status do pagamento: </span>
                <span className="black font-weight-bold">
                  {handleTransactionStatus(order_data.transaction.status)}
                </span>
              </p>

              {order_data.products.map(product => (
                <p key={product.id} className="font-medium-2">
                  <span className="black font-weight-bold">
                    {product.pivot.quantity} x{' '}
                  </span>
                  <span className="black">{product.name} por </span>
                  <span className="black font-weight-bold">
                    {(() => {
                      if (order_data.type === 'Curso') {
                        return product.group_price.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        });
                      } else if (order_data.type === 'Seminário') {
                        return product.seminary_price.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        });
                      } else if (
                        order_data.type === 'Treinamento de treinadores' ||
                        order_data.type === 'Capacitação de líderes'
                      ) {
                        return product.training_price.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        });
                      } else return '';
                    })()}
                    /unidade
                  </span>
                </p>
              ))}
              {order_data.shipping_cost === 0 ? (
                <p className="font-medium-2">
                  <span className="black font-weight-bold">Envio: </span>
                  <span className="black">
                    {order_data.shipping_name} com o{' '}
                  </span>
                  <span className="text-success font-weight-bold">
                    FRETE GRÁTIS
                  </span>{' '}
                  <span className="black font-weight-bold">
                    {`(prazo de ${
                      order_data.delivery_estimate_days
                    } a ${order_data.delivery_estimate_days + 3}
                  dias úteis)`}
                  </span>
                </p>
              ) : (
                <p className="font-medium-2">
                  <span className="black font-weight-bold">Envio: </span>
                  <span className="black">{order_data.shipping_name} por </span>
                  <span className="text-success font-weight-bold">
                    {order_data.shipping_cost.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </span>{' '}
                  <span className="black font-weight-bold">
                    {`(prazo de ${
                      order_data.delivery_estimate_days
                    } a ${order_data.delivery_estimate_days + 3}
                    dias úteis)`}
                  </span>
                </p>
              )}
              <Label className="mt-3 mb-0 black font-medium-5">
                Total:{' '}
                {order_data.total.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </Label>
            </Form>
          </CardBody>
        </Card>
      </>
    )
  );
}
