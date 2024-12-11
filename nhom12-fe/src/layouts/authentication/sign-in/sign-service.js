import axios from "axios";
import axiosCustom from "utils/axios";
const { BASE_URL } = require("const/app-config");

const URL = BASE_URL + "/account";

export const login = (payload) => {
  return axios.post(URL + "/login", payload);
};

export const getUser = () => {
  return axiosCustom(URL + "/get-info");
};
