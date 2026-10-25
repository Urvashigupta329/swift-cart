import express from 'express'
import { loginUser, registerUser, adminLogin, subscribeNewsletter } from '../controllers/userController.js'

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)
userRouter.post('/subscribe', subscribeNewsletter)

export default userRouter;