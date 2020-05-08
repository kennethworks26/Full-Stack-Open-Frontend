import axios from "axios";
const baseUrl = "/api/persons";

const getAll = async () => {
  const request = axios.get(baseUrl);
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const create = async newObject => {
  const request = axios.post(baseUrl, newObject);
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const remove = async id => {
  const request = axios.delete(`${baseUrl}/${id}`);
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default {
  getAll,
  create,
  update,
  remove
};
