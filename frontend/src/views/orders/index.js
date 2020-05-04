import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardBody, Row, Col, Button, Badge } from 'reactstrap';

import history from '~/app/history';
import ContentHeader from '~/components/contentHead/contentHeader';
import ContentSubHeader from '~/components/contentHead/contentSubHeader';
import CustomTabs from '~/components/tabs/default';
import { Creators as ProfileActions } from '~/store/ducks/profile';

import OrderTable from './table';

export default function Orders() {
  const data = useSelector(state => state.profile.data);

  const dispatch = useDispatch();

  function handleGoToAddOrder() {
    history.push('/pedidos/criar');
  }

  useEffect(() => {
    dispatch(ProfileActions.profileRequest());
  }, []);

  return (
    <>
      <ContentHeader>Pedido de Material</ContentHeader>
      <ContentSubHeader>Visualize os pedidos.</ContentSubHeader>
      <Row className="row-eq-height">
        <Col sm="12">
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between">
                <Badge color="info" className="align-self-center">
                  Meus pedidos
                </Badge>
                <div>
                  <div className="d-none d-sm-none d-md-none d-lg-block">
                    <Button
                      color="success"
                      className="btn-raised mb-0 font-small-3"
                      onClick={() => handleGoToAddOrder()}
                    >
                      <i className="fa fa-plus" /> Solicitar material
                    </Button>{' '}
                  </div>
                  <div>
                    <Link to="/pedidos/criar">
                      <Button
                        color="success"
                        className="btn-raised mb-0 d-lg-none"
                      >
                        <i className="fa fa-plus" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <CustomTabs TabContent={<OrderTable data={data.orders} />} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}
