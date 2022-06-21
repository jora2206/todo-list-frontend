import axios from 'axios';

const API_HOST = 'http://localhost:8000';
export const axiosClient = axios.create({
  baseURL: API_HOST,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // TODO: move to some service
    if (token) {
      config.headers['Authorization'] = 'Basic ' + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);
