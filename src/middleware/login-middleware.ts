import { loginDataValidation } from "../validator/user-validation";
import type { Request, Response, NextFunction } from "express";

const loginMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const validationResult = loginDataValidation(req.body);

    if (!validationResult.success) {
      return res.status(400).json({ message: validationResult.error.message });
    }
    next();
  } catch (error) {
    console.log("error in login middleware ===>", error);
    return res.status(500).json({ message: "خطای سرور" });
  }
};

export default loginMiddleware;
