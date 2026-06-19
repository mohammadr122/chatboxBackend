import {
  validationRegisterResultFunc,
  loginDataValidation,
} from "../validator/user-validation";
import type { Request, Response, NextFunction } from "express";

const registerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validationResult = validationRegisterResultFunc(req.body);
    

    if (!validationResult.success) {
      return res.status(400).json({ message: validationResult.error.message });
    }
    next();
  } catch (error) {
    console.log("middleware error", error);
    res.status(500).json();
  }
};

export default registerMiddleware ;
