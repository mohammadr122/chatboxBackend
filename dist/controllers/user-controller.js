"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAvatarHandeler = exports.serchUserFunc = exports.logOutFun = exports.getMeFunc = exports.loginFunc = exports.reqisterFunc = void 0;
const console_1 = require("console");
const user_1 = __importDefault(require("../models/user"));
const connection_1 = require("../utils/connection");
const chat_1 = __importDefault(require("../models/chat"));
const mongoose_1 = require("mongoose");
const reqisterFunc = async (req, res) => {
    await (0, connection_1.connectToDb)();
    try {
        const { name, lastName, userName, phone, password } = req.body;
        const findUaer = await user_1.default.findOne({
            $or: [{ userName }, { phone }],
        });
        if (findUaer) {
            res.statusCode = 409;
            return res.json({
                message: "از نام کاربری یا شماره موبایل دیگری استفاده کنید زیرا  این نام کاربری یا شماره موبایل از قبل وجود دارد",
            });
        }
        const hashedPassword = await (0, connection_1.hashPasswordGenerator)(password);
        const token = (0, connection_1.tokenGenerator)(userName);
        await user_1.default.create({
            name,
            lastName,
            userName,
            phone,
            password: hashedPassword,
        });
        res.cookie("authToken", token, {
            path: "/",
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 30,
            sameSite: "lax",
        });
        res.status(201).json({ message: "کاربر با موفقیت ثبت نام شد" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "خطای سرور " });
    }
};
exports.reqisterFunc = reqisterFunc;
const loginFunc = async (req, res) => {
    await (0, connection_1.connectToDb)();
    try {
        const { userName, password } = req.body;
        const findeUser = await user_1.default.findOne({ userName: userName });
        if (!findeUser) {
            return res
                .status(400)
                .json({ message: "حسابی با این نام کاربری یافت نشد" });
        }
        const isTruePassword = await (0, connection_1.verifyPaswsord)(password, findeUser.password);
        if (!isTruePassword) {
            res.statusCode = 409;
            return res.json({ message: "کمله عبور اشتباه" });
        }
        const token = (0, connection_1.tokenGenerator)(findeUser.userName);
        res.cookie("authToken", token, {
            path: "/",
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 30,
            sameSite: "lax",
        });
        res.json({ message: "کاربر با موفیقیت وارد حساب شذ" });
    }
    catch (error) {
        (0, console_1.log)("lohin API error ===> ", error);
        res.status(500).json({ message: "خطای سرور" });
    }
};
exports.loginFunc = loginFunc;
const getMeFunc = async (req, res) => {
    await (0, connection_1.connectToDb)();
    try {
        const userName = req.userName;
        const userInfo = await user_1.default.findOne({ userName }).lean();
        if (!userInfo) {
            return res
                .status(404)
                .json({ message: "کاربری  با این اطلاعات یافت نشد" });
        }
        const chats = await chat_1.default.find({}, "-__v").populate("members", "-__v");
        userInfo.chats = chats;
        res.json(userInfo);
    }
    catch (error) {
        (0, console_1.log)("error in get me API =====>", error);
        res.status(500).json({ message: "خطای سرور" });
    }
};
exports.getMeFunc = getMeFunc;
const logOutFun = async (req, res) => {
    try {
        res.cookie("authToken", "", {
            maxAge: 0,
            path: "/",
            httpOnly: true,
        });
        res.json({ message: "با موفقیت از حساب خود خارج شدید" });
    }
    catch (error) {
        (0, console_1.log)("error in log out API ====>", error);
        res.status(500).json({ message: "خطای سرور " });
    }
};
exports.logOutFun = logOutFun;
const serchUserFunc = async (req, res) => {
    await (0, connection_1.connectToDb)();
    try {
        const { serchKey } = req.body;
        const users = await user_1.default.find({});
        const filterUser = users.filter((user) => {
            return (user.lastName.includes(serchKey) ||
                user.name.includes(serchKey) ||
                user.userName.includes(serchKey));
        });
        if (!filterUser.length) {
            return res.status(404).json({ message: "کاربری با این اطلاعات یافت نشد" });
        }
        res.json(filterUser);
    }
    catch (error) {
        (0, console_1.log)("error in serch user API =====>", error);
        res.status(500).json({ message: "خطای سرور" });
    }
};
exports.serchUserFunc = serchUserFunc;
const updateAvatarHandeler = async (req, res) => {
    await (0, connection_1.connectToDb)();
    try {
        const { avatar } = req.body;
        const { id } = req.params;
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            return res.status(400).json({ message: "bad request id" });
        }
        if (!avatar || typeof avatar !== "string") {
            return res.status(400).json({ message: "bad request imahge" });
        }
        const findeUser = await user_1.default.findOneAndUpdate({ _id: id }, { avatar });
        if (!findeUser) {
            return res.status(404).json({ message: "کاربری باا این شناسه یافت نشد" });
        }
        res.json({ message: "پروفایل شما با موفقیت بروزرسانی شد" });
    }
    catch (error) {
        (0, console_1.log)("error in update Avatar API =====>", error);
        res.status(500).json({ message: "خطای سرور" });
    }
};
exports.updateAvatarHandeler = updateAvatarHandeler;
//# sourceMappingURL=user-controller.js.map