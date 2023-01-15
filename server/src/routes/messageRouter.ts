import express from "express";
import messageController from "../controller/messageController.js";
// import authenticate from "../middleware/Auth.js";
const router = express.Router();

// router.use(authenticate);
router.post("/", messageController.addMessage);
router.get("/:chatId", messageController.getMessages);

export default router;
