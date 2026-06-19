import express from "express";
import {
  reqisterFunc,
  loginFunc,
  getMeFunc,
  logOutFun,
  serchUserFunc,
  updateAvatarHandeler,
} from "../controllers/user-controller";
import uploader from "../middleware/multer";
import registerMiddleware from "../middleware/register-middleware";
import loginMiddleware from "../middleware/login-middleware";
import checkTokenMiddleware from "../middleware/check-token-middleware";
import { log } from "console";
import { connectToDb } from "../utils/connection";
import userModel from "../models/user";
import { isValidObjectId } from "mongoose";

const userRouter = express.Router();

userRouter.post("/register", uploader.none(), registerMiddleware, reqisterFunc);
userRouter.post("/log-in", uploader.none(), loginMiddleware, loginFunc);
userRouter.get("/get-me", checkTokenMiddleware, getMeFunc);
userRouter.delete("/log-out", logOutFun);
userRouter.post("/serch", serchUserFunc);
// userRouter.put("/chang-avatar",);
userRouter.put("/update/:id", updateAvatarHandeler);

export = userRouter;
