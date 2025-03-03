import {Router} from 'express'
import { createTicket, getTickets, updateTicket } from '../controllers/ticket.controller'
import validate from '../middleware/validation.middleware'
import { createTicketSchema, updateTicketSchema } from '../validations/ticket.validation'
const router  = Router()
router.get('/', getTickets)
router.post('/',validate(createTicketSchema), createTicket)
router.put('/:id',validate(updateTicketSchema), updateTicket)

export default router