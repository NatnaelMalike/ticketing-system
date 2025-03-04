import express from 'express'
import { port } from './config/config';
import connectDB from './config/db';
import authRoute from './routes/auth.routes'
import ticketRoute from './routes/ticket.routes'
import { authMiddleware } from './middleware/auth.middleware';
import cors from 'cors'
import { globalErrorHandler, unExpectedError, unhandledPromise } from './middleware/error.middleware';
const app = express();

app.use(cors())
app.use(express.json());

app.use('/auth', authRoute)
app.use(authMiddleware)
app.use('/tickets',ticketRoute)
app.use(globalErrorHandler)
process.on('uncaughtException', unExpectedError)
process.on("unhandledRejection", unhandledPromise)
connectDB()
app.listen(port, ()=>{
    console.log("Server is running on port: ", port);
})
