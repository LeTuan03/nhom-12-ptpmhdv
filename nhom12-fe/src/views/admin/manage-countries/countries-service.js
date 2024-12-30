import axios from "utils/axios";

const { BASE_URL } = require("const/app-config");

const URL = BASE_URL + "/countries";

export const getAllCountries = async () => {
  return axios(URL);
};
export const getCountriesById = async (id) => {
  return axios(URL + "/" + id);
};

export const createCountries = async (payload) => {
  return axios.post(URL + "/with-cities", payload);
};
export const updateCountries = async (payload, id) => {
  return axios.put(URL + `/${id}/with-cities`, payload);
};
export const deleteCountries = async (id) => {
  return axios.delete(URL + "/" + id);
};
