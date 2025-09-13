import axios from "axios";

const secureApi = axios.create({
  baseURL: process.env.REACT_APP_BASE ||"http://localhost:5000"|| "https://connecthire.onrender.com",
  withCredentials: true,
  headers: { "Content-Type": "application/json" }
});

secureApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      alert("Unauthorized — redirecting to login...");
      window.location.href = "/user/login";
    }
    return Promise.reject(error);
  }
);

export default secureApi;
