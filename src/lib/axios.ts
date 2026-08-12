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
    // 1. Save the failed request
    const originalRequest = error.config;
    // we'll handle the error here
    if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url?.includes("/api/auth/refresh")) {
      // access token expired
      originalRequest._retry = true;

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
        {
          withCredentials: true,
        },
      );
      // to store newly created access token in zustand
      userStore.setState({
        accessToken: res.data.accessToken,
      });

      // 4. Update failed request with new token
      originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;

      // 5. Retry the same request
      return api(originalRequest);
    }
    return Promise.reject(error);
  },
);

export default api;
