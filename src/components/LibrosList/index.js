import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  deleteLibro,
  devolverLibro,
  prestarLibro,
} from '../../services/libroService';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import LibroPrestarModal from '../LibroPrestarModal';

export default function LibroList(props) {
  const dispatch = useDispatch();

  const [librosComplete, setLibrosComplete] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [libro, setLibro] = useState();
  const [personaId, setPersonaId] = useState();
  const libros = useSelector((state) => state.libros);
  const categorias = useSelector((state) => state.categorias);
  const personas = useSelector((state) => state.personas);

  const handleDeleteLibro = async (id) => {
    try {
      await deleteLibro(id);
      dispatch({ type: 'DELETE', list: 'LIBRO', detail: { id } });
    } catch (e) {
      console.log(`Error deleting libro ${id}`);
      //TODO show error message
    }
  };

  const handleDevolverLibro = async (id) => {
    try {
      await devolverLibro(id);
      dispatch({ type: 'RETURN', list: 'LIBRO', detail: { id } });
    } catch (e) {
      console.log(`Error devolviendo libro ${id}`);
      //TODO show error message
    }
  };

  const handleChangePersona = (e) => {
    const persona = e.target.value;
    setPersonaId(persona);
  };

  const handleButtonPrestar = (libro) => {
    setLibro(libro);
    setShowModal(true);
  };

  const handlePrestarLibro = async (e) => {
    e.preventDefault();
    try {
      await prestarLibro(libro.id, personaId);
      dispatch({
        type: 'ASSIGN',
        list: 'LIBRO',
        detail: { id: libro.id, persona_id: personaId },
      });
      setShowModal(false);
    } catch (e) {
      console.log(`Error prestando libro libro ${libro.id}`);
      //TODO show error message
    }
  };

  useEffect(() => {
    setLibrosComplete(
      libros.map((l) => {
        const categoria = categorias.find((c) => c.id === l.categoria_id);
        const persona = personas.find((p) => p.id === l.persona_id);
        const libro = {
          id: l.id,
          nombre: l.nombre,
          descripcion: l.descripcion,
          categoria,
          persona,
        };
        return libro;
      })
    );
  }, [libros, categorias, personas]);

  useEffect(() => {
    if (!showModal) {
      setLibro(null);
    }
  }, [showModal]);

  return (
    <>
      <Container className="container-list">
        <Row>
          <Col>
            <h1 className="title">Libros</h1>
          </Col>
        </Row>
        <Row>
          <div className="btn-end">
            <Link to={'/libro/new'} className="btn btn-secondary">
              Nuevo Libro
            </Link>
          </div>
        </Row>
        <div className="container-list__list">
          {librosComplete.map((libro) => {
            return (
              <Card
                bg={'light'}
                key={libro.id}
                style={{ width: '17rem', height: '19rem' }}
                className="mb-2 card-wrapper"
              >
                <Card.Header>#{libro.id}</Card.Header>
                <Card.Body className="card-body-containter">
                  <div>
                    <Card.Title>{libro.nombre}</Card.Title>
                    <Card.Text>{libro.descripcion.toLowerCase()}</Card.Text>
                    <Card.Text>Categoría {libro.categoria.nombre}</Card.Text>
                    <Card.Text>
                      {libro.persona
                        ? `Prestado a ${libro.persona.nombre} ${libro.persona.apellido}`
                        : 'Disponible'}
                    </Card.Text>
                  </div>
                  <div className="card-actions">
                    <Link
                      className="link"
                      to={`/libro/${libro.id.toString()}/edit`}
                    >
                      <FaPencilAlt></FaPencilAlt>
                    </Link>
                    <button
                      className="card-actions__delete"
                      onClick={() => handleDeleteLibro(libro.id)}
                    >
                      <FaTrash></FaTrash>
                    </button>
                    {libro.persona ? (
                      <Button
                        variant="secondary"
                        onClick={() => handleDevolverLibro(libro.id)}
                      >
                        Devolver
                      </Button>
                    ) : (
                      <Button
                        variant="success"
                        onClick={() => {
                          handleButtonPrestar(libro);
                        }}
                      >
                        Prestar
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </Container>
      {libro && (
        <LibroPrestarModal
          personas={personas}
          showModal={showModal}
          libro={libro}
          handleChangePersona={handleChangePersona}
          handlePrestarLibro={handlePrestarLibro}
        />
      )}
    </>
  );
}
