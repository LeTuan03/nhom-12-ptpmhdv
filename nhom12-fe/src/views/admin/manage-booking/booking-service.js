import axios from "utils/axios";

const { BASE_URL } = require("const/app-config");

const URL = BASE_URL + "/bookings";

export const getAllBooking = async () => {
  return axios(URL);
};
export const searchBooking = async (payload) => {
  let config = {
    params: { ...payload },
  };
  return axios(URL + "/search", config);
};
export const getByBuyerIdBooking = async (id) => {
  return axios(URL + `/bookings/${id}`);
};

export const createBooking = async (payload) => {
  return axios.post(URL, payload);
};
export const updateBooking = async (payload, id) => {
  return axios.put(URL + "/" + id, payload);
};
export const deleteBooking = async (id) => {
  return axios.delete(URL + "/" + id);
};
export const updateStatusBooking = async (payload) => {
  return axios.post(URL + "/update-status", payload);
};