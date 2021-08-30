import axios from 'axios';
const baseUrl = 'http://localhost:3000';

export const getLibros = async () => {
  try {
    const respuesta = await axios.get(`${baseUrl}/libro`);
    return respuesta.data;
  } catch (error) {
    console.log('Error getting libros');
    return [];
  }
};

export const getLibro = async (id) => {
  const respuesta = await axios.get(`${baseUrl}/libro/${id}`);
  return respuesta.data;
};

export const createLibro = async (libro) => {
  const respuesta = await axios.post(`${baseUrl}/libro`, libro);
  return respuesta.data;
};

export const updateLibro = async (id, libro) => {
  const respuesta = await axios.put(`${baseUrl}/libro/${id}`, libro);
  return respuesta.data;
};

export const deleteLibro = async (id) => {
  const respuesta = await axios.delete(`${baseUrl}/libro/${id}`);
  return respuesta.data;
};

export const prestarLibro = async (id, persona_id) => {
  const body = {
    id,
    persona_id,
  };
  const respuesta = await axios.put(`${baseUrl}/libro/prestar/${id}`, body);
  return respuesta.data;
};

export const devolverLibro = async (id) => {
  const respuesta = await axios.put(`${baseUrl}/libro/devolver/${id}`);
  return respuesta.data;
};
