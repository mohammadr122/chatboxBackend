import type { Request, Response , NextFunction } from "express"
import { connectToDb, verifyTokenHandeler } from "../utils/connection"
import { log } from "console";

const createChatMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  await connectToDb();
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
    next()
  } catch (error) {
    log("error in create chat middleware =====> ", error)
    res.status(500).json({message: "خطای سرور"})
  }
}

export default createChatMiddleware