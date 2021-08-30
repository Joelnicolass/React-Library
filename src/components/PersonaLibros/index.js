import React, { useState, useEffect } from 'react';
import { Alert, Container, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './styles.css';

export default function PersonaLibros({ id }) {
  const [librosByPerson, setLibrosByPerson] = useState([]);
  const libros = useSelector((state) => state.libros);
  const categorias = useSelector((state) => state.categorias);

  useEffect(() => {
    const fetchData = async () => {
      const librosFiltered = libros.filter((l) => l.persona_id === id);
      const librosList = librosFiltered.map((l) => {
        const categoria = categorias.find((c) => c.id === l.categoria_id);
        const libro = {
          id: l.id,
          nombre: l.nombre,
          descripcion: l.descripcion,
          categoria,
        };
        return libro;
      });
      setLibrosByPerson(librosList);
    };
    fetchData();
  }, [id, libros, categorias]);

  return (
    <Container className="books">
      <Row>
        {librosByPerson.length > 0 ? (
          <Table variant="dark" striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Categoria</th>
              </tr>
            </thead>
            <tbody>
              {librosByPerson.map((libro) => (
                <tr className="libro-wrapper" key={libro.id}>
                  <td className="libro-info"> {libro.id} </td>
                  <td className="libro-info"> {libro.nombre} </td>
                  <td className="libro-info"> {libro.descripcion} </td>
                  <td className="libro-info">{libro.categoria.nombre}</td>
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
