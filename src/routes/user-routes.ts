import {Router} from 'express'
import { getAllUser } from '../controllers/user-controller.js'

const userRoute = Router()

userRoute.get('/', getAllUser)

export default userRoute