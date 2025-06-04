import { NextFunction, Request, Response } from "express"
import User from "../models/user-model.js"
import { compare, hash } from "bcrypt"
import { createToken } from "../utils/token-manager.js"


export const getAllUser = async (req: Request, res: Response, next: NextFunction) =>{
    try {

        const users = await User.find()
        return void res.status(200).json({message: 'OK', users})
        
    } catch (error: unknown) {
        console.log(error);
        if (error instanceof Error) return void res.status(500).json({ message: 'ERROR', cause: error.message });    
    }
    
}

export const userSignUp = async (req: Request, res: Response, next: NextFunction) => {
    try {        
        const {name, password, email} = req.body

        console.log(name);
        
        const userExists = await User.findOne({email})
        console.log(userExists);
        
        if(userExists) return void res.status(401).send('User already exists')    
        

        const hashedPassword = await hash(password, 10)
        const newUser = new User({name, password: hashedPassword, email})
        await newUser.save()
        res.clearCookie('auth_cookie', {httpOnly: true, domain: 'localhost', signed: true, path: '/'})
        
        const token = createToken(newUser._id.toString(), newUser.email, "7d")
        const expires = new Date();
        expires.setDate(expires.getDate() + 7)

        res.cookie('auth_cookie', token, {path: '/', domain: "localhost", expires, httpOnly: true, signed: true})

        return void res.status(201).json({message: 'OK', id: newUser._id.toString()})
        
    } catch (error: unknown) {
        console.log(error);
        if (error instanceof Error)  return void res.status(500).json({ message: 'ERROR', cause: error.message });    
    }
    
}


export const userLogin = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        
        const {password, email} = req.body
        console.log(password);
        
        const user = await User.findOne({email})
        if(!user)  return void res.status(401).send('User not found')

        if (!user || !user.password)  return void res.status(401).send('User not found or password missing');
  
        const isPasswordCorrect = await compare(password, user?.password)
        if(!isPasswordCorrect)  return void res.status(403).send('Incorrect password')
        
        res.clearCookie('auth_cookie', {httpOnly: true, domain: 'localhost', signed: true, path: '/'})
        
        const token = createToken(user._id.toString(), user.email, "7d")
        const expires = new Date();
        expires.setDate(expires.getDate() + 7)

        res.cookie('auth_cookie', token, {path: '/', domain: "localhost", expires, httpOnly: true, signed: true})
    
        return void res.status(200).json({message: 'OK', id: user._id.toString()})
        
    } catch (error: unknown) {
        console.log(error);
        if (error instanceof Error)  return void res.status(500).json({ message: 'ERROR', cause: error.message });    
    }
    
}