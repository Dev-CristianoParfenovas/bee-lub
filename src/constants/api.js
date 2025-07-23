import axios from "axios";

const api = axios.create({
  baseURL: "http://44.216.228.58:3000",
  timeout: 10000, // 10 segundos,
});
export default api;
