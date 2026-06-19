"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessage = void 0;
const connection_1 = require("../utils/connection");
const console_1 = require("console");
const mongoose_1 = require("mongoose");
const message_1 = __importDefault(require("../models/message"));
const createMessage = async (req, res) => {
    await (0, connection_1.connectToDb)();
    try {
        const { messageValue, messageAuthor, messageReceiver, whatChat, } = req.body;
        if (!messageValue ||
            !(0, mongoose_1.isValidObjectId)(messageAuthor) ||
            !(0, mongoose_1.isValidObjectId)(messageReceiver) ||
            !(0, mongoose_1.isValidObjectId)(whatChat)) {
            return res.status(400).json({ message: "bad request" });
        }
        const time = new Date();
        await message_1.default.create({
            messageValue,
            messageAuthor,
            messageReceiver,
            whatChat,
            date: time.getTime()
        });
        res.json({ message: "پیام شما با موفقیت در سرور دخیره شد" });
    }
    catch (error) {
        (0, console_1.log)("error in create message API ====>", error);
        res.status(500).json({ message: "خطای سرور" });
    }
};
exports.createMessage = createMessage;
//# sourceMappingURL=message-controller.js.map