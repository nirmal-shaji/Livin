"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const postModel_1 = __importDefault(require("../model/postModel"));
const userModel_1 = __importDefault(require("../model/userModel"));
const savedPostModel_1 = __importDefault(require("../model/savedPostModel"));
const mongoose_1 = __importDefault(require("mongoose"));
module.exports = {
    createPost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newPost = yield postModel_1.default.create(req.body);
            console.log(newPost, "newpOst is hererererereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
            res.status(200).json(newPost);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }),
    getPost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const userId = req.params.id;
        let userPost = yield postModel_1.default.find({ userId: userId }).sort({ updatedAt: 'desc' }).lean();
        let followingPost = yield userModel_1.default.aggregate([{ $match: { _id: new mongoose_1.default.Types.ObjectId(userId) } },
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
                    as: "userDetails"
                }
            },
            {
                $project: {
                    followingPosts: 1,
                    _id: 0,
                },
            },
        ]);
        // const FollowerId = await userModel.find({ _id: userId }, { _id: 0, following: 1 }).lean();
        // let userFeed;
        // let feedData=FollowerId.map(async(value) => {
        //   return  userFeed = await postModel.find({ _id: value._id}).lean();
        // })
        // console.log(userPost
        //   .concat(...followingPost[0].followingPosts),"ithentha avsthann ariyan")
        console.log((_a = userPost
            .concat(...followingPost[0].followingPosts)) === null || _a === void 0 ? void 0 : _a.sort((a, b) => {
            return new Date(+b.createdAt).getTime() - new Date(+a.createdAt).getTime();
        }));
        res.status(200).json((_b = userPost
            .concat(...followingPost[0].followingPosts)) === null || _b === void 0 ? void 0 : _b.sort((a, b) => {
            return new Date(+b.createdAt).getTime() - new Date(+a.createdAt).getTime();
        }));
    }),
    likePost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const { userId } = req.body;
        const postData = yield postModel_1.default.findById(id);
        if (postData === null || postData === void 0 ? void 0 : postData.likes.includes(userId)) {
            yield postModel_1.default.updateOne({ _id: id }, { $pull: { likes: userId } });
            res.status(200).json({ message: "unliked photo" });
        }
        else {
            yield postModel_1.default.updateOne({ _id: id }, { $push: { likes: userId } });
            const newPostDAta = yield postModel_1.default.findById(id);
            res.status(200).json({ message: "liked photo" });
        }
    }),
    addComment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.params.id);
        const data = yield postModel_1.default.findOne({ _id: req.params.id });
        console.log(data);
        console.log(req.body);
        yield postModel_1.default.updateOne({ _id: req.params.id }, { $push: { comments: { userId: req.body.userId, comment: req.body.comments } } });
        console.log("updataed");
        res.status(200).json("success");
    }),
    allComment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield postModel_1.default.findOne({ _id: req.params.id }, { comments: 1 }).populate('comments.userId').lean();
        res.status(200).json(data);
    }),
    savePost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("this is herer", req.query);
        const savePostExist = yield savedPostModel_1.default.findOne({ userId: req.query.userId });
        if (savePostExist) {
            const postExist = yield savedPostModel_1.default.findOne({ postId: req.query.postId });
            if (postExist) {
                return res.status(200).json("sucess");
            }
            yield savedPostModel_1.default.findOneAndUpdate({ userId: req.query.userId }, { $push: { postId: req.query.postId } });
            return res.status(200).json("success");
        }
        yield savedPostModel_1.default.create(req.query);
        res.status(200).json("success");
    }),
    allSavedPost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield savedPostModel_1.default.findOne({ userId: req.params.id });
        res.status(200).json(data);
    })
};
