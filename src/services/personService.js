import axios from 'axios';
const baseUrl = 'http://localhost:3000';

export const getPersonas = async () => {
  try {
    const respuesta = await axios.get(`${baseUrl}/persona`);
    return respuesta.data;
  } catch (error) {
    console.log('Error getting person');
    return [];
  }
};

export const getPersona = async (id) => {
   const respuesta = await axios.get(`${baseUrl}/persona/${id}`);
    return respuesta.data;
 };

export const createPersona = async (persona) => {
  const respuesta = await axios.post(`${baseUrl}/persona`, persona);
  return respuesta.data;
};
//METODO PARA UPDATE PERSONA
export const updatePersona = async (id, persona) => {
  const respuesta = await axios.put(`${baseUrl}/persona/${id}`, persona);
  return respuesta.data;
};

export const deletePersona = async (id) => {
  try {
    const respuesta = await axios.delete(`${baseUrl}/persona/${id}`);
    return respuesta.data;
  } catch (error) {
    console.log(`Error deleting persona ${id}`);
    return error;
  }
};
