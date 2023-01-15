"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const chatController_1 = __importDefault(require("../controller/chatController"));
const router = (0, express_1.Router)();
router.post('/', chatController_1.default.createChat);
router.get('/:userId', chatController_1.default.userChats);
router.get('/find/:firstId/:secondId', chatController_1.default.findChat);
module.exports = router;
