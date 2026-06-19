"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("../utils/connection");
const checkTokenMiddleware = (req, res, next) => {
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
        req.userName = tokenInfo.userName;
        next();
    }
    catch (error) {
        console.log("error in check token middleware ===>", error);
        return res.status(500).json({
            message: "خطای داخلی سرور",
        });
    }
};
exports.default = checkTokenMiddleware;
//# sourceMappingURL=check-token-middleware.js.map