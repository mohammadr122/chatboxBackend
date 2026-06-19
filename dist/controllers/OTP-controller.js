"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtpCode = exports.createOtpCode = void 0;
const console_1 = require("console");
const otp_1 = __importDefault(require("../models/otp"));
const connection_1 = require("../utils/connection");
const createOtpCode = async (req, res) => {
    try {
        const { phone } = req.body;
        const phoneRegex = /(09)(1[0-9]|2[0-2]|3[0-4]|90[1-9]|9[1-9][0-9]?|0[1-5])[0-9]{7}$/g;
        if (!phone) {
            return res.status(400).json({ message: "شماره موبایل خود را وارد کنید" });
        }
        if (!phoneRegex.test(phone)) {
            return res
                .status(400)
                .json({ message: "از شماره موبایل معتبری استفاده کنید" });
        }
        const verifyCode = Math.floor(Math.random() * 99999);
        const isValidCode = Math.floor(verifyCode / 10000);
        if (!isValidCode) {
            return res.status(400).json({ message: "خطا در ایجاد کد" });
        }
        const smsRes = await fetch(`${process.env.FARAZ_SMS_BASE_URL}/ws/v1/sms/pattern`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Api-Key": "JzBgc3TZkp0iYRMt3GPxV4xh6O91Upuz2OnmKe253u4WkKyLaE",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                code: "SsjO0qly9Z",
                attributes: {
                    code: verifyCode,
                },
                recipient: phone,
                line_number: "50002178584000",
                number_format: "english",
            }),
        });
        if (!smsRes.ok) {
            return res.status(smsRes.status).json({ message: "خطا در ارسال پیام" });
        }
        const date = new Date();
        const expTime = date.getTime() + 1000 * 60 * 2;
        await otp_1.default.create({
            code: verifyCode,
            phone,
            expTime,
        });
        res.json({ message: "کد ورود با موفقیت برای شما ارسال" });
    }
    catch (error) {
        (0, console_1.log)("error in create OTP code ======>", error);
        res.status(500).json({ message: "خطای سرور" });
    }
};
exports.createOtpCode = createOtpCode;
const verifyOtpCode = async (req, res) => {
    await (0, connection_1.connectToDb)();
    try {
        const { phone, otpCode } = req.body;
        const phoneRegex = /(09)(1[0-9]|2[0-2]|3[0-4]|90[1-9]|9[1-9][0-9]?|0[1-5])[0-9]{7}$/g;
        if (!phoneRegex.test(phone || typeof otpCode !== "number")) {
            if (!otpCode) {
                return res.status(400).json({ message: "bad request" });
            }
        }
        const findOtpCode = await otp_1.default.findOne({
            $or: [{ phone }, { code: otpCode }],
        });
        if (!findOtpCode) {
            return res.status(404).json({ message: "کد برای این شماره موبایل ارسال نشده" });
        }
        const date = new Date();
        const now = date.getTime();
        if (findOtpCode < now) {
            return res.status(410).json({ message: "کد ورود شما منقضی شده است" });
        }
        res.json({ message: "کدورود شما با موفقیت اعتبار سنجی شد" });
    }
    catch (error) {
        (0, console_1.log)("error in verify OPT code API =====>", error),
            res.status(500).json({ message: "خطای سرور" });
    }
};
exports.verifyOtpCode = verifyOtpCode;
//# sourceMappingURL=OTP-controller.js.map