import axios from "axios";

export const getPosts = (userId) => axios.get(`/api/v1/post/${userId}`);
export const likePost = (id, userId) => axios.put(`/api/v1/post/${id}/like`, { userId: userId });
export const addComment = (data, id) => axios.post(`/api/v1/post/comment/${id}`, data);
export const allComment = (id) => axios.get(`/api/v1/post/allComment/${id}`);