import axios from 'axios';
export const API_PATH_V2 = 'https://em-v2.oceantech.com.vn/em';
export const API_PATH_LOCAL = 'http://127.0.0.1:5000';
const instance = axios.create({
  API_PATH_V2,
});
function getTokenFromLocalStorage() {
  return localStorage.getItem('access_token_v2');
}
function setAuthorizationHeader(config) {
  const token = getTokenFromLocalStorage();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

instance.interceptors.request.use(setAuthorizationHeader, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default instance;
