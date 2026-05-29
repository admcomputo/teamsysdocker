import axios from 'axios';
import type { AxiosError, AxiosRequestConfig } from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api';
//const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api';
//BORRAR ES HARCODEADO const AUTH_TOKEN = 'tokenejemplo455ssXla';
// Función para obtener el token en cada request
const getToken = () => sessionStorage.getItem('jwt') || '';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`,
  },
});

// Interceptor para inyectar el token dinámicamente
axiosInstance.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const errorData = error.response?.data as { message?: string } | undefined;
    const message = errorData?.message || error.message || 'Ocurrió un error en la comunicación con el servidor.';
    console.error(`[API Client Error] [${error.config?.method?.toUpperCase()}] ${error.config?.url}:`, message);
    return Promise.reject(new Error(message));
  }
);

export const apiClient = {

  async request<T>(config: AxiosRequestConfig): Promise<T> {
    const response = await axiosInstance.request<T>(config);
    return response.data;
  },

  async get<T>(endpoint: string, params?: Record<string, string>, config?: AxiosRequestConfig) {
    const response = await axiosInstance.get<T>(endpoint, { ...config, params });
    return response.data;
  },

  async post<T>(endpoint: string, data: unknown, config?: AxiosRequestConfig) {
    const response = await axiosInstance.post<T>(endpoint, data, config);
    return response.data;
  },

  async put<T>(endpoint: string, data: unknown, config?: AxiosRequestConfig) {
    const response = await axiosInstance.put<T>(endpoint, data, config);
    return response.data;
  },

  async delete<T>(endpoint: string, config?: AxiosRequestConfig) {
    const response = await axiosInstance.delete<T>(endpoint, config);
    return response.data;
  },
};
