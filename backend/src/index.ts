import express from 'express'
import { port } from './config/config';
import connectDB from './config/db';
const app = express();

connectDB()
app.listen(port, ()=>{
    console.log("Server is running on port: ", port);
    
})
