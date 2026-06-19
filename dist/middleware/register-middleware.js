"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_validation_1 = require("../validator/user-validation");
const registerMiddleware = (req, res, next) => {
    try {
        const validationResult = (0, user_validation_1.validationRegisterResultFunc)(req.body);
        if (!validationResult.success) {
            return res.status(400).json({ message: validationResult.error.message });
        }
        next();
    }
    catch (error) {
        console.log("middleware error", error);
        res.status(500).json();
    }
};
exports.default = registerMiddleware;
//# sourceMappingURL=register-middleware.js.map