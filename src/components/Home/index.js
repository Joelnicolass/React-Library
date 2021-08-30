import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import { Card } from 'react-bootstrap';

function Home() {
  return (
    <div className="main-cont">
      <h1 className="main-cont-title">Online Library</h1>
      <div className="cards-cont">
        <Card style={{ width: '20rem' }}>
          <Card.Body>
            <Card.Title>Personas</Card.Title>
            <Card.Text>
              Ver y editar a las personas registradas y los libros adquiridos.
            </Card.Text>
            <div className="link-cont">
              <Link to="/persona" className="btn btn-secondary">
                Ir a personas
              </Link>
            </div>
          </Card.Body>
        </Card>
        <Card style={{ width: '20rem' }}>
          <Card.Body className="card-body">
            <Card.Title>Categorías</Card.Title>
            <Card.Text>Ver y editar las categorías de los libros.</Card.Text>
            <div className="link-cont">
              <Link to="/categoria" className="btn btn-secondary">
                Ir a categorías
              </Link>
            </div>
          </Card.Body>
        </Card>
        <Card style={{ width: '20rem' }}>
          <Card.Body>
            <Card.Title>Libros</Card.Title>
            <Card.Text>
              Ver, editar y administrar los libros y sus préstamos.
            </Card.Text>
            <div className="link-cont">
              <Link to="/libro" className="btn btn-secondary">
                Ir a libros
              </Link>
            </div>
          </Card.Body>
        </Card>
      </div>
      <footer className="footer">
        <p className="names">
          Desarrollado por Iara Edelstein, Jorge Rivera, Guillermo Dorfman,
          Mauro Lopez, Joel Nicolás Sartori, Lihuen Salerno
        </p>
      </footer>
    </div>
  );
}

export default Home;
