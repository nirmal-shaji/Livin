import axios from "axios";


export const uploadPost = (postData) => axios.post('/api/v1/post', postData, {
    withCredentials: true,
});
  

