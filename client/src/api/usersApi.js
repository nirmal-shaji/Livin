import axios from 'axios';



 const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("profile")
    ).token}`;
  }
  return req;
});

export const getAllUsers = () => API.get('/api/v1/');
export const followUserApi = (data,id) => API.patch(`/api/v1/follow/${id}`,data);
export const unfollowUserApi = (data, id) => API.patch(`/api/v1/unfollow/${id}`, data);
export const updateUser = (data, id) => API.patch(`/api/v1/${id}`, data)
export const getUser = (id) => API.get(`/api/v1/${id}`);
export const followingData = (id) => API.get(`/api/v1/following/${id}`)
export const createChat = (data) => API.post(`/api/v1/chat/`, data)
export const savePost=(postId,userId)=>API.get(`/api/v1/post/save/post`,{
  params: {
     postId,
    userId 
  }
})
export const reportPost = (postId, text) => API.post(`/api/v1/post/report/${postId}`, text);
export const deletePost = (postId) => API.get(`/api/v1/deletePost/${postId}`);
export const editPost = (postId, data) => API.post('/api/v1/post/edit/post', data);
