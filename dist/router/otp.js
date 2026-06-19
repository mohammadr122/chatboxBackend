"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const OTP_controller_1 = require("../controllers/OTP-controller");
const optRouter = express_1.default.Router();
optRouter.post("/create-code", OTP_controller_1.createOtpCode);
optRouter.post("/verify-code", OTP_controller_1.verifyOtpCode);
exports.default = optRouter;
//# sourceMappingURL=otp.js.map