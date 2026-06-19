
import express, { Application } from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import userRouter from "./router/user";
import chatRouter from "./router/chat";
import otpRouter from "./router/otp";
import { connectToDb } from "./utils/connection";
import { isValidObjectId } from "mongoose";
import messageModel from "./models/message";
import { log } from "console";

const app: Application = express();
const httpServer = http.createServer(app);

const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  },
  pingTimeout: 60000,
  pingInterval: 25000,
  transports: ["websocket", "polling"],
});

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/otp-code", otpRouter);

io.on("connection", (socket: Socket) => {
  socket.on("message", async (messageData: any) => {
    await connectToDb();
    try {
      const { messageValue, messageAuthor, messageReceiver, whatChat } =
        messageData;
      if (
        !messageValue ||
        !isValidObjectId(messageAuthor) ||
        !isValidObjectId(messageReceiver) ||
        !isValidObjectId(whatChat)
      ) {
        io.emit("error", "خطا در ارسال اطلاعات به سرور")
        return
      }

      const time = new Date();

      await messageModel.create({
        messageValue,
        messageAuthor,
        messageReceiver,
        whatChat,
        date: time.getTime(),
      });

      const findMessage = await messageModel.findOne({messageValue})

      io.to(whatChat).emit("message", findMessage);
    } catch (error) {
      log("error in create message API ====>", error);
      io.emit("error", "خطا در سرور");
    }
  });
});

const PORT = process.env.PORT || 4000;


httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
