import { userStore } from "@/store/userStore";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

//To get the access token from the zustand
api.interceptors.request.use((config) => {
  const token = userStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (error.response?.status === 401) {
      const { data } = await axios.get("/api/auth/refresh", {
        withCredentials: true,
      });

      userStore.setState({
        accessToken: data.accessToken,
      });

      error.config.headers.Authorization = `Bearer ${data.accessToken}`;

      return api(error.config);
    }

    return Promise.reject(error);
  },
);

export default api;
