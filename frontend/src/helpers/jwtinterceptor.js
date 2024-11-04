import axios from "axios";

const useAxiosWithTokenInterceptor = () => {
  const tokenAxios = axios.create();

  // Add a request interceptor
  tokenAxios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Token ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  return tokenAxios;
};
export default useAxiosWithTokenInterceptor;
