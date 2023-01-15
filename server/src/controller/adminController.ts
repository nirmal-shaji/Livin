import { RequestHandler, Request, Response } from 'express';
import postModel from "../model/postModel";
import userModel from "../model/userModel"
import mongoose from "mongoose";

// creating a post

export = {
    getAllPost: async (req: Request, res: Response) => {
        console.log("hi reached herer")
        const postData = await postModel.find({}).populate('userId').lean();
        res.status(200).json(postData);
    },
    getAllUsers: async (req: Request, res: Response) => {
        const usersList=await userModel.find({},{userName:1,firstName:1,lastName:1,block:1}).lean();
      
        res.status(200).json({usersList})
    },
    blockUser: async (req: Request, res: Response) => {
        await userModel.findOneAndUpdate({ _id: req.params.id }, { $set: { "block": "true" } })
        res.status(200).json("success")
    },
    unBlockUser: async (req: Request, res: Response) => {
        await userModel.findOneAndUpdate({ _id: req.params.id }, { $set: { "block": "false" } })
        res.status(200).json("success")
    },
    removePost: async (req: Request, res: Response) => {
        console.log("this is working    ")
        res.status(200).json("success")
    },
    dashboard: async (req: Request, res: Request) => {
        type userss = [{
            _id: string;
            createdAt: string;

        }]
        const users:userss = await userModel.find({},{createdAt:1}).lean();
        const user = users.map((value) => {
            console.log(value.createdAt)
          
        })
    }
}