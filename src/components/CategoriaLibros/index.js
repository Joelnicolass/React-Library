import React, { useState, useEffect } from 'react';
import { Alert, Container, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getLibrosByCategory } from '../../services/categoryService';
import './styles.css';

export default function CategoriaLibros({ id }) {
  const [libros, setLibros] = useState([]);
  const personas = useSelector((state) => state.personas);

  useEffect(() => {
    const fetchData = async () => {
      const libros = await getLibrosByCategory(id);
      const librosList = libros.map((l) => {
        const persona = personas.find((p) => p.id === l.persona_id);
        const libro = {
          id: l.id,
          nombre: l.nombre,
          descripcion: l.descripcion,
          persona,
        };
        return libro;
      });
      setLibros(librosList);
    };
    fetchData();
  }, [id, personas]);

  return (
    <Container className="books">
      <Row>
        {libros.length > 0 ? (
          <Table variant="dark" striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Persona</th>
              </tr>
            </thead>
            <tbody>
              {libros.map((libro) => (
                <tr className="libro-wrapper" key={libro.id}>
                  <td className="libro-info"> {libro.id} </td>
                  <td className="libro-info"> {libro.nombre} </td>
                  <td className="libro-info"> {libro.descripcion} </td>
                  <td className="libro-info">
                    {' '}
                    {libro.persona ? libro.persona.email : 'N/A'}{' '}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Alert variant="danger">No se encontraron resultados</Alert>
        )}
      </Row>
    </Container>
  );
}
