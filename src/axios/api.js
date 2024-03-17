import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");
const api = axios.create({
  baseURL: "https://fullstack-backend-8lkr.onrender.com/api/",
  headers: {
    Authorization: token || "",
  },
});

export default api;
