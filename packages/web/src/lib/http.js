import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  transformRequest: [
    function (data) {
      return JSON.stringify(data);
    },
  ],
});

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
