import express from 'express'
import { port } from './config/config';
import connectDB from './config/db';
import authRoute from './routes/auth.routes'
import { authMiddleware } from './middleware/auth.middleware';
const app = express();
app.use(express.json());

app.use('/auth', authRoute)
app.use(authMiddleware)

connectDB()
app.listen(port, ()=>{
    console.log("Server is running on port: ", port);
})
