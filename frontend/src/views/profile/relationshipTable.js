/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Mail, Phone, RefreshCw } from 'react-feather';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { BounceLoader } from 'react-spinners';
import {
  Badge,
  Row,
  Button,
  Table,
  NavLink,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  FormGroup,
  Label,
  Input,
  CardBody,
  Card,
  CardHeader,
} from 'reactstrap';

// eslint-disable-next-line import/no-extraneous-dependencies
import { css } from '@emotion/core';
import classnames from 'classnames';
import { Formik, Field, Form } from 'formik';
import randomstring from 'randomstring';
import * as Yup from 'yup';

import CPFFormat from '~/components/fields/CPFFormat';
import PhoneFormat from '~/components/fields/PhoneFormat';
import { validateCPF } from '~/services/validateCPF';
import { Creators as EntityActions } from '~/store/ducks/entity';
import { Creators as RelationshipActions } from '~/store/ducks/relationship';

const formRelative = Yup.object().shape({
  cpf: Yup.string().required('O CPF é obrigatório'),
  relationship_type: Yup.string().required('Tipo de relação obrigatório'),
});

const formAddNewRelative = Yup.object().shape({
  name: Yup.string()
    .max(35, 'Nome muito grande (máximo 35 caracteres)')
    .matches(/(\w.+\s).+/i, 'Nome e sobrenome obrigatório')
    .required('O nome é obrigatório'),
  email: Yup.string().matches(
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    'Digite um email válido'
  ),
  cpf: Yup.string().required('O CPF é obrigatório'),
  sex: Yup.string().required('O sexo do participante é obrigatório'),
  relationship_type: Yup.string().required('Tipo de relação obrigatório'),
});

export default function RelationshipTable({ relationships, match }) {
  const [modalAddRelative, setModalAddRelative] = useState(false);
  const [modalAddNewRelative, setModalAddNewRelative] = useState(false);
  const [modalViewRelative, setModalViewRelative] = useState(false);
  const [relativeViewData, setRelativeViewData] = useState(null);
  const [relativeVerify, setRelativeVerify] = useState([]);
  const [cpfNotFound, setCpfNotFound] = useState('');
  const [entityData, setEntityData] = useState(false);
  const [searchRelativeData, setSearchRelativeData] = useState({
    cpf: '',
    relationship_type: '',
  });

  const profile_data = useSelector(state => state.profile.data);
  const entity_data = useSelector(state => state.entity.cpfData);
  const loading = useSelector(state => state.entity.loading);
  const error = useSelector(state => state.entity.error);
  const not_found = useSelector(state => state.entity.notFound);

  const dispatch = useDispatch();
  const store = useStore();

  const InputFeedback = ({ error }) =>
    error ? <div className={classnames('input-feedback')}>{error}</div> : null;

  const RadioButton = ({
    field: { name, value, onChange, onBlur },
    id,
    label,
    className,
    ...props
  }) => {
    return (
      <div>
        <input
          name={name}
          id={id}
          type="radio"
          value={id} // could be something else for output?
          checked={id === value}
          onChange={onChange}
          onBlur={onBlur}
          className={`${classnames('radio-button')} mr-1`}
          {...props}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    );
  };

  // Radio group
  const RadioButtonGroup = ({
    value,
    error,
    touched,
    label,
    className,
    children,
  }) => {
    const classes = classnames(
      'input-field',
      {
        'is-success': value || (!error && touched), // handle prefilled or user-filled
        'is-error': !!error && touched,
      },
      className
    );

    return (
      <div className={classes}>
        <fieldset>
          <legend>{label}</legend>
          {children}
          {touched && <InputFeedback error={error} />}
        </fieldset>
      </div>
    );
  };

  function handleChangeRelative(event, setFieldValue) {
    setFieldValue('relative', event.target.value);
  }

  function editRelative(values) {
    dispatch(
      RelationshipActions.editRelationshipRequest(
        values.relationshipId,
        values.relative
      )
    );
  }

  function toggleModalAddRelative() {
    setModalAddRelative(!modalAddRelative);
    // dispatch(EntityActions.entityCpfFailure(false));
    store.getState().entity.notFound = false;
    setEntityData(null);
  }

  function toggleModalAddNewRelative() {
    setModalAddRelative(false);
    setModalAddNewRelative(!modalAddNewRelative);
  }

  function toggleCloseModalViewRelative() {
    setModalViewRelative(false);
    setRelativeViewData(null);
  }

  function toggleOpenModalViewRelative(relative) {
    setModalViewRelative(!modalViewRelative);
    setRelativeViewData(relative);
  }

  function handleSearchParticipant(cpf) {
    setCpfNotFound(cpf);
    setEntityData(null);
    const formattedCpf = cpf
      .replace('.', '')
      .replace('.', '')
      .replace('-', '');

    if (formattedCpf.length === 11) {
      dispatch(
        EntityActions.entityCpfRequest(
          cpf,
          match !== undefined ? match.params.id : profile_data.id
        )
      );
    }
  }

  function confirmAddRelative(values, entity) {
    const { relationship_type } = values;
    dispatch(
      RelationshipActions.addRelationshipRequest(
        match !== undefined ? match.params.id : profile_data.id,
        entity.id,
        relationship_type,
        entity.sex
      )
    );
  }

  function confirmModalAddNewRelative(values) {
    const { name, email, cpf, sex, relationship_type } = values;
    const password = randomstring.generate(6);

    const formattedCpf = cpf
      .replace('.', '')
      .replace('.', '')
      .replace('-', '');

    dispatch(
      RelationshipActions.createRelationshipRequest(
        match !== undefined ? match.params.id : profile_data.id,
        name,
        formattedCpf,
        email,
        sex,
        password,
        relationship_type
      )
    );
  }

  function deleteRelative(id) {
    toastr.confirm('Deseja deletar o relacionamento?', {
      onOk: () => dispatch(RelationshipActions.deleteRelationshipRequest(id)),
      onCancel: () => {},
      okText: 'Sim',
      cancelText: 'Não',
    });
  }

  function verifyCouple(relationship_type) {
    let verify = false;
    if (entityData.relationships.length > 0) {
      entityData.relationships.forEach(relation => {
        if (relation.relationship_type === relationship_type) {
          verify = true;
        }
      });
    }
    return verify;
  }

  useEffect(() => {
    if (relationships && relationships.length > 0) {
      const relativeFilter = relationships.map(relationship => {
        return relationship.relationship_type;
      });

      setRelativeVerify(relativeFilter);
    }
  }, [relationships]);

  useEffect(() => {
    if (error) {
      setSearchRelativeData({
        cpf: '',
        relationship_type: '',
      });
    }
  }, [error]);

  useEffect(() => {
    if (entity_data !== null) {
      setEntityData(entity_data);
    }
  }, [entity_data]);

  return (
    <>
      <div className="mb-2 d-flex justify-content-between">
        <Badge color="success" className="align-self-center">
          Meus familiares
        </Badge>
        <Row className="master">
          <div className="profile-cover-buttons">
            <div className="media-body halfway-fab">
              {profile_data.admin && (
                <>
                  <div className="d-none d-sm-none d-md-none d-lg-block ml-auto">
                    <Button
                      color="success"
                      className="btn-raised mr-2 mb-0 font-small-3"
                      onClick={toggleModalAddRelative}
                    >
                      <i className="fa fa-user fa-xs" /> Inserir familiar
                    </Button>
                  </div>

                  <div className="ml-2">
                    <Button
                      color="success"
                      className="btn-raised mr-3 d-lg-none"
                      onClick={toggleModalAddRelative}
                    >
                      <i className="fa fa-plus" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </Row>
      </div>
      <Table responsive hover bordered>
        <thead>
          <tr>
            <th>ID</th>
            <th>Foto</th>
            <th>Nome</th>
            <th>Parentesco</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {relationships && relationships.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center">
                Familiares não informados
              </td>
            </tr>
          )}
          {relationships &&
            relationships.length > 0 &&
            relationships.map(relationship => (
              <>
                <tr>
                  <td>{relationship.relationship_id}</td>
                  <th scope="row">
                    <img
                      src={
                        relationship.relationshipEntity.file
                          ? relationship.relationshipEntity.file.url
                          : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                      }
                      alt="coffee-mug"
                      className="img-fluid width-50"
                    />
                  </th>
                  <td>{relationship.relationshipEntity.name}</td>
                  <td>{relationship.relationship_type}</td>
                  <td>
                    <div className="d-flex justify-content-center">
                      <NavLink
                        onClick={() => {
                          toggleOpenModalViewRelative(relationship);
                        }}
                        id={`edit-relative-${relationship.relationshipEntity.id}`}
                      >
                        <Edit size={18} className="mr-2" />
                        <UncontrolledTooltip
                          placement="right"
                          target={`edit-relative-${relationship.relationshipEntity.id}`}
                        >
                          Editar familiar
                        </UncontrolledTooltip>
                      </NavLink>
                      {profile_data.admin && (
                        <NavLink
                          onClick={() => {
                            deleteRelative(relationship.id);
                          }}
                          id={`delete-relative-${relationship.relationshipEntity.id}`}
                        >
                          <Trash2 size={18} color="#FF586B" />
                          <UncontrolledTooltip
                            placement="right"
                            target={`delete-relative-${relationship.relationshipEntity.id}`}
                          >
                            Remover familiar
                          </UncontrolledTooltip>
                        </NavLink>
                      )}
                    </div>
                  </td>
                </tr>
              </>
            ))}
        </tbody>
      </Table>

      {/* --------------- MODAL VISUALIZAR PARENTE --------------- */}
      <Modal isOpen={modalViewRelative} toggle={toggleCloseModalViewRelative}>
        <ModalHeader toggle={toggleCloseModalViewRelative}>
          Visualizar parente
        </ModalHeader>
        <Formik
          enableReinitialize
          initialValues={{
            relationshipId: relativeViewData ? relativeViewData.id : null,
            relative: relativeViewData
              ? relativeViewData.relationship_type
              : '',
          }}
          onSubmit={values => editRelative(values)}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <ModalBody>
                <Col sm="12" md="12" lg="12" className="mb-2">
                  <FormGroup>
                    <Label for="name">Parentesco</Label>
                    <Field
                      type="select"
                      component="select"
                      id="relative"
                      name="relative"
                      className="form-control"
                      onChange={event =>
                        handleChangeRelative(event, setFieldValue)
                      }
                    >
                      <option value="" disabled="">
                        Selecione uma opção
                      </option>
                      {(() => {
                        if (relativeViewData !== null) {
                          if (
                            relativeViewData.relationship_type === 'Marido' ||
                            (relativeViewData.relationship_type !== 'Esposa' &&
                              relativeViewData.relationshipEntity.sex !== 'F' &&
                              relativeVerify.indexOf('Marido') === -1)
                          ) {
                            return <option value="Marido">Marido</option>;
                          }
                        }
                        return false;
                      })()}

                      {(() => {
                        if (relativeViewData !== null) {
                          if (
                            relativeViewData.relationship_type === 'Esposa' ||
                            (relativeViewData.relationship_type !== 'Marido' &&
                              relativeViewData.relationshipEntity.sex !== 'M' &&
                              relativeVerify.indexOf('Esposa') === -1)
                          ) {
                            return <option value="Esposa">Esposa</option>;
                          }
                        }
                        return false;
                      })()}

                      {(() => {
                        if (relativeViewData !== null) {
                          if (
                            relativeViewData.relationship_type === 'Pai' ||
                            (relativeViewData.relationship_type !== 'Mãe' &&
                              relativeViewData.relationshipEntity.sex !== 'F' &&
                              relativeVerify.indexOf('Pai') === -1)
                          ) {
                            return <option value="Pai">Pai</option>;
                          }
                        }
                        return false;
                      })()}

                      {(() => {
                        if (relativeViewData !== null) {
                          if (
                            relativeViewData.relationship_type === 'Mãe' ||
                            (relativeViewData.relationship_type !== 'Pai' &&
                              relativeViewData.relationshipEntity.sex !== 'M' &&
                              relativeVerify.indexOf('Mãe') === -1)
                          ) {
                            return <option value="Mãe">Mãe</option>;
                          }
                        }
                        return false;
                      })()}

                      <option value="Filho">Filho(a)</option>
                    </Field>
                  </FormGroup>
                </Col>
                <Col sm="12" md="12" lg="12" className="mb-2">
                  <FormGroup>
                    <Label for="name">Nome</Label>
                    <Input
                      readOnly
                      type="text"
                      name="name"
                      id="name"
                      value={
                        relativeViewData
                          ? relativeViewData.relationshipEntity.name
                          : ''
                      }
                      className="form-control"
                    />
                  </FormGroup>
                </Col>
                <Col sm="12" md="12" lg="12" className="mb-2">
                  <FormGroup>
                    <Label for="cpf">CPF</Label>
                    <CPFFormat
                      id="cpf"
                      name="cpf"
                      readOnly
                      value={
                        relativeViewData
                          ? relativeViewData.relationshipEntity.cpf
                          : ''
                      }
                      className="form-control"
                    />
                  </FormGroup>
                </Col>
                <Col sm="12" md="12" lg="12" className="mb-2">
                  <FormGroup>
                    <Label for="email">email</Label>
                    <Input
                      readOnly
                      type="text"
                      name="email"
                      id="email"
                      value={
                        relativeViewData
                          ? relativeViewData.relationshipEntity.email
                          : ''
                      }
                      className="form-control"
                    />
                  </FormGroup>
                </Col>
                <Col sm="12" md="12" lg="12" className="mb-2">
                  <FormGroup>
                    <Label for="phone">Celular</Label>
                    <PhoneFormat
                      id="phone"
                      name="phone"
                      readOnly
                      value={
                        relativeViewData
                          ? relativeViewData.relationshipEntity.phone
                          : ''
                      }
                      className="form-control"
                    />
                  </FormGroup>
                </Col>
                <Col sm="12" md="12" lg="12" className="mb-2">
                  <FormGroup>
                    <Label for="altPhone">Telefone</Label>
                    <PhoneFormat
                      id="altPhone"
                      name="altPhone"
                      readOnly
                      value={
                        relativeViewData
                          ? relativeViewData.relationshipEntity.alt_phone
                          : ''
                      }
                      className="form-control"
                    />
                  </FormGroup>
                </Col>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="ml-1 my-1"
                  color="warning"
                  onClick={toggleCloseModalViewRelative}
                >
                  Voltar
                </Button>{' '}
                <Button
                  color="success"
                  type="submit"
                  className="mr-2"
                  disabled={values.relative === ''}
                >
                  Editar parentesco
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </Modal>

      {/* --------------- MODAL ADICIONAR PARENTE --------------- */}
      <Modal isOpen={modalAddRelative} toggle={toggleModalAddRelative}>
        <ModalHeader toggle={toggleModalAddRelative}>
          Pesquisar entidade
        </ModalHeader>
        <Formik
          enableReinitialize
          initialValues={searchRelativeData}
          validationSchema={formRelative}
          onSubmit={values => confirmAddRelative(values, entityData)}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <Form>
              <ModalBody>
                <div className="form-body">
                  <Row className="d-flex flex-row">
                    <Col lg="6" md="12" sm="12">
                      <FormGroup>
                        <div className="position-relative has-icon-right">
                          <Field
                            name="cpf"
                            id="cpf"
                            className={`
                                form-control
                                ${errors.cpf && touched.cpf && 'is-invalid'}
                              `}
                            validate={validateCPF}
                            render={({ field }) => (
                              <CPFFormat
                                {...field}
                                id="cpf"
                                name="cpf"
                                placeholder="digite aqui o CPF"
                                className={`
                                      form-control
                                      ${errors.cpf &&
                                        touched.cpf &&
                                        'is-invalid'}
                                    `}
                                value={values.cpf}
                                onValueChange={val =>
                                  handleSearchParticipant(
                                    val.value,
                                    setFieldValue,
                                    values
                                  )
                                }
                              />
                            )}
                          />
                          {errors.cpf && touched.cpf ? (
                            <div className="invalid-feedback">{errors.cpf}</div>
                          ) : null}
                          {loading && (
                            <div className="form-control-position">
                              <RefreshCw size={16} className="spinner" />
                            </div>
                          )}
                        </div>
                      </FormGroup>
                    </Col>
                    {!!values.cpf && !error && (
                      <Col sm="12" md="12" lg="6" className="mb-2">
                        <Field
                          type="select"
                          component="select"
                          id="relationship_type"
                          name="relationship_type"
                          className={`
                            form-control
                            ${errors.relationship_type &&
                              touched.relationship_type &&
                              'is-invalid'}
                          `}
                        >
                          <option value="" disabled="">
                            Selecione uma opção
                          </option>
                          {(() => {
                            if (entityData !== null) {
                              if (
                                entityData.sex === 'M' &&
                                relativeVerify.indexOf('Marido') === -1
                              ) {
                                if (!verifyCouple('Esposa')) {
                                  return <option value="Marido">Marido</option>;
                                }
                              }
                            }
                            return false;
                          })()}

                          {(() => {
                            if (entityData !== null) {
                              if (
                                entityData.sex === 'F' &&
                                relativeVerify.indexOf('Esposa') === -1
                              ) {
                                if (!verifyCouple('Marido')) {
                                  return <option value="Esposa">Esposa</option>;
                                }
                              }
                            }
                            return false;
                          })()}

                          {(() => {
                            if (entityData !== null) {
                              if (
                                entityData.sex === 'M' &&
                                relativeVerify.indexOf('Pai') === -1
                              ) {
                                return <option value="Pai">Pai</option>;
                              }
                            }
                            return false;
                          })()}

                          {(() => {
                            if (entityData !== null) {
                              if (
                                entityData.sex === 'F' &&
                                relativeVerify.indexOf('Mãe') === -1
                              ) {
                                return <option value="Mãe">Mãe</option>;
                              }
                            }
                            return false;
                          })()}
                          <option value="Filho">Filho(a)</option>
                        </Field>
                        {errors.relationship_type &&
                        touched.relationship_type ? (
                          <div className="invalid-feedback">
                            {errors.relationship_type}
                          </div>
                        ) : null}
                      </Col>
                    )}
                  </Row>
                </div>
                <div>
                  {entityData !== null && !!entityData.cpf && (
                    <Col>
                      <Card>
                        <CardHeader className="text-center">
                          <img
                            src={
                              entityData.file
                                ? entityData.file.url
                                : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                            }
                            alt={entityData.name}
                            width="150"
                            height="150"
                            className="rounded-circle gradient-mint"
                          />
                        </CardHeader>
                        <CardBody>
                          <h4 className="card-title text-center">
                            {entityData.name}
                          </h4>
                          <p className="category text-gray text-center font-small-4">
                            {entityData.cpf}
                          </p>
                          <hr className="grey" />
                          <Row className="mb-1">
                            <Col xs="6" className="text-center text-truncate">
                              <Phone size={18} color="#212529" />
                              {entityData.phone ? (
                                <span className="ml-2">{entityData.phone}</span>
                              ) : (
                                <span className="ml-2">Sem telefone</span>
                              )}
                            </Col>
                            <Col xs="6" className="text-center text-truncate">
                              <Mail size={18} color="#212529" />
                              {entityData.email ? (
                                <span className="ml-2">{entityData.email}</span>
                              ) : (
                                <span className="ml-2">Sem email</span>
                              )}
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  )}
                </div>
                {not_found && (
                  <Row className="justify-content-between p-3">
                    <Button color="success" onClick={toggleModalAddNewRelative}>
                      <i className="fa fa-plus" /> Criar familiar
                    </Button>
                  </Row>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  className="ml-1 my-1"
                  color="danger"
                  onClick={toggleModalAddRelative}
                >
                  Cancelar
                </Button>{' '}
                <Button
                  className={`${
                    entity_data !== null
                      ? 'ml-1 my-1 btn-success'
                      : 'btn-secundary ml-1 my-1'
                  }`}
                  type="submit"
                  // onClick={confirmModalAddtoggleModalAddRelative}
                  disabled={entity_data === null}
                >
                  {loading ? (
                    <BounceLoader
                      size={23}
                      color="#fff"
                      css={css`
                        display: block;
                        margin: 0 auto;
                      `}
                    />
                  ) : (
                    'Adicionar familiar'
                  )}
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </Modal>

      {/* MODAL PARA CADASTRAR E ADICIONAR FAMILIAR MANUALMENTE */}
      <Modal isOpen={modalAddNewRelative} toggle={toggleModalAddNewRelative}>
        <Formik
          initialValues={{
            name: '',
            email: '',
            cpf: cpfNotFound || '',
            sex: '',
            relationship_type: '',
          }}
          validationSchema={formAddNewRelative}
          onSubmit={values => confirmModalAddNewRelative(values)}
        >
          {({ errors, touched, values }) => (
            <Form>
              <ModalHeader toggle={toggleModalAddNewRelative}>
                Cadastrar participante
              </ModalHeader>
              <ModalBody>
                <div className="form-body">
                  <Row className="d-flex flex-row">
                    <Col sm="12" md="12" lg="12">
                      <FormGroup>
                        <Field
                          type="text"
                          placeholder="Digite o nome do participante"
                          name="name"
                          id="name"
                          className={`
                                    form-control
                                    ${errors.name &&
                                      touched.name &&
                                      'is-invalid'}
                                  `}
                        />
                        {errors.name && touched.name ? (
                          <div className="invalid-feedback">{errors.name}</div>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col lg="12" md="12" sm="12">
                      <FormGroup>
                        <div className="position-relative has-icon-right">
                          <Field
                            name="cpf"
                            id="cpf"
                            className={`
                                form-control
                                ${errors.cpf && touched.cpf && 'is-invalid'}
                              `}
                            validate={validateCPF}
                            render={({ field }) => (
                              <CPFFormat
                                {...field}
                                id="cpf"
                                name="cpf"
                                placeholder="digite aqui o CPF"
                                className={`
                                      form-control
                                      ${errors.cpf &&
                                        touched.cpf &&
                                        'is-invalid'}
                                    `}
                                value={values.cpf}
                              />
                            )}
                          />
                          {errors.cpf && touched.cpf ? (
                            <div className="invalid-feedback">{errors.cpf}</div>
                          ) : null}
                          {/* trocar o loading */}
                          {loading && (
                            <div className="form-control-position">
                              <RefreshCw size={16} className="spinner" />
                            </div>
                          )}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col sm="12" md="12" lg="12" className="mb-2">
                      <FormGroup>
                        <Field
                          type="text"
                          placeholder="Digite o email"
                          name="email"
                          id="email"
                          className={`
                                    form-control
                                    ${errors.email &&
                                      touched.email &&
                                      'is-invalid'}
                                  `}
                        />
                        {errors.email && touched.email ? (
                          <div className="invalid-feedback">{errors.email}</div>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col sm="12" md="12" lg="12" className="mb-4">
                      <RadioButtonGroup
                        id="radioGroup"
                        value={values.radioGroup}
                        error={errors.radioGroup}
                        touched={touched.radioGroup}
                        className={`
                                    new-form-padding
                                    form-control
                                    border-0
                                    ${errors.sex && touched.sex && 'is-invalid'}
                                  `}
                      >
                        <Row className="d-flex justify-content-around">
                          <Field
                            component={RadioButton}
                            name="sex"
                            id="M"
                            label="Masculino"
                          />
                          <Field
                            component={RadioButton}
                            name="sex"
                            id="F"
                            label="Feminino"
                          />
                        </Row>
                      </RadioButtonGroup>
                      {errors.sex && touched.sex ? (
                        <div className="text-center invalid-feedback">
                          {errors.sex}
                        </div>
                      ) : null}
                    </Col>
                    {!!values.sex && (
                      <Col sm="12" md="12" lg="12" className="mb-2">
                        <Field
                          type="select"
                          component="select"
                          id="relationship_type"
                          name="relationship_type"
                          className={`
                            form-control
                            ${errors.relationship_type &&
                              touched.relationship_type &&
                              'is-invalid'}
                          `}
                        >
                          <option value="" disabled="">
                            Selecione um parentesco
                          </option>
                          {(() => {
                            if (
                              values.sex === 'M' &&
                              relativeVerify.indexOf('Marido') === -1
                            ) {
                              return <option value="Marido">Marido</option>;
                            }
                            return false;
                          })()}
                          {(() => {
                            if (
                              values.sex === 'F' &&
                              relativeVerify.indexOf('Esposa') === -1
                            ) {
                              return <option value="Esposa">Esposa</option>;
                            }
                            return false;
                          })()}
                          {(() => {
                            if (
                              values.sex === 'M' &&
                              relativeVerify.indexOf('Pai') === -1
                            ) {
                              return <option value="Pai">Pai</option>;
                            }
                            return false;
                          })()}
                          {(() => {
                            if (
                              values.sex === 'F' &&
                              relativeVerify.indexOf('Mãe') === -1
                            ) {
                              return <option value="Mãe">Mãe</option>;
                            }
                            return false;
                          })()}
                          <option value="Filho">Filho(a)</option>
                        </Field>
                        {errors.relationship_type &&
                        touched.relationship_type ? (
                          <div className="invalid-feedback">
                            {errors.relationship_type}
                          </div>
                        ) : null}
                      </Col>
                    )}
                  </Row>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="ml-1 my-1"
                  color="danger"
                  onClick={toggleModalAddNewRelative}
                >
                  Cancelar
                </Button>{' '}
                <Button
                  className="ml-1 my-1 btn-success"
                  type="submit"
                  disabled={errors.name || errors.cpf || errors.sex}
                >
                  {/* trocar o loading */}
                  {loading ? (
                    <BounceLoader
                      size={23}
                      color="#fff"
                      css={css`
                        display: block;
                        margin: 0 auto;
                      `}
                    />
                  ) : (
                    'Cadastrar participante'
                  )}
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}
