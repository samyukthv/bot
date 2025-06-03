import {Router} from 'express'
import { getAllUser, userLogin, userSignUp } from '../controllers/user-controller.js'
import { loginValidator, signUpValidator, validate } from '../utils/validator.js'

const userRoute = Router()

userRoute.get('/', getAllUser)
userRoute.post('/signup', validate(signUpValidator), userSignUp)
userRoute.post('/login', validate(loginValidator), userLogin)




export default userRoute