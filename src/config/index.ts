export const env = {
  API_URL: import.meta.env.VITE_APP_API_URL || "http://api.localhost/api",
  DEV: import.meta.env.DEV,
  MODE: import.meta.env.MODE,
  ENABLE_API_MOCKING: import.meta.env.VITE_APP_ENABLE_API_MOCKING,
  PROD: import.meta.env.PROD,
};
