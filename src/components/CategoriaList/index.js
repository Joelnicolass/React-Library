import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { deleteCategory } from '../../services/categoryService';
import CategoriaLibros from '../CategoriaLibros';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import './styles.css';
import CategoriaForm from '../CategoriaForm';

export default function CategoriaList(props) {
  const dispatch = useDispatch();
  const categorias = useSelector((state) => state.categorias);
  const [category, setCategory] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showCategoryBooks, setShowCategoryBooks] = useState(false);

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      dispatch({ type: 'DELETE', list: 'CATEGORIA', detail: { id } });
    } catch (e) {
      console.log(`Error deleting category ${id}`);
      //TODO show error message
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowCategoryBooks(false);
    setCategory(null);
  };

  const handleEditCategory = (cat) => {
    setCategory(cat);
    setShowModal(true);
  };

  const handlNewCategory = () => {
    setCategory(null);
    setShowModal(true);
  };

  const handleCategoryBooks = (cat) => {
    setCategory(cat);
    setShowCategoryBooks(true);
  };

  return (
    <Container className="categories">
      <Row>
        <Col>
          <h1 className="title">Categorías</h1>
        </Col>
      </Row>
      <Row>
        <div className="btn-end">
          <Button variant="secondary" onClick={handlNewCategory}>
            Nueva Categoría
          </Button>
        </div>
      </Row>

      <div className="container-list__list">
        {categorias.map((cat) => {
          return (
            <div className="category-wrapper" key={cat.id}>
              <button
                className="category-info"
                onClick={() => handleCategoryBooks(cat)}
              >
                {cat.nombre}
              </button>
              <div className="card-actions">
                <button onClick={() => handleEditCategory(cat)}>
                  <FaPencilAlt></FaPencilAlt>
                </button>
                <button
                  className="card-actions__delete"
                  onClick={() => handleDeleteCategory(cat.id)}
                >
                  <FaTrash></FaTrash>
                </button>
              </div>
            </div>
          );
        })}
        {showModal && (
          <CategoriaForm
            category={category}
            handleCloseModal={handleCloseModal}
            showModal={showModal}
          />
        )}
        {category && showCategoryBooks && <CategoriaLibros id={category.id} />}
      </div>
    </Container>
  );
}
