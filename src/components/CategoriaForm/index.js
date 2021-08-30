import { useState } from 'react';
import { createCategory, updateCategory } from '../../services/categoryService';
import Button from 'react-bootstrap/Button';
import { Modal, Form, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

export default function CategoriaForm({
  category,
  handleCloseModal,
  showModal,
}) {
  const dispatch = useDispatch();
  const [nombre, setNombre] = useState(category ? category.nombre : '');
  const [error, setError] = useState('');

  const handleChangeNombre = (e) => {
    const newNombre = e.target.value;
    setNombre(newNombre);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (category) {
        await updateCategory(category.id, nombre);
        dispatch({
          type: 'UPDATE',
          list: 'CATEGORIA',
          detail: { id: category.id, nombre },
        });
      } else {
        const catNew = await createCategory(nombre);
        dispatch({
          type: 'ADD',
          list: 'CATEGORIA',
          detail: { categoria: catNew },
        });
      }
      handleCloseModal();
    } catch (e) {
      setError(e.response.data.mensaje || 'Error');
      console.log(`Error updating category ${nombre}`);
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={handleCloseModal}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>
          {category ? 'Editar Categoría' : 'Nueva Categoría'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && (
          <Alert variant="danger" onClose={() => setError('')} dismissible>
            {error}
          </Alert>
        )}
        <Form>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              placeholder="nombre"
              value={nombre}
              required
              onChange={handleChangeNombre}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
