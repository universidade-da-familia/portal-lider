import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomTabs from '~/components/tabs/default';
import ContentHeader from '~/components/contentHead/contentHeader';
import { Card, CardBody, Row, Col } from 'reactstrap';

import { Creators as MinisteryActions } from '~/store/ducks/ministery';

import MinisteryTable from './table';

export default function AdminMinistery() {
  const data = useSelector(state => state.ministery.allData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(MinisteryActions.allMinisteryRequest());
  }, []);

  return (
    <>
      <ContentHeader>Ministérios</ContentHeader>
      <Row className="row-eq-height">
        <Col sm="12">
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between"></div>
              <CustomTabs TabContent={<MinisteryTable data={data} />} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}
