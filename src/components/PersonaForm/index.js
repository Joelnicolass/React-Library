import React, { useState, useEffect } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import {
  createPersona,
  getPersona,
  updatePersona,
} from '../../services/personService';
import { useDispatch } from 'react-redux';

export default function PersonaForm(props) {
  const dispatch = useDispatch();
  const id = props.match.params.id ? parseInt(props.match.params.id) : null;
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [alias, setAlias] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      if (id !== null) {
        try {
          const persona = await getPersona(id);
          setNombre(persona.nombre);
          setApellido(persona.apellido);
          setAlias(persona.alias);
          setEmail(persona.email);
        } catch (e) {
          //ERROR SHOW
          console.log(`Error getting persona ${id}`);
        }
      }
    }
    fetchData();
  }, [id]);

  const handleChangeNombre = (e) => {
    const newNombre = e.target.value;
    setNombre(newNombre);
  };

  const handleChangeApellido = (e) => {
    const newApellido = e.target.value;
    setApellido(newApellido);
  };

  const handleChangeEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
  };

  const handleChangeAlias = (e) => {
    const newAlias = e.target.value;
    setAlias(newAlias);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const persona = {
        nombre: nombre,
        apellido: apellido,
        alias: alias,
        email: email,
      };
      if (id !== null) {
        const personaUpdated = await updatePersona(id, persona);
        dispatch({
          type: 'UPDATE',
          list: 'PERSONA',
          detail: { id, persona: personaUpdated },
        });
      } else {
        const personaCreated = await createPersona(persona);
        dispatch({
          type: 'ADD',
          list: 'PERSONA',
          detail: { persona: personaCreated },
        });
      }
      props.history.push('/persona');
    } catch (e) {
      setError(e.response.data.mensaje || 'Error');
      console.log(`Error updating persona ${nombre}`);
    }
  };

  const handleCancel = () => {
    props.history.push('/persona');
  };

  return (
    <Container className="container-new">
      <Row>
        <Col>{id !== null ? 'Editar Persona' : 'Nueva Persona'}</Col>
      </Row>
      {error && (
        <Alert variant="danger" onClose={() => setError('')} dismissible>
          {error}
        </Alert>
      )}
      <Form className="container-new-form">
        <Form.Group className="input-form-group">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            placeholder="nombre placeholder"
            value={nombre}
            required
            onChange={handleChangeNombre}
          />
        </Form.Group>
        <Form.Group className="input-form-group">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            name="apellido"
            placeholder="apellido"
            value={apellido}
            required
            onChange={handleChangeApellido}
          />
        </Form.Group>

        <Form.Group className="input-form-group">
          <Form.Label>Alias</Form.Label>
          <Form.Control
            type="text"
            name="alias"
            placeholder="alias"
            value={alias}
            required
            onChange={handleChangeAlias}
          />
        </Form.Group>
        <Form.Group className="input-form-group">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="email"
            value={email}
            required
            onChange={handleChangeEmail}
            disabled={id !== null}
          />
        </Form.Group>

        <div className="btn-form-actions">
          <Button type="submit" onClick={handleSubmit}>
            Guardar
          </Button>
          <Button variant="secondary" onClick={handleCancel}>
            Cancelar
          </Button>
        </div>
      </Form>
    </Container>
  );
}
