import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:5000' });
API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${JSON.parse(
        localStorage.getItem("profile")
      ).token}`;
    }
    return req;
  });
export const getPosts = (userId) => API.get(`/api/v1/post/${userId}`);
export const likePost = (id, userId) => API.put(`/api/v1/post/${id}/like`, { userId: userId });
export const addComment = (data, id) => API.post(`/api/v1/post/comment/${id}`, data);
export const allComment = (id) => API.get(`/api/v1/post/allComment/${id}`);