import {Router} from 'express'
import { createTicket, getTickets, updateTicket } from '../controllers/ticket.controller'
import validate from '../middleware/validation.middleware'
import { createTicketSchema, updateTicketSchema } from '../validations/ticket.validation'
import { isAdmin, isUser } from '../middleware/authorization.middleware'
const router  = Router()
router.get('/', getTickets)
router.post('/',validate(createTicketSchema),isUser, createTicket)
router.put('/:id',validate(updateTicketSchema),isAdmin, updateTicket)

export default router