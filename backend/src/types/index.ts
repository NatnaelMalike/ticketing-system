import { Schema } from "mongoose";

export interface IUser {
    username: string;
    password: string;
    role: 'user' | 'admin';
}

export interface ITicket {
    title: string;
    description: string;
    status: 'Open' | 'In Progress' | 'Closed';
    createdBy: Schema.Types.ObjectId;
}