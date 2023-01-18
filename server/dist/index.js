"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const connection_1 = __importDefault(require("./config/connection"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const postRouter_1 = __importDefault(require("./routes/postRouter"));
const chatRouter_1 = __importDefault(require("./routes/chatRouter"));
const messageRouter_1 = __importDefault(require("./routes/messageRouter"));
const adminRouter_1 = __importDefault(require("./routes/adminRouter"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json({ limit: "30mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "30mb", extended: true }));
dotenv_1.default.config();
connection_1.default;
app.use('/api/v1/', userRouter_1.default);
app.use('/api/v1/auth', authRouter_1.default);
app.use('/api/v1/post', postRouter_1.default);
app.use('/api/v1/chat', chatRouter_1.default);
app.use('/api/v1/message', messageRouter_1.default);
app.use('/api/v1/admin', adminRouter_1.default);
app.listen(5000, () => {
    console.log("server connected");
});
