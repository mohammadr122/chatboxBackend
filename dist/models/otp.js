"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const otpSchema = new mongoose_1.default.Schema({
    code: {
        type: Number,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    expTime: {
        type: String,
        required: true,
    },
});
const otpModel = mongoose_1.default.models.otp || mongoose_1.default.model("otp", otpSchema);
exports.default = otpModel;
//# sourceMappingURL=otp.js.map