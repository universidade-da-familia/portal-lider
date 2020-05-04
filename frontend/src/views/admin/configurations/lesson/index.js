/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardBody, Row, Col, Button } from 'reactstrap';

import ContentHeader from '~/components/contentHead/contentHeader';
import CustomTabs from '~/components/tabs/default';
import { Creators as LessonActions } from '~/store/ducks/lesson';

import LessonTable from './table';

export default function AdminMinistery() {
  const data = useSelector(state => state.lesson.allData);
  const userData = useSelector(state => state.profile.data);

  const [lessons, setLessons] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LessonActions.allLessonRequest());
  }, []);

  useEffect(() => {
    if (data.length > 0 && userData !== {}) {
      const dataLessons = data
        .filter(lesson => {
          if (
            lesson.defaultEvent.ministery_id === 1 &&
            userData.cmn_hierarchy_id === 7
          ) {
            return lesson;
          }
          if (
            lesson.defaultEvent.ministery_id === 2 &&
            userData.mu_hierarchy_id === 7
          ) {
            return lesson;
          }
          if (
            lesson.defaultEvent.ministery_id === 3 &&
            userData.crown_hierarchy_id === 7
          ) {
            return lesson;
          }
          if (
            lesson.defaultEvent.ministery_id === 4 &&
            userData.mp_hierarchy_id === 7
          ) {
            return lesson;
          }
          if (
            lesson.defaultEvent.ministery_id === 5 &&
            userData.ffi_hierarchy_id === 7
          ) {
            return lesson;
          }
          if (
            lesson.defaultEvent.ministery_id === 6 &&
            userData.gfi_hierarchy_id === 7
          ) {
            return lesson;
          }
          if (
            lesson.defaultEvent.ministery_id === 7 &&
            userData.pg_hab_hierarchy_id === 7
          ) {
            return lesson;
          }
          if (
            lesson.defaultEvent.ministery_id === 8 &&
            userData.pg_yes_hierarchy_id === 7
          ) {
            return lesson;
          }
        })
        .sort((a, b) => {
          if (a.id > b.id) {
            return 1;
          }
          if (a.id < b.id) {
            return -1;
          }
          return 0;
        });

      setLessons(dataLessons);
    }
  }, [data, userData]);

  return (
    <>
      <ContentHeader>Lições</ContentHeader>
      <Row className="row-eq-height">
        <Col sm="12">
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between">
                <div />
                <div>
                  <div className="d-none d-sm-none d-md-none d-lg-block">
                    <Link to="/admin/configuracao/licoes/criar">
                      <Button
                        color="success"
                        className="btn-raised mb-0 font-small-3"
                      >
                        <i className="fa fa-plus" /> Criar nova lição
                      </Button>{' '}
                    </Link>
                  </div>
                  <div>
                    <Link to="/admin/configuracao/licoes/criar">
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
              {lessons.length > 0 && (
                <CustomTabs TabContent={<LessonTable data={lessons} />} />
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}
