import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  code: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  expTime: {
    type: String,
    required: true,
  },
});

const otpModel = mongoose.models.otp || mongoose.model("otp", otpSchema);

export default otpModel;
