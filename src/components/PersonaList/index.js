import React, { useState } from 'react';
import { deletePersona } from '../../services/personService';
import { Link } from 'react-router-dom';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { FaTrash, FaPencilAlt, FaBook } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import PersonaLibros from '../PersonaLibros';

export default function PersonaList(props) {
  const dispatch = useDispatch();
  const personas = useSelector((state) => state.personas);
  const [persona, setPersona] = useState();

  const handleDeletePersona = async (id) => {
    try {
      await deletePersona(id);
      dispatch({ type: 'DELETE', list: 'PERSONA', detail: { id } });
    } catch (e) {
      console.log(`Error deleting persona ${id}`);
      //TODO show error message
    }
  };

  return (
    <Container className="container-list">
      <Row>
        <Col>
          <h1 className="title">Personas</h1>
        </Col>
      </Row>
      <Row>
        <div className="btn-end">
          <Link to={'/persona/new'} className="btn btn-secondary">
            Nueva Persona
          </Link>
        </div>
      </Row>
      <div className="container-list__list">
        {personas.map((persona) => {
          return (
            <Card
              bg={'light'}
              key={persona.id}
              style={{ width: '17rem', height: '19rem' }}
              className="mb-2 card-wrapper"
            >
              <Card.Header>#{persona.id}</Card.Header>
              <Card.Body className="card-body-containter">
                <div>
                  <Card.Title>
                    {persona.nombre} {persona.apellido}
                  </Card.Title>
                  <Card.Text>{persona.email}</Card.Text>
                  <Card.Text>{persona.alias}</Card.Text>
                </div>
                <div className="card-actions">
                  <Link
                    className="link"
                    to={`/persona/${persona.id.toString()}/edit`}
                  >
                    <FaPencilAlt></FaPencilAlt>
                  </Link>
                  <button
                    className="card-actions__delete"
                    onClick={() => handleDeletePersona(persona.id)}
                  >
                    <FaTrash></FaTrash>
                  </button>
                  <button onClick={() => setPersona(persona.id)}>
                    <FaBook></FaBook>
                  </button>
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>
      {persona && <PersonaLibros id={persona} />}
    </Container>
  );
}
