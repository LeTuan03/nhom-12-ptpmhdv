import axios from "axios";
import axiosCustom from "utils/axios";

const { BASE_URL } = require("const/app-config");

const URL = BASE_URL + "/stats";

export const getTotal = (payload) => {
  let config = {
    params: payload,
  };
  return axios(URL + "/revenue", config);
};
export const getNewCustomer = () => {
  return axios(URL + "/new-customers");
};

export const getMonthlyStatistics = (payload) => {
  let config = {
    params: payload,
  };
  return axios(URL + "/monthly", config);
};
