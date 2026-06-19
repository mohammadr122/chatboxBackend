"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const messageSchema = new mongoose_1.default.Schema({
    messageValue: {
        type: String,
        required: true,
    },
    messageAuthor: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "user",
        required: true,
    },
    messageReceiver: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "user",
        required: true,
    },
    whatChat: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "chat",
        required: true,
    },
    date: {
        type: Number,
        required: true,
    },
});
const messageModel = mongoose_1.default.models.message || mongoose_1.default.model("message", messageSchema);
exports.default = messageModel;
//# sourceMappingURL=message.js.map