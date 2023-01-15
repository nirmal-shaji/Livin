import axios from 'axios'


// const API = axios.create({ baseURL: 'http://localhost:5000' });

export const getMessages = (id) => axios.get(`/api/v1/message/${id}`);

export const addMessage = (data) => axios.post('/api/v1/message/', data);