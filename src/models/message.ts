import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  messageValue: {
    type: String,
    required: true,
  },
  messageAuthor: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  messageReceiver: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  whatChat: {
    type: mongoose.Types.ObjectId,
    ref: "chat",
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
});

const messageModel = mongoose.models.message || mongoose.model("message", messageSchema)

export default messageModel