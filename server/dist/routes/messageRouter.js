"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageController_js_1 = __importDefault(require("../controller/messageController.js"));
// import authenticate from "../middleware/Auth.js";
const router = express_1.default.Router();
// router.use(authenticate);
router.post("/", messageController_js_1.default.addMessage);
router.get("/:chatId", messageController_js_1.default.getMessages);
exports.default = router;
