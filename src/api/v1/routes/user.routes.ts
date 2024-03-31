import { userController } from '../controllers'
import { Router } from 'express'

const userRouter = Router()

userRouter.get('/', userController.getController.bind(userController))

userRouter.put('/', userController.updateController.bind(userController))

export default userRouter
