"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chat_controller_1 = require("../controllers/chat-controller");
const chat_middleware_1 = __importDefault(require("../middleware/chat-middleware"));
const chatRouter = express_1.default.Router();
chatRouter.post("/create", chat_middleware_1.default, chat_controller_1.createChat);
chatRouter.delete("/remove/:removeId", chat_controller_1.removeChatHandeler);
chatRouter.get("/get/:id", chat_controller_1.getOneChat);
exports.default = chatRouter;
//# sourceMappingURL=chat.js.map