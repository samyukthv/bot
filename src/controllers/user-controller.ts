import { NextFunction, Request, Response } from "express"
import User from "../models/user-model.js"
import { hash } from "bcrypt"


export const getAllUser = async (req: Request, res: Response, next: NextFunction) =>{
    try {

        const users = await User.find()
        res.status(200).json({message: 'OK', users})
        
    } catch (error: unknown) {
        console.log(error);
        if (error instanceof Error) res.status(500).json({ message: 'ERROR', cause: error.message });    
    }
    
}

export const userSignUp = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        console.log(req);
        
        const {name, password, email} = req.body
        const hashedPassword = await hash(password, 10)
        const newUser = new User({name, password: hashedPassword, email})
        await newUser.save()

        res.status(200).json({message: 'OK', id: newUser._id.toString()})
        
    } catch (error: unknown) {
        console.log(error);
        if (error instanceof Error) res.status(500).json({ message: 'ERROR', cause: error.message });    
    }
    
}