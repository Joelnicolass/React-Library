import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import PersonaList from './components/PersonaList';
import PersonaForm from './components/PersonaForm';
import CategoriaList from './components/CategoriaList';
import CategoriaForm from './components/CategoriaForm';
import LibrosList from './components/LibrosList';
import LibroForm from './components/LibroForm';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { getCategories } from './services/categoryService';
import { getLibros } from './services/libroService';
import { getPersonas } from './services/personService';
import Menu from './components/commons/Menu';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetchData = async () => {
      const categorias = await getCategories();
      const personas = await getPersonas();
      const libros = await getLibros();
      dispatch({ type: 'RESET', list: 'CATEGORIA', detail: { categorias } });
      dispatch({ type: 'RESET', list: 'PERSONA', detail: { personas } });
      dispatch({ type: 'RESET', list: 'LIBRO', detail: { libros } });
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Menu />
        <Route exact path="/" component={Home} />
        <Route exact path="/persona" component={PersonaList} />
        <Route exact path="/persona/new" component={PersonaForm} />
        <Route exact path="/persona/:id/edit" component={PersonaForm} />
        <Route exact path="/categoria" component={CategoriaList} />
        <Route exact path="/categoria/new" component={CategoriaForm} />
        <Route exact path="/categoria/:id/edit" component={CategoriaForm} />
        <Route exact path="/libro" component={LibrosList} />
        <Route exact path="/libro/new" component={LibroForm} />
        <Route exact path="/libro/:id/edit" component={LibroForm} />
      </Router>
    </div>
  );
}

export default App;
