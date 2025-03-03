import {Router} from 'express'
import { createTicket, getTickets, updateTicket } from '../controllers/ticket.controller'
const router  = Router()
router.get('/', getTickets)
router.post('/', createTicket)
router.put('/:id', updateTicket)

export default router