import { RequestHandler, Request, Response } from 'express';
import postModel from "../model/postModel";
import userModel from "../model/userModel"
import savedPostModel from "../model/savedPostModel"
import mongoose from "mongoose";

// creating a post

export = {
    createPost: async (req: Request, res: Response) => {
  
        
        
        try {
           
      const newPost = await postModel.create(req.body);
      console.log(newPost,"newpOst is hererererereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
      
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
  },
  getPost: async (req: Request, res: Response) => {

    const userId = req.params.id;

    let userPost = await postModel.find({ userId: userId }).sort({ updatedAt: 'desc' }).lean()
   


    let followingPost = await userModel.aggregate([{ $match: { _id: new mongoose.Types.ObjectId(userId) } },
    {
      $lookup: {
        from: "posts",
        localField: "following",
        foreignField: "userId",
        as: "followingPosts",
      }
      },
      {
        $lookup: {
          from: "users",
          localField: "followingPosts.userId",
          foreignField: "_id",
          as:"userDetails"
          
        }
      },
    {
      $project: {
        followingPosts: 1,
        _id: 0,
      },
    },
      ])
      
    
  
  
    // const FollowerId = await userModel.find({ _id: userId }, { _id: 0, following: 1 }).lean();
    // let userFeed;
    // let feedData=FollowerId.map(async(value) => {
    //   return  userFeed = await postModel.find({ _id: value._id}).lean();
    // })
    // console.log(userPost
    //   .concat(...followingPost[0].followingPosts),"ithentha avsthann ariyan")
 
    console.log(userPost
      .concat(...followingPost[0].followingPosts)
      ?.sort(
        (a, b) => {
        

              return new Date(+b.createdAt).getTime() - new Date(+a.createdAt).getTime();
         
       }))
    res.status(200).json(userPost
      .concat(...followingPost[0].followingPosts)
      ?.sort(
        (a, b) => {
        

              return new Date(+b.createdAt).getTime() - new Date(+a.createdAt).getTime();
         
       }));
    
  },
  likePost: async (req: Request, res: Response) => {
   
    const id = req.params.id;
    const { userId } = req.body;
   
    
    const postData = await postModel.findById(id);

    if (postData?.likes.includes(userId)) {
    await postModel.updateOne({_id:id},{ $pull: { likes: userId } });
      
      res.status(200).json({message:"unliked photo"})
    }
    else {
      await postModel.updateOne({_id:id},{ $push: { likes: userId } });
      const newPostDAta=await postModel.findById(id)

      res.status(200).json({message:"liked photo"})
    }
  },
  addComment: async(req: Request, res: Response) => {
    console.log(req.params.id)
    const data=await postModel.findOne({ _id: req.params.id })
    console.log(data);
    console.log(req.body)
    await postModel.updateOne({ _id: req.params.id }, { $push: {comments:{userId:req.body.userId,comment:req.body.comments}} });
    console.log("updataed")
    res.status(200).json("success")
  },
  allComment: async(req: Request, res:Response) => {
    const data = await postModel.findOne({ _id: req.params.id }, { comments: 1 }).populate('comments.userId').lean();
    res.status(200).json(data)
  },
  savePost: async(req: Request, res: Response) => {
    console.log("this is herer", req.query)
    const savePostExist = await savedPostModel.findOne({ userId: req.query.userId });
    if (savePostExist) {
      const postExist = await savedPostModel.findOne({ postId: req.query.postId });
      if (postExist) {
        return res.status(200).json("sucess");
      }
      await savedPostModel.findOneAndUpdate({ userId: req.query.userId }, { $push:{postId:req.query.postId } });
      return res.status(200).json("success");
    }
    await savedPostModel.create(req.query);
    res.status(200).json("success");
    
  },
  allSavedPost: async (req: Request, res: Response) => {
    const data = await savedPostModel.findOne({ userId: req.params.id });
    res.status(200).json(data);
  }

};