import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.15.191:3001"
});

export default api;
