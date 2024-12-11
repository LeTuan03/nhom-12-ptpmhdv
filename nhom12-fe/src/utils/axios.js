import axios from "axios";
import { BASE_URL } from "const/app-config";
const instance = axios.create({
    BASE_URL,
});
function getTokenFromLocalStorage() {
    return sessionStorage.getItem("access_token");
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
        console.log(error);
        // window.location.href = "/authentication/sign-in";
        return Promise.reject(error);
    }
);

export default instance;
