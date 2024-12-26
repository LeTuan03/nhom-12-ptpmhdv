import axios from "utils/axios";

const { BASE_URL } = require("const/app-config");

const URL = BASE_URL + "/places";

export const getAllPlace = async () => {
  return axios(URL);
};

export const createPlace = async (payload) => {
  return axios.post(URL, payload);
};
export const updatePlace = async (payload, id) => {
  return axios.put(URL + "/" + id, payload);
};
export const deletePlace = async (id) => {
  return axios.delete(URL + "/" + id);
};
