import { RequestHandler } from "express";
import Ticket from "../models/Ticket";
import { asyncHandler } from "../middleware/asyncHandler.middleware";
import { isValidObjectId } from "mongoose";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

export const getTickets: RequestHandler = asyncHandler(async (req, res) => {
  const tickets =
    req.user.role === "admin"
      ? await Ticket.find().populate("createdBy", "username")
      : await Ticket.find({ createdBy: req.user._id }).populate("createdBy", "username");
      const formattedTickets = tickets.map(ticket => ({
        ...ticket.toObject(),
        createdAt: format(new Date(ticket.createdAt), "EEEE - dd-MM-yyyy", { locale: enUS }),
      }));
  res.status(200).json(formattedTickets);
});

export const createTicket: RequestHandler = asyncHandler( async (req, res)=>{
   const {title, description} =  req.body 
   const createdBy = req.user._id
   const ticket = await Ticket.create({title, description, createdBy})
   res.status(201).json(ticket)
})

export const updateTicket: RequestHandler = asyncHandler(async (req, res)=>{
    const {status} = req.body
    if (!isValidObjectId(req.params.id)) {
        res.status(400).json({ message: "Invalid Ticket id." });
        return;
      }
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, {status}, {new: true})
    if(!ticket){
         res.status(404).json({ message: 'Ticket not found' });
         return
    }
    res.json(ticket);
})
