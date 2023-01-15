import axios from "axios";

const addComment = (data,id) => axios.post(`/api/v1/comment/${id}`, data);