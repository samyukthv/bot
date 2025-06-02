import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";


export const validate = (validations: ValidationChain[]) =>{

    return async (req: Request, res: Response, next: NextFunction) => {
        for(let validation of validations){
            const result = await validation.run(req)
            if(!result.isEmpty()) break; 

        }
        const errors = validationResult(req)
        if(errors.isEmpty()) next();
        res.status(422).json({errors: errors.array()})
    }
}

export const signUpValidator = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').trim().isEmail().withMessage('Email is required'),
    body('password').trim().isLength({min: 5}).withMessage('Password should have 5 character')

]