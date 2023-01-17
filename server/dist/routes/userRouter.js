"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const userController_1 = __importDefault(require("../controller/userController"));
const router = (0, express_1.Router)();
router.get('/', userController_1.default.getAllUsers);
router.get('/:id', userController_1.default.getUserData);
router.patch('/:id', userController_1.default.updateUser);
router.patch('/follow/:id', userController_1.default.follow);
router.patch('/unfollow/:id', userController_1.default.unFollow);
router.post('/comment/:id', userController_1.default.addComment);
router.get('/following/:id', userController_1.default.getFollowing);
router.get('/deletePost/:id', userController_1.default.deletePost);
module.exports = router;
