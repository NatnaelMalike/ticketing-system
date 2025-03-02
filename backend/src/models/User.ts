import { model, Schema } from "mongoose";
import { IUser } from "../types";

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true })

export default model<IUser>('User', userSchema)