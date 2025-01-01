import axios from "utils/axios";

const { BASE_URL } = require("const/app-config");

const URL = BASE_URL + "/continents";

export const getAllContinents = async () => {
  return axios(URL);
};
export const searchContinents = async (payload) => {
  let config = {
    params: { ...payload },
  };
  return axios(URL + "/search", config);
};

export const createContinents  = async (payload) => {
  return axios.post(URL + "", payload);
};
export const updateContinents  = async (payload) => {
  return axios.put(URL + "" , payload);
};
export const deleteContinents  = async (id) => {
  return axios.delete(URL + "/" + id);
};
