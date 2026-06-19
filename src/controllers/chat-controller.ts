import type { Request, Response } from "express";
import { connectToDb } from "../utils/connection";
import { isValidObjectId } from "mongoose";
import { log } from "console";
import chatModel from "../models/chat";
import messageModel from "../models/message";

const createChat = async (req: Request, res: Response) => {
  await connectToDb();
  try {
    const { members } = req.body;
    if (!Array.isArray(members)) {
      return res.status(400).json({ message: "bad request, member must array type "});
    }

    if (members.length !== 2) {
      return res.status(400).json({ message: "bad request" });
    }

    const isValidIds = members.filter((id) => {
      if (isValidObjectId(id)) {
        return id;
      }
    });

    if (isValidIds.length !== 2) {
      return res.status(400).json({ message: "invalid id" });
    }

    const findChat = await chatModel.find({
      members: isValidIds,
    });

    if(findChat){
      return res.status(401).json({message: "این چت از قبل ساخته شده"})
    }

    await chatModel.create({
      members: isValidIds,
    });

    res.json({ message: "چت با موفقیت ایجاد شد" });
  } catch (error) {
    log("error in create chat API ====>", error);
    res.status(500).json({ message: "خطای سرور" });
  }
};

const removeChatHandeler = async (req: Request, res: Response) => {
  await connectToDb();
  try {
    const { removeId } = req.params;
    if (!removeId) {
      return res.status(400).json({ message: "آی دی برای حذف وجود ندارد" });
    }

    if (!isValidObjectId(removeId)) {
      return res.status(400).json({ message: "آی دی نامعتبر" });
    }

    const result = await chatModel.findOneAndDelete({ _id: removeId });

    if (!result) {
      return res.status(404).json({ message: "چتی با این آیدی پیدا نشد" });
    }

    const messages = await messageModel.find({whatChat: result._id})

    result.messages = messages
    
    res.json(result);
  } catch (error) {
    log("error in remove chat API ====>", error);
    res.status(500).json({ message: "خطای سرور" });
  }
};

const getOneChat = async (req: Request , res: Response) => { 
  await connectToDb()
  try {
    const { id } = req.params
    
     if (!id) {
      return res.status(400).json({ message: "آی دی برای حذف وجود ندارد" });
    }

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "آی دی نامعتبر" });
    }

    const result = await chatModel.findOne({ _id: id }, "-__v").populate("members","-__v").lean()

    if (!result) {
      return res.status(404).json({ message: "چتی با این آیدی پیدا نشد" });
    }

    const messsages = await messageModel.find({whatChat: id}, "-__v")

    result.messages = messsages
  


    res.json(result);
  } catch (error) {  
    log("error in get one chat API ====>", error);
    res.status(500).json({ message: "خطای سرور" });
  }
}

export { createChat, removeChatHandeler, getOneChat};
