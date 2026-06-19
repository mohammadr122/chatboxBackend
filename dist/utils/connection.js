"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenHandeler = exports.verifyPaswsord = exports.tokenGenerator = exports.hashPasswordGenerator = exports.connectToDb = void 0;
const bcryptjs_1 = require("bcryptjs");
const console_1 = require("console");
const jsonwebtoken_1 = require("jsonwebtoken");
const mongoose_1 = __importDefault(require("mongoose"));
const connectToDb = async () => {
    if (mongoose_1.default.connection.readyState === 1) {
        return;
    }
    try {
        mongoose_1.default.connect(`${process.env.MONGO_DB_BASE_URL}/${process.env.MONGO_DB_NAME}`);
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.connectToDb = connectToDb;
const hashPasswordGenerator = async (password) => {
    const hashedPassword = (0, bcryptjs_1.hash)(password, 12);
    return hashedPassword;
};
exports.hashPasswordGenerator = hashPasswordGenerator;
const tokenGenerator = (userName) => {
    const key = process.env.TOKEN_KEY;
    if (key) {
        const token = (0, jsonwebtoken_1.sign)({ userName }, key);
        return token;
    }
};
exports.tokenGenerator = tokenGenerator;
const verifyPaswsord = async (password, hashPassword) => {
    const verifyResult = await (0, bcryptjs_1.compare)(password, hashPassword);
    return verifyResult;
};
exports.verifyPaswsord = verifyPaswsord;
const verifyTokenHandeler = (token) => {
    try {
        const key = process.env.TOKEN_KEY;
        if (key) {
            const verifyResult = (0, jsonwebtoken_1.verify)(token, key);
            return verifyResult;
        }
    }
    catch (error) {
        (0, console_1.log)("error in verify token function ====>", error);
    }
};
exports.verifyTokenHandeler = verifyTokenHandeler;
//# sourceMappingURL=connection.js.map