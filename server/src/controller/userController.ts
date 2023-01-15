
import { RequestHandler, Request, Response } from 'express';
import postModel from '../model/postModel';
import userModel from '../model/userModel';


export = {

    guestHome: (req: Request, res: Response) => {
        type stander= {
            message: String
        }
     
        const token:stander={ message: "succcessfull" }
        res.status(201).json(token);
    },
  updateUser: async(req: Request, res: Response) => {
    console.log(req.body,"this is a mini  fof changes")
    const { userName, firstName, lastName, coverPicture,profilePicture, country,worksAt,livesIn,relationship } = req.body;
     await userModel.findOneAndUpdate({ _id: req.params.id }, { $set: { "userName": userName, "firstName": firstName,"lastName":lastName,"coverPicture": coverPicture ,"profilePicture":profilePicture,"relationship":relationship,"livesIn":livesIn,"country":country,"worksAt":worksAt} }, { new: true });
    const userData = await userModel.findOne({ _id: req.params.id })
    console.log(userData)
    // console.log(userData)
    // console.log("reahinngnggnngn")
     return res.status(200).json(userData);
    // console.log(data)
    },
    follow: async (req: Request, res: Response) => {
       
        //followers id
        const id = req.params.id
        console.log("reaching here is ", id)
       //user id 
        const { _id } = req.body;
        console.log(id, _id)
        if (_id === id) {
           
            return res.status(403).json("Action Forbidden");
        }
        else {
           const followUser = await userModel.findById(id);
            const followingUser = await userModel.findById(_id);
      
            if (!followUser?.followers.includes(_id)) {
              
                await followUser?.updateOne({ $push: { followers: _id } });
                await followingUser?.updateOne({ $push: { following: id } });
         
                const userData = await userModel.findById(_id)
               
                res.status(200).json(userData);
            } else {
                
                res.status(403).json("you are already following this id");
            }
          
        }
    },
    unFollow: async (req: Request, res: Response) => {
        
        //followers id
        const id = req.params.id
        console.log("reaching here is ", id)
       //user id 
        const { _id } = req.body;
       
        if (_id === id) {
          res.status(403).json("Action Forbidden");
        } else {
          try {
            const unfollowUser = await userModel.findById(id);
            const unfollowingUser = await userModel.findById(_id);
      
            if (unfollowUser?.followers.includes(_id)) {
                await unfollowUser?.updateOne({ $pull: { followers: _id } });
                await unfollowingUser?.updateOne({ $pull: { following: id } });
           
                const userData = await userModel.findById(_id)
               
              res.status(200).json(userData);
            } else {
              res.status(403).json("you are already unfollowed this id");
            }
          } catch (error) {
            console.log(error)
            res.status(500).json(error);
          }
        } 
    },
    getAllUsers: async (req: Request, res: Response) => {
        const usersList=await userModel.find({}).lean();
      
        res.status(200).json({usersList})
  },
  addComment: async (req: Request, res: Response) => {
      await postModel.updateOne({ _id: req.params.id }, { $push: { comments: {userId:req.body.userId,comment:req.body.comment}} })
  },
  getUserData: async(req: Request, res: Response) => {
    const userData=await userModel.findOne({_id:req.params.id});
   console.log(userData)
    res.status(200).json({ userData });
  },
  getFollowing: async (req: Request, res: Response) => {
    const followersData = await userModel.findOne({ _id: req.params.id },{_id:0,following:1}).populate("following").lean();
    console.log(followersData, "this is dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    res.status(200).json(followersData)
  }
}