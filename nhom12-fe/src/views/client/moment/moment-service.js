import axios from "utils/axios";

const { BASE_URL } = require("const/app-config");

const URL = BASE_URL + "/rating";


export const getRatingById = async (id) => {
  return axios(URL + "/" + id);
};
