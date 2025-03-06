import { Schema } from "mongoose";

export interface IUser {
    _id: Schema.Types.ObjectId
    username: string;
    password: string;
    role: UserRole;
}

export interface IAuthUser{
    _id: Schema.Types.ObjectId;
    role: UserRole;
}
export interface ITicket {
    title: string;
    description: string;
    status: 'Open' | 'In Progress' | 'Closed';
    createdBy: Schema.Types.ObjectId;
    createdAt: string
}

export type UserRole = 'user' | 'admin'

declare global {
    namespace Express {
      interface Request {
        user: IAuthUser;
      }
    }
  }