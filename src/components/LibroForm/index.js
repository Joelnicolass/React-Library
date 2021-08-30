import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import {
  getLibro,
  createLibro,
  updateLibro,
} from '../../services/libroService';
import { Alert, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

export default function LibroForm(props) {
  const dispatch = useDispatch();
  const id = props.match.params.id ? parseInt(props.match.params.id) : null;
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [persona, setPersona] = useState('');
  const categorias = useSelector((state) => state.categorias);
  const personas = useSelector((state) => state.personas);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      if (id !== null) {
        try {
          const libro = await getLibro('sss');
          setNombre(libro.nombre);
          setDescripcion(libro.descripcion);
          if (libro.persona_id) {
            setPersona(libro.persona_id);
          }
          setCategoria(libro.categoria_id);
        } catch (e) {
          setError(`Error getting libro ${id}`);
          console.log(`Error getting libro ${id}`);
        }
      }
    }
    fetchData();
  }, [id]);

  const handleChangeNombre = (e) => {
    const newNombre = e.target.value;
    setNombre(newNombre);
  };

  const handleChangeDescription = (e) => {
    const newDescription = e.target.value;
    setDescripcion(newDescription);
  };

  const handleChangePersona = (e) => {
    const persona = e.target.value;
    setPersona(parseInt(persona));
  };

  const handleChangeCategoria = (e) => {
    const categoria = e.target.value;
    setCategoria(parseInt(categoria));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const libro = {
        nombre: nombre,
        descripcion: descripcion,
        categoria_id: categoria,
      };
      if (persona) {
        libro.persona_id = persona;
      }
      if (id !== null) {
        const libroUpdated = await updateLibro(id, libro);
        dispatch({
          type: 'UPDATE',
          list: 'LIBRO',
          detail: { id, libro: libroUpdated },
        });
      } else {
        const libroCreated = await createLibro(libro);
        dispatch({
          type: 'ADD',
          list: 'LIBRO',
          detail: { libro: libroCreated },
        });
      }
      props.history.push('/libro');
    } catch (e) {
      setError(e.response.data.mensaje || 'Error');
      console.log(`Error updating libro ${nombre}`);
    }
  };

  const handleCancel = () => {
    props.history.push('/libro');
  };

  return (
    <Container className="container-new">
      {error && (
        <Alert variant="danger" onClose={() => setError('')} dismissible>
          {error}
        </Alert>
      )}
      <Row>
        <Col>
          <h1 className="title">
            {id !== null ? 'Editar Libro' : 'Nuevo Libro'}
          </h1>
        </Col>
      </Row>
      <Form className="container-new-form">
        <Form.Group className="input-form-group">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            placeholder="nombre"
            value={nombre}
            onChange={handleChangeNombre}
            disabled={id !== null}
            required
          />
        </Form.Group>
        <Form.Group className="input-form-group">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            type="text"
            name="descripcion"
            placeholder="descripcion"
            value={descripcion}
            onChange={handleChangeDescription}
          />
        </Form.Group>
        <Form.Group className="input-form-group" controlId="formGridCategory">
          <Form.Label>Categoria</Form.Label>
          <Form.Select
            defaultValue="Seleccionar..."
            onChange={handleChangeCategoria}
            value={categoria}
            disabled={id !== null}
            required
          >
            <option>Seleccionar...</option>
            {categorias.length > 0 &&
              categorias.map((cat) => {
                return <option value={cat.id}>{cat.nombre}</option>;
              })}
          </Form.Select>
        </Form.Group>
        <Form.Group className="input-form-group" controlId="formGridPerson">
          <Form.Label>Persona</Form.Label>
          <Form.Select
            defaultValue="Seleccionar..."
            onChange={handleChangePersona}
            value={persona}
            disabled={id !== null}
          >
            <option>Seleccionar...</option>
            {personas.length > 0 &&
              personas.map((p) => {
                return (
                  <option
                    value={p.id}
                  >{`${p.nombre} ${p.apellido} (${p.email})`}</option>
                );
              })}
          </Form.Select>
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
