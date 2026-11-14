import { userStore } from "@/store/userStore";
import axios, { InternalAxiosRequestConfig } from "axios";

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// Shared refresh request for simultaneous 401 responses
let refreshPromise: Promise<string> | null = null;

// Attach existing access token to every API request
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
    const originalRequest = error.config as RetryConfig | undefined;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = axios
          .get("/api/auth/refresh", {
            withCredentials: true,
          })
          .then((res) => res.data.accessToken)
          .finally(() => {
            refreshPromise = null;
          });
      }

      const newAccessToken = await refreshPromise;

      userStore.setState({
        accessToken: newAccessToken,
      });

      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      userStore.setState({
        accessToken: null,
      });

      return Promise.reject(refreshError);
    }
  },
);

export default api;
