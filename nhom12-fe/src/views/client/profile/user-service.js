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
export const deleteUser = async (id) => {
  return axios.delete(URL + "/" + id);
};
export const changePassword = async (username, newPassword, oldPassword) => {
    const payload = {
      params:  { username, newPassword, oldPassword}
    };
    console.log(payload)
    return axios.get(URL + "/change-password",payload);
};

export const getUser = () => {
  return axios(URL + "/get-info");
};
