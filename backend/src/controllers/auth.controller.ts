import { RequestHandler } from "express";
import { IUser } from "../types";
import User from "../models/User";
import bcrypt from "bcrypt";
import { generateAuthToken } from "../services/token.service";
import { UserDTO } from "../dtos/user.dto";

export const login: RequestHandler = async (req, res) => {
  const { username, password, remember } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    res.status(404).json({ message: "No account with current username." });
    return;
  }
  const isValidPassword: boolean = await bcrypt.compare(
    password,
    user.password
  );
  if (!isValidPassword) {
    res.status(401).json({ message: "Invalid credentials." });
    return;
  }
  const token = generateAuthToken(user._id, user.role, remember);
  res
    .status(200)
    .json({
      message: "Logged in successfully.",
      user: UserDTO.fromUser(user),
      token,
    });
};

export const signup: RequestHandler = async (req, res) => {
  const { username, password, role } = req.body as IUser;
  const prevUser = await User.findOne({ username });
  if (prevUser) {
    res.status(400).json({ message: "Account already exists." });
    return;
  }
  const newUser: IUser = await User.create({
    username,
    role,
    password: await bcrypt.hash(password, 10),
  });
  const token = generateAuthToken(newUser._id, newUser.role, false);
  res
    .status(201)
    .json({
      message: "Account created successfully!",
      user: UserDTO.fromUser(newUser),
      token,
    });
};
