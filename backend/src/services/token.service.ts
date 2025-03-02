import { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import { UserRole } from "../types";
import { jwtSecret } from "../config/config";

const generateAuthToken = (
  _id: Schema.Types.ObjectId,
  role: UserRole,
  remember: boolean
) => {
  return jwt.sign({ _id, role }, jwtSecret as string, {
    expiresIn: remember ? "7d" : "1d",
  });
};

export {generateAuthToken}