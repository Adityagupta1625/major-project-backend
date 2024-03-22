import { userProfileController } from '../controllers'
import { Router } from 'express'

const userProfileRouter = Router()

userProfileRouter.post(
  '/',
  userProfileController.addController.bind(userProfileController)
)

userProfileRouter.get(
  '/:id',
  userProfileController.getByIdController.bind(userProfileController)
)

userProfileRouter.put(
  '/:id',
  userProfileController.updateController.bind(userProfileController)
)

export default userProfileRouter
