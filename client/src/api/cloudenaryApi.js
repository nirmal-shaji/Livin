import axios from "axios";

const upload = axios.create({
    baseURL: 'https://api.cloudinary.com/v1_1/dxxgj5lfp'
})
export const imageUpload = (data) => upload.post("/image/upload", data)

