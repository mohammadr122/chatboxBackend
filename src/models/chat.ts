import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  members: [
    {
      type: mongoose.Types.ObjectId,
      ref: "user"
    },
  ],
});

const chatModel = mongoose.models.chat || mongoose.model("chat", chatSchema);

export default chatModel;
