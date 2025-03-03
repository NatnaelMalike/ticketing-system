import { RequestHandler } from "express";

export const isAdmin: RequestHandler = (req, res, next)=>{
    if (req.user.role == "admin"){
        return next()
        
    }
    res.status(403).json({message: 'Unauthorized access.'})
    return
}
export const isUser: RequestHandler = (req, res, next)=>{
    if (req.user.role == "user"){
        return next()
    }
    res.status(403).json({message: 'Unauthorized access.'}) 
    return
}