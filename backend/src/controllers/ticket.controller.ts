import { RequestHandler } from "express";
import Ticket from "../models/Ticket";
import { asyncHandler } from "../middleware/asyncHandler.middleware";

export const getTickets: RequestHandler = asyncHandler(async (req, res) => {
  const tickets =
    req.user.role === "admin"
      ? await Ticket.find()
      : await Ticket.find({ createdBy: req.user._id });
  res.status(200).json(tickets);
});

export const createTicket: RequestHandler = asyncHandler( async (req, res)=>{
   const {title, description} =  req.body 
   const createdBy = req.user._id
   const ticket = await Ticket.create({title, description, createdBy})
   res.status(201).json(ticket)
})

export const updateTicket: RequestHandler = asyncHandler(async (req, res)=>{
    const {status} = req.body
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, {status}, {new: true})
    if(!ticket){
         res.status(404).json({ message: 'Ticket not found' });
         return
    }
    res.json({ message: 'Ticket updated successfully', ticket });
})
