import axios from 'axios';
//  const API = axios.create({ baseURL: 'http://localhost:6000' });
export const getAllUsers = () => axios.get('/api/v1/');
export const followUserApi = (data,id) => axios.patch(`/api/v1/follow/${id}`,data);
export const unfollowUserApi = (data, id) => axios.patch(`/api/v1/unfollow/${id}`, data);
export const updateUser = (data, id) => axios.patch(`/api/v1/${id}`, data)
export const getUser = (id) => axios.get(`/api/v1/${id}`);
export const followingData = (id) => axios.get(`/api/v1/following/${id}`)
export const createChat = (data) => axios.post(`/api/v1/chat/`, data)
export const savePost=(postId,userId)=>axios.get(`/api/v1/post/save/post`,{
  params: {
     postId,
    userId 
  }
})
