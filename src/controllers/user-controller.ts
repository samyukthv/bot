import { NextFunction, Request, Response } from "express"
import User from "../models/user-model.js"


export const getAllUser = async (req: Request, res: Response, next: NextFunction) =>{
    try {

        const users = await User.find()
        res.status(200).json({message: 'OK', users})
        
    } catch (error: unknown) {
        console.log(error);
        if (error instanceof Error) res.status(500).json({ message: 'ERROR', cause: error.message });    
    }
    
}