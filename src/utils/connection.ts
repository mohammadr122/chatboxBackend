import { hash, compare } from "bcryptjs";
import { log } from "console";
import { sign, verify } from "jsonwebtoken";
import mongoose from "mongoose";

const connectToDb = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }
  try {
    mongoose.connect(
      `${process.env.MONGO_DB_BASE_URL}/${process.env.MONGO_DB_NAME}`,
    );
  } catch (error) {
    console.log(error);
    return error;
  }
};

const hashPasswordGenerator = async (password: string) => {
  const hashedPassword = hash(password, 12);
  return hashedPassword;
};

const tokenGenerator = (userName: string) => {
  const key = process.env.TOKEN_KEY;
  if (key) {
    const token = sign({ userName }, key);
    return token;
  }
};

const verifyPaswsord = async (password: string, hashPassword: string) => {
  const verifyResult = await compare(password, hashPassword);
  return verifyResult;
};

const verifyTokenHandeler = (token: string) => {
  try {
    const key = process.env.TOKEN_KEY;
    if (key) {
      const verifyResult = verify(token, key);
      return verifyResult;
    }
  } catch (error) {
    log("error in verify token function ====>", error);
  }
};

export {
  connectToDb,
  hashPasswordGenerator,
  tokenGenerator,
  verifyPaswsord,
  verifyTokenHandeler,
};
