import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000' });


API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${JSON.parse(
        localStorage.getItem("profile")
      ).token}`;
    }
    return req;
  });



export const createChat = (data) => API.post('/api/v1/chat/', data);

export const userChats = (id) => API.get(`/api/v1/chat/${id}`);

export const findChat = (firstId, secondId) => API.get(`/api/v1/chat/find/${firstId}/${secondId}`);