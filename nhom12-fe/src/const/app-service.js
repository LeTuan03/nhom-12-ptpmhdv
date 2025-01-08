import axios from "utils/axios";
import axiosCustom, { API_PATH_LOCAL, API_PATH_V2 } from "../utils/axios-customize";

const { BASE_URL } = require("const/app-config");

export const createVNpayOrder = async (payload) => {
  const config = {
    params: {
      amount: payload.amount,
      bankCode: "NCB",
      orderId: payload.orderId,
    },
  };
  return axios(BASE_URL + "/api/v1/payment/vn-pay", config);
};

export const getToken = async () => {
  const response = await axiosCustom.post(
    API_PATH_V2 + '/oauth/token',
    {
      clinet_id: 'core_client',
      grant_type: 'password',
      client_secret: 'secret',
      username: '',
      password: '',
    },
    {
      headers: {
        Authorization: 'Basic ',
      },
    },
  );
  return response.data;
};

export const uploadImageV2 = (image) => {
  let url = API_PATH_V2 + '/employee/upload-image';
  return axiosCustom.post(url, image);
};

export const removeAuth = () => {
  sessionStorage.removeItem('current-user');
  sessionStorage.removeItem('access_token');
}

export const getRecommendForUser = (id) => {
  let url = API_PATH_LOCAL + "/recommend_locations?user_id=" + id;
  return axiosCustom.get(url);
};