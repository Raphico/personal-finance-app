import { auth } from "@/api/auth";
import axios from "axios";

let isRefreshingAccessToken = false;

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  transformRequest: [
    function (data) {
      return JSON.stringify(data);
    },
  ],
});

// refreshes access token
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (!axios.isAxiosError(error)) return Promise.reject(error);

    if (error.config.url.includes("refresh")) {
      return Promise.reject(error);
    }

    if (error.response.status == 401 && !isRefreshingAccessToken) {
      isRefreshingAccessToken = true;

      try {
        await auth.refreshAccessToken();
        return axios(error.config);
      } catch (error) {
        return Promise.reject(error);
      } finally {
        isRefreshingAccessToken = false;
      }
    }

    return Promise.reject(error);
  }
);

export const http = {
  get(url, config) {
    return instance.get(url, config);
  },
  post(url, data, config) {
    return instance.post(url, data, config);
  },
  patch(url, data, config) {
    return instance.patch(url, data, config);
  },
};
