import axios from 'axios';

import { env } from '@/config';

/*
 * Global Axios configuration.
 * Using the next line to export this configuration for use elsewhere:
 * export const api = axios.create();
 * Note: Export and using a new variable instead of the global axios instance.
 */

axios.defaults.baseURL = env.API_URL;

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);
