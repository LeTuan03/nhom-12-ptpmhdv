import axios from "utils/axios";

const { BASE_URL } = require("const/app-config");

const URL = BASE_URL + "/rating";

export const createRating = async (payload) => {
  return axios.post(URL, payload);
};
export const getAllRating = async () => {
  return axios(URL);
};
