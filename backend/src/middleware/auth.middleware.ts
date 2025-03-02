import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/config";
import { IAuthUser } from "../types";

const authMiddleware: RequestHandler = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.split(" ")[1]
  if(!token) {
    res.status(401).json({ message: "Access Denied!, No token Provided" });
    return;
  }
  try {
    const decoded = jwt.verify(token, jwtSecret as string) as IAuthUser;
    req.user = decoded;
    next();
    
  } catch (error) {
    res.status(401).json({ message: "Invalid authentication token." });
  }
};
export{authMiddleware}
