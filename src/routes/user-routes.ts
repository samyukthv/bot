import {Router} from 'express'
import { getAllUser, userSignUp } from '../controllers/user-controller.js'
import { signUpValidator, validate } from '../utils/validator.js'

const userRoute = Router()

userRoute.get('/', getAllUser)
userRoute.post('/signup', validate(signUpValidator), userSignUp)



export default userRoute