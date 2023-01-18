import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:6000' });
API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${JSON.parse(
        localStorage.getItem("profile")
      ).token}`;
    }
    return req;
  });
const addComment = (data,id) => API.post(`/api/v1/comment/${id}`, data);