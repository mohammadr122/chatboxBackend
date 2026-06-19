import express from "express"
import { createOtpCode,verifyOtpCode } from "../controllers/OTP-controller"

const optRouter = express.Router()

optRouter.post("/create-code", createOtpCode)
optRouter.post("/verify-code", verifyOtpCode)

export default optRouter