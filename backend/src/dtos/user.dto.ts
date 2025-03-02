import { Schema } from "mongoose";
import { IUser } from "../types";

export class UserDTO {
    constructor(
      public id: Schema.Types.ObjectId,
      public username: string,
      public role: string,

    ) {}
    static fromUser(user: IUser): UserDTO {
      return new UserDTO(
        user._id,
        user.username,
        user.role,
  
      );
    }
  }