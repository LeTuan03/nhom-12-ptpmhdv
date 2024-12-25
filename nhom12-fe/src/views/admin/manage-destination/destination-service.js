import axios from "utils/axios";

const { BASE_URL } = require("const/app-config");

const URL = BASE_URL + "/destination";

export const getAllDestination = async () => {
  return axios(URL);
};
export const searchDestination = async (payload) => {
  let config = {
    parmas: payload
  }
  return axios(URL + "/search", config);
};

export const createDestination = async (payload) => {
  return axios.post(URL, payload);
};
export const updateDestination = async (payload, id) => {
  return axios.put(URL + "/" + id, payload);
};
export const deleteDestination = async (id) => {
  return axios.delete(URL + "/" + id);
};
