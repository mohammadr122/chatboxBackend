"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const chatSchema = new mongoose_1.default.Schema({
    members: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "user"
        },
    ],
});
const chatModel = mongoose_1.default.models.chat || mongoose_1.default.model("chat", chatSchema);
exports.default = chatModel;
//# sourceMappingURL=chat.js.map