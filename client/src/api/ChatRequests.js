import axios from 'axios'


// const API = axios.create({ baseURL: 'http://localhost:5000' });

export const createChat = (data) => axios.post('/api/v1/chat/', data);

export const userChats = (id) => axios.get(`/api/v1/chat/${id}`);

export const findChat = (firstId, secondId) => axios.get(`/api/v1/chat/find/${firstId}/${secondId}`);