"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneChat = exports.removeChatHandeler = exports.createChat = void 0;
const connection_1 = require("../utils/connection");
const mongoose_1 = require("mongoose");
const console_1 = require("console");
const chat_1 = __importDefault(require("../models/chat"));
const message_1 = __importDefault(require("../models/message"));
const createChat = async (req, res) => {
    await (0, connection_1.connectToDb)();
    try {
        const { members } = req.body;
        if (!Array.isArray(members)) {
            return res.status(400).json({ message: "bad request, member must array type " });
        }
        if (members.length !== 2) {
            return res.status(400).json({ message: "bad request" });
        }
        const isValidIds = members.filter((id) => {
            if ((0, mongoose_1.isValidObjectId)(id)) {
                return id;
            }
        });
        if (isValidIds.length !== 2) {
            return res.status(400).json({ message: "invalid id" });
        }
        const findChat = await chat_1.default.find({
            members: isValidIds,
        });
        if (findChat) {
            return res.status(401).json({ message: "این چت از قبل ساخته شده" });
        }
        await chat_1.default.create({
            members: isValidIds,
        });
        res.json({ message: "چت با موفقیت ایجاد شد" });
    }
    catch (error) {
        (0, console_1.log)("error in create chat API ====>", error);
        res.status(500).json({ message: "خطای سرور" });
    }
};
exports.createChat = createChat;
const removeChatHandeler = async (req, res) => {
    await (0, connection_1.connectToDb)();
    try {
        const { removeId } = req.params;
        if (!removeId) {
            return res.status(400).json({ message: "آی دی برای حذف وجود ندارد" });
        }
        if (!(0, mongoose_1.isValidObjectId)(removeId)) {
            return res.status(400).json({ message: "آی دی نامعتبر" });
        }
        const result = await chat_1.default.findOneAndDelete({ _id: removeId });
        if (!result) {
            return res.status(404).json({ message: "چتی با این آیدی پیدا نشد" });
        }
        const messages = await message_1.default.find({ whatChat: result._id });
        result.messages = messages;
        res.json(result);
    }
    catch (error) {
        (0, console_1.log)("error in remove chat API ====>", error);
        res.status(500).json({ message: "خطای سرور" });
    }
};
exports.removeChatHandeler = removeChatHandeler;
const getOneChat = async (req, res) => {
    await (0, connection_1.connectToDb)();
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "آی دی برای حذف وجود ندارد" });
        }
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            return res.status(400).json({ message: "آی دی نامعتبر" });
        }
        const result = await chat_1.default.findOne({ _id: id }, "-__v").populate("members", "-__v").lean();
        if (!result) {
            return res.status(404).json({ message: "چتی با این آیدی پیدا نشد" });
        }
        const messsages = await message_1.default.find({ whatChat: id }, "-__v");
        result.messages = messsages;
        res.json(result);
    }
    catch (error) {
        (0, console_1.log)("error in get one chat API ====>", error);
        res.status(500).json({ message: "خطای سرور" });
    }
};
exports.getOneChat = getOneChat;
//# sourceMappingURL=chat-controller.js.map