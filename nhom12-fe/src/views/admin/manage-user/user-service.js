import axios from "utils/axios";

const { BASE_URL } = require("const/app-config");

const URL = BASE_URL + "/account";

export const getAllUser = async () => {
  return axios(URL);
};

export const createUser = async (payload) => {
  return axios.post(URL + "/create", payload);
};
export const updateUser = async (payload, id) => {
  return axios.put(URL + "/" + id, payload);
};
