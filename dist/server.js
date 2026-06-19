"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const user_1 = __importDefault(require("./router/user"));
const chat_1 = __importDefault(require("./router/chat"));
const otp_1 = __importDefault(require("./router/otp"));
const connection_1 = require("./utils/connection");
const mongoose_1 = require("mongoose");
const message_1 = __importDefault(require("./models/message"));
const console_1 = require("console");
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
    },
    pingTimeout: 60000,
    pingInterval: 25000,
    transports: ["websocket", "polling"],
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use("/api/user", user_1.default);
app.use("/api/chat", chat_1.default);
app.use("/api/otp-code", otp_1.default);
io.on("connection", (socket) => {
    socket.on("message", async (messageData) => {
        await (0, connection_1.connectToDb)();
        try {
            const { messageValue, messageAuthor, messageReceiver, whatChat } = messageData;
            if (!messageValue ||
                !(0, mongoose_1.isValidObjectId)(messageAuthor) ||
                !(0, mongoose_1.isValidObjectId)(messageReceiver) ||
                !(0, mongoose_1.isValidObjectId)(whatChat)) {
                io.emit("error", "خطا در ارسال اطلاعات به سرور");
                return;
            }
            const time = new Date();
            await message_1.default.create({
                messageValue,
                messageAuthor,
                messageReceiver,
                whatChat,
                date: time.getTime(),
            });
            const findMessage = await message_1.default.findOne({ messageValue });
            io.to(whatChat).emit("message", findMessage);
        }
        catch (error) {
            (0, console_1.log)("error in create message API ====>", error);
            io.emit("error", "خطا در سرور");
        }
    });
});
const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map