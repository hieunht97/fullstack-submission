import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

// Not using
const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

// Not using
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

// Not using
const delPerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};

export default {
  getAll: getAll,
  create: create,
  update: update,
  delPerson: delPerson,
};
