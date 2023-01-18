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
app.use(cors());
app.use(bodyParser.json({limit:"30mb"}));
app.use(bodyParser.urlencoded({ limit:"30mb",extended: true }));

dotenv.config()
mongoose
app.use('/api/v1/', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1/chat', chatRouter);
app.use('/api/v1/message', messageRouter);
app.use('/api/v1/admin',adminRouter);


app.listen(5000, () => {
    console.log("server connected")
});