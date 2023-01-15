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
module.exports = {
    getAllPost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("hi reached herer");
        const postData = yield postModel_1.default.find({}).populate('userId').lean();
        res.status(200).json(postData);
    }),
    getAllUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const usersList = yield userModel_1.default.find({}, { userName: 1, firstName: 1, lastName: 1, block: 1 }).lean();
        res.status(200).json({ usersList });
    }),
    blockUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield userModel_1.default.findOneAndUpdate({ _id: req.params.id }, { $set: { "block": "true" } });
        res.status(200).json("success");
    }),
    unBlockUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield userModel_1.default.findOneAndUpdate({ _id: req.params.id }, { $set: { "block": "false" } });
        res.status(200).json("success");
    }),
    removePost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("this is working    ");
        res.status(200).json("success");
    }),
    dashboard: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield userModel_1.default.find({}, { createdAt: 1 }).lean();
        const user = users.map((value) => {
            console.log(value.createdAt);
        });
    })
};
