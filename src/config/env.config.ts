const env = {
  backendURL: import.meta.env.VITE_BACKEND_URL,
};

export const isDev = process.env.NODE_ENV === "development";

export default env;
