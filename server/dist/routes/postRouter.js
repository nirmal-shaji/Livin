"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const postController_1 = __importDefault(require("../controller/postController"));
const router = (0, express_1.Router)();
// router.get('/admin/allpost',postController.getAllPost)
router.get('/:id', postController_1.default.getPost);
router.post('/', postController_1.default.createPost);
router.put('/:id/like', postController_1.default.likePost);
router.post('/comment/:id', postController_1.default.addComment);
router.get('/allComment/:id', postController_1.default.allComment);
router.get('/save/post', postController_1.default.savePost);
router.get("/save/allPost/:id", postController_1.default.allSavedPost);
module.exports = router;
