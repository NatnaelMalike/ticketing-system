import { RequestHandler } from "express";
import { IUser } from "../types";
import User from "../models/User";
import bcrypt from "bcrypt";


export const login: RequestHandler = async (req, res) => {
  const { username, password, role } = req.body as IUser;
  const user = await User.findOne({ username });
  if (!user) {
    res.status(404).json({ message: "No account with current username." });
    return
  }
  const isValidPassword: boolean = await bcrypt.compare(
    password,
    user.password
  );
  if (!isValidPassword) {
    res.status(401).json({message: "Invalid credentials."});
    return;
  }
  res.status(200).json({message: "Logged in successfully.", user})
};

export const signup: RequestHandler = async (req, res) => {
  const { username, password, role } = req.body as IUser;
  const prevUser: IUser | null = await User.findOne({ username });
  if (prevUser) {
    res.status(400).json({ message: "Account already exists." });
    return;
  }
const newUser: IUser = await User.create({
    ...req.body,
    password: await bcrypt.hash(password, 10)
})
res.status(201).json({message: "Account created successfully!", newUser})
};
