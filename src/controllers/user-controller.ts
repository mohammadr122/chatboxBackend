import { log } from "console";
import userModel from "../models/user";
import {
  connectToDb,
  hashPasswordGenerator,
  tokenGenerator,
  verifyPaswsord,
} from "../utils/connection";
import type { Request, Response } from "express";
import chatModel from "../models/chat";
import { isValidObjectId } from "mongoose";

const reqisterFunc = async (req: Request, res: Response) => {
  await connectToDb();
  try {
    const { name, lastName, userName, phone, password } = req.body;
    const findUaer = await userModel.findOne({
      $or: [{ userName }, { phone }],
    });

    if (findUaer) {
      res.statusCode = 409;
      return res.json({
        message:
          "از نام کاربری یا شماره موبایل دیگری استفاده کنید زیرا  این نام کاربری یا شماره موبایل از قبل وجود دارد",
      });
    }

    const hashedPassword = await hashPasswordGenerator(password);

    const token = tokenGenerator(userName);

    await userModel.create({
      name,
      lastName,
      userName,
      phone,
      password: hashedPassword,
    });

    res.cookie("authToken", token, {
      path: "/",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      sameSite: "lax",
    });

    res.status(201).json({ message: "کاربر با موفقیت ثبت نام شد" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "خطای سرور " });
  }
};

const loginFunc = async (req: Request, res: Response) => {
  await connectToDb();
  try {
    const { userName, password } = req.body;
    const findeUser = await userModel.findOne({ userName: userName });

    if (!findeUser) {
      return res
        .status(400)
        .json({ message: "حسابی با این نام کاربری یافت نشد" });
    }

    const isTruePassword = await verifyPaswsord(password, findeUser.password);

    if (!isTruePassword) {
      res.statusCode = 409;
      return res.json({ message: "کمله عبور اشتباه" });
    }

    const token = tokenGenerator(findeUser.userName);

    res.cookie("authToken", token, {
      path: "/",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      sameSite: "lax",
    });

    res.json({ message: "کاربر با موفیقیت وارد حساب شذ" });
  } catch (error) {
    log("lohin API error ===> ", error);
    res.status(500).json({ message: "خطای سرور" });
  }
};

const getMeFunc = async (req: Request, res: Response) => {
  await connectToDb();
  try {
    const userName = req.userName;

    const userInfo = await userModel.findOne({ userName }).lean();

    if (!userInfo) {
      return res
        .status(404)
        .json({ message: "کاربری  با این اطلاعات یافت نشد" });
    }
  
    const chats = await chatModel.find({},"-__v").populate("members","-__v")
    
    userInfo.chats = chats

    res.json(userInfo);
  } catch (error) {
    log("error in get me API =====>", error);
    res.status(500).json({ message: "خطای سرور" });
  }
};

const logOutFun = async (req: Request, res: Response) => {
  try {
    res.cookie("authToken", "", {
      maxAge: 0,
      path: "/",
      httpOnly: true,
    });
    res.json({ message: "با موفقیت از حساب خود خارج شدید" });
  } catch (error) {
    log("error in log out API ====>", error);
    res.status(500).json({ message: "خطای سرور " });
  }
};

const serchUserFunc = async (req: Request, res: Response) => {  
  await connectToDb()
  try {
    const { serchKey } = req.body

    const users = await userModel.find({})

    type user = {
      _id: string,
      name: string,
      lastName: string,
      userName: string,
      phone: string,
      password: string,
      avatar: string
    }

    const filterUser = users.filter((user: user) =>{
      return (
        user.lastName.includes(serchKey) ||
        user.name.includes(serchKey) ||
        user.userName.includes(serchKey)
      );
    })

    if(!filterUser.length) {
      return res.status(404).json({message: "کاربری با این اطلاعات یافت نشد"})
    }

    res.json(filterUser)
  } catch (error) {
    log("error in serch user API =====>", error)
    res.status(500).json({message: "خطای سرور"})
  }
};

const updateAvatarHandeler = async (req: Request, res: Response) => {
  await connectToDb();
  try {
    const { avatar } = req.body;
    const { id } = req.params;


    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "bad request id" });
    }

    if (!avatar || typeof avatar !== "string") {
      return res.status(400).json({ message: "bad request imahge" });
    }

    const findeUser = await userModel.findOneAndUpdate({ _id: id }, { avatar });

    if (!findeUser) {
      return res.status(404).json({ message: "کاربری باا این شناسه یافت نشد" });
    }

    res.json({ message: "پروفایل شما با موفقیت بروزرسانی شد" });
  } catch (error) {
    log("error in update Avatar API =====>", error);
    res.status(500).json({ message: "خطای سرور" });
  }
}

export {
  reqisterFunc,
  loginFunc,
  getMeFunc,
  logOutFun,
  serchUserFunc,
  updateAvatarHandeler,
};
