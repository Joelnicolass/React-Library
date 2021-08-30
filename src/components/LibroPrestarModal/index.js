import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

export default function LibroPrestarModal({
  personas,
  showModal,
  libro,
  handleChangePersona,
  handlePrestarLibro,
}) {
  const [show, setShow] = useState(showModal);

  const handleCloseModal = () => {
    setShow(false);
  };
  return (
    <Modal
      show={show}
      onHide={handleCloseModal}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>Prestar: {libro.nombre}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Seleccionar la persona que solicita el libro.</p>

        <Form className="container-new-form">
          <Form.Group className="input-form-group" controlId="formGridPerson">
            <Form.Label>Persona</Form.Label>
            <Form.Select
              defaultValue="Seleccionar..."
              onChange={handleChangePersona}
            >
              <option>Seleccionar...</option>
              {personas.length > 0 &&
                personas.map((persona) => {
                  return (
                    <option
                      value={persona.id}
                    >{`${persona.nombre} ${persona.apellido} (${persona.email})`}</option>
                  );
                })}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handlePrestarLibro}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
