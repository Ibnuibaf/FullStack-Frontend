import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fullstack-backend-8lkr.onrender.com/api/',
  withCredentials:true
});

export default api;