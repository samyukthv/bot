import { Router} from 'express'
import userRoute from './user-routes.js';
import chatRoute from './chat-routes.js';

const appRouter = Router()

appRouter.use('/users', userRoute)
appRouter.use('/chats', chatRoute)


export default appRouter;