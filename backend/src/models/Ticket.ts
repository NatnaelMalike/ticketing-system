import { model, Schema } from "mongoose";
import { ITicket } from "../types";

const ticketSchema = new Schema<ITicket>({
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Open", "In Progress", "Closed"],
    default: "Open",
  },
}, { timestamps: true });

export default model<ITicket>("Ticket", ticketSchema)