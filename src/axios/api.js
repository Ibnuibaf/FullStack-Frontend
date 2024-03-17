import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "https://fullstack-backend-8lkr.onrender.com/api/",
});

api.interceptors.request.use((req)=>{
  if(Cookies.get("token")){
    req.headers.Authorization=Cookies.get("token")
  }
  return req
})

export default api;
