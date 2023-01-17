import axios from 'axios'



export const userList = () => axios.get("/api/v1/admin/users");
export const postsList = () => axios.get("/api/v1/admin/posts");
export const blockUser = (id) => axios.get(`/api/v1/admin/block/${id}`);
export const unBlockUser = (id) => axios.patch(`/api/v1/admin/block/${id}`);
export const removePost = (id) => axios.get(`/api/v1/admin/post/${id}`);
export const adminDashboard = (id) => axios.get('/api/v1/admin/dashboard');
export const adminNotification = () => axios.get('/api/v1/admin/notification');