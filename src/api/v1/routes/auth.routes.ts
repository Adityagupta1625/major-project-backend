import { authController } from "../controllers";
import {Router } from 'express'

const authRouter=Router()

authRouter.post('/login',authController.login.bind(authController))
authRouter.post('/register', authController.register.bind(authController))
authRouter.post('/reset-password',authController.resetPassword.bind(authController))

export default authRouter
