"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const adminController_1 = __importDefault(require("../controller/adminController"));
const router = (0, express_1.Router)();
router.get('/users', adminController_1.default.getAllUsers);
router.get('/posts', adminController_1.default.getAllPost);
router.get('/block/:id', adminController_1.default.blockUser);
router.patch('/block/:id', adminController_1.default.unBlockUser);
router.get('/dashboard', adminController_1.default.dashboard);
router.get('/notification', adminController_1.default.notification);
router.get('/notification/delete', adminController_1.default.deleteNotification);
module.exports = router;
