import express from "express"
import { createChat,removeChatHandeler,getOneChat } from "../controllers/chat-controller"
import createChatMiddleware from "../middleware/chat-middleware"

const chatRouter = express.Router()

chatRouter.post("/create", createChatMiddleware, createChat)
chatRouter.delete("/remove/:removeId", removeChatHandeler)
chatRouter.get("/get/:id", getOneChat)

export default chatRouter