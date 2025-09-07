import env from '@/config/env.config';
import axios from 'axios';

const BACKEND_URL = env.backendURL;

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log('📡 Making request to:', config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.error('📡 Request failed:', error.response?.status, error.response?.data);

    if (error.response && error.response.status === 401) {
      const { useAuthStore } = await import('@/context/auth-context');
      await useAuthStore.getState().logout();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;