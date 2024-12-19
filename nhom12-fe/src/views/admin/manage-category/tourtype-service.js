import axios from "utils/axios";

const { BASE_URL } = require("const/app-config");

const URL = BASE_URL + "/tourtypes";

export const getAllTourtypes = async () => {
  return axios(URL);
};

export const createTourtypes  = async (payload) => {
  return axios.post(URL + "", payload);
};
export const updateTourtypes  = async (payload, id) => {
  return axios.put(URL + "/" + id , payload);
};
export const deleteTourtypes  = async (id) => {
  return axios.delete(URL + "/" + id);
};
