
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://proleduca-edupass-latest.onrender.com", 
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
