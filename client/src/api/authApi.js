import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:5000' });


export const Login = (formData) => API.post('/api/v1/auth/login', formData);
export const SignUp = (formData) => API.post('/api/v1/auth/register', formData);
export const adminLogin = (formData) => API.post('/api/v1/auth/adminLogin', formData);