import { userController } from '../controllers'
import { Router } from 'express'

const userRouter = Router()

userRouter.get(
  '/:id',
  userController.getByIdController.bind(userController)
)

userRouter.put(
  '/:id',
  userController.updateController.bind(userController)
)



export default userRouter
