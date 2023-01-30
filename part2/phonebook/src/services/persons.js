import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAllPersons = async () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createPerson = async (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const deletePerson = async (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const updatePerson = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const server = { getAllPersons, createPerson, deletePerson, updatePerson };
export default server;
