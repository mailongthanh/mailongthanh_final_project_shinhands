import axios from "axios";
import { BASE_URL } from "./api";

export const Requests = () => {
  const instance = axios.create({
    baseURL: BASE_URL + "/v1",
  });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
      config.headers["Content-Type"] = "application/json";
      config.headers["Access-Control-Allow-Origin"] = "*";
      config.headers.withCredentials = true;
      config.headers.token = token ? `Bearer ${token}` : "";
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      return error.reponse.data;
    }
  );

  //CUSTOM MEHTOD
  const get = async (url, params = {}, config = {}) =>
    await instance.get(url, { headers: { ...config }, params });
  const post = async (url, params = {}, config = {}) =>
    await instance.post(url, {
      ...params,
      headers: { ...config },
    });
  const put = async (url, params = {}, config = {}) =>
    await instance.put(url, { ...params }, { ...config });
  const del = async (url, params = {}, config = {}) =>
    await instance.delete(url, { headers: { ...config }, params });
  return { get, post, put, del };
};
