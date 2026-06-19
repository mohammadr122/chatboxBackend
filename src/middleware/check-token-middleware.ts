import { log } from "console";
import type { Request, Response, NextFunction } from "express";
import { verifyTokenHandeler } from "../utils/connection";
import { JwtPayload } from "jsonwebtoken";

// توسعه تایپ برای Express
declare global {
  namespace Express {
    interface Request {
      userName?: string;
    }
  }
}

const checkTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { authToken } = req.cookies;

    if (!authToken) {
      return res.status(401).json({
        message: "شما وارد حساب کاربری خود نشده‌اید",
      });
    }

    const tokenInfo = verifyTokenHandeler(authToken);

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
  } catch (error) {
    console.log("error in check token middleware ===>", error);
    return res.status(500).json({
      message: "خطای داخلی سرور",
    });
  }
};

export default checkTokenMiddleware;
