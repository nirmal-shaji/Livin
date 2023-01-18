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
// const API = API.create({ baseURL: 'http://localhost:5000' });

export const getMessages = (id) => API.get(`/api/v1/message/${id}`);

export const addMessage = (data) => API.post('/api/v1/message/', data);