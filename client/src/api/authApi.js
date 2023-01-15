import axios from "axios";




export const Login = (formData) => axios.post('/api/v1/auth/login', formData);
export const SignUp = (formData) => axios.post('/api/v1/auth/register', formData);
export const adminLogin = (formData) => axios.post('/api/v1/auth/adminLogin', formData);