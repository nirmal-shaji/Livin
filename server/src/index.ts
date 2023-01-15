import dotenv from "dotenv";
import path from 'path'
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from './config/connection';
import userRouter from './routes/userRouter'
import authRouter from './routes/authRouter'
import postRouter from './routes/postRouter'
import chatRouter from './routes/chatRouter'
import messageRouter from './routes/messageRouter'
import adminRouter from './routes/adminRouter'
import cors from 'cors';



const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
dotenv.config()
mongoose
app.use('/api/v1/', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1/chat', chatRouter);
app.use('/api/v1/message', messageRouter);
app.use('/api/v1/admin',adminRouter);


app.listen(6000, () => {
    console.log("server connected")
});