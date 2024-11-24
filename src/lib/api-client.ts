import axios from 'axios';

import { env } from '@/config';

export const api = axios.create({
  baseURL: env.API_URL,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);
