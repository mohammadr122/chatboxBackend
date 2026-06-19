"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("../utils/connection");
const console_1 = require("console");
const createChatMiddleware = async (req, res, next) => {
    await (0, connection_1.connectToDb)();
    try {
        const { authToken } = req.cookies;
        if (!authToken) {
            return res.status(401).json({
                message: "شما وارد حساب کاربری خود نشده‌اید",
            });
        }
        const tokenInfo = (0, connection_1.verifyTokenHandeler)(authToken);
        if (!tokenInfo || typeof tokenInfo === "string") {
            return res.status(401).json({
                message: "توکن نامعتبر است",
            });
        }
        if (!tokenInfo.userName) {
            return res.status(401).json({
                message: "توکن فاقد اطلاعات کاربری است",
            });
        }
        next();
    }
    catch (error) {
        (0, console_1.log)("error in create chat middleware =====> ", error);
        res.status(500).json({ message: "خطای سرور" });
    }
};
exports.default = createChatMiddleware;
//# sourceMappingURL=chat-middleware.js.map