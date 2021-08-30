const estadoInicial = {
  categorias: [],
  personas: [],
  libros: [],
};

const CATEGORIA = 'CATEGORIA';
const PERSONA = 'PERSONA';
const LIBRO = 'LIBRO';

export default function reducer(state = estadoInicial, { type, list, detail }) {
  const nuevoState = JSON.parse(JSON.stringify(state));
  if (list === CATEGORIA) {
    switch (type) {
      case 'ADD':
        nuevoState.categorias.push(detail.categoria);
        return nuevoState;
      case 'RESET':
        nuevoState.categorias = detail.categorias;
        return nuevoState;
      case 'DELETE':
        nuevoState.categorias = nuevoState.categorias.filter(
          (cat) => cat.id !== detail.id
        );
        return nuevoState;
      case 'UPDATE':
        const catToUpdate = nuevoState.categorias.find(
          (c) => c.id === detail.id
        );
        catToUpdate.nombre = detail.nombre;
        return nuevoState;
      default:
        nuevoState.categorias = [];
        return nuevoState;
    }
  }
  if (list === PERSONA) {
    switch (type) {
      case 'ADD':
        nuevoState.personas.push(detail.persona);
        return nuevoState;
      case 'RESET':
        nuevoState.personas = detail.personas;
        return nuevoState;
      case 'DELETE':
        nuevoState.personas = nuevoState.personas.filter(
          (p) => p.id !== detail.id
        );
        return nuevoState;
        case 'UPDATE':
        const perToUpdate = nuevoState.personas.find(
          (p) => p.id === detail.id
        );
        perToUpdate.alias = detail.alias;
        return nuevoState;
      default:
        nuevoState.personas = [];
        return nuevoState;
    }
  }
  if (list === LIBRO) {
    switch (type) {
      case 'ADD':
        nuevoState.libros.push(detail.libro);
        return nuevoState;
      case 'RESET':
        nuevoState.libros = detail.libros;
        return nuevoState;
      case 'DELETE':
        nuevoState.libros = nuevoState.libros.filter((l) => l.id !== detail.id);
        return nuevoState;
      case 'RETURN':
        const bookToReturn = nuevoState.libros.find((l) => l.id === detail.id);
        bookToReturn.persona_id = null;
        return nuevoState;
      case 'ASSIGN':
        const bookToAssign = nuevoState.libros.find((l) => l.id === detail.id);
        bookToAssign.persona_id = parseInt(detail.persona_id);
        return nuevoState;
      case 'UPDATE':
        const bookToUpdate = nuevoState.libros.find((l) => l.id === detail.id);
        bookToUpdate.descripcion = detail.libro.descripcion;
        return nuevoState;
      default:
        nuevoState.libros = [];
        return nuevoState;
    }
  }
}
