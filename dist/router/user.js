"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user-controller");
const multer_1 = __importDefault(require("../middleware/multer"));
const register_middleware_1 = __importDefault(require("../middleware/register-middleware"));
const login_middleware_1 = __importDefault(require("../middleware/login-middleware"));
const check_token_middleware_1 = __importDefault(require("../middleware/check-token-middleware"));
const userRouter = express_1.default.Router();
userRouter.post("/register", multer_1.default.none(), register_middleware_1.default, user_controller_1.reqisterFunc);
userRouter.post("/log-in", multer_1.default.none(), login_middleware_1.default, user_controller_1.loginFunc);
userRouter.get("/get-me", check_token_middleware_1.default, user_controller_1.getMeFunc);
userRouter.delete("/log-out", user_controller_1.logOutFun);
userRouter.post("/serch", user_controller_1.serchUserFunc);
// userRouter.put("/chang-avatar",);
userRouter.put("/update/:id", user_controller_1.updateAvatarHandeler);
module.exports = userRouter;
//# sourceMappingURL=user.js.map