import Axios from "axios";
import Cookies from "js-cookie";
import { config } from "../config";

import { history } from "App";

const axiosBase = Axios.create({
  baseURL: config.API_DEV,
  timeout: 3000,
});

// For GET requests
axiosBase.interceptors.request.use(
  // tslint:disable-next-line: no-shadowed-variable
  (config: any) => {
    const token = Cookies.get("token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

const logout = () => {
  Cookies.remove("token");
  Cookies.remove("userInfo");
  Cookies.remove("refreshToken");
  history.push("/login");
};

// For POST requests
axiosBase.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.status || err.response.status;
    const configHttp = err.config;
    // Case refreshToken
    const refreshToken = Cookies.get("refreshToken");
    if (!refreshToken) {
      logout();

      return Promise.reject(err);
    }

    if (status !== 401) {
      return Promise.reject(err);
    }
    // Gọi API để lấy token
    if (config.API_DEV) {
      return Axios.post(config.API_DEV, { refreshToken })
        .then((response) => {
          if (response.status === 200) {
            Cookies.set("token", response.data.token);
            configHttp.headers.Authorization = `Bearer ${response.data.token}`;

            return Axios(configHttp);
          } else {
            logout();

            return Promise.reject(err);
          }
        })
        .catch(() => {
          logout();
          return Promise.reject(err);
        });
    }
  }
);

export const sendGetAPI = (url: string, params?: any) =>
  axiosBase.get(url, { params }).then((res) => res.data);
export const sendPostAPI = (url: string, payload?: any, queryParams?: any) =>
  axiosBase.post(url, payload, { params: queryParams }).then((res) => res.data);
export const sendPutAPI = (url: string, payload?: any) =>
  axiosBase.put(url, payload).then((res) => res.data);
export const sendDeleteAPI = (url: string, params?: any) =>
  axiosBase.delete(url, { params }).then((res) => res.data);
