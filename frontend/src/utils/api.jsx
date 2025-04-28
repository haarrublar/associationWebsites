import axios from 'axios';
import { refreshToken } from './authService'; 

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // for sending cookies
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshToken();
        return api(originalRequest); // Retry the original request after refreshing
      } catch (refreshError) {
        console.error("Refresh token invalid. Redirecting to login...");
        window.location.href = '/'; // or navigate('/'), depending where you want
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;